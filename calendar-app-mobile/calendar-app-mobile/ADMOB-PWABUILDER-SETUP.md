# AdMob Integration with PWABuilder - Complete Guide

## Overview

This guide shows how to integrate Google AdMob ads into your PWA when packaging it as an Android app using PWABuilder.

## Prerequisites

1. ✅ Your PWA is deployed and accessible (e.g., on Netlify)
2. ✅ Google AdMob account (separate from AdSense)
3. ✅ Basic understanding of Android app development

---

## Step 1: Create Google AdMob Account

1. Go to https://admob.google.com/
2. Sign in with your Google account
3. Click **"Get Started"**
4. Complete the setup:
   - Add your app information
   - Accept terms and conditions
   - Set up payment information

---

## Step 2: Register Your App in AdMob

1. In AdMob dashboard, click **"Apps"** → **"Add App"**
2. Choose **"No"** for "Is your app listed on a supported app store?"
3. Enter app details:
   - **App name**: 365 Days Calendar
   - **Platform**: Android
   - **App store URL**: (leave blank for now)
4. Click **"Add"**
5. **Save your App ID** (format: `ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX`)

---

## Step 3: Create Ad Units

### Banner Ad (Bottom of screen)

1. In your app's page, click **"Ad units"** → **"Get started"**
2. Select **"Banner"**
3. Configure:
   - **Ad unit name**: "365 Calendar Banner"
   - **Ad format**: Banner (320x50)
4. Click **"Create ad unit"**
5. **Save your Ad Unit ID** (format: `ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX`)

### Optional: Interstitial Ad (Full screen)

1. Click **"Add ad unit"** → **"Interstitial"**
2. Configure:
   - **Ad unit name**: "365 Calendar Interstitial"
3. Click **"Create ad unit"**
4. **Save the Ad Unit ID**

---

## Step 4: Generate Android Package with PWABuilder

### Method A: Using PWABuilder Website (Recommended)

1. Go to https://www.pwabuilder.com/
2. Enter your PWA URL: `https://taupe-piroshki-101c1e.netlify.app`
3. Click **"Start"**
4. Click **"Package For Stores"**
5. Select **"Android"**
6. Click **"Options"** to configure:

   **Package Options:**
   - **Package ID**: `com.calendar365days.app` (or your choice)
   - **App name**: 365 Days Calendar
   - **Launcher name**: 365 Days
   - **Version**: 1.0.0
   - **Version code**: 1
   - **Host**: taupe-piroshki-101c1e.netlify.app
   - **Start URL**: /

   **Advanced Options:**
   - **Signing key**: Generate new (or upload existing)
   - **Display mode**: Standalone
   - **Orientation**: Portrait

7. **Important**: Look for **"Monetization"** or **"AdMob"** section
   - If available, enter your **AdMob App ID**
   - Enter your **Banner Ad Unit ID**
   - Enable banner ads

8. Click **"Generate"**
9. Download the `.apk` or `.aab` file

### Method B: Using Bubblewrap CLI (Advanced)

If PWABuilder doesn't have AdMob UI, use Bubblewrap directly:

```bash
# Install Bubblewrap
npm install -g @bubblewrap/cli

# Initialize project
bubblewrap init --manifest https://taupe-piroshki-101c1e.netlify.app/manifest.json

# Edit twa-manifest.json to add AdMob
```

Edit `twa-manifest.json`:
```json
{
  "packageId": "com.calendar365days.app",
  "host": "taupe-piroshki-101c1e.netlify.app",
  "name": "365 Days Calendar",
  "launcherName": "365 Days",
  "display": "standalone",
  "themeColor": "#0a0e1a",
  "backgroundColor": "#0a0e1a",
  "startUrl": "/",
  "iconUrl": "https://taupe-piroshki-101c1e.netlify.app/icons/icon-512.png",
  "maskableIconUrl": "https://taupe-piroshki-101c1e.netlify.app/icons/android/android-launchericon-512-512.png",
  "monoIconUrl": "https://taupe-piroshki-101c1e.netlify.app/icons/icon-512.png",
  "splashScreenFadeOutDuration": 300,
  "enableNotifications": false,
  "enableSiteSettingsShortcut": true,
  "orientation": "portrait",
  "navigationColor": "#0a0e1a",
  "navigationColorDark": "#0a0e1a",
  "navigationDividerColor": "#0a0e1a",
  "navigationDividerColorDark": "#0a0e1a",
  "shareTarget": {},
  "shortcuts": [],
  "additionalTrustedOrigins": [],
  "retainedBundles": [],
  "appVersionName": "1.0.0",
  "appVersionCode": 1,
  "signingKey": {
    "path": "./android.keystore",
    "alias": "android"
  },
  "features": {
    "locationDelegation": {
      "enabled": false
    },
    "playBilling": {
      "enabled": false
    }
  },
  "alphaDependencies": {
    "enabled": false
  },
  "webManifestUrl": "https://taupe-piroshki-101c1e.netlify.app/manifest.json",
  "fallbackType": "customtabs",
  "enableAdMob": true,
  "adMobAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX",
  "adMobBannerAdUnitId": "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX"
}
```

Build the app:
```bash
bubblewrap build
```

---

## Step 5: Modify Android Manifest (If Needed)

If you need to manually add AdMob to the Android manifest:

