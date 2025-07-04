// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500);
});

// Enhanced theme toggle functionality with 3D effects
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');
const themeText = themeToggle.querySelector('span');

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);

if (currentTheme === 'light') {
    themeIcon.className = 'fas fa-sun';
    themeText.textContent = 'Light';
}

themeToggle.addEventListener('click', () => {
    const theme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Add transition effect
    themeToggle.style.transform = 'perspective(1000px) rotateY(180deg) scale(1.1)';

    setTimeout(() => {
        if (theme === 'light') {
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Dark';
        }
        themeToggle.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
    }, 150);
});

// Enhanced mobile menu toggle with smooth animations
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    const isActive = navLinks.classList.contains('active');

    if (isActive) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
        document.body.style.overflow = 'auto';
    } else {
        navLinks.classList.add('active');
        mobileMenuToggle.classList.add('active');
        mobileMenuToggle.querySelector('i').className = 'fas fa-times';
        document.body.style.overflow = 'hidden';
    }
});

// Close mobile menu when clicking on a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
        document.body.style.overflow = 'auto';
    }
});

// Search functionality
const searchToggle = document.getElementById('searchToggle');
const searchContainer = document.getElementById('searchContainer');
const searchInput = document.getElementById('searchInput');

searchToggle.addEventListener('click', () => {
    const isVisible = searchContainer.style.display === 'block';
    searchContainer.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
        searchInput.focus();
    }
});

// Real-time search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const projectCards = document.querySelectorAll('.project-card');
    const skillTags = document.querySelectorAll('.skill-tag');
    let hasResults = false;

    // Search in projects
    projectCards.forEach(card => {
        const title = card.querySelector('.project-title').textContent.toLowerCase();

        const matches = title.includes(searchTerm);

        if (matches) {
            card.style.display = 'flex';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });

    // Highlight matching skills
    skillTags.forEach(tag => {
        if (searchTerm && tag.textContent.toLowerCase().includes(searchTerm)) {
            tag.style.background = 'var(--gradient-1)';
            tag.style.color = 'white';
            tag.style.transform = 'scale(1.1)';
        } else {
            tag.style.background = '';
            tag.style.color = '';
            tag.style.transform = '';
        }
    });

    // Show/hide categories based on results
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        const visibleCards = category.querySelectorAll('.project-card[style*="flex"]');
        if (searchTerm && visibleCards.length === 0) {
            category.style.display = 'none';
        } else {
            category.style.display = 'block';
        }
    });

    // Show no results message
    const noResults = document.getElementById('noResults');
    if (searchTerm && !hasResults) {
        noResults.classList.add('visible');
    } else {
        noResults.classList.remove('visible');
    }
});

// Project filtering functionality
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active filter
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        const categories = document.querySelectorAll('.category');

        categories.forEach(category => {
            const categoryType = category.getAttribute('data-category');

            if (filter === 'all' || filter === categoryType) {
                category.style.display = 'block';
                category.classList.remove('hidden');
            } else {
                category.style.display = 'none';
                category.classList.add('hidden');
            }
        });

        // Clear search when filtering
        searchInput.value = '';
        document.getElementById('noResults').classList.remove('visible');
    });
});

// Enhanced back to top functionality with 3D effects
const backToTop = document.getElementById('backToTop');
const floatingCta = document.getElementById('floatingCta');

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');

    // Navbar scroll effect
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
        floatingCta.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
        floatingCta.classList.remove('visible');
    }

    // Update active nav link
    updateActiveNavLink();
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Floating CTA functionality
floatingCta.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced Intersection Observer for 3D fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Enhanced dynamic gradient movement with 3D perspective
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const gradient = `
    radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
    radial-gradient(circle at ${(1 - x) * 100}% ${(1 - y) * 100}%, rgba(255, 0, 128, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(0, 191, 255, 0.1) 0%, transparent 50%)
    `;

    document.body.style.setProperty('--dynamic-gradient', gradient);
});

// Enhanced entrance animations with 3D effects
window.addEventListener('load', () => {
    // Stagger animation for stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 200 * index);
    });

    // Stagger animation for project cards with 3D entrance
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'perspective(1000px) rotateY(0deg) translateY(0)';
        }, 100 * index);
        card.style.opacity = '0';
        card.style.transform = 'perspective(1000px) rotateY(-15deg) translateY(30px)';
        card.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Enhanced skill tag animations
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
        }, 50 * index);
        tag.style.opacity = '0';
        tag.style.transform = 'perspective(1000px) rotateY(-90deg) scale(0.8)';
        tag.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Enhanced 3D hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'perspective(1000px) rotateY(8deg) translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0deg) translateY(0) scale(1)';
    });

    // Add mouse move effect for dynamic 3D rotation
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (x - centerX) / 10;

        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
    });
});

// Performance optimization - throttle scroll events
let ticking = false;
function updateOnScroll() {
    // Update scroll-based animations here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Enhanced parallax effect for background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.body;
    const speed = scrolled * 0.3;

    parallax.style.backgroundPosition = `50% ${speed}px`;
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial states
    updateActiveNavLink();

    // Add smooth loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
});
