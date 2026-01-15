# Build Android App with AdMob in Android Studio

## Complete Step-by-Step Guide

---

## Step 1: Generate Base Package with PWABuilder

1. Go to **https://www.pwabuilder.com/**
2. Enter your URL: `https://taupe-piroshki-101c1e.netlify.app`
3. Click **"Start"** and wait for analysis
4. Click **"Package For Stores"**
5. Select **"Android"**
6. Click **"Options"** and configure:

   **Basic Settings:**
   - Package ID: `com.calendar365days.app`
   - App name: `365 Days Calendar`
   - Launcher name: `365 Days`
   - Version: `1.0.0`
   - Version code: `1`
   - Host: `taupe-piroshki-101c1e.netlify.app`
   - Start URL: `/`
   - Display: `Standalone`
   - Orientation: `Portrait`
   - Theme color: `#FF6B35`
   - Background color: `#0A0E1A`
   - Icon URL: `https://taupe-piroshki-101c1e.netlify.app/icons/android/android-launchericon-512-512.png`
   - Maskable icon: Same as above
   - Splash color: `#0A0E1A`

   **Signing:**
   - Select **"Generate new"** signing key
   - Download and save the key securely!

7. Click **"Generate"**
8. **IMPORTANT:** Select **"Download source code"** (not just APK)
9. Download the ZIP file

---

## Step 2: Install Android Studio

1. Download from: **https://developer.android.com/studio**
2. Install with default settings
3. Open Android Studio
4. Complete the setup wizard
5. Install Android SDK (API 33 or higher)

---

## Step 3: Extract and Open Project

1. Extract the downloaded ZIP file
2. You'll see a folder structure like:
   ```
   android-project/
   ├── app/
   ├── gradle/
   ├── build.gradle
   └── settings.gradle
   ```
3. Open Android Studio
4. Click **"Open"** (not "New Project")
5. Navigate to the extracted folder
6. Select the root folder and click **"OK"**
7. Wait for Gradle sync to complete (5-10 minutes first time)

---

## Step 4: Add AdMob SDK

### 4.1: Edit `app/build.gradle`

1. In Android Studio, open **`app/build.gradle`** (Module level)
2. Find the `dependencies` section
3. Add this line:

```gradle
dependencies {
    // Existing dependencies...
    implementation 'com.google.android.gms:play-services-ads:22.6.0'
}
```

4. Click **"Sync Now"** at the top

### 4.2: Edit `AndroidManifest.xml`

1. Open **`app/src/main/AndroidManifest.xml`**
2. Add permissions at the top (after `<manifest>` tag):

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.calendar365days.app">

    <!-- Add these permissions -->
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    <uses-permission android:name="com.google.android.gms.permission.AD_ID"/>

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/Theme.App">

        <!-- Add AdMob App ID -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-4344140632373860~7938321801"/>

        <!-- Your activities will be here -->
        
    </application>
</manifest>
```

---

## Step 5: Create AdMob Helper Class

1. In Android Studio, right-click on **`app/src/main/java/com/calendar365days/app/`**
2. Select **New → Java Class**
3. Name it: `AdMobHelper`
4. Paste this code:

```java
package com.calendar365days.app;

import android.app.Activity;
import android.util.Log;
import android.view.View;
import android.widget.FrameLayout;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import androidx.annotation.NonNull;

public class AdMobHelper {
    private static final String TAG = "AdMobHelper";
    private static final String BANNER_AD_UNIT_ID = "ca-app-pub-4344140632373860/2670304971";
    private static final String INTERSTITIAL_AD_UNIT_ID = "ca-app-pub-4344140632373860/8542802940";
    
    private Activity activity;
    private AdView bannerAdView;
    private InterstitialAd interstitialAd;
    
    public AdMobHelper(Activity activity) {
        this.activity = activity;
        initializeAdMob();
    }
    
    private void initializeAdMob() {
        MobileAds.initialize(activity, initializationStatus -> {
            Log.d(TAG, "AdMob initialized");
        });
    }
    
    public void showBannerAd(FrameLayout container) {
        bannerAdView = new AdView(activity);
        bannerAdView.setAdUnitId(BANNER_AD_UNIT_ID);
        bannerAdView.setAdSize(AdSize.BANNER);
        
        container.addView(bannerAdView);
        
        AdRequest adRequest = new AdRequest.Builder().build();
        bannerAdView.loadAd(adRequest);
        
        Log.d(TAG, "Banner ad loaded");
    }
    
    public void loadInterstitialAd() {
        AdRequest adRequest = new AdRequest.Builder().build();
        
        InterstitialAd.load(activity, INTERSTITIAL_AD_UNIT_ID, adRequest,
            new InterstitialAdLoadCallback() {
                @Override
                public void onAdLoaded(@NonNull InterstitialAd ad) {
                    interstitialAd = ad;
                    Log.d(TAG, "Interstitial ad loaded");
                }
            });
    }
    
    public void showInterstitialAd() {
        if (interstitialAd != null) {
            interstitialAd.show(activity);
            Log.d(TAG, "Interstitial ad shown");
            // Reload for next time
            loadInterstitialAd();
        } else {
            Log.d(TAG, "Interstitial ad not ready");
            loadInterstitialAd();
        }
    }
    
    public void hideBannerAd() {
        if (bannerAdView != null) {
            bannerAdView.setVisibility(View.GONE);
        }
    }
    
    public void destroy() {
        if (bannerAdView != null) {
            bannerAdView.destroy();
        }
    }
}
```

---

## Step 6: Integrate AdMob into MainActivity

1. Find your main activity file (usually `MainActivity.java` or `LauncherActivity.java`)
2. Add AdMob integration:

```java
package com.calendar365days.app;

