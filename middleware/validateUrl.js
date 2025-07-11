const validUrl = require('valid-url');

module.exports = (req, res, next) => {
  const { url } = req.body;
  if (!validUrl.isWebUri(url)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }
  next();
};