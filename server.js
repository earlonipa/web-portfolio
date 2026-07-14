const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, 'data');
const COUNTER_FILE = path.join(DATA_DIR, 'visits.json');
const COOKIE_NAME = 'evisited';
const COOKIE_MAX_AGE = 10 * 365 * 24 * 60 * 60; // 10 years, in seconds

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(COUNTER_FILE)) fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: 0 }));

function readCount() {
  try {
    return JSON.parse(fs.readFileSync(COUNTER_FILE, 'utf8')).count || 0;
  } catch {
    return 0;
  }
}

function writeCount(count) {
  fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count }));
}

function parseCookies(req) {
  const header = req.headers.cookie;
  const cookies = {};
  if (!header) return cookies;
  header.split(';').forEach(pair => {
    const idx = pair.indexOf('=');
    if (idx > -1) {
      cookies[pair.slice(0, idx).trim()] = decodeURIComponent(pair.slice(idx + 1).trim());
    }
  });
  return cookies;
}

app.use(express.static(path.join(__dirname, 'public')));

// Returns the current count, and increments it once per unique visitor (cookie-based)
app.get('/api/visits', (req, res) => {
  const cookies = parseCookies(req);
  let count = readCount();

  if (!cookies[COOKIE_NAME]) {
    count += 1;
    writeCount(count);
    const visitorId = crypto.randomBytes(8).toString('hex');
    res.setHeader(
      'Set-Cookie',
      `${COOKIE_NAME}=${visitorId}; Max-Age=${COOKIE_MAX_AGE}; Path=/; HttpOnly; SameSite=Lax`
    );
  }

  res.json({ count });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio running on port ${PORT}`);
});