import android.os.Bundle;
import android.webkit.WebView;
import android.widget.FrameLayout;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private AdMobHelper adMobHelper;
    private WebView webView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // Initialize AdMob
        adMobHelper = new AdMobHelper(this);
        
        // Find banner container (you may need to add this to your layout)
        FrameLayout bannerContainer = findViewById(R.id.banner_container);
        if (bannerContainer != null) {
            adMobHelper.showBannerAd(bannerContainer);
        }
        
        // Load interstitial for later
        adMobHelper.loadInterstitialAd();
        
        // Show interstitial after 3 seconds
        new android.os.Handler().postDelayed(() -> {
            adMobHelper.showInterstitialAd();
        }, 3000);
        
        // Your existing WebView setup...
        webView = findViewById(R.id.webview);
        // ... rest of your code
    }
    
    @Override
    protected void onDestroy() {
        if (adMobHelper != null) {
            adMobHelper.destroy();
        }
        super.onDestroy();
    }
}
```

---

## Step 7: Add Banner Container to Layout

1. Open **`app/src/main/res/layout/activity_main.xml`**
2. Add a FrameLayout for the banner ad:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <!-- Your existing WebView -->
    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_above="@+id/banner_container" />

    <!-- Banner Ad Container -->
    <FrameLayout
        android:id="@+id/banner_container"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:background="#0A0E1A" />

</RelativeLayout>
```

---

## Step 8: Build the App

### 8.1: Build APK (for testing)

1. In Android Studio, click **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Wait for build to complete
3. Click **"locate"** to find the APK
4. Install on your Android device to test

### 8.2: Build AAB (for Play Store)

1. Click **Build → Generate Signed Bundle / APK**
2. Select **"Android App Bundle"**
3. Click **"Next"**
4. **Key store path:** Browse to your keystore file (from PWABuilder)
5. Enter your keystore password
6. Enter your key alias: `android`
7. Enter your key password
8. Click **"Next"**
9. Select **"release"** build variant
10. Check both signature versions (V1 and V2)
11. Click **"Finish"**
12. Wait for build to complete
13. Find your AAB file in: `app/release/app-release.aab`

---

## Step 9: Test Your App

### Test on Physical Device:

1. Enable **Developer Options** on your Android phone:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
2. Enable **USB Debugging**:
   - Settings → Developer Options → USB Debugging
3. Connect phone to computer
4. In Android Studio, click **Run** (green play button)
5. Select your device
6. App will install and launch

### What to Test:

- ✅ App opens correctly
- ✅ Banner ad appears at bottom (may take 1-2 minutes)
- ✅ Interstitial ad shows after 3 seconds
- ✅ All app features work
- ✅ No crashes

---

## Step 10: Upload to Google Play Store

1. Go to **https://play.google.com/console**
2. Select your app (or create new)
3. Go to **Production → Create new release**
4. Upload your **`app-release.aab`** file
5. Add release notes
6. Click **"Review release"**
7. Submit for review

### Important Play Store Settings:

**App Content → Advertising ID:**
- Answer: **Yes**
- Reason: **Advertising or marketing**

**App Content → Ads:**
- Select: **Yes, my app contains ads**

**Privacy Policy:**
- URL: `https://taupe-piroshki-101c1e.netlify.app/privacy-policy.html`

---

## Troubleshooting

### Ads Not Showing?

1. **Wait 24-48 hours** - New ad units take time to activate
2. **Use test ads** during development:
   ```java
   // In AdMobHelper.java, replace with test IDs:
   private static final String BANNER_AD_UNIT_ID = "ca-app-pub-3940256099942544/6300978111";
   private static final String INTERSTITIAL_AD_UNIT_ID = "ca-app-pub-3940256099942544/1033173712";
   ```
3. **Check Logcat** for errors:
   - In Android Studio: View → Tool Windows → Logcat
   - Filter by "Ads" or "AdMob"

### Build Errors?

- **Gradle sync failed:** File → Invalidate Caches → Restart
- **SDK not found:** Tools → SDK Manager → Install Android SDK 33
- **Signing error:** Verify keystore path and passwords

### App Crashes?

- Check Logcat for error messages
- Verify all permissions are in manifest
- Test without ads first to isolate issue

---

## Your AdMob IDs (Reference)

```
App ID: ca-app-pub-4344140632373860~7938321801
Banner ID: ca-app-pub-4344140632373860/2670304971
Interstitial ID: ca-app-pub-4344140632373860/8542802940
```

---

## Summary Checklist

- ✅ Generate source code from PWABuilder
- ✅ Install Android Studio
- ✅ Open project in Android Studio
- ✅ Add AdMob SDK to build.gradle
- ✅ Add permissions to AndroidManifest.xml
- ✅ Add AdMob App ID to manifest
- ✅ Create AdMobHelper class
- ✅ Integrate into MainActivity
- ✅ Add banner container to layout
- ✅ Build and test APK
- ✅ Generate signed AAB
- ✅ Upload to Play Store
- ✅ Answer "Yes" to advertising ID
- ✅ Launch! 🚀

---

## Estimated Time

- Setup: 30 minutes
- Coding: 1 hour
- Testing: 30 minutes
- Building: 30 minutes
- **Total: 2-3 hours**

---

## Need Help?

- Android Studio Docs: https://developer.android.com/studio/intro
- AdMob Android Guide: https://developers.google.com/admob/android/quick-start
- Stack Overflow: Search for specific errors

Good luck with your launch! 🎉
