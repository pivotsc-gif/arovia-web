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
});

