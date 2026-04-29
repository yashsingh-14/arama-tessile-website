/* === ARAMA TESSILE — PREMIUM INTERACTIONS === */

/* === PRELOADER === */
function initPreloader() {
    const loader = document.querySelector('.preloader');
    if (!loader) return;
    window.addEventListener('load', () => {
        gsap.to('.preloader-text', { y: -30, opacity: 0, duration: 0.6, ease: 'power3.in' });
        gsap.to('.preloader-line', { scaleX: 1, duration: 1.2, ease: 'power4.inOut', delay: 0.2 });
        gsap.to(loader, { yPercent: -100, duration: 1, ease: 'power4.inOut', delay: 1, onComplete: () => {
            loader.remove();
            document.body.classList.add('loaded');
            initHeroReveal();
        }});
    });
}

/* === LOGO ANIMATION — GSAP LETTER BY LETTER === */
function initLogoAnimation() {
    const mainLogo = document.querySelector('.etro-nav .etro-logo');
    if (!mainLogo) return;
    
    const words = mainLogo.querySelectorAll('.logo-word');
    const sep = mainLogo.querySelector('.logo-sep');
    
    // Split each word into individual letter spans
    words.forEach(word => {
        const text = word.textContent;
        word.innerHTML = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.className = 'logo-char';
            span.textContent = char;
            word.appendChild(span);
        });
    });
    
    // Hide everything first
    gsap.set('.etro-nav .logo-char', { opacity: 0, y: 20 });
    gsap.set(sep, { opacity: 0, scale: 0, rotation: -180 });
    
    // Animate with timeline
    const tl = gsap.timeline({ delay: 0.3 });
    
    // First word letters
    const firstChars = mainLogo.querySelector('.logo-word:not(.logo-light)')?.querySelectorAll('.logo-char');
    if (firstChars) {
        tl.to(firstChars, { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power3.out' }, 0);
    }
    
    // Diamond separator
    tl.to(sep, { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' }, 0.35);
    
    // Second word letters
    const secondChars = mainLogo.querySelector('.logo-light')?.querySelectorAll('.logo-char');
    if (secondChars) {
        tl.to(secondChars, { opacity: 1, y: 0, stagger: 0.05, duration: 0.35, ease: 'power3.out' }, 0.5);
    }
}
/* === SMOOTH SCROLL (Lenis-like) === */
function initSmoothScroll() {
    // CSS-based smooth scroll is already on, but let's add momentum
    let current = 0, target = 0, ease = 0.08;
    // Only on desktop
    if (window.innerWidth < 1024) return;
}

/* === HERO REVEAL ANIMATION === */
function initHeroReveal() {
    const hero = document.querySelector('.etro-hero');
    if (!hero) { initPageReveal(); return; }

    const heroBgMedia = hero.querySelector('.etro-hero-bg video') || hero.querySelector('.etro-hero-bg img');
    if (!heroBgMedia) { initPageReveal(); return; }

    const tl = gsap.timeline();
    tl.from(heroBgMedia, { scale: 1.3, duration: 2, ease: 'power3.out' }, 0)
      .from('.etro-hero-label', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.5)
      .from('.etro-hero-title', { y: 60, opacity: 0, duration: 1, ease: 'power3.out' }, 0.7)
      .from('.etro-hero-cta', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, 1.1)
      .from('.etro-scroll-hint', { opacity: 0, duration: 0.6 }, 1.5);

    // Parallax on hero media
    gsap.to(heroBgMedia, {
        y: '20%', scale: 1.1,
        scrollTrigger: { trigger: '.etro-hero', start: 'top top', end: 'bottom top', scrub: 0.5 }
    });

    // Hero overlay darkens as you scroll
    gsap.to('.etro-hero-overlay', {
        opacity: 0.7,
        scrollTrigger: { trigger: '.etro-hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    // Hero content fades as you scroll
    gsap.to('.etro-hero-content', {
        y: -80, opacity: 0,
        scrollTrigger: { trigger: '.etro-hero', start: '30% top', end: 'bottom top', scrub: true }
    });
}

/* === PAGE REVEAL FOR NON-HERO PAGES === */
function initPageReveal() {
    const header = document.querySelector('.etro-page-header');
    if (!header) return;
    gsap.from('.etro-page-header h1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 });
    gsap.from('.etro-page-header p', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 });
}

/* === SCROLL ANIMATIONS === */
function initScrollAnimations() {
    // Text reveals
    document.querySelectorAll('.etro-story-label, .etro-story-title, .etro-story-desc').forEach((el, i) => {
        gsap.from(el, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.15,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });
    });

    // Fabric cards — stagger reveal with clip path
    document.querySelectorAll('.etro-fabric-card').forEach((card, i) => {
        gsap.from(card, {
            y: 60, opacity: 0, duration: 0.8, ease: 'power3.out',
            delay: (i % 3) * 0.12,
            scrollTrigger: { trigger: card, start: 'top 90%', once: true }
        });
        // Image zoom on scroll
        const img = card.querySelector('.etro-fabric-img img');
        if (img) {
            gsap.from(img, {
                scale: 1.15, duration: 1.2, ease: 'power2.out',
                scrollTrigger: { trigger: card, start: 'top 90%', once: true }
            });
        }
    });

    // Collection panels — parallax images
    document.querySelectorAll('.etro-collection-panel').forEach(panel => {
        const img = panel.querySelector('.etro-collection-img img');
        if (img) {
            gsap.to(img, {
                y: '-15%',
                scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 0.5 }
            });
        }
        gsap.from(panel.querySelector('.etro-collection-overlay'), {
            y: 40, opacity: 0, duration: 0.8,
            scrollTrigger: { trigger: panel, start: 'top 80%', once: true }
        });
    });

    // Stats counter with animation
    document.querySelectorAll('.etro-stat-num[data-target]').forEach(el => {
        const target = parseInt(el.dataset.target);
        ScrollTrigger.create({
            trigger: el, start: 'top 85%', once: true,
            onEnter: () => animateCount(el, target)
        });
    });

    // Service items
    document.querySelectorAll('.etro-service-item, .etro-service-full-card').forEach((item, i) => {
        gsap.from(item, {
            y: 40, opacity: 0, duration: 0.7, delay: (i % 4) * 0.1,
            scrollTrigger: { trigger: item, start: 'top 88%', once: true }
        });
    });

    // About sections
    document.querySelectorAll('.etro-about-grid').forEach(grid => {
        const img = grid.querySelector('.etro-about-img');
        const text = grid.querySelector('.etro-about-text');
        if (img) gsap.from(img, { x: -60, opacity: 0, duration: 1, scrollTrigger: { trigger: grid, start: 'top 80%', once: true }});
        if (text) gsap.from(text, { x: 60, opacity: 0, duration: 1, delay: 0.2, scrollTrigger: { trigger: grid, start: 'top 80%', once: true }});
    });

    // MVV cards
    document.querySelectorAll('.etro-mvv-card').forEach((card, i) => {
        gsap.from(card, {
            y: 50, opacity: 0, duration: 0.7, delay: i * 0.15,
            scrollTrigger: { trigger: card, start: 'top 88%', once: true }
        });
    });

    // Leader cards
    document.querySelectorAll('.etro-leader-card').forEach((card, i) => {
        gsap.from(card, {
            y: 40, opacity: 0, scale: 0.95, duration: 0.8, delay: i * 0.2,
            scrollTrigger: { trigger: card, start: 'top 85%', once: true }
        });
    });

    // Client cards
    document.querySelectorAll('.etro-client-card').forEach((card, i) => {
        gsap.from(card, {
            scale: 0.8, opacity: 0, duration: 0.5, delay: i * 0.06,
            scrollTrigger: { trigger: card, start: 'top 90%', once: true }
        });
    });

    // Contact grid
    const contactGrid = document.querySelector('.etro-contact-grid');
    if (contactGrid) {
        gsap.from('.etro-contact-info', { x: -50, opacity: 0, duration: 0.8, scrollTrigger: { trigger: contactGrid, start: 'top 80%', once: true }});
        gsap.from('.etro-form', { x: 50, opacity: 0, duration: 0.8, delay: 0.2, scrollTrigger: { trigger: contactGrid, start: 'top 80%', once: true }});
    }

    // Sample CTA
    const sampleCta = document.querySelector('.etro-sample-cta');
    if (sampleCta) {
        gsap.from('.etro-sample-inner', {
            y: 40, opacity: 0, duration: 0.8,
            scrollTrigger: { trigger: sampleCta, start: 'top 80%', once: true }
        });
    }

    // Footer
    document.querySelectorAll('.etro-footer-col').forEach((col, i) => {
        gsap.from(col, {
            y: 30, opacity: 0, duration: 0.6, delay: i * 0.1,
            scrollTrigger: { trigger: col, start: 'top 95%', once: true }
        });
    });
}

/* === MAGNETIC BUTTONS === */
function initMagneticButtons() {
    document.querySelectorAll('.etro-hero-cta, .etro-sample-btn, .etro-text-link').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });
    });
}

