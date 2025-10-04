document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

   
    if (!hamburger || !navLinks || !navbar) return;

   
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('aria-label', 'Menüyü aç/kapat');
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', 'true');

    const openMenu = () => {
        hamburger.classList.add('active');
        navLinks.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        navLinks.setAttribute('aria-hidden', 'false');
    };

    const closeMenu = () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
    };

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.contains('active');
        if (isOpen) closeMenu();
        else openMenu();
    });

   
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            closeMenu();
        }
    });

    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    
    const checkScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', checkScroll);
   
    checkScroll();

    
    const sections = document.querySelectorAll('main section');
    if ('IntersectionObserver' in window && sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

        sections.forEach(s => observer.observe(s));
    } else {
       
        sections.forEach(s => s.classList.add('in-view'));
    }
});