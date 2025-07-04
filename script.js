// Cache DOM elements
const elements = {
    loadingScreen: document.getElementById('loadingScreen'),
    themeToggle: document.getElementById('themeToggle'),
    mobileMenuToggle: document.getElementById('mobileMenuToggle'),
    navLinks: document.getElementById('navLinks'),
    searchToggle: document.getElementById('searchToggle'),
    searchContainer: document.getElementById('searchContainer'),
    searchInput: document.getElementById('searchInput'),
    backToTop: document.getElementById('backToTop'),
    floatingCta: document.getElementById('floatingCta'),
    navbar: document.getElementById('navbar'),
    noResults: document.getElementById('noResults'),
    body: document.body
};

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        elements.loadingScreen?.classList.add('hidden');
    }, 1000);
});

// Theme toggle functionality
const themeIcon = elements.themeToggle?.querySelector('i');
const themeText = elements.themeToggle?.querySelector('span');

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
elements.body.setAttribute('data-theme', currentTheme);

if (currentTheme === 'light') {
    if (themeIcon) themeIcon.className = 'fas fa-sun';
    if (themeText) themeText.textContent = 'Light';
}

elements.themeToggle?.addEventListener('click', () => {
    const theme = elements.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    elements.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    setTimeout(() => {
        if (theme === 'light') {
            if (themeIcon) themeIcon.className = 'fas fa-sun';
            if (themeText) themeText.textContent = 'Light';
        } else {
            if (themeIcon) themeIcon.className = 'fas fa-moon';
            if (themeText) themeText.textContent = 'Dark';
        }
    }, 150);
});

// Mobile menu toggle
elements.mobileMenuToggle?.addEventListener('click', () => {
    const isActive = elements.navLinks?.classList.contains('active');

    if (isActive) {
        elements.navLinks.classList.remove('active');
        elements.mobileMenuToggle.classList.remove('active');
        elements.mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
        elements.body.style.overflow = 'auto';
    } else {
        elements.navLinks?.classList.add('active');
        elements.mobileMenuToggle.classList.add('active');
        elements.mobileMenuToggle.querySelector('i').className = 'fas fa-times';
        elements.body.style.overflow = 'hidden';
    }
});

// Close mobile menu when clicking on a link
elements.navLinks?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        elements.navLinks.classList.remove('active');
        elements.mobileMenuToggle?.classList.remove('active');
        const icon = elements.mobileMenuToggle?.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
        elements.body.style.overflow = 'auto';
    }
});

// Search functionality
elements.searchToggle?.addEventListener('click', () => {
    const isVisible = elements.searchContainer?.style.display === 'block';
    if (elements.searchContainer) {
        elements.searchContainer.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
            elements.searchInput?.focus();
        }
    }
});

// Real-time search functionality
elements.searchInput?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const projectCards = document.querySelectorAll('.project-card');
    const skillTags = document.querySelectorAll('.skill-tag');
    let hasResults = false;

    // Search in projects
    projectCards.forEach(card => {
        const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.project-description')?.textContent.toLowerCase() || '';
        const tags = Array.from(card.querySelectorAll('.project-tag')).map(tag => tag.textContent.toLowerCase()).join(' ');

        const matches = title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm);

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
            tag.style.transform = 'scale(1.05)';
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
    if (searchTerm && !hasResults) {
        elements.noResults?.classList.add('visible');
    } else {
        elements.noResults?.classList.remove('visible');
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
        if (elements.searchInput) {
            elements.searchInput.value = '';
        }
        elements.noResults?.classList.remove('visible');
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

// Optimized scroll handler
const handleScroll = throttle(() => {
    // Navbar scroll effect
    if (window.scrollY > 100) {
        elements.navbar?.classList.add('scrolled');
    } else {
        elements.navbar?.classList.remove('scrolled');
    }

    // Back to top button and floating CTA
    if (window.scrollY > 300) {
        elements.backToTop?.classList.add('visible');
        elements.floatingCta?.classList.add('visible');
    } else {
        elements.backToTop?.classList.remove('visible');
        elements.floatingCta?.classList.remove('visible');
    }

    // Update active nav link
    updateActiveNavLink();
}, 16);

window.addEventListener('scroll', handleScroll, { passive: true });

// Back to top functionality
elements.backToTop?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Floating CTA functionality
elements.floatingCta?.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
});
