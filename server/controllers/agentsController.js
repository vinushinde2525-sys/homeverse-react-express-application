// controllers/agentsController.js (CommonJS)
const fs   = require('fs');
const path = require('path');

const AGENTS_PATH = path.join(__dirname, '../data/agents.json');
const PROPS_PATH  = path.join(__dirname, '../data/properties.json');

const getAgents     = () => JSON.parse(fs.readFileSync(AGENTS_PATH, 'utf-8'));
const getProperties = () => JSON.parse(fs.readFileSync(PROPS_PATH,  'utf-8'));

const getAllAgents = (req, res) => {
  try {
    const agents = getAgents();
    res.json({ success: true, count: agents.length, data: agents });
  } catch (err) {
    console.error('getAllAgents:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAgentById = (req, res) => {
  try {
    const agent = getAgents().find(a => a.id === req.params.id || a.slug === req.params.id);
    if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });
    const properties = getProperties().filter(p => p.agentId === agent.id);
    res.json({ success: true, data: { ...agent, properties } });
  } catch (err) {
    console.error('getAgentById:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAllAgents, getAgentById };
