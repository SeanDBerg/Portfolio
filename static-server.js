const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the dist/public directory
app.use(express.static(path.join(__dirname, 'dist/public')));

// Handle client-side routing by serving index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Static resume website serving on port ${port}`);
  console.log('This is now a static website suitable for GitHub Pages hosting');
});