/* ===== ASTROBOT BUILD 8 — WHY COVERFLOW FIX ===== */

document.addEventListener('DOMContentLoaded', () => {
  const yrEl = document.getElementById('yr');
  if (yrEl) yrEl.textContent = new Date().getFullYear();

  new Swiper('.tSwiper', {
    slidesPerView: 1, spaceBetween: 12,
    pagination: { el: '.swiper-pagination', clickable: true },
    autoplay: { delay: 5000, disableOnInteraction: false },
    breakpoints: { 600: { slidesPerView: 2 }, 960: { slidesPerView: 3 } }
  });

  document.querySelectorAll('.countup').forEach(el => {
    const t = parseInt(el.dataset.n), s = t / 60; let c = 0;
    const ti = setInterval(() => {
      c = Math.min(c + s, t);
      el.textContent = Math.floor(c).toLocaleString('id');
      if (c >= t) clearInterval(ti);
    }, 22);
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.rv').forEach(el => obs.observe(el));
  setTimeout(() => {
    document.querySelectorAll('.rv:not(.on)').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) { el.classList.add('on'); obs.unobserve(el); }
    });
  }, 80);

  window.addEventListener('scroll', () => {
    const d = document.documentElement;
    document.getElementById('bar').style.width = (d.scrollTop / (d.scrollHeight - d.clientHeight) * 100) + '%';
  });
});

/* ===== Menu ===== */
function openMenu() {
  document.getElementById('pn').classList.add('on');
  document.getElementById('ov').classList.add('on');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  document.getElementById('pn').classList.remove('on');
  document.getElementById('ov').classList.remove('on');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); closeAuthGate(); } });

function toggleFaq(btn) {
  const body = btn.nextElementSibling;
  const isOpen = body.classList.contains('open');
  document.querySelectorAll('.faq-body.open').forEach(b => b.classList.remove('open'));
  document.querySelectorAll('.faq-btn.open').forEach(b => b.classList.remove('open'));
  if (!isOpen) { body.classList.add('open'); btn.classList.add('open'); }
}

/* ===== Script Modal ===== */
function openScriptDetail(type) {
  const modal = document.getElementById('scriptDetailModal');
  if (!modal) return;
  modal.style.display = 'block';
  modal.style.visibility = 'visible';
  modal.style.transform = 'translateX(100%)';
  document.body.style.overflow = 'hidden';
  void modal.offsetHeight;
  modal.style.transform = 'translateX(0)';
  modal.scrollTop = 0;
}

function closeScriptDetail() {
  const modal = document.getElementById('scriptDetailModal');
  if (!modal) return;
  modal.style.transform = 'translateX(100%)';
  setTimeout(() => {
    modal.style.visibility = 'hidden';
    modal.style.display = '';
    document.body.style.overflow = '';
  }, 350);
}

const priceMap = {
  '6K':  { rp: 6000,  total: 6000  },
  '12K': { rp: 12000, total: 12000 },
  '20K': { rp: 20000, total: 20000 },
  '29K': { rp: 29000, total: 29000 },
};

function openOrder(name, price, duration) {
  _doOpenOrder(name, price, duration);
}

function _doOpenOrder(name, price, duration) {
  const $ = id => document.getElementById(id);
  const p = priceMap[price] || { rp: 0, total: 0 };
  const formatted = 'Rp ' + p.total.toLocaleString('id');

  if ($('orderHargaBesar')) $('orderHargaBesar').textContent = formatted;

  const modal = $('orderModal');
  if (!modal) return;
  modal.dataset.pkg      = name;
  modal.dataset.price    = price;
  modal.dataset.duration = duration;
  modal.dataset.total    = p.total;

  modal.style.display = 'block';
  modal.style.visibility = 'visible';
  modal.style.transform = 'translateX(100%)';
  document.body.style.overflow = 'hidden';
  void modal.offsetHeight;
  modal.style.transform = 'translateX(0)';
  modal.scrollTop = 0;
}

function closeOrder() {
  const modal = document.getElementById('orderModal');
  if (!modal) return;
  modal.style.transform = 'translateX(100%)';
  setTimeout(() => {
    modal.style.visibility = 'hidden';
    modal.style.display = '';
    document.body.style.overflow = '';
  }, 350);
}

function handleBeli() {
  const modal = document.getElementById('orderModal');
  const duration = (modal && modal.dataset.duration) || '15 hari';
  const msg = 'hai aku ingin pesan paket sewabot ' + duration;
  const waHref = 'https://wa.me/6289674097203?text=' + encodeURIComponent(msg);
  window.open(waHref, '_blank');
}

function openScriptOrder(nama, harga) {
  const modal = document.getElementById('scriptOrderModal');
  if (!modal) return;
  modal.style.display = 'block';
  modal.style.visibility = 'visible';
  modal.style.transform = 'translateX(100%)';
  document.body.style.overflow = 'hidden';
  void modal.offsetHeight;
  modal.style.transform = 'translateX(0)';
  modal.scrollTop = 0;
}

