import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

// Clean docs directory
if (fs.existsSync('docs/assets')) {
  fs.rmSync('docs/assets', { recursive: true });
}

// Ensure docs directory exists
if (!fs.existsSync('docs')) {
  fs.mkdirSync('docs');
}
if (!fs.existsSync('docs/assets')) {
  fs.mkdirSync('docs/assets');
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
    '.png': 'dataurl',
    '.jpg': 'dataurl',
    '.jpeg': 'dataurl',
    '.svg': 'text'
  },
  external: [],
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  jsx: 'automatic',
  jsxImportSource: 'react',
  alias: {
    '@': './client/src',
    '@shared': './shared',
    '@assets': './attached_assets'
  }
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>Sean Berg - Professional Resume</title>
    <meta name="description" content="Sean Berg's professional resume showcasing 20+ years of leadership experience across operations, IT, frontend development, and project management." />
    <meta property="og:title" content="Sean Berg - Professional Resume" />
    <meta property="og:description" content="Dynamic resume showcasing expertise in operations leadership, frontend development, IT management, and project management." />
    <meta property="og:type" content="website" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="./assets/index.css">
  </head>
  <body>
    <div id="root"></div>
    <script src="./assets/index.js"></script>
  </body>
</html>`;
    
    fs.writeFileSync('docs/index.html', htmlContent);
    console.log('Updated index.html');
    
    // Copy image assets
    if (fs.existsSync('client/public/EggHeadMcFinnigans.jpg')) {
      fs.copyFileSync('client/public/EggHeadMcFinnigans.jpg', 'docs/EggHeadMcFinnigans.jpg');
      console.log('Copied image assets');
    }
    
    console.log('🚀 GitHub Pages build complete!');
  });
}).catch(error => {
  console.error('Build failed:', error);
  process.exit(1);
});