/* === ARAMA TESSILE — ANIMATIONS & INTERACTIONS === */
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHeroAnimations();
    initSwipers();
    // Delay scroll animations to let Swiper init first
    setTimeout(() => initScrollAnimations(), 500);
    initTestimonialCarousel();
    initFormSubmission();
});

/* === MOBILE MENU === */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');
    if (!menuBtn || !menu || !closeBtn) return;
    menu.classList.add('closed');
    menu.setAttribute('aria-hidden', 'true');

    function openMenu() { menu.classList.remove('closed'); menu.classList.add('open'); menu.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
    function closeMenu() { menu.classList.remove('open'); menu.classList.add('closed'); menu.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }

    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    menu.querySelectorAll('a').forEach(l => l.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => { if(window.innerWidth >= 768) closeMenu(); });
}

/* === HERO ANIMATIONS === */
function initHeroAnimations() {
    const tl = gsap.timeline();
    if(document.querySelector('.hero-title')) {
        tl.from('.hero-title', { duration: 1, opacity: 0, y: 50, ease: 'power3.out' }, 0)
          .from('.hero-subtitle', { duration: 1, opacity: 0, y: 30, ease: 'power3.out' }, 0.2);
    }
    if(document.querySelector('.hero-buttons')) {
        tl.from('.hero-buttons', { duration: 0.8, opacity: 0, y: 20, ease: 'power3.out' }, 0.4);
    }
    if(document.querySelector('.mockup-item')) {
        gsap.from('.mockup-item', { duration: 1.2, opacity: 0, x: 100, rotation: 10, stagger: 0.2, ease: 'elastic.out(1,0.5)', delay: 0.8 });
    }
    if(document.querySelector('.hero-gradient')) {
        gsap.to('.hero-gradient', {
            scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 0.5 },
            y: 50, ease: 'none'
        });
    }
}

/* === SCROLL ANIMATIONS === */
function initScrollAnimations() {
    // About section
    if(document.querySelector('.about-image-main')) {
        gsap.from('.about-image-main', {
            scrollTrigger: { trigger: '.about-section', start: 'top 85%' },
            duration: 1, opacity: 0, x: -50, ease: 'power3.out'
        });
    }
    if(document.querySelector('.about-image-secondary')) {
        gsap.from('.about-image-secondary', {
            scrollTrigger: { trigger: '.about-section', start: 'top 85%' },
            duration: 1, opacity: 0, scale: 0, ease: 'back.out(1.7)', delay: 0.3
        });
    }
    if(document.querySelector('.features-list .feature-item')) {
        gsap.from('.features-list .feature-item', {
            scrollTrigger: { trigger: '.features-list', start: 'top 85%' },
            duration: 0.8, opacity: 0, x: 50, stagger: 0.15, ease: 'power3.out'
        });
    }

    // Service cards - DO NOT animate opacity, just transform
    document.querySelectorAll('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 90%' },
            duration: 0.6, y: 30, ease: 'power3.out', delay: i * 0.1
        });
    });

    // Service card hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, { duration: 0.3, y: -5, ease: 'power2.out' });
            const icon = this.querySelector('.service-icon');
            if(icon) gsap.to(icon, { duration: 0.3, rotation: 10, scale: 1.1, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', function() {
            gsap.to(this, { duration: 0.3, y: 0, ease: 'power2.out' });
            const icon = this.querySelector('.service-icon');
            if(icon) gsap.to(icon, { duration: 0.3, rotation: 0, scale: 1, ease: 'power2.out' });
        });
    });

    // Client logos
    if(document.querySelector('.client-logo-card')) {
        gsap.from('.client-logo-card', {
            scrollTrigger: { trigger: '.clients-grid', start: 'top 90%' },
            duration: 0.6, opacity: 0, scale: 0.8, stagger: 0.1, ease: 'back.out(1.7)'
        });
    }

    // Contact
    if(document.querySelector('.contact-info-item')) {
        gsap.from('.contact-info-item', {
            scrollTrigger: { trigger: '.contact-section', start: 'top 85%' },
            duration: 0.8, opacity: 0, x: -30, stagger: 0.15, ease: 'power3.out'
        });
    }
    if(document.querySelector('.contact-form')) {
        gsap.from('.contact-form', {
            scrollTrigger: { trigger: '.contact-section', start: 'top 85%' },
            duration: 1, opacity: 0, x: 30, ease: 'power3.out'
        });
    }

    // Stats counters
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        if(!target) return;
        el.textContent = '0';
        ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            onEnter: () => {
                gsap.to(el, {
                    duration: 2,
                    innerHTML: target,
                    snap: { innerHTML: 1 },
                    ease: 'power2.out',
                    onUpdate: function() { el.textContent = Math.floor(parseFloat(el.textContent)); }
                });
            },
            once: true
        });
    });

    // Product grid items (products page)
    document.querySelectorAll('.product-grid .product-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 92%' },
            duration: 0.5, y: 30, opacity: 0, ease: 'power3.out', delay: i * 0.05
        });
    });
}