1. Extract the generated APK/AAB
2. Edit `AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.calendar365days.app">

    <!-- AdMob Permissions -->
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    <uses-permission android:name="com.google.android.gms.permission.AD_ID"/>

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/Theme.App">

        <!-- AdMob App ID -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"/>

        <!-- Your activities -->
        <activity android:name=".MainActivity">
            <!-- ... -->
        </activity>
    </application>
</manifest>
```

---

## Step 6: Add AdMob SDK Dependencies

If building with Android Studio, add to `build.gradle`:

```gradle
dependencies {
    implementation 'com.google.android.gms:play-services-ads:22.6.0'
    // ... other dependencies
}
```

---

## Step 7: Inject Banner Ad via JavaScript Bridge

Create a JavaScript interface to communicate with Android:

**In your web app** (`src/admobBridge.js`):

```javascript
// Check if running in Android WebView with AdMob support
export const isAndroidApp = () => {
  return typeof window.AndroidAdMob !== 'undefined';
};

// Show banner ad
export const showBannerAd = () => {
  if (isAndroidApp()) {
    window.AndroidAdMob.showBanner();
  }
};

// Hide banner ad
export const hideBannerAd = () => {
  if (isAndroidApp()) {
    window.AndroidAdMob.hideBanner();
  }
};

// Show interstitial ad
export const showInterstitialAd = () => {
  if (isAndroidApp()) {
    window.AndroidAdMob.showInterstitial();
  }
};
```

**Use in your app** (`src/App.jsx`):

```javascript
import { useEffect } from 'react';
import { isAndroidApp, showBannerAd } from './admobBridge';

function App() {
  useEffect(() => {
    // Show banner ad when app loads (Android only)
    if (isAndroidApp()) {
      showBannerAd();
    }
  }, []);

  // ... rest of your app
}
```

---

## Step 8: Test Your App

### Test with Test Ads

Use AdMob test IDs during development:

- **Test App ID**: `ca-app-pub-3940256099942544~3347511713`
- **Test Banner ID**: `ca-app-pub-3940256099942544/6300978111`
- **Test Interstitial ID**: `ca-app-pub-3940256099942544/1033173712`

### Testing Steps

1. Install the APK on a physical Android device
2. Open the app
3. Check if banner ad appears at the bottom
4. Check Android Logcat for AdMob logs:
   ```bash
   adb logcat | grep -i "admob\|ads"
   ```

---

## Step 9: Upload to Google Play

1. Go to https://play.google.com/console
2. Create a new app
3. Upload your signed AAB file
4. Complete store listing
5. Set up content rating
6. Set up pricing & distribution
7. **Important**: In the app content section:
   - Answer **"Yes"** to "Does your app use advertising ID?"
   - Declare that you use AdMob for advertising

---

## Step 10: Update Privacy Policy

Your privacy policy must mention AdMob. Already updated at `/privacy-policy.html`.

Key points to include:
- ✅ App displays ads via Google AdMob
- ✅ Google may collect device info and advertising ID
- ✅ Link to Google's privacy policy
- ✅ Option to opt-out of personalized ads

---

## Troubleshooting

### Ads Not Showing?

1. **Check AdMob account status** - Must be approved
2. **Wait 24-48 hours** - New ad units take time to activate
3. **Use test ads first** - Verify integration works
4. **Check Logcat** - Look for error messages
5. **Verify App ID** - Must match exactly in manifest
6. **Check internet permission** - Must be in manifest

### Common Errors

**"Ad failed to load: 3"**
- No ad inventory available
- Use test ads to verify setup
- Wait for ad units to activate

**"Ad failed to load: 0"**
- Network error
- Check internet connection
- Verify permissions

**"Invalid AdMob App ID"**
- Double-check your App ID
- Format: `ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX`
- Must include the `~` character

---

## Alternative: Simpler Approach

If PWABuilder's AdMob integration is too complex, consider:

### Option 1: Launch Without Ads
- Get users first
- Add monetization later
- Focus on app quality

### Option 2: Use In-App Purchases
- Offer premium features
- No ads needed
- Better user experience

### Option 3: Subscription Model
- Monthly/yearly subscription
- Remove ads for subscribers
- Recurring revenue

---

## Revenue Expectations

**Typical AdMob CPM (Cost Per 1000 impressions):**
- Banner ads: $0.50 - $2.00
- Interstitial ads: $2.00 - $10.00
- Rewarded ads: $5.00 - $20.00

**Example:**
- 1,000 daily active users
- 5 ad impressions per user per day
- $1 CPM average
- = $5/day = $150/month

---

## Important Notes

⚠️ **Do NOT click your own ads** - Violates AdMob policy and can get you banned

⚠️ **Test with test IDs** - Always use test ad units during development

⚠️ **Privacy compliance** - Must have privacy policy and comply with GDPR/CCPA

⚠️ **Ad placement** - Don't place ads too close to buttons (accidental clicks)

---

## Support Resources

- AdMob Help: https://support.google.com/admob
- PWABuilder Docs: https://docs.pwabuilder.com/
- Bubblewrap GitHub: https://github.com/GoogleChromeLabs/bubblewrap
- AdMob Policy: https://support.google.com/admob/answer/6128543

---

## Summary

1. ✅ Create AdMob account and register app
2. ✅ Create ad units (banner, interstitial)
3. ✅ Use PWABuilder with AdMob options
4. ✅ Or use Bubblewrap CLI with custom config
5. ✅ Test with test ad IDs
6. ✅ Upload to Play Store
7. ✅ Declare advertising ID usage
8. ✅ Wait for approval and earnings!

Good luck with monetization! 🚀
