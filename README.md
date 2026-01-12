# MomEase Landing Page

A modern, responsive landing page for MomEase - an AI-powered smart baby feeding solution.

## Project Overview

This is a static HTML landing page built with:
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling (via CDN)
- **GSAP** - Scroll-based animations
- **JavaScript** - Interactive elements and form handling

## Recent Updates (2026-01-12)

### Changes Made:
1. ✅ Removed "Trusted by Professionals" testimonials section
2. ✅ Added contact details to footer (email and phone with clickable links)
3. ✅ Prepared Google Form integration for waitlist
4. ✅ Updated all navigation menus
5. ✅ Maintained consistent design and spacing

See [`CHANGES_SUMMARY.md`](./CHANGES_SUMMARY.md) for detailed change documentation.

## Contact Information

**Email:** [info@momeaseinnovation.com](mailto:info@momeaseinnovation.com)
**Phone:** [8882283654](tel:8882283654)

All waitlist submissions will be sent to the email address above.

## Quick Start

### View the Website
Simply open `index.html` in any modern web browser.

### Project Structure
```
shaurya/
├── index.html              # Main landing page
├── animations.css          # Custom CSS animations
├── animations.js           # GSAP scroll animations
├── assests/               # Images (logo, photos)
│   ├── momease-logo.jpeg
│   ├── happy-family.jpeg
│   └── smart-bottle.jpeg
├── GOOGLE_FORM_SETUP.md   # Waitlist form setup guide
├── CHANGES_SUMMARY.md     # Detailed change log
└── README.md              # This file
```

## Setup Required: Google Form Integration

The waitlist form is ready but needs to be connected to Google Forms.

### Steps:
1. Read [`GOOGLE_FORM_SETUP.md`](./GOOGLE_FORM_SETUP.md)
2. Create a Google Form using **info@momeaseinnovation.com**
3. Update form action URL in `index.html` (line 498)
4. Replace entry IDs in `index.html` (lines 501, 508, 515)

**Note:** Until the Google Form is configured, the waitlist form will not collect data.

## Page Sections

The landing page includes the following sections:

1. **Navigation** - Fixed header with logo and menu
2. **Hero** - Main headline and CTA buttons
3. **Problem** - Challenges parents face (3 cards)
4. **Solution** - Introducing MomEase Smart Bottle
5. **Features** - 6 key features in grid layout
6. **Technology Stack** - 4 tech components (ESP32, Sensors, AI/ML, Mobile Apps)
7. **Waitlist** - Form to join waitlist (Google Forms integration)
8. **Footer** - Contact info, quick links, social media

## Features

- ✨ Modern, professional design with pastel color scheme
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Custom animations using GSAP ScrollTrigger
- 🎯 Clear calls-to-action
- 📝 Google Forms integration for data collection
- 🔗 Clickable contact links (email, phone)
- ♿ Accessible HTML structure

## Design System

### Colors
- **Primary Pink:** `#FF45B1` to `#C4166D` (gradient)
- **Pastels:** Pink, Blue, Purple, Peach, Mint

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Poppins (sans-serif)

### Spacing
- All sections use `py-20` for consistent vertical rhythm

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies (via CDN)

- [Tailwind CSS](https://cdn.tailwindcss.com)
- [Google Fonts](https://fonts.google.com) - Poppins, Playfair Display
- [GSAP](https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js)
- [GSAP ScrollTrigger](https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js)

No installation required - all loaded via CDN.

## Customization

### Update Contact Information
Contact details are located in the footer (lines 607-627 in `index.html`).

### Update Branding
- Logo: Replace `./assests/momease-logo.jpeg`
- Hero image: Replace `./assests/happy-family.jpeg`
- Product image: Replace `./assests/smart-bottle.jpeg`

### Update Colors
Modify the Tailwind config in `index.html` (lines 21-51).

### Update Content
All content is in `index.html` - simply find the section and edit the text.

## Performance

- ⚡ Lightweight (no heavy frameworks)
- 🎭 Lazy loading for images
- 🎨 Optimized animations with Intersection Observer
- 📦 Assets loaded via CDN (no build process needed)

## Deployment

### Option 1: Static Hosting
Upload all files to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Traditional web hosting

### Option 2: Local Testing
1. Open `index.html` in a browser
2. Or use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve
   ```

## Testing Checklist

Before deployment:
- [ ] All navigation links work
- [ ] Contact links open email client and phone dialer
- [ ] Google Form is configured and tested
- [ ] Form submission shows success message
- [ ] Mobile menu works correctly
- [ ] All images load correctly
- [ ] Animations work smoothly
- [ ] Test on multiple browsers
- [ ] Test on mobile devices

## Documentation

- [`GOOGLE_FORM_SETUP.md`](./GOOGLE_FORM_SETUP.md) - Complete Google Forms integration guide
- [`CHANGES_SUMMARY.md`](./CHANGES_SUMMARY.md) - Detailed changelog of recent updates
- [`ANIMATION_GUIDE.md`](./ANIMATION_GUIDE.md) - Guide to the animation system
- [`QUICK_REFERENCE.md`](./QUICK_REFERENCE.md) - Quick reference for common tasks
- [`CHANGELOG.md`](./CHANGELOG.md) - Version history

## Support

For questions or issues:
- Check the documentation files listed above
- Review the inline comments in `index.html`
- Ensure Google Form is properly configured (see `GOOGLE_FORM_SETUP.md`)

## License

© 2026 MomEase. All rights reserved.

---

**Last Updated:** 2026-01-12
**Version:** 1.1
**Status:** Production Ready (pending Google Form configuration)
