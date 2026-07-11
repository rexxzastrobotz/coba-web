/* ===== script.js ===== */

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

/* ===== SCRIPT BOT FUNCTIONS ===== */

const _scriptData = {
  update: {
    nama: 'ASTROBOT MD — Free Update Selamanya',
    harga: 50000,
    hargaFmt: 'Rp 50.000',
    hargaColor: '#fff',
    benefits: [
      'Free update selamanya selama pengembangan',
      'Mudah dikustomisasi sesuai kebutuhan',
      'Struktur plugin terpisah dan rapi',
      'Siap digunakan tanpa konfigurasi rumit',
      'Support pengembangan fitur baru',
    ]
  },
  replace: {
    nama: 'ASTROBOT MD — 1x Replace Script',
    harga: 35000,
    hargaFmt: 'Rp 35.000',
    hargaColor: '#fbbf24',
    benefits: [
      '1x Replace ke versi script terbaru',
      'Harga lebih hemat dari paket update',
      'Struktur plugin terpisah dan rapi',
      'Siap digunakan tanpa konfigurasi rumit',
      'Cocok untuk pembelian sekali pakai',
    ]
  }
}

let _currentScript = 'update'

function openScriptDetail(type) {
  _currentScript = type
  const d = _scriptData[type]

  const titleEl = document.getElementById('sdTitleMain')
  if (titleEl) titleEl.textContent = d.nama

  const hargaEl = document.getElementById('sdHargaBesar')
  if (hargaEl) { hargaEl.textContent = d.hargaFmt; hargaEl.style.color = d.hargaColor }

  const benList = document.getElementById('sdBenefitList')
  if (benList) benList.innerHTML = d.benefits.map(b =>
    `<li style="font-size:.88rem;color:#ccc;">${b}</li>`).join('')

  const modal = document.getElementById('scriptDetailModal')
  modal.style.display = 'block'
  modal.style.visibility = 'visible'
  modal.style.transform = 'translateX(100%)'
  document.body.style.overflow = 'hidden'
  void modal.offsetHeight
  modal.style.transform = 'translateX(0)'
  modal.scrollTop = 0
}

function closeScriptDetail() {
  const modal = document.getElementById('scriptDetailModal')
  modal.style.transform = 'translateX(100%)'
  setTimeout(() => {
    modal.style.visibility = 'hidden'
    modal.style.display = ''
    document.body.style.overflow = ''
  }, 350)
}

function closeDetailThenOrder() {
  const d = _scriptData[_currentScript]
  closeScriptDetail()
  setTimeout(() => openScriptOrder(d.nama, d.harga), 360)
}

function openScriptOrder(nama, harga) {
  const d = harga === 50000 ? _scriptData.update : _scriptData.replace
  _currentScript = harga === 50000 ? 'update' : 'replace'

  const hargaFmt = d.hargaFmt

  if (document.getElementById('soHargaBesar'))   document.getElementById('soHargaBesar').textContent   = hargaFmt
  if (document.getElementById('soHargaRingkas')) document.getElementById('soHargaRingkas').textContent = hargaFmt
  if (document.getElementById('soTotal'))        document.getElementById('soTotal').textContent        = hargaFmt
  if (document.getElementById('soTitle'))        document.getElementById('soTitle').textContent        = nama

  const benList = document.getElementById('soBenList')
  if (benList) benList.innerHTML = d.benefits.map(b =>
    `<li style="font-size:.9rem;color:#ccc;">${b}</li>`).join('')

  if (document.getElementById('soNama'))  document.getElementById('soNama').value  = ''
  if (document.getElementById('soNomor')) document.getElementById('soNomor').value = ''

  const orderModal = document.getElementById('orderModal')
  if (orderModal) {
    orderModal.dataset.pkg   = nama
    orderModal.dataset.total = harga
    orderModal.dataset.price = harga
    const linkEl = document.getElementById('orderLink')
    if (linkEl) linkEl.value = '-'
    const namaEl = document.getElementById('orderNama')
    if (namaEl) namaEl.value = ''
    const nomorEl = document.getElementById('orderNomor')
    if (nomorEl) nomorEl.value = ''
  }

  const modal = document.getElementById('scriptOrderModal')
  modal.style.display = 'block'
  modal.style.visibility = 'visible'
  modal.style.transform = 'translateX(100%)'
  document.body.style.overflow = 'hidden'
  void modal.offsetHeight
  modal.style.transform = 'translateX(0)'
  modal.scrollTop = 0
}

function closeScriptOrder() {
  const modal = document.getElementById('scriptOrderModal')
  modal.style.transform = 'translateX(100%)'
  setTimeout(() => {
    modal.style.visibility = 'hidden'
    modal.style.display = ''
    document.body.style.overflow = ''
  }, 350)
}

function handleScriptBeli() {
  // Direct redirect to WhatsApp with script-specific message
  const msg = 'halo min saya tertarik dengan script astrobot';
  const waHref = 'https://wa.me/6289674097203?text=' + encodeURIComponent(msg);
  window.open(waHref, '_blank');
  closeScriptOrder();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeScriptOrder()
    closeScriptDetail()
  }
})
