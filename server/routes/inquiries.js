// routes/inquiries.js (CommonJS)
const express = require('express');
const router  = express.Router();
const { createInquiry } = require('../controllers/inquiriesController');

router.post('/', createInquiry);

module.exports = router;
