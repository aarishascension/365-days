# 365 Days Calendar - Quick Start

## For Developers

### 1. Install and Run Locally

```bash
cd calendar-app-mobile
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

### 2. Test the App

- Add notes to different days
- Switch between month and year views
- Navigate between years
- Verify data persists after refresh (localStorage)

### 3. Build for Production

```bash
npm run build
```

Output will be in `./dist/` folder.

### 4. Test Production Build Locally

```bash
npm run preview
```

## For Play Store Deployment

### Easy Path (No coding needed):

1. **Deploy your app**:
   - Push code to GitHub
   - Deploy on Netlify (free): [netlify.com](https://netlify.com)
   - Get your live URL

2. **Generate Android APK**:
   - Go to [pwabuilder.com](https://pwabuilder.com)
   - Enter your live URL
   - Click "Package for stores" → Android
   - Download APK

3. **Upload to Play Store**:
   - Create app at [play.google.com/console](https://play.google.com/console)
   - Upload APK
   - Fill in store listing details
   - Submit for review

**Full instructions**: See `DEPLOYMENT.md`

## Project Structure

```
calendar-app-mobile/
├── public/
│   ├── icons/           # App icons (generate from icon.svg)
│   ├── manifest.json    # PWA manifest
│   └── service-worker.js # Offline support
├── src/
│   ├── App.jsx         # Main React component
│   ├── App.css         # Component styles
│   ├── index.css       # Global styles
│   └── main.jsx        # React entry point
├── index.html          # HTML entry point
├── package.json        # Dependencies
├── vite.config.js      # Build configuration
└── README.md          # Full documentation
```

## Key Features to Test

- [x] Display dates as 1-365
- [x] Month view with day numbers
- [x] Year view (365 squares)
- [x] Add/edit/delete notes
- [x] Persist data locally
- [x] Today highlighting
- [x] Touch-friendly interface
- [x] Responsive design
- [x] Smooth animations

## Customization

### Change Colors

Edit `src/index.css`:

```css
:root {
  --bg-primary: #0a0e1a;          /* Dark blue background */
  --accent-primary: #ff6b35;       /* Orange accent */
  --accent-secondary: #f7931e;     /* Yellow accent */
  --accent-tertiary: #4ecdc4;      /* Teal accent */
}
```

### Change Fonts

Edit `src/index.css` import:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont&display=swap');
```

Then update font-family in CSS.

### Add Features

The codebase is clean and well-organized. Key areas:

- **Data Storage**: `localStorage` in `App.jsx`
- **Calendar Logic**: `getDayOfYear()` function
- **UI Components**: Modal, month view, year view in `App.jsx`
- **Styling**: Mobile-first CSS in `App.css`

## Need Help?

Common issues:

1. **npm install fails**: Update Node.js to v16+
2. **Build fails**: Delete `node_modules` and `package-lock.json`, reinstall
3. **Icons missing**: Generate from `public/icons/icon.svg` using a tool
4. **PWA not installable**: Check manifest.json and HTTPS requirement

## Resources

- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [PWA Builder](https://www.pwabuilder.com/)
- [Play Console](https://play.google.com/console)

Happy coding! 🚀
