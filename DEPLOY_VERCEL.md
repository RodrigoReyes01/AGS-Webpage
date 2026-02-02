# Deploy to Vercel

## Quick Deploy

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? ags-webpage (or your choice)
# - Directory? ./ (current directory)
# - Override settings? No

# Deploy to production
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect Next.js
5. Click "Deploy"

## Configuration

The `vercel.json` file is already configured with:
- ✅ Clean URLs (`/about` instead of `/about.html`)
- ✅ Proper rewrites for static export
- ✅ Security headers
- ✅ Caching headers
- ✅ Service worker support

## What Vercel Does Automatically

- ✅ Runs `npm run build`
- ✅ Serves files from `out/` directory
- ✅ Handles clean URLs (no `.html` needed)
- ✅ Provides HTTPS automatically
- ✅ Global CDN distribution
- ✅ Automatic deployments on git push

## Testing on Vercel

After deployment, test:
1. Visit your Vercel URL (e.g., `https://ags-webpage.vercel.app`)
2. Click Spanish flag 🇪🇸 - text should change instantly
3. Click "About Us" - should navigate to `/about` (clean URL)
4. Language should persist on About page
5. Click English flag 🇺🇸 - text should change back
6. Refresh page - language preference should be remembered

## Custom Domain

To use your custom domain:
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add `aviationgroundsolutions.com`
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificate

## Environment Variables

No environment variables needed for this static site!

## Build Settings

Vercel auto-detects these from `vercel.json`:
- **Build Command**: `npm run build`
- **Output Directory**: `out`
- **Install Command**: `npm install`

## Advantages of Vercel

✅ **Automatic deployments** - Push to git, auto-deploys
✅ **Preview deployments** - Every PR gets a preview URL
✅ **Global CDN** - Fast loading worldwide
✅ **Free SSL** - HTTPS automatically
✅ **Zero configuration** - Works out of the box
✅ **Clean URLs** - No `.html` extensions needed

## Vercel vs cPanel

| Feature | Vercel | cPanel |
|---------|--------|--------|
| Clean URLs | ✅ Automatic | ⚠️ Needs `.htaccess` |
| HTTPS | ✅ Free & automatic | ⚠️ Manual setup |
| CDN | ✅ Global | ❌ Single server |
| Deployments | ✅ Git push | ⚠️ Manual FTP |
| Preview URLs | ✅ Yes | ❌ No |
| Cost | ✅ Free tier | 💰 Paid hosting |

## Troubleshooting

### Build fails?
- Check `npm run build` works locally
- Verify `package.json` has all dependencies
- Check Node.js version (Vercel uses latest LTS)

### Pages not loading?
- Verify `out/` directory has `index.html` and `about.html`
- Check Vercel build logs for errors
- Ensure `vercel.json` is in root directory

### Language switching not working?
- Check browser console for JavaScript errors
- Verify localStorage is enabled
- Try in incognito mode to test fresh state

## Deployment Checklist

Before deploying:
- [ ] Run `npm run build` locally - should succeed
- [ ] Test `out/` folder locally with Python server
- [ ] Verify language switching works
- [ ] Check all images load
- [ ] Test on mobile viewport
- [ ] Commit all changes to git
- [ ] Push to GitHub/GitLab/Bitbucket

## Next Steps

1. **Deploy to Vercel** - Test the live site
2. **Share preview URL** - Get feedback
3. **Add custom domain** - Point to Vercel
4. **Monitor performance** - Use Vercel Analytics

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Next.js Static Export: https://nextjs.org/docs/app/building-your-application/deploying/static-exports

---

**Ready to deploy!** 🚀

Run `vercel` in your terminal or connect your Git repository to Vercel Dashboard.
