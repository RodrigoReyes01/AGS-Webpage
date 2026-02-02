#!/usr/bin/env node

/**
 * Post-build script for AGS Webpage
 * Copies necessary files to the out/ directory after Next.js build
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
    name: 'English home page (index.html)',
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

console.log('\n' + '='.repeat(50));
console.log(`✅ Success: ${successCount}/${tasks.length} tasks completed`);

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
