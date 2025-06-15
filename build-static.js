#!/usr/bin/env node
import { build } from 'vite';
import fs from 'fs';
import path from 'path';

console.log('Building static site for GitHub Pages...');

// Clean docs directory
if (fs.existsSync('docs')) {
  fs.rmSync('docs', { recursive: true });
}

try {
  // Use Vite to build the project
  await build({
    configFile: './vite.config.ts',
    build: {
      outDir: path.resolve(process.cwd(), 'docs'),
      emptyOutDir: true,
      assetsDir: 'assets',
      sourcemap: false,
      minify: true,
    },
    base: './', // Important for GitHub Pages
  });

  console.log('✓ Vite build completed');

  // Fix the HTML file for GitHub Pages
  const indexPath = path.join('docs', 'index.html');
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Ensure all paths are relative
    html = html.replace(/src="\/assets\//g, 'src="./assets/');
    html = html.replace(/href="\/assets\//g, 'href="./assets/');
    html = html.replace(/src="\//g, 'src="./');
    html = html.replace(/href="\//g, 'href="./');
    
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('✓ Fixed asset paths for GitHub Pages');
  }

  // Copy any additional assets
  const publicAssets = ['client/public/EggHeadMcFinnigans.jpg'];
  for (const asset of publicAssets) {
    if (fs.existsSync(asset)) {
      const filename = path.basename(asset);
      fs.copyFileSync(asset, path.join('docs', filename));
      console.log(`✓ Copied ${filename}`);
    }
  }

  console.log('🚀 Static build complete! Files are ready in /docs folder');
  console.log('📝 Ready for GitHub Pages deployment');

} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}