// server.js — Homeverse Express API
process.on('uncaughtException',  (err) => console.error('CRASH uncaughtException:', err.stack));
process.on('unhandledRejection', (err) => console.error('CRASH unhandledRejection:', err));

const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');
const http    = require('http');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => { res.setHeader('Connection', 'close'); next(); });
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, _res, next) => { console.log(req.method + ' ' + req.url); next(); });

const DATA_DIR = path.join(__dirname, 'data');
const read = (file) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'));

app.get('/api/health', (_req, res) => res.json({ success: true, message: 'OK' }));

app.get('/api/properties/featured', (_req, res) => {
  try { res.json({ success: true, data: read('properties.json').filter(p => p.isFeatured) }); }
  catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.get('/api/properties/popular-locations', (_req, res) => {
  try {
    const map = {};
    read('properties.json').forEach(p => {
      if (!map[p.location.city]) map[p.location.city] = { city: p.location.city, state: p.location.state, count: 0, thumbnail: p.thumbnail };
      map[p.location.city].count++;
    });
    res.json({ success: true, data: Object.values(map).sort((a, b) => b.count - a.count) });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.get('/api/properties/stats', (_req, res) => {
  try {
    const p = read('properties.json');
    res.json({ success: true, data: { totalProperties: p.length, forRent: p.filter(x => x.status === 'For Rent').length, forSale: p.filter(x => x.status === 'For Sale').length, totalViews: p.reduce((s, x) => s + x.views, 0), cities: [...new Set(p.map(x => x.location.city))].length }});
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.get('/api/properties', (req, res) => {
  try {
    let p = read('properties.json');
    const { type, status, city, minPrice, maxPrice, beds, sort, search } = req.query;
    if (type   && type   !== 'all') p = p.filter(x => x.type.toLowerCase()   === type.toLowerCase());
    if (status && status !== 'all') p = p.filter(x => x.status.toLowerCase().includes(status.toLowerCase()));
    if (city   && city   !== 'all') p = p.filter(x => x.location.city.toLowerCase() === city.toLowerCase());
    if (minPrice) p = p.filter(x => x.price >= Number(minPrice));
    if (maxPrice) p = p.filter(x => x.price <= Number(maxPrice));
    if (beds && beds !== 'any') p = p.filter(x => x.bedrooms >= Number(beds));
    if (search) { const q = search.toLowerCase(); p = p.filter(x => x.title.toLowerCase().includes(q) || x.location.city.toLowerCase().includes(q)); }
    if (sort === 'price_asc')  p.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') p.sort((a, b) => b.price - a.price);
    if (sort === 'newest')     p.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === 'popular')    p.sort((a, b) => b.views - a.views);
    if (sort === 'rating')     p.sort((a, b) => b.rating - a.rating);
    res.json({ success: true, count: p.length, data: p });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.get('/api/properties/:id', (req, res) => {
  try {
    const prop = read('properties.json').find(p => p.id === req.params.id || p.slug === req.params.id);
    if (!prop) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: prop });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.get('/api/agents', (_req, res) => {
  try { res.json({ success: true, data: read('agents.json') }); }
  catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.get('/api/agents/:id', (req, res) => {
  try {
    const agent = read('agents.json').find(a => a.id === req.params.id || a.slug === req.params.id);
    if (!agent) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: { ...agent, properties: read('properties.json').filter(p => p.agentId === agent.id) } });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.post('/api/inquiry', (req, res) => {
  try {
    const { name, email, phone, message, propertyId, agentId } = req.body;
    if (!name || !email || !message) return res.status(400).json({ success: false, message: 'Name, email and message required' });
    const list = read('inquiries.json');
    const entry = { id: 'inq-' + Date.now(), name, email, phone: phone||'', message, propertyId: propertyId||null, agentId: agentId||null, status: 'pending', createdAt: new Date().toISOString() };
    list.push(entry);
    fs.writeFileSync(path.join(DATA_DIR, 'inquiries.json'), JSON.stringify(list, null, 2));
    res.status(201).json({ success: true, message: 'Inquiry submitted!', data: entry });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.use((_req, res) => res.status(404).json({ success: false, message: 'Not found' }));

const server = http.createServer(app);
server.keepAliveTimeout = 0;

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('\n❌  Port ' + PORT + ' is already in use!');
    console.error('   Run this to fix it:');
    console.error('   Windows:  netstat -ano | findstr :' + PORT + '  then  taskkill /PID <pid> /F');
    console.error('   Mac/Linux: lsof -ti:' + PORT + ' | xargs kill -9\n');
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('\n🏠  Homeverse API → http://localhost:' + PORT);
  console.log('✅  http://localhost:' + PORT + '/api/health\n');
});
