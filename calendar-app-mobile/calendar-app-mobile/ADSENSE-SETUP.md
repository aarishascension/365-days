# Google AdSense Setup Instructions

## Important: Replace Placeholder IDs

Before deploying, you MUST replace the placeholder AdSense IDs with your actual IDs from Google AdSense.

### Step 1: Sign up for Google AdSense

1. Go to https://www.google.com/adsense
2. Sign in with your Google account
3. Complete the application process
4. Wait for approval (can take 1-2 weeks)

### Step 2: Get Your Publisher ID

Once approved:
1. Log in to your AdSense account
2. Go to **Account** → **Settings**
3. Find your **Publisher ID** (format: `ca-pub-XXXXXXXXXXXXXXXX`)

### Step 3: Create an Ad Unit

1. In AdSense dashboard, go to **Ads** → **By ad unit**
2. Click **Display ads**
3. Name it "365 Calendar Banner"
4. Choose **Responsive** ad type
5. Click **Create**
6. Copy the **Ad slot ID** (10-digit number)

### Step 4: Update Your Code

Replace the placeholder IDs in these files:

#### File: `index.html`
```html
<!-- Replace XXXXXXXXXXXXXXXX with your Publisher ID -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

#### File: `src/App.jsx`
```jsx
{/* Replace both IDs */}
<ins className="adsbygoogle"
     style={{ display: 'block' }}
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  {/* Your Publisher ID */}
     data-ad-slot="XXXXXXXXXX"                  {/* Your Ad Slot ID */}
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

### Step 5: Verify Setup

1. Build and deploy your app
2. Visit your live site
3. Check browser console for any AdSense errors
4. Ads may show as blank initially - this is normal
5. It can take 24-48 hours for ads to start showing

### Step 6: For Android App (PWABuilder)

When you generate your Android APK with PWABuilder:

1. In PWABuilder settings, look for **Android Manifest** options
2. Add this permission:
   ```xml
   <uses-permission android:name="com.google.android.gms.permission.AD_ID"/>
   ```
3. This tells Google Play your app uses advertising ID

### Important Notes

- **Test ads won't show on localhost** - deploy to see them
- **Don't click your own ads** - this violates AdSense policy
- **Ads may not show immediately** - can take 24-48 hours
- **Keep your site compliant** - follow AdSense program policies
- **Privacy policy required** - already included at `/privacy-policy.html`

### Troubleshooting

**No ads showing?**
- Check browser console for errors
- Verify IDs are correct (no typos)
- Wait 24-48 hours after first deployment
- Make sure site is publicly accessible
- Check AdSense account for policy violations

**"AdSense code not found" error?**
- Make sure you replaced the placeholder IDs
- Verify the script tag is in `<head>` section
- Clear browser cache and reload

### Revenue & Payments

- Earnings appear in AdSense dashboard
- Minimum payout: $100 USD
- Payment methods: Bank transfer, check, wire transfer
- Payments issued monthly (if threshold met)

### Support

- AdSense Help: https://support.google.com/adsense
- Policy Center: https://support.google.com/adsense/answer/48182