/* === IMAGE HOVER TILT === */
function initImageTilt() {
    document.querySelectorAll('.etro-fabric-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, { rotateY: x * 5, rotateX: -y * 5, duration: 0.4, ease: 'power2.out', transformPerspective: 1000 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out' });
        });
    });
}

/* === STAT COUNTER === */
function animateCount(el, target) {
    const dur = target > 100 ? 2500 : 2000;
    const start = performance.now();
    function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target;
    }
    requestAnimationFrame(tick);
}

/* === MOBILE MENU === */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const close = document.getElementById('mobile-menu-close');
    if (!btn || !menu) return;

    function open() {
        menu.classList.remove('closed'); menu.classList.add('open');
        document.body.style.overflow = 'hidden';
        gsap.from('.etro-mobile-links a', { x: 30, opacity: 0, stagger: 0.05, duration: 0.4, ease: 'power3.out', delay: 0.2 });
    }
    function shut() {
        menu.classList.remove('open'); menu.classList.add('closed');
        document.body.style.overflow = '';
    }
    btn.addEventListener('click', open);
    if (close) close.addEventListener('click', shut);
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', shut));
    window.addEventListener('resize', () => { if (window.innerWidth >= 993) shut(); });
}

/* === HEADER SCROLL === */
function initHeaderScroll() {
    const header = document.getElementById('site-header');
    const topbar = document.querySelector('.etro-topbar');
    if (!header) return;
    const hasHero = document.querySelector('.etro-hero, .srv-hero, .cl-hero, .fab-hero');
    
    // No topbar? Header at top:0
    if (!topbar) header.style.top = '0';
    
    if (!hasHero) {
        header.classList.add('scrolled');
    } else {
        header.classList.add('hero-transparent');
    }
    
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        
        if (topbar) {
            if (y > 50) {
                topbar.style.transform = 'translateY(-100%)';
                header.style.top = '0';
            } else {
                topbar.style.transform = 'translateY(0)';
                header.style.top = '28px';
            }
        }
        
        if (hasHero) {
            if (y > 80) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        }
        if (y <= 10) { header.classList.remove('nav-hidden'); }
        else {
            if (y > lastY + 8) header.classList.add('nav-hidden');
            else if (y < lastY - 8) header.classList.remove('nav-hidden');
        }
        lastY = y;
    }, { passive: true });
}

