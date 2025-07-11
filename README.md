
# 🔗 URL Shortener API

A simple, efficient Node.js + Express API for shortening long URLs. Includes optional expiry, click analytics, and a frontend form for testing. Built with MongoDB and fully RESTful.

---

## 🚀 Features

- Shorten any valid URL
- Optional expiry in days
- Redirect with expiry check
- View stats: click count, creation and expiry date
- Rate limiting to prevent abuse
- Input validation on both client and server
- Includes Postman collection for easy testing
- Minimal frontend UI (HTML + JS)

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- shortid (code generation)
- valid-url (validation)
- dotenv (env vars)
- morgan (logging)
- express-rate-limit (basic abuse prevention)

---

## 📦 Installation

1. Clone the repo:
```bash
git clone https://github.com/kratiitondia/url-shortener-api.git
cd url-shortener-api

```

2. Install dependencies:
```bash
npm install
```

3. Set up `.env` file:
```bash
cp .env.example .env
```

4. Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/urlshortener
BASE_URL=http://localhost:5000
```

---

## ▶️ Usage

```bash
npm run dev
```

Visit:  
👉 `http://localhost:5000` to test via frontend  
🧪 or use Postman with the included collection.

---

## 📬 API Endpoints

### 🔹 POST `/shorten`
Shortens a long URL.

**Body:**
```json
{
  "url": "https://example.com/some/long/link",
  "expiryDays": 3
}
```

**Response:**
```json
{
  "shortUrl": "http://localhost:5000/abc123"
}
```

---

### 🔹 GET `/:code`
Redirects to original URL if valid and not expired.

---

### 🔹 GET `/stats/:code`
Returns metadata for the short URL:

```json
{
  "originalUrl": "https://example.com",
  "shortUrl": "http://localhost:5000/abc123",
  "clicks": 3,
  "createdAt": "2025-07-11T...",
  "expiryDate": "2025-07-14T..."
}
```

---

## ❗ Error Responses

| Code | Reason                       |
|------|------------------------------|
| 400  | Invalid or missing URL       |
| 404  | Short code not found         |
| 410  | URL expired                  |
| 500  | Server error                 |

---

## 🧪 Testing (Postman)

Import this file:
[`url-shortener-api.postman_collection.json`](./url-shortener-api.postman_collection.json)

Use the environment variable `shortCode` for stat/redirect testing.

---

## 🖼 Frontend Preview

- Basic form in `public/index.html`
- Shortens URLs and shows stats instantly
- Built with plain HTML + JavaScript (fetch API)

---

## 🌍 Deployment (optional)

To deploy on Render or Railway:
- Set `MONGO_URI` to your cloud MongoDB URI
- Set `BASE_URL` to your deployed app URL

---

## 📌 License

[MIT](LICENSE)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss.

---
