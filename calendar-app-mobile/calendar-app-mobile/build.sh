#!/bin/bash

echo "🎨 365 Days Calendar - Build Script"
echo "===================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Generate icons from SVG (requires ImageMagick or similar)
echo "🖼️  Icon generation info:"
echo "To generate all required icon sizes, you can use:"
echo "  - Online: https://realfavicongenerator.net/"
echo "  - CLI: npm install -g pwa-asset-generator"
echo "  - Command: pwa-asset-generator public/icons/icon.svg public/icons --icon-only"

# Build the app
echo ""
echo "🔨 Building production app..."
npm run build

echo ""
echo "✅ Build complete! Output is in ./dist/"
echo ""
echo "📱 Next steps:"
echo "  1. Deploy ./dist/ to a hosting service (Netlify, Vercel, etc.)"
echo "  2. Generate app icons if you haven't already"
echo "  3. Test your PWA at the live URL"
echo "  4. Use PWABuilder.com or Bubblewrap to create Android APK"
echo "  5. Upload to Google Play Console"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
