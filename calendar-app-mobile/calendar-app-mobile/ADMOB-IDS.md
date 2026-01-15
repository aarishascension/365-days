# AdMob Configuration IDs

## Your AdMob Account IDs

Use these IDs when configuring PWABuilder or Bubblewrap:

### App ID
```
ca-app-pub-4344140632373860~7938321801
```

### Banner Ad Unit ID
```
ca-app-pub-4344140632373860/2670304971
```

### Interstitial Ad Unit ID
```
ca-app-pub-4344140632373860/8542802940
```

---

## Test IDs (For Development)

Use these during development and testing:

### Test App ID
```
ca-app-pub-3940256099942544~3347511713
```

### Test Banner ID
```
ca-app-pub-3940256099942544/6300978111
```

### Test Interstitial ID
```
ca-app-pub-3940256099942544/1033173712
```

---

## PWABuilder Configuration

When generating your Android package with PWABuilder:

1. Go to https://www.pwabuilder.com/
2. Enter URL: `https://taupe-piroshki-101c1e.netlify.app`
3. Click "Package For Stores" → "Android" → "Options"
4. In the AdMob/Monetization section, enter:
   - **AdMob App ID**: `ca-app-pub-4344140632373860~7938321801`
   - **Banner Ad Unit ID**: `ca-app-pub-4344140632373860/2670304971`
   - **Interstitial Ad Unit ID**: `ca-app-pub-4344140632373860/8542802940`

---

## Bubblewrap Configuration

If using Bubblewrap CLI, add to `twa-manifest.json`:

```json
{
  "enableAdMob": true,
  "adMobAppId": "ca-app-pub-4344140632373860~7938321801",
  "adMobBannerAdUnitId": "ca-app-pub-4344140632373860/2670304971",
  "adMobInterstitialAdUnitId": "ca-app-pub-4344140632373860/8542802940"
}
```

---

## Ad Behavior in Your App

### Banner Ad
- **Location**: Fixed at bottom of screen
- **When shown**: Always visible when app is open
- **Format**: Responsive banner (320x50 or adaptive)

### Interstitial Ad
- **Location**: Full screen overlay
- **When shown**: 
  - 3 seconds after app launch
  - Maximum once per hour (to avoid annoying users)
  - Frequency controlled by localStorage
- **Format**: Full screen interstitial

---

## Important Notes

⚠️ **Never click your own ads** - This violates AdMob policy

⚠️ **Use test IDs during development** - Switch to real IDs only for production

⚠️ **Wait 24-48 hours** - New ad units may not show ads immediately

⚠️ **Check AdMob dashboard** - Monitor impressions, clicks, and earnings

---

## Revenue Estimates

Based on typical AdMob performance:

**Banner Ads:**
- CPM: $0.50 - $2.00
- 1,000 users/day × 5 impressions = 5,000 impressions
- Revenue: $2.50 - $10/day

**Interstitial Ads:**
- CPM: $2.00 - $10.00
- 1,000 users/day × 1 impression = 1,000 impressions
- Revenue: $2 - $10/day

**Total Potential:** $4.50 - $20/day = $135 - $600/month

*Actual revenue varies by geography, niche, and user engagement*

---

## Support

- AdMob Dashboard: https://admob.google.com/
- AdMob Help: https://support.google.com/admob
- Policy Center: https://support.google.com/admob/answer/6128543
