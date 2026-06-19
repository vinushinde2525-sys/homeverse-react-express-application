// controllers/propertiesController.js (CommonJS)
const fs   = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/properties.json');

const getProperties = () => JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

const getAllProperties = (req, res) => {
  try {
    let properties = getProperties();
    const { type, status, city, minPrice, maxPrice, beds, sort, search } = req.query;

    if (type   && type   !== 'all') properties = properties.filter(p => p.type.toLowerCase() === type.toLowerCase());
    if (status && status !== 'all') properties = properties.filter(p => p.status.toLowerCase().includes(status.toLowerCase()));
    if (city   && city   !== 'all') properties = properties.filter(p => p.location.city.toLowerCase() === city.toLowerCase());
    if (minPrice) properties = properties.filter(p => p.price >= Number(minPrice));
    if (maxPrice) properties = properties.filter(p => p.price <= Number(maxPrice));
    if (beds && beds !== 'any') properties = properties.filter(p => p.bedrooms >= Number(beds));
    if (search) {
      const q = search.toLowerCase();
      properties = properties.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q) ||
        p.location.address.toLowerCase().includes(q)
      );
    }
    if (sort === 'price_asc')  properties.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') properties.sort((a, b) => b.price - a.price);
    if (sort === 'newest')     properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === 'popular')    properties.sort((a, b) => b.views - a.views);
    if (sort === 'rating')     properties.sort((a, b) => b.rating - a.rating);

    res.json({ success: true, count: properties.length, data: properties });
  } catch (err) {
    console.error('getAllProperties:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getPropertyById = (req, res) => {
  try {
    const property = getProperties().find(p => p.id === req.params.id || p.slug === req.params.id);
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' });
    res.json({ success: true, data: property });
  } catch (err) {
    console.error('getPropertyById:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getFeaturedProperties = (req, res) => {
  try {
    const featured = getProperties().filter(p => p.isFeatured);
    res.json({ success: true, count: featured.length, data: featured });
  } catch (err) {
    console.error('getFeaturedProperties:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getPopularLocations = (req, res) => {
  try {
    const cityMap = {};
    getProperties().forEach(p => {
      const city = p.location.city;
      if (!cityMap[city]) cityMap[city] = { city, state: p.location.state, count: 0, thumbnail: p.thumbnail };
      cityMap[city].count++;
    });
    res.json({ success: true, data: Object.values(cityMap).sort((a, b) => b.count - a.count) });
  } catch (err) {
    console.error('getPopularLocations:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getStats = (req, res) => {
  try {
    const p = getProperties();
    res.json({
      success: true,
      data: {
        totalProperties: p.length,
        forRent:    p.filter(x => x.status === 'For Rent').length,
        forSale:    p.filter(x => x.status === 'For Sale').length,
        totalViews: p.reduce((s, x) => s + x.views, 0),
        cities:     [...new Set(p.map(x => x.location.city))].length,
      }
    });
  } catch (err) {
    console.error('getStats:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAllProperties, getPropertyById, getFeaturedProperties, getPopularLocations, getStats };
