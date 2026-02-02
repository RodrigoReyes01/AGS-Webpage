# Build Process Updated - Automatic .htaccess Copy ✅

## Summary

The build process has been updated to automatically copy the `.htaccess` file from `public/.htaccess` to `out/.htaccess` after every build. This ensures the Apache configuration is always included in the deployment package.

## What Changed

### 1. Created Post-Build Script
**File**: `scripts/postbuild.js`

Automatically runs after `npm run build` to:
- ✅ Copy `public/.htaccess` → `out/.htaccess`
- ✅ Copy `out/en.html` → `out/index.html` (English home page)
- ✅ Verify files were copied successfully
- ✅ Display file sizes and status

### 2. Updated package.json
**Added**: `postbuild` script that runs automatically after `build`

```json
{
  "scripts": {
    "build": "next build",
    "postbuild": "node scripts/postbuild.js"
  }
}
```

The `postbuild` script is a special npm lifecycle hook that runs automatically after `npm run build` completes.

## How It Works

### Build Flow

```
npm run build
    ↓
1. Next.js builds the site → out/ folder
    ↓
2. postbuild script runs automatically
    ↓
3. Copies public/.htaccess → out/.htaccess
    ↓
4. Copies out/en.html → out/index.html
    ↓
5. Verifies and reports success
    ↓
✅ Build complete with .htaccess included
```

### Build Output

```bash
$ npm run build

# Next.js build output...
✓ Compiled successfully
✓ Generating static pages (7/7)
✓ Finalizing page optimization

# Post-build script output
🔧 Running post-build tasks...

✅ Apache .htaccess: 7.2 KB
✅ English home page (index.html): 54.7 KB

==================================================
✅ Success: 2/2 tasks completed
==================================================

🎉 Post-build tasks completed successfully!
```

## Files Involved

### Source Files
- `public/.htaccess` - Source Apache configuration (7.2 KB)
- `scripts/postbuild.js` - Post-build automation script

### Generated Files (after build)
- `out/.htaccess` - Copied from `public/.htaccess`
- `out/index.html` - Copied from `out/en.html`

## Verification

### Manual Verification

After running `npm run build`, verify:

```bash
# Check .htaccess exists
ls -lh out/.htaccess
# Output: -rw-r--r-- 7.2K out/.htaccess

# Check index.html exists
ls -lh out/index.html
# Output: -rw-r--r-- 55K out/index.html

# Verify .htaccess content
head -5 out/.htaccess
# Output: # .htaccess for AGS Webpage...
```

### Automated Verification

Run the verification script:

```bash
./verify-deployment.sh
```

Expected output:
```
✅ out/.htaccess (8.0K)
✅ out/index.html (56K)
✅ mod_rewrite enabled
✅ Custom 404 page configured
✅ Gzip compression configured
```

## Benefits

### Before (Manual Process)
❌ Had to manually copy `.htaccess` after each build
❌ Easy to forget, leading to deployment issues
❌ Had to manually copy `en.html` to `index.html`
❌ Error-prone and time-consuming

### After (Automated Process)
✅ `.htaccess` automatically included in every build
✅ `index.html` automatically created
✅ No manual steps required
✅ Consistent and reliable
✅ Verified with status messages

## Usage

### Standard Build
```bash
npm run build
```

This will:
1. Build the Next.js site
2. Automatically run postbuild script
3. Copy `.htaccess` and create `index.html`
4. Display success confirmation

### Build with Analysis
```bash
npm run analyze
```

This will:
1. Build with bundle analyzer enabled
2. Automatically run postbuild script
3. Open bundle analysis in browser

### Development
```bash
npm run dev
```

The postbuild script does NOT run during development (only after production builds).

## Troubleshooting

### Issue: .htaccess not copied

**Symptom**: `out/.htaccess` doesn't exist after build

**Solution**:
1. Verify `public/.htaccess` exists:
   ```bash
   ls -la public/.htaccess
   ```

2. Run build again:
   ```bash
   npm run build
   ```

3. Check postbuild output for errors

### Issue: Postbuild script fails

**Symptom**: Error message during build

**Solution**:
1. Check Node.js version (should be 18+):
   ```bash
   node --version
   ```

2. Verify script permissions:
   ```bash
   chmod +x scripts/postbuild.js
   ```

