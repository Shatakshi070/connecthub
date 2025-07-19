const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Handle connection requests
app.post('/api/connect', (req, res) => {
  const { from, to } = req.body;

  // Load existing requests
  let requests = [];
  try {
    requests = JSON.parse(fs.readFileSync('connections.json'));
  } catch (err) {
    // If file doesn't exist, start empty
    requests = [];
  }

  // Check for duplicate
  const alreadySent = requests.find(r => r.from === from && r.to === to);
  if (alreadySent) {
    return res.json({ success: false, message: 'Already requested' });
  }

  // Save request
  requests.push({ from, to, date: new Date() });
  fs.writeFileSync('connections.json', JSON.stringify(requests, null, 2));

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
