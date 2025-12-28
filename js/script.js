// DOM Elements
const loader = document.querySelector('.loader');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.querySelector('.back-to-top');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const projectFilters = document.querySelectorAll('.project__filter');
const projectCards = document.querySelectorAll('.project__card');
const contactForm = document.querySelector('.contact__form');
const skillBars = document.querySelectorAll('.skills__percentage');
const professionalBars = document.querySelectorAll('.professional__percentage');

// Loader
window.addEventListener('load', () => {
    loader.classList.add('hidden');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 400);
    
    // Initialize animations
    initHomeAnimations();
    updateThemeTogglePosition();
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.classList.toggle('active');
    
    // Save theme preference
    const isDarkTheme = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.classList.add('active');
}

// Fix theme toggle position for responsive design
const updateThemeTogglePosition = () => {
    const themeBtn = document.querySelector('.theme-btn');
    if (!themeBtn) return;
    
    if (window.innerWidth <= 768) {
        // On mobile, position absolute within header
        themeBtn.style.position = 'absolute';
        themeBtn.style.top = '50%';
        themeBtn.style.right = '1rem';
        themeBtn.style.transform = 'translateY(-50%)';
    } else {
        // On desktop, use fixed positioning
        themeBtn.style.position = 'fixed';
        themeBtn.style.top = '2.5rem';
        themeBtn.style.right = '2.5rem';
        themeBtn.style.transform = 'none';
        themeBtn.style.zIndex = '1000';
    }
};

// Initialize home animations
const initHomeAnimations = () => {
    // Tech items animation
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        // Initial styling
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        // Sequential appearance animation
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = 'all 0.5s ease';
        }, index * 200);
        
        // Hover effects
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) scale(1.05)';
            item.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.transition = 'all 0.3s ease';
        });
    });
    
    // Tooltip for tech items
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const tech = item.querySelector('span').textContent;
            const tooltip = document.createElement('div');
            tooltip.className = 'tech-tooltip';
            tooltip.textContent = tech;
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'var(--title-color)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '0.3rem 0.8rem';
            tooltip.style.borderRadius = '0.4rem';
            tooltip.style.fontSize = '0.8rem';
            tooltip.style.zIndex = '1000';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.top = '-35px';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.boxShadow = '0 4px 15px var(--shadow-color)';
            
            item.appendChild(tooltip);
            item._tooltip = tooltip;
        });
        
        item.addEventListener('mouseleave', () => {
            if (item._tooltip) {
                item._tooltip.remove();
                delete item._tooltip;
            }
        });
    });
    
    // Expertise tags tooltip
    const expertiseTags = document.querySelectorAll('.expertise-tag');
    expertiseTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            const tech = tag.textContent;
            const tooltip = document.createElement('div');
            tooltip.className = 'expertise-tooltip';
            tooltip.textContent = tech;
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'var(--title-color)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '0.3rem 0.8rem';
            tooltip.style.borderRadius = '0.4rem';
            tooltip.style.fontSize = '0.8rem';
            tooltip.style.zIndex = '1000';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.top = '-35px';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.boxShadow = '0 4px 15px var(--shadow-color)';
            
            tag.appendChild(tooltip);
            tag._tooltip = tooltip;
        });
        
        tag.addEventListener('mouseleave', () => {
            if (tag._tooltip) {
                tag._tooltip.remove();
                delete tag._tooltip;
            }
        });
    });
    
    // Button animations
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
            button.style.transition = 'transform 0.1s ease';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = '';
            button.style.transition = 'transform 0.3s ease';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.transition = 'transform 0.3s ease';
        });
    });
    
    // Add about section animations
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        const aboutElements = aboutSection.querySelectorAll('.about__grid > *');
        aboutElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            
            // Animate on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, index * 200);
                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(el);
        });
    }
};

// Back to Top
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Nav Menu Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking on nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// Project Filtering
projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        projectFilters.forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked filter
        filter.classList.add('active');
        
        const filterValue = filter.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!data.name || !data.email || !data.message) {
            alert("Please fill in all required fields");
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(data.email)) {
            alert("Please enter a valid email address");
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = "Sending...";
        submitBtn.disabled = true;

        const subject = data.subject || "Contact from Portfolio";
        const body =
`Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "N/A"}

Message:
${data.message}`;

        const mailtoLink =
            "mailto:nareshdakarapu07@gmail.com" +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);

        window.location.href = mailtoLink;

        // Reset form after short delay
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });

});


