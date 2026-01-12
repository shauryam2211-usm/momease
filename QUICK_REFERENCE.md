# Animation System - Quick Reference Card

## 🚀 Most Common Classes

### Scroll Reveals
```html
<div class="scroll-reveal">Basic reveal</div>
<div class="scroll-reveal scroll-reveal--left">From left</div>
<div class="scroll-reveal scroll-reveal--right">From right</div>
<div class="scroll-reveal scroll-reveal--scale">Scale in</div>
```

### Stagger (Sequential)
```html
<div data-stagger>
  <div class="stagger-item">Item 1</div>
  <div class="stagger-item">Item 2</div>
  <div class="stagger-item">Item 3</div>
</div>
```

### Hover Effects
```html
<button class="btn-hover">Button</button>
<div class="card-hover">Card</div>
<div class="image-hover"><img src="..."></div>
<div class="hover-tilt">3D Tilt</div>
```

### Parallax
```html
<img class="parallax" data-speed="0.5" src="...">
```

### Floating
```html
<div class="anim-float">Float</div>
<div class="anim-float--slow">Slow float</div>
```

## ⚙️ Customization

### Change Speed (in animations.css)
```css
:root {
  --duration-fast: 200ms;
  --duration-normal: 400ms;
  --duration-slow: 600ms;
}
```

### Change Distance
```css
:root {
  --translate-distance: 60px;
  --translate-distance-sm: 30px;
}
```

## 🔍 Debugging

### Check Console
Open browser DevTools → Console for performance metrics

### Reduced Motion
Test accessibility: Chrome DevTools → Rendering → Emulate prefers-reduced-motion

### Refresh Animations
After dynamic content: `window.refreshAnimations()`

## 📁 File Structure
```
index.html         - Your HTML
animations.css     - Animation styles
animations.js      - Animation logic
ANIMATION_GUIDE.md - Full documentation
```

## ✅ Production Checklist
- [ ] Test in Chrome, Firefox, Safari
- [ ] Test on mobile
- [ ] Enable reduced motion and test
- [ ] Check Lighthouse score (>90)
- [ ] Verify lazy loading works

## 🆘 Troubleshooting

**Animations not working?**
1. Check files are linked in index.html
2. Check browser console for errors
3. Verify GSAP CDN loaded

**Too slow/fast?**
Edit `--duration-normal` in animations.css

**Not triggering on scroll?**
Lower threshold in animations.js CONFIG

## 📖 Full Documentation
See `ANIMATION_GUIDE.md` for complete guide

---
**Version 1.0.0** | Built for MomEase
