// routes/properties.js (CommonJS)
const express = require('express');
const router  = express.Router();
const {
  getAllProperties,
  getPropertyById,
  getFeaturedProperties,
  getPopularLocations,
  getStats,
} = require('../controllers/propertiesController');

router.get('/',                  getAllProperties);
router.get('/featured',          getFeaturedProperties);    // MUST be before /:id
router.get('/popular-locations', getPopularLocations);
router.get('/stats',             getStats);
router.get('/:id',               getPropertyById);

module.exports = router;