function closeScriptOrder() {
  const modal = document.getElementById('scriptOrderModal');
  if (!modal) return;
  modal.style.transform = 'translateX(100%)';
  setTimeout(() => {
    modal.style.visibility = 'hidden';
    modal.style.display = '';
    document.body.style.overflow = '';
  }, 350);
}

function handleScriptBeli() {
  const msg = 'halo min saya tertarik dengan premium shina-ai';
  window.open('https://wa.me/6285748415936?text=' + encodeURIComponent(msg), '_blank');
  closeScriptOrder();
}

function closeDetailThenOrder() {
  closeScriptDetail();
  setTimeout(() => openScriptOrder('Premium', 0), 360);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeScriptOrder();
    closeScriptDetail();
    closeOrder();
  }
});

/* ===== SCRIPT BOT DETAIL ===== */
function openScriptBotDetail() {
  const modal = document.getElementById('scriptBotDetailModal');
  if (!modal) return;
  modal.style.display = 'block';
  modal.style.visibility = 'visible';
  modal.style.transform = 'translateX(100%)';
  document.body.style.overflow = 'hidden';
  void modal.offsetHeight;
  modal.style.transform = 'translateX(0)';
  modal.scrollTop = 0;
}

function closeScriptBotDetail() {
  const modal = document.getElementById('scriptBotDetailModal');
  if (!modal) return;
  modal.style.transform = 'translateX(100%)';
  setTimeout(() => {
    modal.style.visibility = 'hidden';
    modal.style.display = '';
    document.body.style.overflow = '';
  }, 350);
}

function filterPricing(tab) {
  ['group','script','scriptbot','jadibot'].forEach(t => {
    const el = document.getElementById('pricing-' + t);
    const btn = document.getElementById('tab-' + t);
    if (el) el.style.display = t === tab ? 'block' : 'none';
    if (btn) btn.classList.toggle('active-tab', t === tab);
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeScriptBotDetail();
});

/* ===== V12: PROFESSIONAL TOUCH SLIDERS ===== */
(function() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let bannerSwiper = null;

  function syncBannerDots(index) {
    document.querySelectorAll('.nb-dot').forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
    });
  }

  window.nbGoTo = function(index) {
    if (!bannerSwiper) return;
    bannerSwiper.slideToLoop(index, reduceMotion ? 0 : 620);
  };

  function initBannerSlider() {
    const root = document.querySelector('.nbSwiper');
    if (!root || typeof Swiper === 'undefined') return;

    bannerSwiper = new Swiper(root, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: reduceMotion ? 0 : 620,
      grabCursor: true,
      followFinger: true,
      simulateTouch: true,
      allowTouchMove: true,
      touchRatio: 1,
      touchAngle: 45,
      threshold: 3,
      shortSwipes: true,
      longSwipes: true,
      longSwipesMs: 260,
      longSwipesRatio: .18,
      resistance: true,
      resistanceRatio: .68,
      watchSlidesProgress: true,
      updateOnWindowResize: true,
      autoplay: reduceMotion ? false : {
        delay: 3800,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      on: {
        init(swiper) { syncBannerDots(swiper.realIndex); },
        slideChange(swiper) { syncBannerDots(swiper.realIndex); }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBannerSlider, { once: true });
  } else {
    initBannerSlider();
  }
})();


(function() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function initWhySlider() {
    const root = document.querySelector('.whySwiper');
    if (!root || typeof Swiper === 'undefined') return;

    new Swiper(root, {
      effect: 'coverflow',
      centeredSlides: true,
      slidesPerView: 1.22,
      spaceBetween: 8,
      loop: true,
      loopAdditionalSlides: 2,
      speed: reduceMotion ? 0 : 680,
      grabCursor: true,
      followFinger: true,
      simulateTouch: true,
      allowTouchMove: true,
      touchRatio: 1,
      touchAngle: 45,
      threshold: 2,
      shortSwipes: true,
      longSwipes: true,
      longSwipesMs: 280,
      longSwipesRatio: .16,
      resistance: true,
      resistanceRatio: .72,
      slideToClickedSlide: true,
      watchSlidesProgress: true,
      updateOnWindowResize: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 115,
        modifier: 1.15,
        scale: .8,
        slideShadows: false
      },
      autoplay: reduceMotion ? false : {
        delay: 2800,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        waitForTransition: true
      },
      breakpoints: {
        480: { slidesPerView: 1.45, spaceBetween: 10 },
        700: { slidesPerView: 1.75, spaceBetween: 12 },
        900: {
          slidesPerView: 2,
          spaceBetween: 16,
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 145,
            modifier: 1.2,
            scale: .76,
            slideShadows: false
          }
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhySlider, { once: true });
  } else {
    initWhySlider();
  }
})();
