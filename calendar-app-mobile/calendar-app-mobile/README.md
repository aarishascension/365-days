# 365 Days Calendar - Mobile App

A beautiful, minimalist calendar app that displays dates in 1-365 format with daily notes functionality.

## Features

- **365-Day Format**: View dates as day numbers (1-365) with traditional date reference
- **Month & Year Views**: Switch between detailed month view and compact year overview
- **Daily Notes**: Add and edit notes for any day with persistent storage
- **Mobile Optimized**: Touch-friendly interface with smooth animations
- **Offline Support**: Works completely offline with localStorage
- **Progressive Web App**: Installable on Android devices
- **Dark Theme**: Eye-friendly dark mode with vibrant accent colors

## Tech Stack

- React 18
- Vite (build tool)
- LocalStorage for data persistence
- PWA capabilities

## Development Setup

### Prerequisites

- Node.js 16+ and npm
- Git

### Installation

```bash
# Clone the repository
cd calendar-app-mobile

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` directory.

## Deploy to Play Store

There are several ways to deploy this PWA to the Google Play Store:

### Option 1: Using Trusted Web Activity (TWA) - Recommended

TWA allows you to wrap your PWA in a native Android app.

1. **Install Bubblewrap CLI**:
```bash
npm install -g @bubblewrap/cli
```

2. **Initialize Bubblewrap**:
```bash
bubblewrap init --manifest=https://your-domain.com/manifest.json
```

3. **Build Android APK**:
```bash
bubblewrap build
```

4. **Sign the APK** (you'll need a keystore):
```bash
# Generate keystore if you don't have one
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Sign the APK
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore my-release-key.keystore app-release-unsigned.apk my-key-alias
```

5. **Upload to Play Console**: Upload the signed APK to Google Play Console

### Option 2: Using PWABuilder

1. Visit [PWABuilder.com](https://www.pwabuilder.com/)
2. Enter your PWA URL: `https://your-domain.com`
3. Click "Package for Stores"
4. Select "Android" and configure options
5. Download the generated APK/AAB
6. Upload to Play Console

### Option 3: Using Capacitor

1. **Install Capacitor**:
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init
```

2. **Add Android Platform**:
```bash
npx cap add android
```

3. **Build and Sync**:
```bash
npm run build
npx cap sync
npx cap open android
```

4. **Build APK in Android Studio**:
   - Open the project in Android Studio
   - Build → Generate Signed Bundle/APK
   - Follow the wizard to create a signed release build

## Hosting the PWA

Before deploying to Play Store, you need to host your PWA:

### Option A: Netlify (Recommended for beginners)

1. Create account at [netlify.com](https://netlify.com)
2. Connect your Git repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

### Option B: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

### Option C: Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## App Icons

You'll need to create app icons in multiple sizes. Place them in `public/icons/`:

Required sizes:
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

Use tools like:
- [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

## Play Store Requirements

### 1. Privacy Policy
Create a privacy policy (required by Google). Host it on your website.

Example: "This app stores data locally on your device. No data is collected or transmitted to external servers."

### 2. App Listing Details

- **Title**: 365 Days Calendar
- **Short Description**: Track your year day by day
- **Full Description**: 
```
365 Days Calendar helps you track your entire year with a unique day-numbering system (1-365). 

Features:
• View dates as day numbers with traditional date reference
• Add personal notes for any day
• Switch between month and year views
• Beautiful dark theme design
• Works completely offline
• All data stored locally on your device

Perfect for:
- Daily journaling
- Habit tracking
- Goal planning
- Year-at-a-glance overview
```

- **Category**: Productivity
- **Content Rating**: Everyone
- **Target Age Group**: 13+

### 3. Screenshots

Capture screenshots (minimum 2, maximum 8):
- Use actual device or emulator
- Show key features: month view, year view, note-taking
- Recommended resolution: 1080x1920 (portrait)

### 4. Feature Graphic

Create a 1024x500px feature graphic for the Play Store listing.

## Configuration Files

### Update manifest.json

Edit `public/manifest.json` with your details:
```json
{
  "name": "365 Days Calendar",
  "short_name": "365 Days",
  "start_url": "/?source=pwa",
  "display": "standalone",
  "background_color": "#0a0e1a",
  "theme_color": "#ff6b35"
}
```

### Update index.html

Add meta tags for better SEO and social sharing:
```html
<meta name="description" content="Track your year day by day with 365 Days Calendar">
<meta property="og:title" content="365 Days Calendar">
<meta property="og:description" content="Beautiful day-numbering calendar with notes">
<meta property="og:image" content="/og-image.png">
```

## Testing

### Test PWA locally:
1. Run `npm run build && npm run preview`
2. Open in Chrome
3. Open DevTools → Application → Manifest
4. Check for any issues

### Test on Android device:
1. Deploy to hosting
2. Open URL on Android Chrome
3. Test "Add to Home Screen"
4. Test offline functionality
5. Test note-taking and persistence

## Support

For issues and questions:
- Create an issue on GitHub
- Email: support@yourapp.com

## License

[Your chosen license]

## Credits

Built with React and Vite
Design inspired by modern minimalism
