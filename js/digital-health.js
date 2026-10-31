/**
 * Arovia Healthcare — Digital Health Interactive Experience
 * Manages hero mockup tabs, sector tabs, FAQ accordions, and consultation interactions.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Hero Mockup Tab Switching
  const mockupTabs = document.querySelectorAll('.dh-mockup-tab');
  const mockupViews = document.querySelectorAll('.dh-mockup-view');

  mockupTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const targetId = tab.getAttribute('data-view');

      mockupTabs.forEach(function (t) { t.classList.remove('active'); });
      mockupViews.forEach(function (v) { v.classList.remove('active'); });

      tab.classList.add('active');
      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.classList.add('active');
      }
    });
  });

  // 2. Sector Tabs Switching
  const sectorTabBtns = document.querySelectorAll('.dh-sector-tab-btn');
  const sectorContents = document.querySelectorAll('.dh-sector-content');

  sectorTabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const sectorId = btn.getAttribute('data-sector');

      sectorTabBtns.forEach(function (b) { b.classList.remove('active'); });
      sectorContents.forEach(function (c) { c.classList.remove('active'); });

      btn.classList.add('active');
      const targetContent = document.getElementById(sectorId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // 3. Interactive FAQ Accordion & Category Filter
  const faqItems = document.querySelectorAll('.dh-faq-item');
  const faqCatBtns = document.querySelectorAll('.dh-faq-cat-btn');

  // Accordion Toggle
  faqItems.forEach(function (item) {
    const btn = item.querySelector('.dh-faq-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      const isActive = item.classList.contains('active');

      // Close other items
      faqItems.forEach(function (other) {
        other.classList.remove('active');
        const otherBtn = other.querySelector('.dh-faq-btn');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // FAQ Category Filter
  faqCatBtns.forEach(function (catBtn) {
    catBtn.addEventListener('click', function () {
      const category = catBtn.getAttribute('data-category');

      faqCatBtns.forEach(function (b) { b.classList.remove('active'); });
      catBtn.classList.add('active');

      faqItems.forEach(function (item) {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 4. Smooth Anchor Scrolling with Header Offset
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetHref = this.getAttribute('href');
      if (targetHref === '#' || targetHref === '') return;

      const targetEl = document.querySelector(targetHref);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const topbarHeight = document.querySelector('.topbar')?.offsetHeight || 40;
        const totalOffset = headerHeight + topbarHeight + 10;

        const elPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elPosition - totalOffset,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. Consultation Scoping Form Handler
  const consultForm = document.getElementById('dhConsultForm');
  if (consultForm) {
    consultForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = consultForm.querySelector('.dh-form-btn');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Preparing Consultation...';

      setTimeout(function () {
        submitBtn.textContent = '✓ Request Received — Calling Soon!';
        submitBtn.style.background = '#10b981';

        // Provide clear feedback
        const feedback = document.createElement('div');
        feedback.style.marginTop = '12px';
        feedback.style.fontSize = '0.85rem';
        feedback.style.color = '#005662';
        feedback.style.fontWeight = '600';
        feedback.innerHTML = 'Thank you! Our Digital Health Solutions Desk will review your project brief and call you at the provided number.';
        consultForm.appendChild(feedback);

        consultForm.reset();
      }, 700);
    });
  }

  // 6. Numbered Alternating Services Details Modal (Reference Style)
  const dhSolutionsData = {
    '01': {
      title: 'Build Your Online Presence & Portals',
      tagline: 'Websites, Patient Portals & Digital Front Doors',
      desc: 'Websites and patient self-service portals that explain clinical capabilities with absolute clarity, build patient trust, and convert visitors into confirmed appointments.',
      image: 'assets/images/digital_hero.png',
      imageAlt: 'Arovia doctor holding digital healthcare tablet with patient portals and clinical analytics interface',
      iconSvg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
      coversTitle: 'WHAT THIS SOLUTION COVERS',
      covers: [
        'Hospital, multispecialty & specialty clinic websites',
        'Diagnostic center test booking & online report delivery portals',
        'Pharmacy catalogue & medicine inquiry portals',
        'Self-service patient portals: appointment booking, bill payment & secure teleconsultation'
      ],
      highlights: [
        'WCAG Accessible (AA Compliant)',
        'Fast Load Speeds & Mobile-First UX',
        'Secure Patient Teleconsultation',
        'Direct Doctor-Patient Scheduling',
        'High Patient Trust Presentation',
        'SEO & Search Visibility Optimized'
      ],
      primaryBtnText: 'Plan Your Website',
      primaryBtnHref: '#consultation'
    },
    '02': {
      title: 'Create Mobile Apps for Care & Operations',
      tagline: 'iOS & Android Apps for Patients & Clinicians',
      desc: 'High-performance native and cross-platform apps built specifically for mobile jobs: daily patient vitals tracking, medication reminders, teleconsultations, and bedside doctor rounds.',
      image: 'assets/images/nurse_clinical.jpg',
      imageAlt: 'Clinical healthcare specialist using mobile clinical applications and bedside monitoring tools',
      iconSvg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path></svg>',
      coversTitle: 'WHAT THIS SOLUTION COVERS',
      covers: [
        'Patient engagement apps: health records, reminders, lab tracking & chat',
        'Clinician apps: daily patient rounds, voice notes, digital prescriptions & alerts',
        'Caregiver & homecare mobile tools with GPS visit logging & vitals syncing',
        'Hospital operations: staff scheduling, nurse bed management & porter dispatch'
      ],
      highlights: [
        'Offline-Capable Local Data Sync',
        'Biometric Face/Touch ID Security',
        'Push Notifications & Emergency Alerts',
        'GPS-Verified Homecare Check-ins',
        'iOS & Android App Store Handover',
        'Instant Vitals & Telemedicine Bridge'
      ],
      primaryBtnText: 'Discuss Your Mobile App',
      primaryBtnHref: '#consultation'
    },
    '03': {
      title: 'Connect Your Systems with Integrated Platforms',
      tagline: 'Centralized Patient Management & Multi-Department EHR',
      desc: 'Eliminate dangerous handoff gaps and duplicate clerical work. Connect registration, clinical charting, laboratory diagnostics, pharmacy dispensing, and billing into one unified database.',
      image: 'assets/images/pharmacy_consultation.jpg',
      imageAlt: 'Clinical specialist managing multi-department electronic health records and pharmaceutical system workflows',
      iconSvg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>',
      coversTitle: 'WHAT THIS SOLUTION COVERS',
      covers: [
        'Centralized longitudinal patient record across all departments',
        'Integrated clinical workflows: OP/IP notes, e-prescriptions & care plans',
        'Pharmacy dispensing workflows, inventory thresholds & batch control',
        'Operational intelligence: bed occupancy, wait times & revenue cycles'
      ],
      highlights: [
        'Zero Double-Entry Clerical Burden',
        'Granular Role-Based Access Control',
        'Multi-Branch Hospital Scalability',
        'Real-Time Bed & Wait Time Tracking',
        'Billing & Inventory Ledger Sync',
        'HL7 & FHIR Standards Interoperability'
      ],
      primaryBtnText: 'Explore Platform Integration',
      primaryBtnHref: '#consultation'
    },
    '04': {
      title: 'Custom Software for Specific Clinical Needs',
      tagline: 'Tailored Systems When Off-the-Shelf Tools Fall Short',
      desc: 'When standard software cannot accommodate your laboratory analyzers, equipment tracking, or unique specialty care pathways, we engineer custom software that follows your clinical procedures.',
      image: 'assets/images/bento_equipment.jpg',
      imageAlt: 'High-precision digital patient monitoring hardware and custom healthcare software integration',
      iconSvg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
      coversTitle: 'WHAT THIS SOLUTION COVERS',
      covers: [
        'Laboratory Information Systems (LIS) & machine analyzer bidirectional bridges',
        'Ambulance fleet dispatch, GPS telematics & emergency paramedic coordination',
        'Medical equipment asset maintenance, preventive calibration & warranty tracking',
        'Specialty modules: oncology registries, IVF charting, rehabilitation progress logs'
      ],
      highlights: [
        'Bespoke Clinical Logic & Workflows',
        'Legacy Medical Hardware Bridges',
        'Hands-On Staff Training & Onboarding',
        'Automated Analyzer Data Capture',
        'Preventive Calibration Maintenance',
        'HIPAA & NABH Compliance Alignment'
      ],
      primaryBtnText: 'Describe Your Solution',
      primaryBtnHref: '#consultation'
    }
  };

  const modal = document.getElementById('dhSolutionModal');
  const modalClose = document.getElementById('dhModalClose');
  const modalIcon = document.getElementById('dhModalIcon');
  const modalHeaderTitle = document.getElementById('dhModalHeaderTitle');
  const modalTitle = document.getElementById('dhModalTitle');
  const modalTagline = document.getElementById('dhModalTagline');
  const modalDesc = document.getElementById('dhModalDesc');
  const modalImg = document.getElementById('dhModalImg');
  const modalIncludesTitle = document.getElementById('dhModalIncludesTitle');
  const modalList = document.getElementById('dhModalList');
  const modalHighlights = document.getElementById('dhModalHighlights');
  const modalPrimaryBtn = document.getElementById('dhModalPrimaryBtn');
  const modalPrimaryText = document.getElementById('dhModalPrimaryText');

  let lastFocusedElement = null;

  function openDhModal(solKey) {
    const data = dhSolutionsData[solKey];
    if (!data || !modal) return;

    if (modalIcon) modalIcon.innerHTML = data.iconSvg;
    if (modalHeaderTitle) modalHeaderTitle.textContent = data.title;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalTagline) modalTagline.textContent = data.tagline;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalImg) {
      modalImg.src = data.image;
      modalImg.alt = data.imageAlt;
    }
    if (modalIncludesTitle) modalIncludesTitle.textContent = data.coversTitle;

    if (modalList) {
      modalList.innerHTML = data.covers.map(function (item) {
        return '<li class="dh-modal__list-item"><span class="dh-modal__check" aria-hidden="true">&#10003;</span><span>' + item + '</span></li>';
      }).join('');
    }

    if (modalHighlights) {
      modalHighlights.innerHTML = data.highlights.map(function (item) {
        return '<li class="dh-modal__list-item"><span class="dh-modal__check" aria-hidden="true">&#9670;</span><span>' + item + '</span></li>';
      }).join('');
    }

    if (modalPrimaryBtn) {
      modalPrimaryBtn.setAttribute('href', data.primaryBtnHref);
    }
    if (modalPrimaryText) {
      modalPrimaryText.textContent = data.primaryBtnText;
    }

    modal.classList.add('dh-modal--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (modalClose) {
      setTimeout(function () { modalClose.focus(); }, 50);
    }
  }

  function closeDhModal() {
    if (!modal) return;
    modal.classList.remove('dh-modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  document.querySelectorAll('.js-open-dh-modal').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      lastFocusedElement = btn;
      const solKey = btn.getAttribute('data-solution');
      openDhModal(solKey);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeDhModal);
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeDhModal();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('dh-modal--open')) {
      closeDhModal();
    }
  });

  // Clicking primary CTA inside modal closes modal and smoothly scrolls
  if (modalPrimaryBtn) {
    modalPrimaryBtn.addEventListener('click', function () {
      closeDhModal();
    });
  }
});

