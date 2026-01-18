# MomEase Website - Enhanced with Background Slideshow

## 🎬 What's New

### Full-Screen Hero Slideshow
- **Auto-rotating background**: Your product images fade every 4 seconds
- **Full image display**: Uses `object-fit: contain` - never crops your products
- **Premium gradient background**: Black + pink radial gradient fills empty space
- **Ken Burns effect**: Subtle zoom animation for cinematic feel
- **Smart overlays**: Dark gradient ensures text stays readable
- **Mobile optimized**: Lighter animations on mobile for performance

### Enhanced Logo
- **2x larger size**: 80px on desktop (was 40px)
- **Responsive**: Scales to 60px on mobile
- **Hover effect**: Subtle pink glow and scale on hover
- **Crisp rendering**: Optimized for high-DPI displays

## 📁 File Structure

```
your-website/
├── index.html
├── animations.css
├── animations.js
└── assets/
    └── hero/
        ├── hero-1.jpg
        └── hero-2.jpg
```

## 🚀 Setup Instructions

1. **Extract all files** to your website directory
2. **Ensure folder structure** matches above (assets/hero/ folder is important)
3. **Open index.html** in your browser
4. The slideshow will start automatically!

## ⚙️ Customization

### Change Slideshow Speed
In `animations.js`, find the `HeroSlideshow` class:
```javascript
this.slideInterval = 4000; // Change to 5000 for 5 seconds, etc.
```

### Add More Images
1. Add images to `assets/hero/` folder (hero-3.jpg, hero-4.jpg, etc.)
2. In `index.html`, add more slides:
```html
<div class="hero-slide" style="background-image: url('./assets/hero/hero-3.jpg');"></div>
```

### Adjust Overlay Darkness
In `index.html`, find `.hero-overlay` style and modify the rgba values:
```css
rgba(0, 0, 0, 0.85) /* First number = black, last = opacity */
```

### Customize Gradient Background
The background gradient fills empty space around your product images:
```css
.hero-slideshow {
  background: radial-gradient(
    circle at 30% 50%,
    rgba(255, 69, 177, 0.3) 0%,  /* Pink glow */
    rgba(0, 0, 0, 0.9) 50%,       /* Transition */
    #000000 100%                   /* Pure black */
  );
}
```

### Modify Ken Burns Effect
In `animations.css`, adjust the scale values:
```css
@keyframes kenBurns {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); } /* Change 1.1 to 1.2 for more zoom */
  100% { transform: scale(1); }
}
```

## 🎨 Features Summary

### Hero Slideshow
- ✅ Automatic transitions every 4 seconds
- ✅ Smooth fade effect (1.5s duration)
- ✅ Ken Burns zoom animation
- ✅ **Full image display** with `object-fit: contain` (no cropping)
- ✅ **Premium gradient background** (black + pink radial gradient)
- ✅ Dual gradient overlays for depth
- ✅ Full responsive support
- ✅ Accessibility: Pauses on reduced-motion preference

### Logo Enhancements
- ✅ 2x larger size (80px → 40px)
- ✅ Pink glow on hover
- ✅ Subtle scale animation
- ✅ Mobile optimized (60px)

### Performance
- ✅ CSS-based animations (GPU accelerated)
- ✅ Optimized for mobile devices
- ✅ Reduced animation complexity on smaller screens
- ✅ No external dependencies

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Optimizations

- Lighter Ken Burns effect (scale 1.05 vs 1.1)
- Stronger overlay for better text readability
- Optimized background positioning
- Reduced animation GPU load

## 🔧 Troubleshooting

**Images not showing?**
- Check that `assets/hero/` folder exists
- Verify image paths match folder structure
- Open browser console (F12) to check for errors

**Slideshow not transitioning?**
- Check JavaScript console for errors
- Ensure animations.js is loaded
- Verify both slides have the correct class names

**Images are cropped?**
- Verify `background-size: contain` in CSS (not `cover`)
- Check that the gradient background is visible
- Images should show fully without cropping

**Text not readable?**
- Increase overlay darkness in `.hero-overlay`
- Adjust gradient opacity values

## 💡 Tips

1. **Image Size**: Use images around 1920x1080px for best quality
2. **File Size**: Optimize images (under 500KB each) for fast loading
3. **Aspect Ratio**: 16:9 works best for various screen sizes
4. **Testing**: Test on actual mobile devices, not just desktop resize

## 🎯 What You Get

All files are production-ready and include:
- Fully commented code
- Accessibility features
- Mobile optimizations
- Performance best practices
- No external dependencies
- Clean, maintainable structure

Enjoy your stunning new website! 🚀
