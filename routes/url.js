const express = require('express');
const router = express.Router();
const limiter = require('../middleware/rateLimiter');
const validateUrl = require('../middleware/validateUrl');
const { shortenUrl, redirectUrl, getStats } = require('../controllers/urlController');

router.post('/shorten', limiter, validateUrl, shortenUrl);
router.get('/:code', redirectUrl);
router.get('/stats/:code', getStats);

module.exports = router;