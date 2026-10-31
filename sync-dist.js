const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy HTML files except clinic.html
fs.readdirSync(rootDir).forEach(file => {
  if (file.endsWith('.html') && file !== 'clinic.html') {
    fs.copyFileSync(path.join(rootDir, file), path.join(distDir, file));
  }
});

// Copy root asset and config files
const files = [
  'Arovia_Logo.png',
  'Arovia_Logo.jpg',
  'apple-touch-icon.png',
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon-48x48.png',
  'favicon-512x512.png',
  'arovia equipment.pdf',
  'robots.txt',
  'sitemap.xml',
  '_headers',
  '_redirects'
];
files.forEach(file => {
  const src = path.join(rootDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(distDir, file));
  }
});

// Recursive copy helper
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

copyDir(path.join(rootDir, 'css'), path.join(distDir, 'css'));
copyDir(path.join(rootDir, 'js'), path.join(distDir, 'js'));
copyDir(path.join(rootDir, 'assets'), path.join(distDir, 'assets'));
// Copy clean route directories
const routeDirs = [
  'home-care',
  'ambulance',
  'medical-equipment',
  'pharmacy',
  'lab-tests',
  'digital-health',
  'contact',
  'components',
  'home-care-service'
];

routeDirs.forEach(dir => {
  const srcDir = path.join(rootDir, dir);
  if (fs.existsSync(srcDir)) {
    copyDir(srcDir, path.join(distDir, dir));
  }
});

console.log('✅ Synchronized all production files into dist/ successfully.');
