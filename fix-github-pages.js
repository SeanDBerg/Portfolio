#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the built HTML file in docs
const docsPath = path.join(__dirname, 'docs');
const indexPath = path.join(docsPath, 'index.html');

console.log('Fixing GitHub Pages deployment...');

// Read the HTML file
if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');
  
  // Fix asset paths from absolute to relative
  html = html.replace(/src="\/assets\//g, 'src="./assets/');
  html = html.replace(/href="\/assets\//g, 'href="./assets/');
  
  // Remove the replit dev banner script for production
  html = html.replace(/<script[^>]*replit-dev-banner\.js[^>]*><\/script>/g, '');
  
  // Write the fixed HTML back
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('✓ Fixed asset paths in index.html');
  console.log('✓ Removed development scripts');
} else {
  console.error('❌ docs/index.html not found');
  process.exit(1);
}

console.log('🚀 GitHub Pages deployment files ready!');
console.log('📁 Files are in the /docs folder');
console.log('📋 Next steps:');
console.log('   1. Commit and push changes to GitHub');
console.log('   2. Enable GitHub Pages in repository settings');
console.log('   3. Set source to "Deploy from branch" and select main branch /docs folder');