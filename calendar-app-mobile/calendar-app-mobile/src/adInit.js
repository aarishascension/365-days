// Initialize AdSense ads
export const initAds = () => {
  try {
    // Push ads to adsbygoogle array
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {
    console.error('AdSense error:', e);
  }
};
