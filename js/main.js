/**
 * AROVIA HEALTHCARE — CLIENT SCRIPTS
 * Module 9: Contact & Phone Functionality
 *
 * Implements:
 * 1. Mobile navigation drawer interactions (open/close, keyboard focus, ESC handling)
 * 2. Active navigation link highlighting across pages
 * 3. Desktop phone number clipboard copy with visual & screen-reader feedback
 * 4. Strict adherence to phone-first honesty: zero false call-connected claims,
 *    standard native tel: URI delegation for mobile and desktop call applications.
 */

(function () {
  'use strict';

  // Authoritative Brand Contact Constants
  var OFFICIAL_PHONE_DISPLAY = '+91 96496 48501';
  var OFFICIAL_PHONE_URI = 'tel:+919649648501';

  // DOM Elements
  var menuToggle = document.getElementById('menuToggle');
  var mobileDrawer = document.getElementById('mobileDrawer');
  var drawerOverlay = document.getElementById('drawerOverlay');
  var drawerClose = document.getElementById('drawerClose');
  var liveAnnouncement = document.getElementById('liveAnnouncement');

  /**
   * Accessible live announcement for assistive technologies
   * @param {string} message
   */
  function announceToScreenReader(message) {
    if (!liveAnnouncement) {
      liveAnnouncement = document.getElementById('liveAnnouncement');
    }
    if (liveAnnouncement) {
      liveAnnouncement.textContent = message;
    }
  }

  /**
   * Open the mobile navigation drawer
   */
  function openDrawer() {
    if (!mobileDrawer || !drawerOverlay) return;
    mobileDrawer.classList.add('is-open');
    drawerOverlay.classList.add('is-visible');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
    if (drawerClose) {
      drawerClose.focus();
    }
  }

  /**
   * Close the mobile navigation drawer
   */
  function closeDrawer() {
    if (!mobileDrawer || !drawerOverlay) return;
    mobileDrawer.classList.remove('is-open');
    drawerOverlay.classList.remove('is-visible');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
    document.body.style.overflow = '';
  }

  // Event Listeners for Mobile Navigation
  if (menuToggle) {
    menuToggle.addEventListener('click', function (e) {
      e.preventDefault();
      var isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', function (e) {
      e.preventDefault();
      closeDrawer();
    });
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', function () {
      closeDrawer();
    });
  }

  // Keyboard accessibility (ESC to close drawer)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  /**
   * Active Navigation Highlighter based on current URL/pathname
   */
  function highlightActiveNav() {
    var knownPages = [
      'home-care',
      'ambulance',
      'medical-equipment',
      'pharmacy',
      'lab-tests',
      'digital-health',
      'contact'
    ];

    var path = window.location.pathname.toLowerCase();
    var segments = path.split(/[\\/]/).filter(Boolean);
    var activePage = 'index';

    for (var i = segments.length - 1; i >= 0; i--) {
      var seg = segments[i].replace(/\.html$/, '');
      if (seg === 'home-care-service') {
        activePage = 'home-care';
        break;
      }
      if (knownPages.indexOf(seg) !== -1) {
        activePage = seg;
        break;
      }
    }

    var navLinks = document.querySelectorAll('.main-nav__link, .mobile-drawer__link');
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var cleanHref = href.split('?')[0].split('#')[0].replace(/\.html$/, '').replace(/^\.?\//, '').toLowerCase();
      var linkTarget = (cleanHref === '' || cleanHref === 'index') ? 'index' : cleanHref;

      if (linkTarget === activePage) {
        if (link.classList.contains('main-nav__link')) {
          link.classList.add('main-nav__link--active');
        }
        if (link.classList.contains('mobile-drawer__link')) {
          link.classList.add('mobile-drawer__link--active');
        }
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('main-nav__link--active');
        link.classList.remove('mobile-drawer__link--active');
        link.removeAttribute('aria-current');
      }

      if (!link._navListenerAttached) {
        link._navListenerAttached = true;
        link.addEventListener('click', function () {
          navLinks.forEach(function (other) {
            other.classList.remove('main-nav__link--active');
            other.classList.remove('mobile-drawer__link--active');
            other.removeAttribute('aria-current');
          });
          if (link.classList.contains('main-nav__link')) {
            link.classList.add('main-nav__link--active');
          }
          if (link.classList.contains('mobile-drawer__link')) {
            link.classList.add('mobile-drawer__link--active');
          }
          link.setAttribute('aria-current', 'page');
        });
      }
    });
  }

  /**
   * Fallback text copy method for older browsers
   * @param {string} text
   * @param {function} callback
   */
  function fallbackCopyText(text, callback) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    textArea.setAttribute('aria-hidden', 'true');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      if (successful && callback) {
        callback();
      }
    } catch (err) {
      console.warn('Fallback copy failed:', err);
    }
    document.body.removeChild(textArea);
  }

  /**
   * Phone Number Clipboard Copy Handler
   * Allows desktop visitors to quickly copy the phone number without dialing.
   */
  function initCopyPhoneButtons() {
    var copyButtons = document.querySelectorAll('.btn-copy-phone');
    if (!copyButtons.length) return;

    copyButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var rawNumber = btn.getAttribute('data-phone') || OFFICIAL_PHONE_DISPLAY;
        var formatted = OFFICIAL_PHONE_DISPLAY;

        function onCopiedSuccess() {
          var labelSpan = btn.querySelector('span');
          var originalLabel = labelSpan ? labelSpan.textContent : btn.textContent;
          if (labelSpan) {
            labelSpan.textContent = '✓ Copied: ' + formatted;
          }
          btn.classList.add('is-copied');
          announceToScreenReader('Phone number ' + formatted + ' copied to clipboard.');

          setTimeout(function () {
            if (labelSpan) {
              labelSpan.textContent = originalLabel;
            }
            btn.classList.remove('is-copied');
          }, 2500);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(formatted).then(onCopiedSuccess).catch(function () {
            fallbackCopyText(formatted, onCopiedSuccess);
          });
        } else {
          fallbackCopyText(formatted, onCopiedSuccess);
        }
      });
    });
  }

  /**
   * Global Connect Button & Horizontal Social Dock Interaction
   *
   * Requirement:
   * - Connect button remains stationary at far right of navigation bar.
   * - On click, reveals Instagram, Facebook, and YouTube horizontally to the left of Connect.
   * - On second click or outside click/Escape, animates back toward Connect until hidden.
   * - 0px layout shift on brand, tagline, nav links, or button.
   * - Reads settings from window.AROVIA_SOCIAL_CONFIG (defined in js/social-config.js).
   */
  function initConnectDock() {
    var config = window.AROVIA_SOCIAL_CONFIG || {
      instagram: { name: 'Instagram', url: 'https://www.instagram.com/arovia_homecare?utm_source=qr&obrf=cGlpanF5ZW5kMGM0', statusText: 'Official Profile' },
      youtube: { name: 'YouTube', url: 'https://youtube.com/@arovia_homecareservices?si=G9FTV7dmVCOyWMSB', statusText: 'Official Channel' },
      facebook: { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61596182516516', statusText: 'Official Page' }
    };

    var mainConnectBtn = document.getElementById('connectBtn');
    var connectDropdown = document.getElementById('connectDropdown') || (mainConnectBtn ? mainConnectBtn.closest('.connect-dropdown') : null);
    var connectDock = document.getElementById('connectSocialDock') || (connectDropdown ? connectDropdown.querySelector('.connect-social-dock') : null);

    // Fallback: If markup doesn't have the dock yet, create it dynamically
    if (!connectDock && connectDropdown) {
      connectDock = document.createElement('div');
      connectDock.id = 'connectSocialDock';
      connectDock.className = 'connect-social-dock';
      connectDock.setAttribute('role', 'group');
      connectDock.setAttribute('aria-label', 'Arovia Official Social Media Channels');
      connectDock.setAttribute('aria-hidden', 'true');
      connectDock.innerHTML = [
        '<a href="#" class="connect-social-icon connect-social-icon--instagram" data-platform="instagram" aria-label="Arovia on Instagram" title="Arovia on Instagram" role="button">',
        '  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
        '</a>',
        '<a href="https://www.facebook.com/profile.php?id=61596182516516" target="_blank" rel="noopener noreferrer" class="connect-social-icon connect-social-icon--facebook" data-platform="facebook" aria-label="Arovia on Facebook" title="Arovia on Facebook">',
        '  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
        '</a>',
        '<a href="#" class="connect-social-icon connect-social-icon--youtube" data-platform="youtube" aria-label="Arovia on YouTube" title="Arovia on YouTube" role="button">',
        '  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
        '</a>'
      ].join('');
      connectDropdown.insertBefore(connectDock, mainConnectBtn);
    }

    if (!connectDropdown || !mainConnectBtn) return;

    var socialIcons = connectDock ? connectDock.querySelectorAll('.connect-social-icon') : [];

    // Configure social items based on centralized config
    socialIcons.forEach(function (item) {
      var platform = item.getAttribute('data-platform');
      var pConfig = config[platform];
      if (!pConfig) return;

      if (pConfig.url) {
        item.setAttribute('href', pConfig.url);
        item.setAttribute('target', '_blank');
        item.setAttribute('rel', 'noopener noreferrer');
        item.removeAttribute('role');
      } else {
        item.setAttribute('href', '#');
        item.setAttribute('role', 'button');
      }

      item.addEventListener('click', function (e) {
        if (!pConfig.url) {
          e.preventDefault();
          var msg = pConfig.comingSoonMessage || ('Arovia’s official ' + pConfig.name + ' channel is coming soon.');
          announceToScreenReader(msg);
        } else {
        }
      });
    });

    // Storage key for cross-page persistence of the connect dock state
    var CONNECT_STORAGE_KEY = 'arovia_connect_dock_state';

    function getStoredConnectState() {
      try {
        var val = localStorage.getItem(CONNECT_STORAGE_KEY);
        if (val === 'vanished' || val === 'visible') return val;
      } catch (e) { }
      try {
        var sVal = sessionStorage.getItem(CONNECT_STORAGE_KEY);
        if (sVal === 'vanished' || sVal === 'visible') return sVal;
      } catch (e) { }
      return null;
    }

    function setStoredConnectState(state) {
      try {
        localStorage.setItem(CONNECT_STORAGE_KEY, state);
      } catch (e) { }
      try {
        sessionStorage.setItem(CONNECT_STORAGE_KEY, state);
      } catch (e) { }
    }

    function showConnectDock(skipPersist, instant) {
      if (instant) {
        connectDropdown.classList.add('no-transition');
      }
      connectDropdown.classList.remove('is-vanished');
      connectDropdown.classList.add('is-open');
      mainConnectBtn.setAttribute('aria-expanded', 'true');
      if (connectDock) {
        connectDock.setAttribute('aria-hidden', 'false');
      }
      if (!skipPersist) {
        setStoredConnectState('visible');
      }
      if (instant) {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            connectDropdown.classList.remove('no-transition');
          });
        });
      }
      announceToScreenReader('Social media channels visible.');
    }

    function vanishConnectDock(skipPersist, instant) {
      if (instant) {
        connectDropdown.classList.add('no-transition');
      }
      connectDropdown.classList.add('is-vanished');
      connectDropdown.classList.remove('is-open');
      mainConnectBtn.setAttribute('aria-expanded', 'false');
      if (connectDock) {
        connectDock.setAttribute('aria-hidden', 'true');
      }
      if (!skipPersist) {
        setStoredConnectState('vanished');
      }
      if (instant) {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            connectDropdown.classList.remove('no-transition');
          });
        });
      }
      announceToScreenReader('Social media channels hidden.');
    }

    // Set initial state:
    // Respect stored cross-page user preference if present, otherwise default to visible on desktop
    var initialPref = getStoredConnectState();
    if (window.innerWidth <= 992) {
      vanishConnectDock(true, true);
    } else {
      if (initialPref === 'vanished') {
        vanishConnectDock(true, true);
      } else {
        showConnectDock(true, true);
      }
    }

    // Responsive resize listener: keep state synchronized across viewport changes
    window.addEventListener('resize', function () {
      if (window.innerWidth <= 992) {
        if (!connectDropdown.classList.contains('is-open')) {
          vanishConnectDock(true, true);
        }
      } else {
        var currentPref = getStoredConnectState();
        if (currentPref === 'vanished') {
          vanishConnectDock(true, true);
        } else {
          showConnectDock(true, true);
        }
      }
    });

    // Cross-tab synchronization: when toggled in one tab, reflect across all open tabs
    window.addEventListener('storage', function (e) {
      if (e.key === CONNECT_STORAGE_KEY && window.innerWidth > 992) {
        if (e.newValue === 'vanished') {
          vanishConnectDock(true, false);
        } else if (e.newValue === 'visible') {
          showConnectDock(true, false);
        }
      }
    });

    // Connect button toggle listener: clicking Connect button vanishes / reveals the logos across all pages
    mainConnectBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var isMobile = window.innerWidth <= 992;
      if (isMobile) {
        var isOpen = connectDropdown.classList.contains('is-open');
        if (isOpen) {
          vanishConnectDock(false, false);
        } else {
          showConnectDock(false, false);
        }
      } else {
        var isVanished = connectDropdown.classList.contains('is-vanished');
        if (isVanished) {
          // If currently vanished, clicking Connect reveals the icons across all pages
          showConnectDock(false, false);
        } else {
          // If currently visible, clicking Connect vanishes the icons across all pages
          vanishConnectDock(false, false);
        }
      }
    });

    // Mobile drawer connect button listener
    var drawerConnectBtn = document.querySelector('.btn--connect-mobile');
    if (drawerConnectBtn) {
      drawerConnectBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var isVanished = connectDropdown.classList.contains('is-vanished');
        if (isVanished) {
          showConnectDock();
        } else {
          vanishConnectDock();
        }
      });
    }

    // Phones and tablets: a tap anywhere outside Connect hides the social icons.
    // A tap on an icon still follows that icon's link.
    function isConnectPopoverViewport() {
      return (window.matchMedia && window.matchMedia('(max-width: 992px)').matches) || (window.innerWidth <= 992);
    }

    document.addEventListener('pointerdown', function (e) {
      if (!isConnectPopoverViewport()) return;
      if (!connectDropdown.classList.contains('is-open')) return;
      if (connectDropdown.contains(e.target)) return;
      if (drawerConnectBtn && drawerConnectBtn.contains(e.target)) return;
      vanishConnectDock(false, false);
    });
  }

  /**
   * Top Scroll Progress Line
   *
   * Tracks viewport scroll progress and smoothly animates scaleX from left to right (0% to 100%).
   * Fixed at the absolute top of the viewport above the sticky navigation header with zero layout shift.
   */
  function initScrollProgressLine() {
    var line = document.getElementById('scrollProgressLine');
    if (!line) {
      line = document.createElement('div');
      line.id = 'scrollProgressLine';
      line.className = 'scroll-progress-line';
      line.setAttribute('aria-hidden', 'true');
      var topbar = document.querySelector('.topbar');
      var header = document.querySelector('.site-header');
      if (topbar && topbar.parentNode) {
        topbar.parentNode.insertBefore(line, topbar);
      } else if (header && header.parentNode) {
        header.parentNode.insertBefore(line, header);
      } else {
        document.body.insertBefore(line, document.body.firstChild);
      }
    }

    var ticking = false;

    function updateProgress() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (scrollTop <= 0 || docHeight <= 0) {
        line.style.transform = 'scaleX(0)';
        ticking = false;
        return;
      }

      var progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      // Precision to 4 decimals for smooth sub-pixel rendering
      var scale = progress.toFixed(4);
      line.style.transform = 'scaleX(' + scale + ')';
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial check in case the page loaded already scrolled
    updateProgress();
  }

  /**
   * Cinematic Healthcare CTA Scroll-Triggered Reveal
   */
  function initCinematicCta() {
    var ctaSection = document.querySelector('.cinematic-cta-section');
    if (!ctaSection) return;

    function revealCta() {
      ctaSection.classList.add('is-revealed');
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealCta();
            observer.unobserve(ctaSection);
          }
        });
      }, { threshold: 0.12 });

      observer.observe(ctaSection);
    } else {
      revealCta();
    }

    // Safety fallback: reveal immediately if already visible
    var rect = ctaSection.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      revealCta();
    }
    setTimeout(revealCta, 2500);
  }

  /**
   * Premium Typography & Scroll-Triggered Text Reveal System
   * Inspired by the reference standard (staggered word reveals & fluid scroll entrances)
   */
  function initTypographyAnimations() {
    // Respect reduced motion accessibility
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
      return;
    }

    document.documentElement.classList.add('js-loaded');

    // 1. Staggered Word Reveal for Main Hero Headings (Reference: verseWordReveal)
    var heroTitle = document.querySelector('.hero:not(.hero--carousel) .hero__title, .page-header__title');
    if (heroTitle && !heroTitle.dataset.wordsSplit) {
      heroTitle.dataset.wordsSplit = 'true';
      var text = heroTitle.textContent.trim();
      var words = text.split(/\s+/);

      heroTitle.innerHTML = '';
      words.forEach(function (word, index) {
        var span = document.createElement('span');
        span.className = 'word-reveal';
        span.style.setProperty('--word-index', index);
        span.textContent = word;
        heroTitle.appendChild(span);
        if (index < words.length - 1) {
          heroTitle.appendChild(document.createTextNode(' '));
        }
      });
    }

    // 2. Add entrance classes to Hero elements
    var heroBadge = document.querySelector('.hero:not(.hero--carousel) .hero__badge, .page-header__badge');
    if (heroBadge) heroBadge.classList.add('hero__badge-anim');

    var heroIntro = document.querySelector('.hero:not(.hero--carousel) .hero__intro, .page-header__subtitle');
    if (heroIntro) heroIntro.classList.add('hero__intro-anim');

    var heroActions = document.querySelector('.hero:not(.hero--carousel) .hero__actions, .page-header__actions');
    if (heroActions) heroActions.classList.add('hero__actions-anim');

    var heroImage = document.querySelector('.hero:not(.hero--carousel) .hero__image-card');
    if (heroImage) heroImage.classList.add('hero__image-anim');

    // 3. Scroll-Triggered Reveals for Section Headers & Content Blocks
    var targets = document.querySelectorAll(
      'section:not(.section--testimonials) > .container > div:first-child, ' +
      '.section:not(.section--testimonials) > .container > div:first-child, ' +
      '.service-detail-grid, ' +
      '.why-grid, ' +
      '.services-category-grid, ' +
      '.home-care-duo, ' +
      '.contact-methods-grid'
    );

    if ('IntersectionObserver' in window) {
      var scrollObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            scrollObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      });

      targets.forEach(function (el) {
        el.classList.add('scroll-reveal');

        // Add stagger index to children if grid
        if (el.classList.contains('service-detail-grid') ||
          el.classList.contains('why-grid') ||
          el.classList.contains('services-category-grid') ||
          el.classList.contains('contact-methods-grid')) {
          Array.from(el.children).forEach(function (child, i) {
            child.classList.add('scroll-reveal-stagger');
            child.style.setProperty('--stagger-i', i);
          });
        }

        // Check if already in viewport on initial load
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-revealed');
        } else {
          scrollObserver.observe(el);
        }
      });
    } else {
      targets.forEach(function (el) {
        el.classList.add('is-revealed');
      });
    }
  }

  /**
   * Interactive Healthcare Situations Navigator ("Find the Care You Need")
   * Implements accessible tab switching, keyboard arrow navigation, and smooth panel transitions.
   */
  function initCareSituationNavigator() {
    var tabList = document.querySelector('.care-scenario-tabs');
    if (!tabList) return;

    var tabs = Array.from(tabList.querySelectorAll('.care-tab-btn'));
    var panels = Array.from(document.querySelectorAll('.care-scenario-panel'));
    if (!tabs.length || !panels.length) return;

    function activateTab(targetTab) {
      var targetPanelId = targetTab.getAttribute('aria-controls');
      var targetPanel = document.getElementById(targetPanelId);
      if (!targetPanel) return;

      // Update tabs state
      tabs.forEach(function (tab) {
        var isTarget = tab === targetTab;
        tab.classList.toggle('is-active', isTarget);
        tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
        tab.setAttribute('tabindex', isTarget ? '0' : '-1');
      });

      // Update panels state
      panels.forEach(function (panel) {
        var isTarget = panel === targetPanel;
        if (isTarget) {
          panel.classList.add('is-active');
        } else {
          panel.classList.remove('is-active');
        }
      });

      // Ensure active tab is visible in scroll container (especially on mobile/tablet)
      if (tabList.scrollWidth > tabList.clientWidth) {
        targetTab.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }

    // Click handlers
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        activateTab(tab);
      });
    });

    // Keyboard navigation (WAI-ARIA Tablist Pattern)
    tabList.addEventListener('keydown', function (e) {
      var currentTab = document.activeElement;
      var currentIndex = tabs.indexOf(currentTab);
      if (currentIndex === -1) return;

      var newIndex = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = tabs.length - 1;
      }

      if (newIndex !== -1) {
        tabs[newIndex].focus();
        activateTab(tabs[newIndex]);
      }
    });
  }

  /**
   * Homepage Hero Carousel Component
   * Supports 3-slide crossfade, auto-advance with hover pause,
   * mobile touch swiping, and reduced-motion accessibility.
   */
  function initHeroCarousel() {
    var carousel = document.getElementById('heroCarousel');
    if (!carousel) return;

    var slides = carousel.querySelectorAll('.hero-carousel__slide');
    var dots = carousel.querySelectorAll('.hero-carousel__dot');
    var prevBtn = document.getElementById('heroCarouselPrev');
    var nextBtn = document.getElementById('heroCarouselNext');

    if (!slides.length) return;

    var currentIndex = 0;
    var totalSlides = slides.length;
    var timer = null;
    var AUTO_INTERVAL = 3000; // 6 seconds
    var isPaused = false;
    var prefersReducedMotion = false;

    try {
      prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) { }

    function showSlide(index, announce) {
      if (index < 0) {
        index = totalSlides - 1;
      } else if (index >= totalSlides) {
        index = 0;
      }
      currentIndex = index;

      slides.forEach(function (slide, idx) {
        if (idx === currentIndex) {
          slide.classList.add('hero-carousel__slide--active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('hero-carousel__slide--active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      dots.forEach(function (dot, idx) {
        if (idx === currentIndex) {
          dot.classList.add('hero-carousel__dot--active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('hero-carousel__dot--active');
          dot.setAttribute('aria-selected', 'false');
        }
      });

      if (announce && typeof announceToScreenReader === 'function') {
        var slideTitle = slides[currentIndex].querySelector('.hero__title');
        if (slideTitle) {
          announceToScreenReader('Slide ' + (currentIndex + 1) + ' of ' + totalSlides + ': ' + slideTitle.textContent.trim());
        }
      }
    }

    function nextSlide() {
      showSlide(currentIndex + 1, false);
    }

    function prevSlide() {
      showSlide(currentIndex - 1, false);
    }

    function startTimer() {
      if (prefersReducedMotion || isPaused) return;
      stopTimer();
      timer = setInterval(function () {
        nextSlide();
      }, AUTO_INTERVAL);
    }

    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    // Previous & Next button handlers
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        startTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        startTimer();
      });
    }

    // Dot pagination click handlers
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var targetIdx = parseInt(dot.getAttribute('data-slide-target'), 10);
        if (!isNaN(targetIdx) && targetIdx !== currentIndex) {
          showSlide(targetIdx, true);
          startTimer();
        }
      });
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', function () {
      isPaused = true;
      stopTimer();
    });

    carousel.addEventListener('mouseleave', function () {
      isPaused = false;
      startTimer();
    });

    // Pause on focus
    carousel.addEventListener('focusin', function () {
      isPaused = true;
      stopTimer();
    });

    carousel.addEventListener('focusout', function () {
      isPaused = false;
      startTimer();
    });

    // Keyboard navigation within carousel
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
        startTimer();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
        startTimer();
      }
    });

    // Mobile touch swipe gestures
    var touchStartX = 0;
    var touchStartY = 0;
    var touchEndX = 0;
    var touchEndY = 0;
    var SWIPE_THRESHOLD = 45;

    carousel.addEventListener('touchstart', function (e) {
      if (e.touches && e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchEndX = touchStartX;
        touchEndY = touchStartY;
        isPaused = true;
        stopTimer();
      }
    }, { passive: true });

    carousel.addEventListener('touchmove', function (e) {
      if (e.touches && e.touches.length > 0) {
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;
      }
    }, { passive: true });

    carousel.addEventListener('touchend', function () {
      var deltaX = touchEndX - touchStartX;
      var deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
        if (deltaX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }

      touchStartX = 0;
      touchEndX = 0;
      touchStartY = 0;
      touchEndY = 0;
      isPaused = false;
      startTimer();
    }, { passive: true });

    // Listen for reduced motion preference changes
    try {
      var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      motionQuery.addEventListener('change', function (e) {
        prefersReducedMotion = e.matches;
        if (prefersReducedMotion) {
          stopTimer();
        } else {
          startTimer();
        }
      });
    } catch (err) { }

    // Initialize first slide and start auto-advance
    showSlide(0, false);
    startTimer();
  }

  /**
   * Sticky Header Scroll State
   * Toggles elevated shadow on white header when scrolled
   */
  function initHeaderScrollState() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    function syncSiteHeaderHeight() {
      document.documentElement.style.setProperty('--site-header-height', header.offsetHeight + 'px');
    }

    function onHeaderScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (scrollTop > 10) {
        header.classList.add('site-header--scrolled', 'is-scrolled');
      } else {
        header.classList.remove('site-header--scrolled', 'is-scrolled');
      }
      syncSiteHeaderHeight();
    }

    window.addEventListener('scroll', onHeaderScroll, { passive: true });
    window.addEventListener('resize', syncSiteHeaderHeight, { passive: true });
    syncSiteHeaderHeight();
    onHeaderScroll();
  }

  // Initialize all interactive modules on DOM Ready
  /**
 * Client Testimonials Slider (Tamtech-Style Centered Active Carousel)
 * Smooth infinite clone-based looping, autoplay with pause on hover/focus,
 * accessible controls, safety timeouts, and responsive centered positioning.
 */
  function initTestimonialsSliders() {
    var sliders = document.querySelectorAll('.testimonials-slider');
    if (!sliders.length) return;

    sliders.forEach(function (slider) {
      var viewport = slider.querySelector('.testimonials-slider__viewport');
      var track = slider.querySelector('.testimonials-slider__track');
      var prevBtn = slider.querySelector('.testimonials-slider__arrow--prev');
      var nextBtn = slider.querySelector('.testimonials-slider__arrow--next');
      var dotsWrap = slider.querySelector('.testimonials-slider__pagination');

      if (!viewport || !track) return;

      var originalCards = Array.from(track.children);
      var N = originalCards.length;
      if (N < 2) return;

      var CLONES = 2; // Clone 2 cards on each end for smooth peeking and transitions

      // Clone at end (first CLONES items)
      for (var i = 0; i < CLONES; i++) {
        var cloneEnd = originalCards[i].cloneNode(true);
        cloneEnd.setAttribute('data-clone', 'end');
        cloneEnd.setAttribute('aria-hidden', 'true');
        track.appendChild(cloneEnd);
      }

      // Clone at start (last CLONES items)
      for (var j = N - 1; j >= N - CLONES; j--) {
        var cloneStart = originalCards[j].cloneNode(true);
        cloneStart.setAttribute('data-clone', 'start');
        cloneStart.setAttribute('aria-hidden', 'true');
        track.insertBefore(cloneStart, track.firstChild);
      }

      var allCards = Array.from(track.children);
      var domIndex = CLONES; // Start at real slide 0
      var isTransitioning = false;
      var transitionSafetyTimer = null;
      var autoplayTimer = null;
      var AUTOPLAY_DELAY = 4500; // 4.5 seconds

      // Create pagination dots
      if (dotsWrap) {
        dotsWrap.innerHTML = '';
        for (var k = 0; k < N; k++) {
          var dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'testimonials-slider__dot' + (k === 0 ? ' testimonials-slider__dot--active' : '');
          dot.setAttribute('role', 'tab');
          dot.setAttribute('aria-label', 'Go to testimonial ' + (k + 1) + ' of ' + N);
          dot.setAttribute('aria-selected', k === 0 ? 'true' : 'false');
          (function (targetRealIndex) {
            dot.addEventListener('click', function () {
              goToRealIndex(targetRealIndex);
            });
          })(k);
          dotsWrap.appendChild(dot);
        }
      }

      function getRealIndex(domIdx) {
        return ((domIdx - CLONES) % N + N) % N;
      }

      function updateActiveStates() {
        var activeRealIdx = getRealIndex(domIndex);

        allCards.forEach(function (card, idx) {
          if (idx === domIndex) {
            card.classList.add('is-active');
            card.setAttribute('aria-hidden', 'false');
          } else {
            card.classList.remove('is-active');
            card.setAttribute('aria-hidden', 'true');
          }
        });

        if (dotsWrap) {
          var dots = dotsWrap.querySelectorAll('.testimonials-slider__dot');
          dots.forEach(function (dot, idx) {
            if (idx === activeRealIdx) {
              dot.classList.add('testimonials-slider__dot--active');
              dot.setAttribute('aria-selected', 'true');
            } else {
              dot.classList.remove('testimonials-slider__dot--active');
              dot.setAttribute('aria-selected', 'false');
            }
          });
        }
      }

      function getTranslateOffset(idx) {
        var V = viewport.offsetWidth;
        var card = allCards[idx] || allCards[CLONES];
        var cw = card ? card.offsetWidth : 470;
        var gap = window.innerWidth <= 680 ? 16 : 24;
        return (V - cw) / 2 - idx * (cw + gap);
      }

      function handleLoopReset() {
        if (domIndex >= CLONES + N) {
          moveTo(domIndex - N, false);
        } else if (domIndex < CLONES) {
          moveTo(domIndex + N, false);
        }
      }

      function moveTo(idx, animated) {
        domIndex = idx;
        clearTimeout(transitionSafetyTimer);

        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (animated && !prefersReduced) {
          track.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
          isTransitioning = true;
          // Safety timeout ensures isTransitioning is NEVER permanently stuck
          transitionSafetyTimer = setTimeout(function () {
            if (isTransitioning) {
              isTransitioning = false;
              handleLoopReset();
            }
          }, 700);
        } else {
          track.style.transition = 'none';
          isTransitioning = false;
        }

        var offset = getTranslateOffset(domIndex);
        track.style.transform = 'translateX(' + offset + 'px)';
        updateActiveStates();
      }

      function goToRealIndex(realIdx) {
        resetAutoplay();
        moveTo(realIdx + CLONES, true);
      }

      function nextSlide() {
        if (isTransitioning) return;
        resetAutoplay();
        moveTo(domIndex + 1, true);
      }

      function prevSlide() {
        if (isTransitioning) return;
        resetAutoplay();
        moveTo(domIndex - 1, true);
      }

      // Seamless loop reset on transitionend
      track.addEventListener('transitionend', function (e) {
        if (e.target !== track) return;
        clearTimeout(transitionSafetyTimer);
        isTransitioning = false;
        handleLoopReset();
      });

      // Side card click to navigate
      allCards.forEach(function (card, idx) {
        card.addEventListener('click', function () {
          if (idx !== domIndex) {
            resetAutoplay();
            moveTo(idx, true);
          }
        });
      });

      // Navigation Buttons
      if (nextBtn) {
        nextBtn.addEventListener('click', function (e) {
          e.preventDefault();
          nextSlide();
        });
      }
      if (prevBtn) {
        prevBtn.addEventListener('click', function (e) {
          e.preventDefault();
          prevSlide();
        });
      }

      // Autoplay with Pause on Hover / Focus / Inactivity
      function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(function () {
          nextSlide();
        }, AUTOPLAY_DELAY);
      }

      function stopAutoplay() {
        if (autoplayTimer) {
          clearInterval(autoplayTimer);
          autoplayTimer = null;
        }
      }

      function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
      }

      slider.addEventListener('mouseenter', stopAutoplay);
      slider.addEventListener('mouseleave', startAutoplay);
      slider.addEventListener('focusin', stopAutoplay);
      slider.addEventListener('focusout', startAutoplay);

      // Visibility change (pause when tab hidden, resume when tab visible)
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          stopAutoplay();
        } else {
          startAutoplay();
        }
      });

      // Keyboard Navigation
      slider.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
          nextSlide();
        } else if (e.key === 'ArrowLeft') {
          prevSlide();
        }
      });

      // Touch / Swipe Navigation
      var startX = 0;
      var isSwiping = false;

      slider.addEventListener('touchstart', function (e) {
        if (e.touches && e.touches.length) {
          startX = e.touches[0].clientX;
          isSwiping = true;
          stopAutoplay();
        }
      }, { passive: true });

      slider.addEventListener('touchend', function (e) {
        if (!isSwiping) return;
        var endX = (e.changedTouches && e.changedTouches.length) ? e.changedTouches[0].clientX : startX;
        var diff = startX - endX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
        isSwiping = false;
        startAutoplay();
      }, { passive: true });

      // Resize observer / window resize
      var resizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          moveTo(domIndex, false);
        }, 80);
      });

      // Layout ready alignment
      setTimeout(function () {
        moveTo(domIndex, false);
      }, 100);

      window.addEventListener('load', function () {
        moveTo(domIndex, false);
      });

      // Initial layout setup
      moveTo(domIndex, false);
      startAutoplay();
    });
  }

  /**
   * Footer Social Media Icons Initialization
   */
  function initFooterSocialIcons() {
    var config = window.AROVIA_SOCIAL_CONFIG || {
      instagram: { name: 'Instagram', url: 'https://www.instagram.com/arovia_homecare?utm_source=qr&obrf=cGlpanF5ZW5kMGM0', statusText: 'Official Profile' },
      youtube: { name: 'YouTube', url: 'https://youtube.com/@arovia_homecareservices?si=G9FTV7dmVCOyWMSB', statusText: 'Official Channel' },
      facebook: { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61596182516516', statusText: 'Official Page' }
    };

    var footerIcons = document.querySelectorAll('.footer-social-icon');
    footerIcons.forEach(function (item) {
      var platform = item.getAttribute('data-platform');
      var pConfig = config[platform];
      if (!pConfig) return;

      if (pConfig.url) {
        item.setAttribute('href', pConfig.url);
        item.setAttribute('target', '_blank');
        item.setAttribute('rel', 'noopener noreferrer');
        item.removeAttribute('role');
      } else {
        item.setAttribute('href', '#');
        item.setAttribute('role', 'button');
      }

      item.addEventListener('click', function (e) {
        if (!pConfig.url) {
          e.preventDefault();
          var msg = pConfig.comingSoonMessage || ("Arovia's official " + pConfig.name + ' channel is coming soon. For care services, call our helpline.');
          if (typeof announceToScreenReader === 'function') {
            announceToScreenReader(msg);
          }
        }
      });
    });
  }

  function initApp() {
    highlightActiveNav();
    initCopyPhoneButtons();
    initConnectDock();
    initCareSituationNavigator();
    initScrollProgressLine();
    initHeaderScrollState();
    initCinematicCta();
    initTypographyAnimations();
    initHeroCarousel();
    initTestimonialsSliders();
    initFooterSocialIcons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
  window.addEventListener('pageshow', highlightActiveNav);
})();


