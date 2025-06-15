const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Clean docs directory
if (fs.existsSync('docs/assets')) {
  fs.rmSync('docs/assets', { recursive: true });
}

// Build the application
esbuild.build({
  entryPoints: ['client/src/main.tsx'],
  bundle: true,
  minify: true,
  outfile: 'docs/assets/index.js',
  define: {
    'process.env.NODE_ENV': '"production"',
    'global': 'window'
  },
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
    '.css': 'css',
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.svg': 'text'
  },
  external: [],
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  jsx: 'automatic',
  jsxImportSource: 'react'
}).then(() => {
  console.log('Build completed successfully');
  
  // Copy CSS files
  esbuild.build({
    entryPoints: ['client/src/index.css'],
    bundle: true,
    minify: true,
    outfile: 'docs/assets/index.css',
    loader: {
      '.css': 'css'
    }
  }).then(() => {
    console.log('CSS build completed');
    
    // Update HTML file
    const htmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sean Berg - Portfolio</title>
    <link rel="stylesheet" href="./assets/index.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  </head>
  <body>
    <div id="root"></div>
    <script src="./assets/index.js"></script>
  </body>
</html>`;
    
    fs.writeFileSync('docs/index.html', htmlContent);
    console.log('Updated index.html');
    
    // Copy image assets
    if (fs.existsSync('EggHeadMcFinnigans.jpg')) {
      fs.copyFileSync('EggHeadMcFinnigans.jpg', 'docs/EggHeadMcFinnigans.jpg');
      console.log('Copied image assets');
    }
    
    console.log('🚀 GitHub Pages build complete!');
  });
}).catch(error => {
  console.error('Build failed:', error);
  process.exit(1);
});