// Animate skill bars on scroll
const animateSkills = () => {
    skillBars.forEach(bar => {
        const level = bar.parentElement.getAttribute('data-level');
        bar.style.width = level;
        bar.style.transition = 'width 1.5s ease';
    });
    
    professionalBars.forEach(bar => {
        const parent = bar.parentElement.parentElement;
        const level = parent.querySelector('.professional__number').textContent;
        bar.style.width = level;
        bar.style.transition = 'width 1.5s ease';
    });
};

// Check if element is in viewport
const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
};

// Scroll animation for skills
const handleScroll = () => {
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection && isElementInViewport(skillsSection)) {
        animateSkills();
        window.removeEventListener('scroll', handleScroll);
    }
};

window.addEventListener('scroll', handleScroll);

// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    disable: window.innerWidth < 768 // Disable on mobile for better performance
});

// Initialize Swiper
const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navMenu.classList.remove('show-menu');
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form input validation with improved feedback
const formInputs = document.querySelectorAll('.contact__form-input');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff4757';
            showInputError(input, 'This field is required');
        } else if (input.type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                input.style.borderColor = '#ff4757';
                showInputError(input, 'Please enter a valid email');
            } else {
                input.style.borderColor = 'var(--first-color)';
                hideInputError(input);
            }
        } else {
            input.style.borderColor = 'var(--first-color)';
            hideInputError(input);
        }
    });
    
    input.addEventListener('input', () => {
        input.style.borderColor = 'var(--first-color)';
        hideInputError(input);
    });
});

// Helper functions for form validation
function showInputError(input, message) {
    let errorElement = input.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#ff4757';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.3rem';
        input.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function hideInputError(input) {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Typing effect for home title
const homeTitle = document.querySelector('.home__title');
if (homeTitle) {
    const originalText = homeTitle.textContent;
    homeTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < originalText.length) {
            homeTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect when loader is done
    setTimeout(typeWriter, 1000);
}

// Add active class to nav on page load
window.addEventListener('load', () => {
    const currentHash = window.location.hash;
    if (currentHash) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentHash) {
                link.classList.add('active');
            }
        });
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('show-menu');
    }
    
    if (e.key === 't' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        themeToggle.click();
    }
});

// Responsive adjustments on window resize
window.addEventListener('resize', () => {
    updateThemeTogglePosition();
    
    // Reinitialize AOS on resize
    AOS.refresh();
});

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'var(--gradient-1)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.1s ease';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Create scroll progress on load
window.addEventListener('load', createScrollProgress);

// Social links animation
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach((link, index) => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
        link.style.transition = 'all 0.5s ease';
    }, 1000 + (index * 100));
});

// Highlight items animation
const highlightItems = document.querySelectorAll('.highlight__item');
highlightItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
        item.style.transition = 'all 0.5s ease';
    }, 800 + (index * 150));
});

// Detail cards animation
const detailCards = document.querySelectorAll('.detail-card');
detailCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    // Animate when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(card);
});

// Wave animation for home section
const createWaveEffect = () => {
    const homeSection = document.querySelector('.home');
    if (!homeSection) return;
    
    const wave = document.createElement('div');
    wave.className = 'wave';
    wave.style.position = 'absolute';
    wave.style.bottom = '0';
    wave.style.left = '0';
    wave.style.width = '100%';
    wave.style.height = '100px';
    wave.style.background = 'var(--first-color)';
    wave.style.opacity = '0.1';
    wave.style.maskImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 120\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z\' fill=\'%23000\'/%3E%3C/svg%3E")';
    wave.style.maskSize = '1200px 100px';
    wave.style.animation = 'wave 12s linear infinite';
    wave.style.zIndex = '1';
    
    homeSection.appendChild(wave);
    
    // Add CSS for wave animation
    const waveStyle = document.createElement('style');
    waveStyle.textContent = `
        @keyframes wave {
            0% {
                mask-position-x: 0;
            }
            100% {
                mask-position-x: 1200px;
            }
        }
    `;
    document.head.appendChild(waveStyle);
};

// Create wave effect on load
window.addEventListener('load', createWaveEffect);