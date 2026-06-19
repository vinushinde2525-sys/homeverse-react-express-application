// routes/agents.js (CommonJS)
const express = require('express');
const router  = express.Router();
const { getAllAgents, getAgentById } = require('../controllers/agentsController');

router.get('/',    getAllAgents);
router.get('/:id', getAgentById);

module.exports = router;