3. Run script manually to see detailed error:
   ```bash
   node scripts/postbuild.js
   ```

### Issue: Build succeeds but files missing

**Symptom**: Build completes but `.htaccess` not in `out/`

**Solution**:
1. Check if `out/` folder exists:
   ```bash
   ls -la out/
   ```

2. Verify postbuild script ran (check build output)

3. Run verification script:
   ```bash
   ./verify-deployment.sh
   ```

## Deployment Workflow

### Complete Deployment Process

1. **Make changes to your code**
   ```bash
   # Edit files, add features, etc.
   ```

2. **Build the site**
   ```bash
   npm run build
   ```
   - Next.js builds the site
   - Postbuild script runs automatically
   - `.htaccess` and `index.html` copied

3. **Verify build**
   ```bash
   ./verify-deployment.sh
   ```
   - Confirms all files present
   - Validates `.htaccess` configuration

4. **Upload to cPanel**
   - Upload entire `out/` folder to `public_html`
   - `.htaccess` is automatically included
   - No manual copying needed

5. **Test deployment**
   - Visit your domain
   - Test all routes
   - Verify 404 page works

## Configuration

### Customizing Post-Build Tasks

To add more post-build tasks, edit `scripts/postbuild.js`:

```javascript
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
  // Add more tasks here
  {
    name: 'Custom file',
    source: path.join(__dirname, '..', 'public', 'custom.txt'),
    dest: path.join(__dirname, '..', 'out', 'custom.txt'),
  },
];
```

### Disabling Post-Build Script

If you need to disable the postbuild script temporarily:

```bash
# Build without postbuild
npm run build --ignore-scripts
```

Or remove the `postbuild` entry from `package.json` scripts.

## Testing

### Local Testing

After building, test locally:

```bash
# Build the site
npm run build

# Serve locally
cd out && python3 -m http.server 8080

# Test in browser
# http://localhost:8080
# http://localhost:8080/about
# http://localhost:8080/es
```

### Verify .htaccess Rules

The `.htaccess` file won't work with Python's simple HTTP server (it's Apache-specific), but you can verify:

1. File exists: `ls -la out/.htaccess`
2. Content is correct: `cat out/.htaccess`
3. Size is correct: ~7.2 KB

To test `.htaccess` rules, you need:
- Apache server (XAMPP, MAMP, or actual hosting)
- Or deploy to cPanel and test there

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build site
        run: npm run build
        # Postbuild script runs automatically
      
      - name: Verify build
        run: |
          ls -la out/.htaccess
          ls -la out/index.html
          ./verify-deployment.sh
      
      - name: Deploy to cPanel
        # Add your deployment step here
```

## Maintenance

### Regular Checks

**After each build**:
- ✅ Verify postbuild script output
- ✅ Check `.htaccess` exists in `out/`
- ✅ Run verification script

**Before deployment**:
- ✅ Test build locally
- ✅ Verify all routes work
- ✅ Check file sizes are reasonable

**After deployment**:
- ✅ Test live site
- ✅ Verify `.htaccess` rules work
- ✅ Check 404 page displays

### Updating .htaccess

To update the `.htaccess` configuration:

1. Edit `public/.htaccess`
2. Run `npm run build`
3. Postbuild script automatically copies to `out/.htaccess`
4. Deploy updated `out/` folder

## Summary

### What's Automated
✅ `.htaccess` copy from `public/` to `out/`
✅ `index.html` creation from `en.html`
✅ File verification and status reporting
✅ Runs automatically after every build

### What's Manual
⏳ Uploading `out/` folder to cPanel
⏳ Testing deployed site
⏳ Monitoring and maintenance

### Build Commands
```bash
npm run build          # Build + postbuild (automatic)
npm run analyze        # Build + analyze + postbuild
npm run dev            # Development (no postbuild)
./verify-deployment.sh # Verify build output
```

## Status: ✅ Complete

The build process is now fully automated:
- ✅ Post-build script created
- ✅ package.json updated
- ✅ Automatic `.htaccess` copy
- ✅ Automatic `index.html` creation
- ✅ Verification script available
- ✅ Tested and working

**Next step**: Run `npm run build` and upload `out/` folder to cPanel!

---

**Last Updated**: February 2, 2026
**Script Version**: 1.0.0
**Status**: Production Ready ✅
