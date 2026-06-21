// <!-- ═══════════════════════════════ JS ═══════════════════════════════ -->
  // ── HERO PARTICLES ──
  (function generateParticles() {
    const wrap = document.getElementById('heroParticles');
    if (!wrap) return;
    const count = 24;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = 3 + Math.random() * 5;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (8 + Math.random() * 10) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      wrap.appendChild(p);
    }
  })();

  // ── SLIDER ──
  let currentSlide = 0;
  const totalSlides = 3;
  let autoSlide;

  function goToSlide(n) {
    document.getElementById('slide' + currentSlide).classList.remove('active');
    document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
    currentSlide = n;
    document.getElementById('slide' + currentSlide).classList.add('active');
    document.querySelectorAll('.dot')[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % totalSlides);
    resetAutoSlide();
  }

  function prevSlide() {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    resetAutoSlide();
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
  }

  autoSlide = setInterval(nextSlide, 5000);

  // ── HERO WATERMARK PARALLAX ──
  const heroWatermark = document.querySelector('.hero-watermark');
  window.addEventListener('scroll', () => {
    if (heroWatermark && window.scrollY < window.innerHeight) {
      heroWatermark.style.transform = `translateY(${window.scrollY * 0.15}px) translateX(${window.scrollY * 0.08}px)`;
    }
  });

  // ── PRELOADER ──
  window.addEventListener('load', () => {
    const pre = document.getElementById('preloader');
    setTimeout(() => pre.classList.add('hide'), 500);
  });

  // ── SCROLL PROGRESS + STICKY NAV + BACK TO TOP ──
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    document.getElementById('scrollProgress').style.width = pct + '%';
    document.getElementById('backToTop').classList.toggle('show', scrollTop > 500);
  });

  // ── STICKY NAV ──
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ── MOBILE NAV ──
  function toggleNav() {
    document.getElementById('navLinks').classList.toggle('open');
  }
  // On mobile, tapping the "About Us" parent link should open its
  // dropdown (since :hover doesn't apply on touch) instead of navigating
  // straight to #about. Tapping it again, or tapping a real link inside
  // the dropdown or elsewhere in the menu, closes everything and lets
  // the page jump to the target section.
  document.querySelectorAll('.has-dropdown > a').forEach(parentLink => {
    parentLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        const li = parentLink.parentElement;
        const alreadyOpen = li.classList.contains('open');
        document.querySelectorAll('.has-dropdown.open').forEach(open => open.classList.remove('open'));
        if (!alreadyOpen) {
          e.preventDefault();
          li.classList.add('open');
        }
      }
    });
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('navLinks').classList.remove('open');
      document.querySelectorAll('.has-dropdown.open').forEach(li => li.classList.remove('open'));
    });
  });

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), 80 * (Array.from(reveals).indexOf(e.target) % 4));
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => observer.observe(r));

  // ── COUNTER ANIMATION ──
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const dur = 2000;
    const step = target / (dur / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current) + (target >= 10 ? '+' : '+');
    }, 16);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.stat-number').forEach(animateCounter);
        statObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelector('.stats-bar') && statObserver.observe(document.querySelector('.stats-bar'));

  // ── FORM SUBMIT ──
  function handleSubmit() {
    alert('Thank you for your enquiry! Our team at BMR Builders will contact you within 24 hours.');
  }

  // ── TESTIMONIAL CAROUSEL ──
  (function initTCarousel() {
    const track = document.getElementById('tcarouselTrack');
    const dotsWrap = document.getElementById('tDots');
    if (!track) return;
    const slides = track.querySelectorAll('.tcarousel-slide');
    const total = slides.length;
    let current = 0;
    let autoT;

    // Build dots
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = 'tcarousel-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Go to slide ' + (i+1));
      d.onclick = () => { goT(i); resetAutoT(); };
      dotsWrap.appendChild(d);
    }

    function goT(n) {
      current = (n + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dotsWrap.querySelectorAll('.tcarousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
      // Re-trigger star animation
      const activeSlide = slides[current];
      const stars = activeSlide.querySelectorAll('.tcard-stars i');
      stars.forEach(s => { s.style.animation = 'none'; s.offsetHeight; s.style.animation = ''; });
    }

    function resetAutoT() {
      clearInterval(autoT);
      autoT = setInterval(() => { goT(current + 1); }, 5500);
    }

    window.tCarouselPrev = function() { goT(current - 1); resetAutoT(); };
    window.tCarouselNext = function() { goT(current + 1); resetAutoT(); };

    // Touch/swipe support
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? tCarouselNext() : tCarouselPrev(); }
    });

    resetAutoT();
  })();