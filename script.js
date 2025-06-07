/**
 * Portfolio Website Scripts
 * Contains all interactive functionality for Kyla Llanes' portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // NAVIGATION FUNCTIONALITY
    // ======================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').includes(current));
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                history.pushState(null, null, this.getAttribute('href'));
            }
        });
    });

    // ======================
    // HERO SECTION ANIMATION
    // ======================
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in-up', 'visible');
    }

    // ======================
    // EDUCATION TIMELINE ANIMATION
    // ======================
    const eduItems = document.querySelectorAll('.education-item');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        eduItems.forEach(item => observer.observe(item));
    } else {
        eduItems.forEach(item => item.classList.add('visible'));
    }

    // ======================
    // MOBILE MENU TOGGLE
    // ======================
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header').appendChild(mobileToggle);

    mobileToggle.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // ======================
    // PROJECT CARD INTERACTIONS
    // ======================
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('hovered'));
        card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
    });

    // ======================
    // FORM VALIDATION
    // ======================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]');
            if (!email.value.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }
            alert('Thank you for your message!');
            this.reset();
        });
    }
});

/*
Required CSS additions:

.fade-in-up {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease-out;
}
.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
}
.education-item {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease-out;
}
.education-item.visible {
    opacity: 1;
    transform: translateY(0);
}
.project-card.hovered {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
*/

