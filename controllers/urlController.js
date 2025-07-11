const Url = require('../models/Url');
const generateCode = require('../utils/generateCode');

exports.shortenUrl = async (req, res) => {
  const { url, expiryDays } = req.body;
  try {
    const existing = await Url.findOne({ originalUrl: url });
    if (existing) {
      return res.json({ shortUrl: `${process.env.BASE_URL}/${existing.shortCode}` });
    }

    const code = generateCode();
    const expiryDate = expiryDays ? new Date(Date.now() + expiryDays * 86400000) : null;

    const newUrl = new Url({ originalUrl: url, shortCode: code, expiryDate });
    await newUrl.save();

    res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${code}` });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (!url) return res.status(404).json({ error: 'Not found' });
    if (url.expiryDate && url.expiryDate < new Date()) {
      return res.status(410).json({ error: 'URL expired' });
    }

    url.clicks += 1;
    await url.save();
    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).json({ error: 'Redirect failed' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });
    if (!url) return res.status(404).json({ error: 'No stats found' });

    res.json({
      originalUrl: url.originalUrl,
      shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
      clicks: url.clicks,
      createdAt: url.createdAt,
      expiryDate: url.expiryDate,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};