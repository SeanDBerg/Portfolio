import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

console.log('Extracting static files from running application...');

// Clean docs directory
if (fs.existsSync('docs')) {
  fs.rmSync('docs', { recursive: true });
}
fs.mkdirSync('docs', { recursive: true });

try {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Navigate to the running development server
  await page.goto('http://localhost:5000', { waitUntil: 'networkidle0' });
  
  // Wait for React to fully render
  await page.waitForTimeout(3000);
  
  // Get the fully rendered HTML
  const html = await page.content();
  
  // Extract CSS and JS from the page
  const assets = await page.evaluate(() => {
    const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map(link => link.href)
      .filter(href => href.includes('/src/') || href.includes('index.css'));
    
    const jsScripts = Array.from(document.querySelectorAll('script[src]'))
      .map(script => script.src)
      .filter(src => src.includes('/src/') || src.includes('main.tsx'));
    
    return { cssLinks, jsScripts };
  });
  
  await browser.close();
  
  // Process and save the static HTML
  let processedHtml = html;
  
  // Remove Vite development scripts and hot reload
  processedHtml = processedHtml.replace(/<script[^>]*\/@vite\/client[^>]*><\/script>/g, '');
  processedHtml = processedHtml.replace(/<script[^>]*@react-refresh[^>]*><\/script>/g, '');
  processedHtml = processedHtml.replace(/<script[^>]*runtime-error-plugin[^>]*>[\s\S]*?<\/script>/g, '');
  
  // Replace development asset paths with production paths
  processedHtml = processedHtml.replace(/src="\/src\/main\.tsx"/g, 'src="./assets/index.js"');
  processedHtml = processedHtml.replace(/href="\/src\/index\.css"/g, 'href="./assets/index.css"');
  
  fs.writeFileSync('docs/index.html', processedHtml);
  
  console.log('Static HTML extracted successfully');
  
} catch (error) {
  console.error('Puppeteer extraction failed:', error.message);
  console.log('Using direct file copy approach...');
  
  // Fallback: Use the existing build files if they exist
  useExistingBuild();
}