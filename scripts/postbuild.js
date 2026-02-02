#!/usr/bin/env node

/**
 * Post-build script for AGS Webpage
 * Copies necessary files and restructures About pages for clean URLs
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Running post-build tasks...\n');

// Define source and destination paths
const tasks = [
  {
    name: 'Apache .htaccess',
    source: path.join(__dirname, '..', 'public', '.htaccess'),
    dest: path.join(__dirname, '..', 'out', '.htaccess'),
  },
  {
    name: 'Home page (index.html)',
    source: path.join(__dirname, '..', 'out', 'en.html'),
    dest: path.join(__dirname, '..', 'out', 'index.html'),
  },
];

let successCount = 0;
let errorCount = 0;

// Execute each task
tasks.forEach((task) => {
  try {
    // Check if source exists
    if (!fs.existsSync(task.source)) {
      console.log(`⚠️  Warning: ${task.name} source not found: ${task.source}`);
      errorCount++;
      return;
    }

    // Copy file
    fs.copyFileSync(task.source, task.dest);
    
    // Verify copy
    if (fs.existsSync(task.dest)) {
      const stats = fs.statSync(task.dest);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`✅ ${task.name}: ${sizeKB} KB`);
      successCount++;
    } else {
      console.log(`❌ Failed to copy: ${task.name}`);
      errorCount++;
    }
  } catch (error) {
    console.log(`❌ Error copying ${task.name}: ${error.message}`);
    errorCount++;
  }
});

// Restructure About pages for clean URLs (no .htaccess rewrite needed)
console.log('\n📁 Restructuring About pages for directory-based URLs...\n');

// Only 'en' locale since we're using single-page app with client-side language switching
const locales = ['en'];

locales.forEach((locale) => {
  try {
    const prefix = locale ? `${locale}/` : '';
    const srcFile = path.join(__dirname, '..', 'out', `${prefix}about.html`);
    
    if (fs.existsSync(srcFile)) {
      // Create /about or /en/about directory
      const destDir = path.join(__dirname, '..', 'out', `${prefix}about`);
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      // Copy about.html to about/index.html
      const destFile = path.join(destDir, 'index.html');
      fs.copyFileSync(srcFile, destFile);
      
      // Verify
      if (fs.existsSync(destFile)) {
        const stats = fs.statSync(destFile);
        const sizeKB = (stats.size / 1024).toFixed(1);
        console.log(`✅ Created /${prefix}about/index.html: ${sizeKB} KB`);
        successCount++;
        
        // Keep the original about.html as fallback
        console.log(`   (Kept original ${prefix}about.html as fallback)`);
      } else {
        console.log(`❌ Failed to create /${prefix}about/index.html`);
        errorCount++;
      }
    } else {
      console.log(`⚠️  Warning: ${prefix}about.html not found`);
      errorCount++;
    }
  } catch (error) {
    console.log(`❌ Error restructuring ${locale} About page: ${error.message}`);
    errorCount++;
  }
});

// Also create root /about directory (copy from en/about)
try {
  const srcFile = path.join(__dirname, '..', 'out', 'en', 'about.html');
  
  if (fs.existsSync(srcFile)) {
    const destDir = path.join(__dirname, '..', 'out', 'about');
    
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    const destFile = path.join(destDir, 'index.html');
    fs.copyFileSync(srcFile, destFile);
    
    if (fs.existsSync(destFile)) {
      const stats = fs.statSync(destFile);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`✅ Created /about/index.html: ${sizeKB} KB`);
      successCount++;
    }
  }
} catch (error) {
  console.log(`❌ Error creating root /about: ${error.message}`);
  errorCount++;
}

console.log('\n' + '='.repeat(50));
console.log(`✅ Success: ${successCount} tasks completed`);

if (errorCount > 0) {
  console.log(`⚠️  Warnings/Errors: ${errorCount}`);
}

console.log('='.repeat(50) + '\n');

// Exit with error code if any tasks failed
if (errorCount > 0) {
  console.log('⚠️  Some post-build tasks had issues. Check the output above.');
  process.exit(0); // Don't fail the build, just warn
}

console.log('🎉 Post-build tasks completed successfully!\n');
console.log('📂 Directory structure:');
console.log('   /index.html          → Home page');
console.log('   /about/index.html    → About page (clean URL: /about)');
console.log('   /en/about/index.html → English About (clean URL: /en/about)');
console.log('   /.htaccess           → Apache configuration\n');

