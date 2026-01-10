# Quick Start Guide: Deploy to Google Play Store

## Overview
This guide will help you deploy the 365 Days Calendar app to the Google Play Store using the simplest method.

## Prerequisites Checklist

- [ ] Google Play Console account ($25 one-time fee)
- [ ] Hosted PWA (live URL)
- [ ] App icons (all sizes)
- [ ] 2+ screenshots
- [ ] Privacy policy URL
- [ ] Feature graphic (1024x500px)

## Step-by-Step Deployment

### Phase 1: Host Your PWA (Choose One)

#### Easiest: Netlify
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up
3. Click "Add new site" → "Import from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy"
8. Copy your live URL (e.g., `https://your-app.netlify.app`)

#### Alternative: Vercel
```bash
npm i -g vercel
cd calendar-app-mobile
vercel
```
Follow prompts and copy the live URL.

### Phase 2: Generate Android APK

#### Method A: PWABuilder (Easiest - No coding required)

1. **Go to** [pwabuilder.com](https://www.pwabuilder.com/)

2. **Enter your PWA URL** (from Phase 1)

3. **Click "Start"** - It will analyze your PWA

4. **Click "Package for stores"**

5. **Select Android Options**:
   - Package ID: `com.yourname.days365calendar`
   - App name: `365 Days Calendar`
   - Launcher name: `365 Days`
   - Version: `1.0.0`
   - Version code: `1`

6. **Add Signing Key**:
   - Click "Generate key" (save this file securely!)
   - Or upload existing keystore if you have one

7. **Download** the generated APK/AAB file

#### Method B: Bubblewrap CLI (More control)

```bash
# Install Bubblewrap
npm install -g @bubblewrap/cli

# Initialize project
bubblewrap init --manifest https://your-app.netlify.app/manifest.json

# Answer prompts:
# - Application name: 365 Days Calendar
# - Package ID: com.yourname.days365calendar
# - Host: your-app.netlify.app
# - Start URL: /

# Build APK
bubblewrap build

# Your APK will be in: ./app-release-signed.apk
```

### Phase 3: Prepare Play Store Assets

#### 1. App Icons (Required)
Already created in `public/icons/`. Make sure you have:
- icon-512.png (main icon)

#### 2. Screenshots (Minimum 2 required)
Capture on device or use Chrome DevTools:

```
Chrome DevTools → Toggle Device Toolbar → Select "Pixel 5"
1. Month view with notes indicator
2. Year view overview
3. Note editing modal
4. Settings/navigation
```

Save as:
- `screenshot-1.png` (1080x1920)
- `screenshot-2.png` (1080x1920)
- etc.

#### 3. Feature Graphic (Required)
Create 1024x500px image:
- Use Canva, Figma, or Photoshop
- Show app name and key feature
- Save as `feature-graphic.png`

#### 4. Privacy Policy (Required)
Create a simple HTML page:

```html
<!DOCTYPE html>
<html>
<head>
    <title>365 Days Calendar - Privacy Policy</title>
</head>
<body>
    <h1>Privacy Policy for 365 Days Calendar</h1>
    <p>Last updated: January 2026</p>
    
    <h2>Data Collection</h2>
    <p>365 Days Calendar does not collect, transmit, or share any personal data. All notes and calendar entries are stored locally on your device using browser storage (localStorage).</p>
    
    <h2>Data Storage</h2>
    <p>Your data remains on your device and is never transmitted to external servers.</p>
    
    <h2>Third-Party Services</h2>
    <p>This app does not use any third-party services or analytics.</p>
    
    <h2>Contact</h2>
    <p>For questions, contact: your-email@example.com</p>
</body>
</html>
```

Upload this to your hosting and get the URL.

### Phase 4: Create Play Store Listing

1. **Go to** [play.google.com/console](https://play.google.com/console)

2. **Create Application**:
   - Click "Create app"
   - App name: `365 Days Calendar`
   - Default language: English (United States)
   - App or game: App
   - Free or paid: Free
   - Accept declarations

3. **Set up App**:

   **Store Presence → Main store listing**:
   - Short description: "Track your year day by day"
   - Full description:
   ```
   365 Days Calendar helps you track your entire year with a unique day-numbering system (1-365).
   
   FEATURES:
   • View dates as day numbers (1-365)
   • Add personal notes for any day
   • Month and year views
   • Beautiful dark theme
   • Works offline
   • All data stored locally
   
   Perfect for journaling, habit tracking, and year planning.
   ```
   - App icon: Upload `icon-512.png`
   - Feature graphic: Upload `feature-graphic.png`
   - Screenshots: Upload at least 2 screenshots

   **Store Presence → App category**:
   - Category: Productivity
   - Tags: Add relevant tags (calendar, planner, journal)

   **Store Presence → Contact details**:
   - Email: your-email@example.com
   - Phone: Optional
   - Website: Your PWA URL

   **Store Presence → Privacy policy**:
   - URL: Your privacy policy URL

4. **App Content**:
   
   **Privacy Policy**: Already added above
   
   **App access**: Select "All functionality is available without restrictions"
   
   **Ads**: Select "No, my app does not contain ads"
   
   **Content ratings**:
   - Start questionnaire
   - App category: Utility, Productivity, Communication, or Other
   - Answer questions (should all be "No" for this app)
   - Get rating (should be Everyone)
   
   **Target audience**:
   - Age groups: 13+
   - Appeal to children: No
   
   **News app**: No
   
   **COVID-19 contact tracing**: No
   
   **Data safety**:
   - Click "Start"
   - Does your app collect or share user data? → No
   - Submit

5. **Release → Production**:
   
   **Countries/Regions**: Select all or specific countries
   
   **Create new release**:
   - Upload your APK/AAB file
   - Release name: `1.0.0` (matches your app)
   - Release notes:
   ```
   Initial release:
   - 365-day calendar view
   - Daily notes
   - Month and year views
   - Offline support
   ```

6. **Review and Rollout**:
   - Review all sections (they should all have checkmarks)
   - Click "Start rollout to Production"
   - Confirm

### Phase 5: Wait for Review

- Google typically reviews apps within 1-7 days
- You'll receive email updates on review status
- If rejected, they'll provide reasons and you can resubmit

## Post-Launch

### Monitor
- Check crash reports in Play Console
- Read user reviews
- Monitor installations

### Updates
When you need to update:

1. Make changes to your code
2. Increment version in `manifest.json` and build config
3. Build new APK with increased version code
4. Upload to Play Console → Create new release
5. Submit for review

## Troubleshooting

### APK Upload Fails
- Ensure version code is higher than previous
- Check minimum SDK version (should be 21+)
- Verify APK is signed properly

### PWA Issues
- Test manifest at: Chrome DevTools → Application → Manifest
- Verify all icons are accessible
- Check service worker registration

### Review Rejection
Common reasons:
- Missing privacy policy
- Insufficient screenshots
- Broken functionality
- Missing content rating

## Resources

- [Google Play Console](https://play.google.com/console)
- [PWABuilder](https://www.pwabuilder.com/)
- [Bubblewrap Docs](https://github.com/GoogleChromeLabs/bubblewrap)
- [Play Store Guidelines](https://support.google.com/googleplay/android-developer/answer/9859455)

## Need Help?

Common issues:
1. **Can't access manifest**: Deploy your PWA first
2. **APK signing errors**: Use PWABuilder's auto-sign feature
3. **Review stuck**: Usually takes 1-7 days, be patient
4. **Missing requirements**: Check Play Console dashboard for incomplete items

Good luck with your app launch! 🚀
