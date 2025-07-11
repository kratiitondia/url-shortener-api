const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
connectDB();

app.use(morgan('dev'));
app.use(express.json());

// ✅ Serve static files from public folder (index.html, etc.)
app.use(express.static('public'));

// ✅ Your API routes
app.use('/', require('./routes/url'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