/* === TESTIMONIAL CAROUSEL === */
function initTestimonialCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    if(cards.length === 0) return;
    let idx = 0;
    cards[0].classList.add('active');
    setInterval(() => {
        cards[idx].classList.remove('active');
        idx = (idx + 1) % cards.length;
        cards[idx].classList.add('active');
    }, 5000);
}

/* === FORM SUBMISSION === */
function initFormSubmission() {
    const form = document.getElementById('contactForm');
    if(!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('[type="submit"]');
        const orig = btn.innerHTML;
        gsap.to(btn, { duration: 0.3, scale: 0.95, ease: 'power2.out' });
        setTimeout(() => {
            gsap.to(btn, { duration: 0.3, scale: 1, ease: 'power2.out' });
            btn.innerHTML = '<i class="fas fa-check me-2"></i>Enquiry Sent Successfully!';
            btn.disabled = true;
            btn.style.background = '#16a34a';
            btn.style.color = '#fff';
            setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; btn.style.background = ''; btn.style.color = ''; form.reset(); }, 3000);
        }, 300);
    });
}

/* === SWIPER INIT === */
function initSwipers() {
    if(document.querySelector('.category-slider')) {
        new Swiper('.category-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: false,
            speed: 600,
            autoplay: { delay: 3000, disableOnInteraction: false },
            navigation: { nextEl: '.category-slider .swiper-button-next', prevEl: '.category-slider .swiper-button-prev' },
            breakpoints: {
                576: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 25 },
                1200: { slidesPerView: 4, spaceBetween: 25 }
            }
        });
    }
    if(document.querySelector('.products-slider')) {
        new Swiper('.products-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: false,
            speed: 600,
            autoplay: { delay: 3500, disableOnInteraction: false },
            navigation: { nextEl: '.products-slider .swiper-button-next', prevEl: '.products-slider .swiper-button-prev' },
            breakpoints: {
                576: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 25 },
                1200: { slidesPerView: 4, spaceBetween: 30 }
            }
        });
    }
}

/* === SCROLL-BASED NAVBAR === */
(function() {
    const header = document.getElementById('site-header');
    if(!header) return;
    let lastY = window.scrollY, ticking = false;
    function update() {
        const y = window.scrollY;
        if(y <= 10) header.classList.remove('nav-hidden');
        else if(y > lastY + 5) header.classList.add('nav-hidden');
        else if(y < lastY - 5) header.classList.remove('nav-hidden');
        lastY = y; ticking = false;
    }
    window.addEventListener('scroll', () => { if(!ticking){ requestAnimationFrame(update); ticking=true; } }, {passive:true});
})();

/* === PRODUCT DETAIL PAGE FUNCTIONS === */
function switchImage(el) {
    document.querySelectorAll('.thumbs img').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('mainImage').src = el.src;
}
function selectOption(el) {
    el.parentElement.querySelectorAll('.option').forEach(o => o.classList.remove('active'));
    el.classList.add('active');
}
function switchTab(id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`[onclick="switchTab('${id}')"]`).classList.add('active');
    document.getElementById(id).classList.add('active');
}
function sendEnquiry() { alert('Enquiry sent! Our team will contact you within 24 hours.'); }

/* === REDUCED MOTION === */
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.globalTimeline.timeScale(0.5);
window.addEventListener('resize', () => ScrollTrigger.refresh());