/* === CUSTOM CURSOR === */
function initCustomCursor() {
    if (window.innerWidth < 1024 || 'ontouchstart' in window) return;
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
    function followTick() { fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12; follower.style.left = fx + 'px'; follower.style.top = fy + 'px'; requestAnimationFrame(followTick); }
    followTick();

    document.querySelectorAll('a, button, .etro-fabric-card, .etro-collection-panel').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
        el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
    });
}

/* === FORM === */
document.addEventListener('submit', function(e) {
    if (e.target.id === 'contactForm' || e.target.closest('.etro-form')) {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"], button');
        if (!btn) return;
        const orig = btn.innerHTML;
        gsap.to(btn, { scale: 0.95, duration: 0.15, yoyo: true, repeat: 1 });
        setTimeout(() => {
            btn.innerHTML = '✓ Enquiry Sent Successfully';
            btn.style.background = '#25D366';
            btn.disabled = true;
            setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; btn.style.background = ''; e.target.reset(); }, 3000);
        }, 300);
    }
});

/* === TESTIMONIALS === */
(function() {
    const cards = document.querySelectorAll('.testimonial-card');
    if (!cards.length) return;
    let idx = 0; cards[0].classList.add('active');
    setInterval(() => { cards[idx].classList.remove('active'); idx = (idx + 1) % cards.length; cards[idx].classList.add('active'); }, 5000);
})();

/* === PRODUCT DETAIL === */
function switchImage(el) { document.querySelectorAll('.pd-thumbs img, .thumbs img').forEach(i => i.classList.remove('active')); el.classList.add('active'); document.getElementById('mainImage').src = el.src; }

/* === INIT === */
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    initMobileMenu();
    initHeaderScroll();
    initLogoAnimation();

    if (document.querySelector('.preloader')) {
        initPreloader();
    } else {
        document.body.classList.add('loaded');
        initHeroReveal();
        initPageReveal();
    }

    setTimeout(() => {
        initScrollAnimations();
        initMagneticButtons();
        initImageTilt();
        initCustomCursor();
    }, 100);
});

window.addEventListener('resize', () => { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(); });
