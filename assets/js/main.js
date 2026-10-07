/**
 * Sri Viseswara & Sainath Nursery - Interactive Features Script
 * Features: Scroll Reveal, Animated Counters, Live Plant Search, Wholesale Calculator, Lightbox Gallery.
 */

document.addEventListener('DOMContentLoaded', () => {
  const NURSERY_CONFIG = {
    whatsappNumber: '918919858313',
    phoneNumber: '+91 8919858313',
    nurseryName: 'Sri Viseswara & Sainath Nursery (Rajahmundry & Kadiam)'
  };

  /* --------------------------------------------------------------------------
     1. Scroll Reveal Observer
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-zoom');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('reveal-active'));
  }

  /* --------------------------------------------------------------------------
     2. Animated Number Counters
     -------------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 2000;
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const stepVal = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepVal;
        if (current >= target) {
          stat.textContent = target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current).toLocaleString() + suffix;
        }
      }, stepTime);
    });
  };

  const statsSection = document.querySelector('.stats-section');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersAnimated) {
        animateCounters();
        countersAnimated = true;
      }
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  /* --------------------------------------------------------------------------
     3. Header Elevation & Mobile Menu Toggle
     -------------------------------------------------------------------------- */
  const header = document.getElementById('main-header');
  const hamburger = document.getElementById('hamburger-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  if (hamburger && navMenu) {
    const toggleMobileMenu = (state) => {
      const isActive = state !== undefined ? state : !hamburger.classList.contains('active');
      hamburger.classList.toggle('active', isActive);
      navMenu.classList.toggle('active', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    };

    hamburger.addEventListener('click', () => toggleMobileMenu());
    navLinks.forEach(link => link.addEventListener('click', () => toggleMobileMenu(false)));
  }

  /* --------------------------------------------------------------------------
     4. Live Plant Search & Category Filtering
     -------------------------------------------------------------------------- */
  const searchInput = document.getElementById('plant-search-input');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const plantCards = document.querySelectorAll('.plant-card');
  const countBadge = document.getElementById('plant-count-badge');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  const filterPlants = () => {
    let visibleCount = 0;

    plantCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardTitle = (card.querySelector('.plant-title')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('.plant-desc')?.textContent || '').toLowerCase();
      
      const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);
      const matchesSearch = !currentSearchQuery || 
                            cardTitle.includes(currentSearchQuery) || 
                            cardDesc.includes(currentSearchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        card.style.animation = 'zoomIn 0.4s ease forwards';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countBadge) {
      countBadge.textContent = `Showing ${visibleCount} Variety${visibleCount !== 1 ? 'ies' : ''}`;
    }
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      filterPlants();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      filterPlants();
    });
  }

  /* --------------------------------------------------------------------------
     5. Wholesale Freight Calculator
     -------------------------------------------------------------------------- */
  const calcPlantSelect = document.getElementById('calc-plant');
  const calcQtyInput = document.getElementById('calc-qty');
  const calcCitySelect = document.getElementById('calc-city');
  const calcTotalDisplay = document.getElementById('calc-total-num');
  const calcFreightDisplay = document.getElementById('calc-freight-text');
  const calcWhatsappBtn = document.getElementById('calc-whatsapp-btn');

  const plantPrices = {
    'blueberry': { base: 220, bulk500: 180 },
    'miyazaki-mango': { base: 450, bulk500: 380 },
    'thai-jackfruit': { base: 180, bulk500: 140 },
    'tc-banana': { base: 35, bulk500: 25 },
    'royal-palm': { base: 350, bulk500: 280 },
    'malabar-neem': { base: 45, bulk500: 30 }
  };

  const freightRates = {
    'rajahmundry': 0,
    'vijayawada': 1500,
    'visakhapatnam': 1800,
    'hyderabad': 3500,
    'anantapur': 4200,
    'bangalore': 5500,
    'chennai': 4800,
    'other': 5000
  };

  const updateCalculator = () => {
    if (!calcPlantSelect || !calcQtyInput || !calcCitySelect) return;

    const plantKey = calcPlantSelect.value;
    const qty = Math.max(10, parseInt(calcQtyInput.value, 10) || 10);
    const cityKey = calcCitySelect.value;

    const priceInfo = plantPrices[plantKey] || { base: 150, bulk500: 120 };
    const unitPrice = qty >= 500 ? priceInfo.bulk500 : priceInfo.base;
    const plantTotal = unitPrice * qty;
    const freightCost = freightRates[cityKey] !== undefined ? freightRates[cityKey] : 3000;
    const grandTotal = plantTotal + freightCost;

    if (calcTotalDisplay) calcTotalDisplay.textContent = `₹${grandTotal.toLocaleString()}`;

    if (calcFreightDisplay) {
      calcFreightDisplay.textContent = `Includes ₹${unitPrice}/plant (${qty} qty) + Approx. ₹${freightCost.toLocaleString()} freight`;
    }

    if (calcWhatsappBtn) {
      const selectedPlantName = calcPlantSelect.options[calcPlantSelect.selectedIndex].text;
      const selectedCityName = calcCitySelect.options[calcCitySelect.selectedIndex].text;

      const msg = `Hello ${NURSERY_CONFIG.nurseryName},\n\nI would like a formal wholesale quotation for:\n🌱 *Plant*: ${selectedPlantName}\n📦 *Quantity*: ${qty} Saplings\n📍 *Delivery City*: ${selectedCityName}\n💰 *Estimated Total*: ₹${grandTotal.toLocaleString()}\n\nPlease confirm stock availability and dispatch time. Thank you!`;
      calcWhatsappBtn.href = `https://wa.me/${NURSERY_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    }
  };

  if (calcPlantSelect && calcQtyInput && calcCitySelect) {
    calcPlantSelect.addEventListener('change', updateCalculator);
    calcQtyInput.addEventListener('input', updateCalculator);
    calcCitySelect.addEventListener('change', updateCalculator);
    updateCalculator();
  }

  /* --------------------------------------------------------------------------
     6. Lightbox Gallery Modal
     -------------------------------------------------------------------------- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightboxModal && lightboxImg && lightboxClose) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-src') || item.querySelector('img')?.src;
        const caption = item.querySelector('h4')?.textContent || 'Sri Viseswara Nursery Field';
        lightboxImg.src = imgSrc;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightboxModal.classList.add('active');
      });
    });

    const closeLightbox = () => lightboxModal.classList.remove('active');
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  /* --------------------------------------------------------------------------
     7. Accordion FAQs & WhatsApp Orders
     -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  const orderBtns = document.querySelectorAll('.order-whatsapp-btn');
  orderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const plantName = btn.getAttribute('data-plant') || 'Plant Saplings';
      const price = btn.getAttribute('data-price') || 'Wholesale Price';
      
      const text = `Hello Sri Viseswara & Sainath Nursery,\n\nI am interested in buying *${plantName}* (Price: ${price}).\nPlease share available sizes, grafting details, and wholesale rates for bulk order.`;
      const url = `https://wa.me/${NURSERY_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  });
});
