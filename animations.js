/**
 * MomEase Animations - Production JavaScript
 *
 * Features:
 * - GSAP ScrollTrigger for scroll-based animations
 * - Intersection Observer for performance
 * - Parallax effects
 * - Lazy loading for images
 * - Accessibility support (prefers-reduced-motion)
 * - Modular, maintainable code structure
 *
 * @author MomEase Team
 * @version 1.0.0
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isMobile: window.innerWidth < 768,

    // Intersection Observer thresholds - trigger earlier for more dramatic effect
    observerOptions: {
      threshold: 0.05,
      rootMargin: '0px 0px 50px 0px'
    },

    // Animation defaults
    scrollTriggerDefaults: {
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  };

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  /**
   * Check if element is in viewport
   * @param {Element} el - DOM element
   * @returns {boolean}
   */
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Debounce function for performance
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in ms
   * @returns {Function}
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
   * Request Animation Frame wrapper for smooth animations
   * @param {Function} callback
   */
  function smoothRaf(callback) {
    if (!CONFIG.reducedMotion) {
      requestAnimationFrame(callback);
    } else {
      callback();
    }
  }

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================

  class LazyLoader {
    constructor() {
      this.images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
      this.init();
    }

    init() {
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver(
          (entries) => this.handleIntersection(entries),
          { rootMargin: '50px 0px' }
        );

        this.images.forEach(img => {
          this.observer.observe(img);
          // Add blur-up effect
          img.style.filter = 'blur(10px)';
          img.style.transition = 'filter 0.3s ease-in-out';
        });
      } else {
        // Fallback for older browsers
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
      const src = img.dataset.src || img.src;
      const tempImg = new Image();

      tempImg.onload = () => {
        img.src = src;
        img.removeAttribute('data-src');
        img.style.filter = 'blur(0)';
        img.classList.add('loaded');
      };

      tempImg.src = src;
    }

    loadAllImages() {
      this.images.forEach(img => this.loadImage(img));
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
        // Skip animations if reduced motion is preferred
        this.elements.forEach(el => el.classList.add('scroll-reveal--active'));
        return;
      }

      // Use Intersection Observer for better performance
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        CONFIG.observerOptions
      );

      this.elements.forEach(el => {
        // Add GPU acceleration hint
        el.classList.add('will-animate');
        this.observer.observe(el);
      });
    }

    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;

          // Add active class to trigger animation
          el.classList.add('scroll-reveal--active');

          // Remove will-change after animation completes
          setTimeout(() => {
            el.classList.remove('will-animate');
            el.classList.add('will-animate-complete');
          }, 800);

          // Stop observing once animated
          this.observer.unobserve(el);
        }
      });
    }
  }

  // ============================================
  // STAGGER ANIMATIONS
  // ============================================

  class StaggerAnimation {
    constructor() {
      this.containers = document.querySelectorAll('[data-stagger]');
      this.init();
    }

    init() {
      if (CONFIG.reducedMotion) {
        this.containers.forEach(container => {
          const items = container.querySelectorAll('.stagger-item');
          items.forEach(item => item.classList.add('stagger-item--active'));
        });
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        CONFIG.observerOptions
      );

      this.containers.forEach(container => this.observer.observe(container));
    }

    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const container = entry.target;
          const items = container.querySelectorAll('.stagger-item');

          items.forEach((item, index) => {
            // Add stagger class for animation delay
            item.classList.add(`stagger-item--${Math.min(index + 1, 4)}`);

            setTimeout(() => {
              item.classList.add('stagger-item--active');
            }, 50); // Small delay to ensure CSS is applied
          });

          this.observer.unobserve(container);
        }
      });
    }
  }

  // ============================================
  // PARALLAX EFFECTS
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
      this.update();
    }

    handleScroll() {
      if (!this.ticking) {
        smoothRaf(() => this.update());
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

        // Use transform for GPU acceleration
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });

      this.ticking = false;
    }
  }

  // ============================================
  // HOVER TILT EFFECT (3D)
  // ============================================

  class HoverTilt {
    constructor() {
      this.elements = document.querySelectorAll('.hover-tilt');
      this.init();
    }

    init() {
      if (CONFIG.reducedMotion || CONFIG.isMobile) {
        return;
      }

      this.elements.forEach(el => {
        el.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
        el.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        el.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
      });
    }

    handleMouseEnter(e) {
      const el = e.currentTarget;
      el.style.transition = 'none';
    }

    handleMouseMove(e) {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      smoothRaf(() => {
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
    }

    handleMouseLeave(e) {
      const el = e.currentTarget;
      el.style.transition = 'transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================

  class NavbarScroll {
    constructor() {
      this.navbar = document.querySelector('nav');
      this.lastScroll = 0;
      this.init();
    }

    init() {
      if (!this.navbar) return;

      const handleScroll = debounce(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
          this.navbar.classList.add('nav-scrolled');
        } else {
          this.navbar.classList.remove('nav-scrolled');
        }

        this.lastScroll = currentScroll;
      }, 10);

      window.addEventListener('scroll', handleScroll, { passive: true });
    }
  }

  // ============================================
  // GSAP SCROLL ANIMATIONS (if GSAP is loaded)
  // ============================================

  class GSAPAnimations {
    constructor() {
      this.gsapLoaded = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
      this.init();
    }

    init() {
      if (!this.gsapLoaded || CONFIG.reducedMotion) {
        return;
      }

      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      this.initHeroAnimation();
      this.initSectionAnimations();
      this.initFeatureCards();
    }

    initHeroAnimation() {
      const heroHeading = document.querySelector('#hero h1');
      const heroText = document.querySelector('#hero p');
      const heroButtons = document.querySelectorAll('#hero a');
      const heroImage = document.querySelector('#hero img');

      if (!heroHeading) return;

      // Animate hero elements with more dramatic effects (without text splitting to preserve HTML)
      gsap.timeline()
        .from(heroHeading, {
          duration: 1.2,
          opacity: 0,
          y: 100,
          scale: 0.8,
          ease: 'back.out(1.7)'
        })
        .from(heroText, {
          duration: 0.9,
          opacity: 0,
          y: 60,
          scale: 0.9,
          ease: 'power3.out'
        }, '-=0.6')
        .from(heroButtons, {
          duration: 0.8,
          opacity: 0,
          y: 40,
          scale: 0.9,
          stagger: 0.15,
          ease: 'back.out(1.5)'
        }, '-=0.4')
        .from(heroImage, {
          duration: 1.4,
          opacity: 0,
          scale: 0.7,
          rotation: -10,
          ease: 'elastic.out(1, 0.5)'
        }, '-=1.2');
    }

    initSectionAnimations() {
      // Animate section headings with more impact
      const sectionHeadings = document.querySelectorAll('section h2');

      sectionHeadings.forEach(heading => {
        gsap.from(heading, {
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          duration: 1.2,
          opacity: 0,
          y: 80,
          scale: 0.8,
          ease: 'back.out(1.7)'
        });
      });
    }

    initFeatureCards() {
      // Animate feature cards with dramatic stagger
      const featureSections = document.querySelectorAll('#features .grid, #problem .grid');

      featureSections.forEach(grid => {
        const cards = grid.querySelectorAll('> div');

        gsap.from(cards, {
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          duration: 1,
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotation: -5,
          stagger: 0.2,
          ease: 'back.out(1.4)'
        });
      });
    }

    // Add parallax to images
    initParallaxImages() {
      const images = document.querySelectorAll('[data-parallax]');

      images.forEach(img => {
        const speed = parseFloat(img.dataset.parallax) || 0.5;

        gsap.to(img, {
          y: () => -100 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
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
      const target = document.querySelector(targetId);

      if (target) {
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: CONFIG.reducedMotion ? 'auto' : 'smooth'
        });

        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
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
              'DNS Lookup': `${(perfData.domainLookupEnd - perfData.domainLookupStart).toFixed(2)}ms`,
              'TCP Connection': `${(perfData.connectEnd - perfData.connectStart).toFixed(2)}ms`,
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
  // INITIALIZATION
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
      console.log('🎨 Initializing MomEase Animations');

      // Initialize all animation modules
      this.modules.push(new LazyLoader());
      this.modules.push(new ScrollReveal());
      this.modules.push(new StaggerAnimation());
      this.modules.push(new ParallaxEffect());
      this.modules.push(new HoverTilt());
      this.modules.push(new NavbarScroll());
      this.modules.push(new SmoothScroll());
      this.modules.push(new GSAPAnimations());

      // Performance monitoring (development only)
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const monitor = new PerformanceMonitor();
        monitor.logMetrics();
      }

      console.log('✅ Animations initialized successfully');
    }

    // Public method to refresh animations (useful for dynamic content)
    refresh() {
      this.modules.forEach(module => {
        if (module.init && typeof module.init === 'function') {
          module.init();
        }
      });
    }
  }

  // ============================================
  // EXPOSE TO GLOBAL SCOPE
  // ============================================

  window.MomEaseAnimations = new AnimationController();

  // Expose refresh method for dynamic content
  window.refreshAnimations = () => window.MomEaseAnimations.refresh();

})();
