// AdMob Bridge for Android WebView Communication
// This allows your PWA to communicate with the Android wrapper's AdMob implementation

/**
 * Check if the app is running inside an Android WebView with AdMob support
 * @returns {boolean} True if running in Android app with AdMob bridge
 */
export const isAndroidApp = () => {
  return typeof window.AndroidAdMob !== 'undefined';
};

/**
 * Show banner ad at the bottom of the screen
 * Only works when running in Android app
 */
export const showBannerAd = () => {
  if (isAndroidApp()) {
    try {
      window.AndroidAdMob.showBanner();
      console.log('AdMob: Banner ad requested');
    } catch (error) {
      console.error('AdMob: Error showing banner', error);
    }
  } else {
    console.log('AdMob: Not running in Android app, banner not shown');
  }
};

/**
 * Hide banner ad
 * Only works when running in Android app
 */
export const hideBannerAd = () => {
  if (isAndroidApp()) {
    try {
      window.AndroidAdMob.hideBanner();
      console.log('AdMob: Banner ad hidden');
    } catch (error) {
      console.error('AdMob: Error hiding banner', error);
    }
  }
};

/**
 * Show interstitial ad (full screen)
 * Only works when running in Android app
 * Use sparingly - typically on app launch or between major actions
 */
export const showInterstitialAd = () => {
  if (isAndroidApp()) {
    try {
      window.AndroidAdMob.showInterstitial();
      console.log('AdMob: Interstitial ad requested');
    } catch (error) {
      console.error('AdMob: Error showing interstitial', error);
    }
  } else {
    console.log('AdMob: Not running in Android app, interstitial not shown');
  }
};

/**
 * Load interstitial ad in advance
 * Call this before you want to show it for better UX
 */
export const loadInterstitialAd = () => {
  if (isAndroidApp() && typeof window.AndroidAdMob.loadInterstitial === 'function') {
    try {
      window.AndroidAdMob.loadInterstitial();
      console.log('AdMob: Interstitial ad preloaded');
    } catch (error) {
      console.error('AdMob: Error loading interstitial', error);
    }
  }
};

/**
 * Check if running in web browser (not Android app)
 * @returns {boolean} True if running in web browser
 */
export const isWebBrowser = () => {
  return !isAndroidApp();
};

// Export all functions as default object
export default {
  isAndroidApp,
  isWebBrowser,
  showBannerAd,
  hideBannerAd,
  showInterstitialAd,
  loadInterstitialAd
};
