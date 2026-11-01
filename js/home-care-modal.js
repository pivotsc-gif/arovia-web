/**
 * Arovia Healthcare — Home Care Services Category Switcher & Comprehensive Modal
 * Powers:
 * 1. Category Switcher (Clinical Care vs Non-Clinical Care)
 * 2. Complete, vertically scrollable single-step Details Modal displaying all service information immediately
 */

(function() {
  'use strict';

  function initHomeCareServicesHub() {
    // -------------------------------------------------------------
    // 1. Pivot-Style Sticky Category & Numbered Service Navigation
    // -------------------------------------------------------------
    const btnClinical = document.getElementById('btnClinicalCare');
    const btnNonClinical = document.getElementById('btnNonClinicalCare');
    const introClinical = document.getElementById('introClinical');
    const introNonClinical = document.getElementById('introNonClinical');
    const serviceItems = document.querySelectorAll('.hc-service-item');
    const subnavClinical = document.getElementById('subnavClinical');
    const subnavNonClinical = document.getElementById('subnavNonClinical');
    const stickyNavBar = document.getElementById('hcStickyNavBar');
    const serviceSubnav = document.getElementById('hcServiceSubnav');

    let currentCategory = 'clinical';
    let isClickScrolling = false;
    let clickScrollTimer = null;

    function updateStickyOffsets() {
      const siteHeader = document.querySelector('.site-header');
      const siteHeaderHeight = siteHeader ? siteHeader.offsetHeight : 80;
      const stickyBarHeight = stickyNavBar ? stickyNavBar.offsetHeight : 120;
      document.documentElement.style.setProperty('--site-header-height', siteHeaderHeight + 'px');
      document.documentElement.style.setProperty('--hc-sticky-nav-height', stickyBarHeight + 'px');
      return { siteHeaderHeight, stickyBarHeight, total: siteHeaderHeight + stickyBarHeight };
    }

    function setActiveSubnavItem(targetId) {
      const activeGroup = currentCategory === 'clinical' ? subnavClinical : subnavNonClinical;
      if (!activeGroup) return;

      const items = activeGroup.querySelectorAll('.hc-subnav-item');
      items.forEach(item => {
        const itemTarget = item.getAttribute('data-target') || item.getAttribute('href').replace('#', '');
        const isActive = itemTarget === targetId;
        item.classList.toggle('hc-subnav-item--active', isActive);
        item.setAttribute('aria-selected', isActive ? 'true' : 'false');

        if (isActive && serviceSubnav) {
          // If mobile horizontal scroll, bring active item into view
          const itemLeft = item.offsetLeft;
          const itemRight = itemLeft + item.offsetWidth;
          const scrollLeft = serviceSubnav.scrollLeft;
          const clientWidth = serviceSubnav.clientWidth;

          if (itemLeft < scrollLeft) {
            serviceSubnav.scrollTo({ left: Math.max(0, itemLeft - 16), behavior: 'smooth' });
          } else if (itemRight > scrollLeft + clientWidth) {
            serviceSubnav.scrollTo({ left: itemRight - clientWidth + 16, behavior: 'smooth' });
          }
        }
      });
    }

    function setCategory(category, options) {
      options = options || {};
      currentCategory = category;
      const isClinical = category === 'clinical';

      // Update button states & ARIA
      if (btnClinical) {
        btnClinical.classList.toggle('hc-category-btn--active', isClinical);
        btnClinical.setAttribute('aria-selected', isClinical ? 'true' : 'false');
      }
      if (btnNonClinical) {
        btnNonClinical.classList.toggle('hc-category-btn--active', !isClinical);
        btnNonClinical.setAttribute('aria-selected', !isClinical ? 'true' : 'false');
      }

      // Toggle Second-level Subnav Groups
      if (subnavClinical) subnavClinical.style.display = isClinical ? '' : 'none';
      if (subnavNonClinical) subnavNonClinical.style.display = !isClinical ? '' : 'none';

      // Update Subtext Intros
      if (introClinical) introClinical.style.display = isClinical ? 'block' : 'none';
      if (introNonClinical) introNonClinical.style.display = !isClinical ? 'block' : 'none';

      // Toggle Service Cards
      serviceItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (itemCat === category) {
          item.style.display = 'block';
          item.style.animation = 'hcFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        } else {
          item.style.display = 'none';
        }
      });

      // Activate subnav item
      const activeGroup = isClinical ? subnavClinical : subnavNonClinical;
      if (activeGroup) {
        const targetItem = options.targetId
          ? activeGroup.querySelector('[data-target="' + options.targetId + '"]')
          : activeGroup.querySelector('.hc-subnav-item');
        if (targetItem) {
          const targetId = targetItem.getAttribute('data-target') || targetItem.getAttribute('href').replace('#', '');
          setActiveSubnavItem(targetId);
        }
      }

      updateStickyOffsets();
    }

    function scrollToService(targetId) {
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const cat = targetEl.getAttribute('data-category');
      if (cat && cat !== currentCategory) {
        setCategory(cat, { targetId: targetId });
      } else {
        setActiveSubnavItem(targetId);
      }

      const offsets = updateStickyOffsets();
      const rect = targetEl.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = rect.top + scrollTop - offsets.total - 18;

      isClickScrolling = true;
      clearTimeout(clickScrollTimer);
      clickScrollTimer = setTimeout(function() {
        isClickScrolling = false;
      }, 850);

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
      });

      if (history.replaceState) {
        history.replaceState(null, '', '#' + targetId);
      }
    }

    // Click handler for Level 2 Subnav items
    document.addEventListener('click', function(e) {
      const subnavLink = e.target.closest('.hc-subnav-item');
      if (subnavLink) {
        e.preventDefault();
        const targetId = subnavLink.getAttribute('data-target') || subnavLink.getAttribute('href').replace('#', '');
        if (targetId) {
          scrollToService(targetId);
        }
      }
    });

    // Scroll-Spy & Sticky state handler
    let scrollSpyTicking = false;

    function handleScrollSpy() {
      const offsets = updateStickyOffsets();

      // Toggle stuck shadow on sticky bar
      if (stickyNavBar) {
        const barTop = stickyNavBar.getBoundingClientRect().top;
        if (barTop <= offsets.siteHeaderHeight + 2) {
          stickyNavBar.classList.add('is-stuck');
        } else {
          stickyNavBar.classList.remove('is-stuck');
        }
      }

      if (isClickScrolling) return;

      // Detect active service among visible category cards
      const visibleCards = Array.from(serviceItems).filter(function(item) {
        return item.getAttribute('data-category') === currentCategory && item.style.display !== 'none';
      });

      if (visibleCards.length === 0) return;

      const threshold = offsets.total + 60;
      let currentActiveId = visibleCards[0].id;

      for (let i = 0; i < visibleCards.length; i++) {
        const card = visibleCards[i];
        const rect = card.getBoundingClientRect();
        if (rect.top <= threshold) {
          currentActiveId = card.id;
        } else {
          break;
        }
      }

      setActiveSubnavItem(currentActiveId);
    }

    function onWindowScroll() {
      if (!scrollSpyTicking) {
        window.requestAnimationFrame(function() {
          handleScrollSpy();
          scrollSpyTicking = false;
        });
        scrollSpyTicking = true;
      }
    }

    window.addEventListener('scroll', onWindowScroll, { passive: true });
    window.addEventListener('resize', updateStickyOffsets, { passive: true });

    function firstServiceId(category) {
      const card = Array.from(serviceItems).find(function (item) {
        return item.getAttribute('data-category') === category && item.id;
      });
      return card ? card.id : '';
    }

    function openCategory(category) {
      setCategory(category);
      const targetId = firstServiceId(category);
      if (targetId) {
        scrollToService(targetId);
      }
    }

    if (btnClinical) {
      btnClinical.addEventListener('click', function(e) {
        e.preventDefault();
        openCategory('clinical');
      });
    }

    if (btnNonClinical) {
      btnNonClinical.addEventListener('click', function(e) {
        e.preventDefault();
        openCategory('non-clinical');
      });
    }

    // Default to Clinical Care on page load
    setCategory('clinical');
    updateStickyOffsets();
    handleScrollSpy();

    // -------------------------------------------------------------
    // 2. Comprehensive Scrollable Service Details Modal
    // -------------------------------------------------------------
    const overlay = document.getElementById('hcModalOverlay');
    if (!overlay) return;

    // Modal DOM Elements
    const modalNum = document.getElementById('hcModalNum');
    const modalCategoryTag = document.getElementById('hcModalCategoryTag');
    const modalClose = document.getElementById('hcModalClose');
    const modalCloseBtn = document.getElementById('hcModalCloseBtn');
    const modalImg = document.getElementById('hcModalImg');
    const modalIconBadge = document.getElementById('hcModalIconBadge');
    const modalTagline = document.getElementById('hcModalTagline');
    const modalTitle = document.getElementById('hcModalTitle');
    const modalIntro = document.getElementById('hcModalIntro');
    const modalIncludes = document.getElementById('hcModalIncludes');
    const modalFeatures = document.getElementById('hcModalFeatures');
    const modalWho = document.getElementById('hcModalWho');
    const modalEligibility = document.getElementById('hcModalEligibility');
    const modalDoctorGuidance = document.getElementById('hcModalDoctorGuidance');
    const modalSafetyText = document.getElementById('hcModalSafetyText');
    const modalSteps = document.getElementById('hcModalSteps');
    const modalFullPageLink = document.getElementById('hcModalFullPageLink');
    const modalScrollBody = document.getElementById('hcModalScrollBody');

    function openModal(slug) {
      if (!window.getHomeCareService) return;
      const service = window.getHomeCareService(slug);
      if (!service) return;

      // Ensure appropriate category is active if this service belongs to it
      if (service.categoryType && service.categoryType !== currentCategory) {
        setCategory(service.categoryType);
      }

      // 1. Header meta
      if (modalNum) modalNum.textContent = service.number;
      if (modalCategoryTag) modalCategoryTag.textContent = service.category;

      // 2. Hero Banner
      if (modalImg) {
        modalImg.src = service.image;
        modalImg.alt = service.imageAlt || service.title;
      }
      if (modalIconBadge) {
        modalIconBadge.innerHTML = service.iconSvg || '';
      }
      if (modalTagline) modalTagline.textContent = service.tagline || (service.category + ' Service');
      if (modalTitle) modalTitle.textContent = service.title;
      if (modalIntro) modalIntro.textContent = service.intro || service.shortDesc;

      // 3. What This Service Includes (Official Care Schedule)
      if (modalIncludes && service.bullets) {
        modalIncludes.innerHTML = service.bullets.map(bullet => `
          <div class="hc-modal-include-item">
            <div class="hc-modal-include-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p class="hc-modal-include-text">${bullet}</p>
          </div>
        `).join('');
      }

      // 4. Key Features & Care Activities
      if (modalFeatures && service.keyFeatures) {
        modalFeatures.innerHTML = service.keyFeatures.map(feat => `
          <div class="hc-feature-chip">
            <svg class="hc-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${feat}</span>
          </div>
        `).join('');
      }

      // 5. Who This Service Is For (Patient Suitability)
      if (modalWho && service.whoIsItFor) {
        modalWho.innerHTML = service.whoIsItFor.map(item => `
          <div class="hc-modal-who-item">
            <div class="hc-modal-who-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div>${item}</div>
          </div>
        `).join('');
      }

      // 6. Eligibility & Care Requirements
      if (modalEligibility && service.eligibility) {
        modalEligibility.innerHTML = `
          <ul class="hc-modal-eligibility-list">
            ${service.eligibility.map(req => `
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>${req}</span>
              </li>
            `).join('')}
          </ul>
        `;
      }

      // 7. Care Planning & Treating Doctor Guidance
      if (modalDoctorGuidance && service.carePlanning) {
        modalDoctorGuidance.innerHTML = `
          <p style="margin: 0;">${service.carePlanning}</p>
        `;
      }

      // 8. Safety Advisory & Limitations
      if (modalSafetyText && (service.clinicalDistinction || service.safetyGuidance)) {
        modalSafetyText.innerHTML = `
          <p>${service.clinicalDistinction || service.safetyGuidance}</p>
        `;
      }

      // 9. Process & Steps to Arrange Care
      if (modalSteps && service.processSteps) {
        modalSteps.innerHTML = service.processSteps.map(st => `
          <div class="hc-modal-step-card">
            <div class="hc-modal-step-badge" aria-hidden="true">${st.step}</div>
            <h5 class="hc-modal-step-title">${st.title}</h5>
            <p class="hc-modal-step-desc">${st.desc}</p>
          </div>
        `).join('');
      }

      // 10. Dedicated Service Page Link
      if (modalFullPageLink) {
        modalFullPageLink.href = `home-care-service.html?service=${service.slug}`;
        modalFullPageLink.setAttribute('aria-label', `Open full page for ${service.title}`);
      }

      // Reset scroll position to top
      if (modalScrollBody) {
        modalScrollBody.scrollTop = 0;
      }

      // Open Modal with smooth transition
      overlay.style.display = 'flex';
      void overlay.offsetHeight; // trigger reflow
      overlay.classList.add('hc-modal-overlay--open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Update URL hash without jumping
      if (history.replaceState) {
        history.replaceState(null, '', `#details-${service.slug}`);
      }

      // Focus close button for accessibility
      if (modalClose) {
        setTimeout(() => modalClose.focus(), 50);
      }
    }

    function closeModal() {
      overlay.classList.remove('hc-modal-overlay--open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (!overlay.classList.contains('hc-modal-overlay--open')) {
          overlay.style.display = 'none';
        }
      }, 250);

      // Clean hash
      if (history.replaceState && window.location.hash.startsWith('#details-')) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    // Event Delegation for View Details buttons
    document.addEventListener('click', function(e) {
      const targetBtn = e.target.closest('.js-open-service-modal');
      if (targetBtn) {
        e.preventDefault();
        const slug = targetBtn.getAttribute('data-slug');
        if (slug) openModal(slug);
      }
    });

    // Close buttons
    if (modalClose) {
      modalClose.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
      });
    }
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
      });
    }

    // Overlay backdrop click to close
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeModal();
      }
    });

    // Escape key to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('hc-modal-overlay--open')) {
        closeModal();
      }
    });

    // -------------------------------------------------------------
    // 3. Category & Card Direct Deep Linking (e.g. from Home page Physiotherapy)
    // -------------------------------------------------------------
    function handleDeepLinking() {
      const hash = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      const focusParam = params.get('focus') || params.get('card');

      // Check category query param
      if (catParam === 'clinical' || catParam === 'non-clinical') {
        setCategory(catParam);
      }

      // Check if hash or param points to a specific service card
      let targetId = '';
      if (hash && hash.startsWith('#service-')) {
        targetId = hash.substring(1);
      } else if (focusParam) {
        targetId = focusParam.startsWith('service-') ? focusParam : 'service-' + focusParam;
      }

      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const cat = targetEl.getAttribute('data-category');
          if (cat && cat !== currentCategory) {
            setCategory(cat);
          }
          // Smooth scroll accounting for sticky navbar & topbar
          setTimeout(() => {
            scrollToService(targetId);

            // Focus & visual highlight
            targetEl.classList.add('hc-service-item--targeted');
            setTimeout(() => {
              targetEl.classList.remove('hc-service-item--targeted');
            }, 3500);
          }, 150);
        }
      }
    }

    // Auto open from URL hash or query params
    const hash = window.location.hash;
    if (hash && hash.startsWith('#details-')) {
      const slug = hash.replace('#details-', '');
      setTimeout(() => openModal(slug), 100);
    } else {
      const params = new URLSearchParams(window.location.search);
      const qSlug = params.get('service');
      if (qSlug) {
        setTimeout(() => openModal(qSlug), 100);
      }
    }

    // Execute deep link handler on initial load and hash change
    handleDeepLinking();
    window.addEventListener('hashchange', handleDeepLinking);
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomeCareServicesHub);
  } else {
    initHomeCareServicesHub();
  }
})();
