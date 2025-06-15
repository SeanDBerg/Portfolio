#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

console.log('Creating static build for GitHub Pages...');

// Kill any existing build processes
try {
  spawn('pkill', ['-f', 'vite build'], { stdio: 'ignore' });
} catch (e) {
  // Ignore if no process to kill
}

// Clean and create docs directory
if (fs.existsSync('docs')) {
  fs.rmSync('docs', { recursive: true });
}
fs.mkdirSync('docs', { recursive: true });
fs.mkdirSync('docs/assets', { recursive: true });

// Use the original build-docs.js logic but with a timeout and proper error handling
console.log('Starting Vite build process...');

const viteProcess = spawn('npx', ['vite', 'build', '--outDir', 'docs', '--base', './'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  timeout: 120000 // 2 minutes timeout
});

let buildOutput = '';

viteProcess.stdout.on('data', (data) => {
  buildOutput += data.toString();
  process.stdout.write(data);
});

viteProcess.stderr.on('data', (data) => {
  buildOutput += data.toString();
  process.stderr.write(data);
});

viteProcess.on('close', (code) => {
  if (code === 0) {
    console.log('\n✓ Vite build completed successfully');
    
    // Post-process the files
    postProcessFiles();
  } else {
    console.error('\n❌ Vite build failed with code:', code);
    
    // Fallback: create a simple static version
    console.log('Creating fallback static build...');
    createFallbackBuild();
  }
});

viteProcess.on('error', (error) => {
  console.error('\n❌ Failed to start Vite build:', error.message);
  console.log('Creating fallback static build...');
  createFallbackBuild();
});

function postProcessFiles() {
  // Fix HTML file for GitHub Pages
  const indexPath = path.join('docs', 'index.html');
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Fix asset paths
    html = html.replace(/src="\/assets\//g, 'src="./assets/');
    html = html.replace(/href="\/assets\//g, 'href="./assets/');
    html = html.replace(/src="\//g, 'src="./');
    html = html.replace(/href="\//g, 'href="./');
    
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('✓ Fixed asset paths in HTML');
  }
  
  // Copy additional assets
  copyAssets();
  
  console.log('🚀 GitHub Pages build complete!');
  console.log('📁 Files ready in /docs folder');
}

function copyAssets() {
  // Copy image assets
  const assets = [
    { src: 'client/public/EggHeadMcFinnigans.jpg', dest: 'docs/EggHeadMcFinnigans.jpg' },
    { src: 'dist/public/EggHeadMcFinnigans.jpg', dest: 'docs/EggHeadMcFinnigans.jpg' }
  ];
  
  for (const asset of assets) {
    if (fs.existsSync(asset.src)) {
      fs.copyFileSync(asset.src, asset.dest);
      console.log(`✓ Copied ${path.basename(asset.dest)}`);
      break;
    }
  }
}

function createFallbackBuild() {
  console.log('Building minimal static version...');
  
  // Create a basic HTML structure
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
    <title>Sean Berg - Professional Resume</title>
    <meta name="description" content="Sean Berg's professional resume showcasing 20+ years of leadership experience across operations, IT, frontend development, and project management.">
    <meta property="og:title" content="Sean Berg - Professional Resume">
    <meta property="og:description" content="Dynamic resume showcasing expertise in operations leadership, frontend development, IT management, and project management.">
    <meta property="og:type" content="website">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .hero { text-align: center; padding: 60px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; opacity: 0.9; }
        .section { padding: 40px 20px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .loading { text-align: center; padding: 40px; font-size: 1.2rem; }
    </style>
</head>
<body>
    <div class="hero">
        <h1>Sean Berg</h1>
        <p>Professional Resume & Portfolio</p>
    </div>
    
    <div class="container">
        <div class="loading">
            <p>Loading portfolio content...</p>
            <p style="margin-top: 20px; font-size: 1rem; opacity: 0.7;">
                If this message persists, there may be a build configuration issue.
                Please check the repository settings and rebuild the project.
            </p>
        </div>
    </div>
    
    <script>
        // Simple fallback content loader
        setTimeout(() => {
            document.querySelector('.loading').innerHTML = \`
                <div class="section">
                    <h2>Sean Berg - Professional Profile</h2>
                    <p>Experienced leader in operations, IT, and frontend development with 20+ years of expertise.</p>
                </div>
                <div class="grid">
                    <div class="card">
                        <h3>Leadership Experience</h3>
                        <p>20+ years leading teams and driving operational excellence</p>
                    </div>
                    <div class="card">
                        <h3>Technical Skills</h3>
                        <p>Frontend development, IT management, and project coordination</p>
                    </div>
                    <div class="card">
                        <h3>Contact</h3>
                        <p>Ready to discuss opportunities and collaborations</p>
                    </div>
                </div>
            \`;
        }, 2000);
    </script>
</body>
</html>`;
  
  fs.writeFileSync('docs/index.html', htmlContent);
  copyAssets();
  
  console.log('✓ Fallback build created');
  console.log('📝 Basic portfolio page ready for GitHub Pages');
}