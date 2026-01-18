/**
 * MomEase Animations - Vanilla JavaScript Animation System
 * Apple-style smooth animations without external dependencies
 *
 * Features:
 * - Intersection Observer for scroll animations
 * - Parallax effects
 * - Hero text reveal
 * - Smooth scrolling
 * - Mobile-optimized performance
 *
 * @author MomEase Team
 * @version 2.0.0
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isMobile: window.innerWidth < 768,
    
    // Intersection Observer options
    observerOptions: {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }
  };

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  /**
   * Debounce function for performance
   */
  function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Linear interpolation
   */
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  /**
   * Map value from one range to another
   */
  function mapRange(value, inMin, inMax, outMin, outMax) {
    return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
  }

  // ============================================
  // HERO SLIDESHOW
  // ============================================
  class HeroSlideshow {
    constructor() {
      this.slides = document.querySelectorAll('.hero-slide');
      this.currentSlide = 0;
      this.slideInterval = 4000; // 4 seconds
      this.intervalId = null;
      this.init();
    }

    init() {
      if (this.slides.length <= 1) return;

      // Start automatic slideshow
      this.startSlideshow();

      // Pause on reduced motion preference
      if (CONFIG.reducedMotion) {
        this.stopSlideshow();
      }
    }

    startSlideshow() {
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, this.slideInterval);
    }

    stopSlideshow() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }

    nextSlide() {
      // Remove active class from current slide
      this.slides[this.currentSlide].classList.remove('active');

      // Move to next slide
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;

      // Add active class to new slide
      this.slides[this.currentSlide].classList.add('active');
    }

    // Public method to go to specific slide
    goToSlide(index) {
      if (index < 0 || index >= this.slides.length) return;

      this.slides[this.currentSlide].classList.remove('active');
      this.currentSlide = index;
      this.slides[this.currentSlide].classList.add('active');
    }
  }

  // ============================================
  // HERO TEXT ANIMATION
  // ============================================
  class HeroAnimation {
    constructor() {
      this.heroTitle = document.getElementById('hero-title');
      this.heroSubtitle = document.getElementById('hero-subtitle');
      this.heroButtons = document.getElementById('hero-buttons');
      this.init();
    }

    init() {
      if (CONFIG.reducedMotion) {
        this.showImmediately();
        return;
      }

      // Animate hero elements with stagger
      setTimeout(() => {
        if (this.heroTitle) {
          this.heroTitle.style.opacity = '1';
          this.heroTitle.style.transform = 'translateY(0) scale(1)';
          this.heroTitle.style.transition = 'all 1s cubic-bezier(0.33, 1, 0.68, 1)';
        }
      }, 100);

      setTimeout(() => {
        if (this.heroSubtitle) {
          this.heroSubtitle.style.opacity = '1';
          this.heroSubtitle.style.transform = 'translateY(0)';
          this.heroSubtitle.style.transition = 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
        }
      }, 400);

      setTimeout(() => {
        if (this.heroButtons) {
          this.heroButtons.style.opacity = '1';
          this.heroButtons.style.transform = 'translateY(0)';
          this.heroButtons.style.transition = 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
        }
      }, 700);
    }

    showImmediately() {
      if (this.heroTitle) {
        this.heroTitle.style.opacity = '1';
        this.heroTitle.style.transform = 'none';
      }
      if (this.heroSubtitle) {
        this.heroSubtitle.style.opacity = '1';
        this.heroSubtitle.style.transform = 'none';
      }
      if (this.heroButtons) {
        this.heroButtons.style.opacity = '1';
        this.heroButtons.style.transform = 'none';
      }
    }
  }

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================
  class ScrollReveal {
    constructor() {
      this.elements = document.querySelectorAll('.scroll-reveal');
      this.init();
    }

    init() {
      if (CONFIG.reducedMotion) {
        this.elements.forEach(el => el.classList.add('active'));
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        CONFIG.observerOptions
      );

      this.elements.forEach(el => {
        this.observer.observe(el);
      });
    }

    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          
          // Stop observing once animated
          this.observer.unobserve(entry.target);
        }
      });
    }
  }

  // ============================================
  // PARALLAX EFFECT
  // ============================================
  class ParallaxEffect {
    constructor() {
      this.elements = document.querySelectorAll('.parallax');
      this.ticking = false;
      this.init();
    }

    init() {
      if (CONFIG.reducedMotion || CONFIG.isMobile || this.elements.length === 0) {
        return;
      }

      window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
      if (!this.ticking) {
        requestAnimationFrame(() => this.update());
        this.ticking = true;
      }
    }

    update() {
      const scrollY = window.pageYOffset;

      this.elements.forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0.5;
        const rect = el.getBoundingClientRect();
        const elementY = rect.top + scrollY;
        const distance = scrollY - elementY;
        const offset = distance * speed;

        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });

      this.ticking = false;
    }
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  class NavbarScroll {
    constructor() {
      this.navbar = document.getElementById('navbar');
      this.lastScroll = 0;
      this.init();
    }

    init() {
      if (!this.navbar) return;

      const handleScroll = debounce(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
          this.navbar.classList.add('scrolled');
        } else {
          this.navbar.classList.remove('scrolled');
        }

        this.lastScroll = currentScroll;
      }, 10);

      window.addEventListener('scroll', handleScroll, { passive: true });
    }
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  class SmoothScroll {
    constructor() {
      this.links = document.querySelectorAll('a[href^="#"]');
      this.init();
    }

    init() {
      this.links.forEach(link => {
        link.addEventListener('click', (e) => this.handleClick(e));
      });
    }

    handleClick(e) {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href');
      
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);

      if (target) {
        const navHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: CONFIG.reducedMotion ? 'auto' : 'smooth'
        });
      }
    }
  }

  // ============================================
  // STAGGER ANIMATION
  // ============================================
  class StaggerAnimation {
    constructor() {
      this.init();
    }

    init() {
      // Find all grid containers
      const grids = document.querySelectorAll('.grid');
      
      grids.forEach(grid => {
        const cards = grid.querySelectorAll('.card');
        
        cards.forEach((card, index) => {
          // Add stagger delay class
          const delayClass = `stagger-delay-${Math.min(index + 1, 5)}`;
          
          // If card already has scroll-reveal, add the delay
          if (card.classList.contains('scroll-reveal')) {
            card.classList.add(delayClass);
          }
        });
      });
    }
  }

  // ============================================
  // CARD HOVER EFFECTS
  // ============================================
  class CardHoverEffects {
    constructor() {
      this.cards = document.querySelectorAll('.card');
      this.init();
    }

    init() {
      if (CONFIG.reducedMotion) return;

      this.cards.forEach(card => {
        // Add hover class for CSS transitions
        card.classList.add('card-hover');

        // Add subtle tilt on mouse move (desktop only)
        if (!CONFIG.isMobile) {
          card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
          card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
        }
      });
    }

    handleMouseMove(e, card) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `
        translateY(-12px) 
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        scale(1.02)
      `;
    }

    handleMouseLeave(card) {
      card.style.transform = '';
    }
  }

  // ============================================
  // BUTTON HOVER EFFECTS
  // ============================================
  class ButtonHoverEffects {
    constructor() {
      this.buttons = document.querySelectorAll('.btn');
      this.init();
    }

    init() {
      this.buttons.forEach(btn => {
        btn.classList.add('btn-hover');
      });
    }
  }

  // ============================================
  // LAZY LOADING (for future images)
  // ============================================
  class LazyLoader {
    constructor() {
      this.images = document.querySelectorAll('img[data-src]');
      this.init();
    }

    init() {
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver(
          (entries) => this.handleIntersection(entries),
          { rootMargin: '50px' }
        );

        this.images.forEach(img => this.observer.observe(img));
      } else {
        this.loadAllImages();
      }
    }

    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadImage(img);
          this.observer.unobserve(img);
        }
      });
    }

    loadImage(img) {
      const src = img.dataset.src;
      if (src) {
        img.src = src;
        img.removeAttribute('data-src');
      }
    }

    loadAllImages() {
      this.images.forEach(img => this.loadImage(img));
    }
  }

  // ============================================
  // CURSOR GLOW EFFECT (Desktop only)
  // ============================================
  class CursorGlow {
    constructor() {
      this.cursorGlow = null;
      this.mouseX = 0;
      this.mouseY = 0;
      this.currentX = 0;
      this.currentY = 0;
      this.init();
    }

    init() {
      // Only enable on desktop with no reduced motion
      if (CONFIG.isMobile || CONFIG.reducedMotion) return;

      // Create cursor glow element
      this.cursorGlow = document.createElement('div');
      this.cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 69, 177, 0.15) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(this.cursorGlow);

      // Track mouse movement
      document.addEventListener('mousemove', (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.cursorGlow.style.opacity = '1';
      });

      document.addEventListener('mouseleave', () => {
        this.cursorGlow.style.opacity = '0';
      });

      // Smooth animation loop
      this.animate();
    }

    animate() {
      // Smooth lerp for cursor trail effect
      this.currentX = lerp(this.currentX, this.mouseX, 0.1);
      this.currentY = lerp(this.currentY, this.mouseY, 0.1);

      if (this.cursorGlow) {
        this.cursorGlow.style.left = `${this.currentX}px`;
        this.cursorGlow.style.top = `${this.currentY}px`;
      }

      requestAnimationFrame(() => this.animate());
    }
  }

  // ============================================
  // PERFORMANCE MONITORING
  // ============================================
  class PerformanceMonitor {
    constructor() {
      this.enabled = 'performance' in window;
    }

    logMetrics() {
      if (!this.enabled) return;

      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];

          if (perfData && console.table) {
            console.group('🚀 Performance Metrics');
            console.table({
              'DOM Load': `${(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart).toFixed(2)}ms`,
              'Page Load': `${(perfData.loadEventEnd - perfData.loadEventStart).toFixed(2)}ms`,
              'Total Time': `${(perfData.loadEventEnd - perfData.fetchStart).toFixed(2)}ms`
            });
            console.groupEnd();
          }
        }, 0);
      });
    }
  }

  // ============================================
  // INITIALIZATION CONTROLLER
  // ============================================
  class AnimationController {
    constructor() {
      this.modules = [];
      this.init();
    }

    init() {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initModules());
      } else {
        this.initModules();
      }
    }

    initModules() {
      console.log('🎨 Initializing MomEase Animations v2.0');

      // Initialize all animation modules
      this.modules.push(new HeroSlideshow());
      this.modules.push(new HeroAnimation());
      this.modules.push(new ScrollReveal());
      this.modules.push(new ParallaxEffect());
      this.modules.push(new NavbarScroll());
      this.modules.push(new SmoothScroll());
      this.modules.push(new StaggerAnimation());
      this.modules.push(new CardHoverEffects());
      this.modules.push(new ButtonHoverEffects());
      this.modules.push(new LazyLoader());
      this.modules.push(new CursorGlow());

      // Performance monitoring (development only)
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const monitor = new PerformanceMonitor();
        monitor.logMetrics();
      }

      console.log('✅ Animations initialized successfully');
    }

    // Public method to refresh animations
    refresh() {
      this.modules.forEach(module => {
        if (module.init && typeof module.init === 'function') {
          module.init();
        }
      });
    }
  }

  // ============================================
  // RESIZE HANDLER
  // ============================================
  const handleResize = debounce(() => {
    CONFIG.isMobile = window.innerWidth < 768;
  }, 250);

  window.addEventListener('resize', handleResize);

  // ============================================
  // EXPOSE TO GLOBAL SCOPE
  // ============================================
  window.MomEaseAnimations = new AnimationController();

  // Expose refresh method for dynamic content
  window.refreshAnimations = () => window.MomEaseAnimations.refresh();

})();

