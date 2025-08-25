
// JavaScript for MI RESTAURANTE Website

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const mobileThemeIcon = document.getElementById('mobileThemeIcon');
    const body = document.body;
    
    // Check for saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.toggle('dark', savedTheme === 'dark');
    updateThemeIcons(savedTheme === 'dark');
    
    function updateThemeIcons(isDark) {
        const iconClass = isDark ? 'fa-sun' : 'fa-moon';
        themeIcon.className = `fas ${iconClass}`;
        mobileThemeIcon.className = `fas ${iconClass}`;
    }
    
    function toggleTheme() {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcons(isDark);
    }
    
    themeToggle?.addEventListener('click', toggleTheme);
    mobileThemeToggle?.addEventListener('click', toggleTheme);
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add blur effect when scrolled
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    let mobileMenuOpen = false;
    
    mobileMenuBtn?.addEventListener('click', function() {
        mobileMenuOpen = !mobileMenuOpen;
        
        if (mobileMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-times text-2xl"></i>';
            document.body.style.overflow = 'hidden'; // Prevent scroll
        } else {
            mobileMenu.classList.remove('show');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
            document.body.style.overflow = ''; // Restore scroll
        }
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuOpen = false;
            mobileMenu.classList.remove('show');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
            document.body.style.overflow = '';
        });
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Active Navigation Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Welcome Modal Functionality
    const welcomeModal = document.getElementById('welcomeModal');
    const closeWelcomeModal = document.getElementById('closeWelcomeModal');
    const acceptOffer = document.getElementById('acceptOffer');
    
    // Show welcome modal after a short delay
    setTimeout(() => {
        if (!localStorage.getItem('welcomeModalShown')) {
            showWelcomeModal();
        }
    }, 2000);
    
    function showWelcomeModal() {
        welcomeModal.style.display = 'flex';
        setTimeout(() => {
            const modalContent = welcomeModal.querySelector('div > div');
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }, 100);
    }
    
    function hideWelcomeModal() {
        const modalContent = welcomeModal.querySelector('div > div');
        modalContent.style.transform = 'scale(0.95)';
        modalContent.style.opacity = '0';
        setTimeout(() => {
            welcomeModal.style.display = 'none';
        }, 300);
        localStorage.setItem('welcomeModalShown', 'true');
    }
    
    closeWelcomeModal?.addEventListener('click', hideWelcomeModal);
    acceptOffer?.addEventListener('click', hideWelcomeModal);
    
    // Close modal when clicking on backdrop
    welcomeModal?.addEventListener('click', function(e) {
        if (e.target === welcomeModal) {
            hideWelcomeModal();
        }
    });
    
    // Menu Item Modal Functionality
    const itemModal = document.getElementById('itemModal');
    const closeItemModal = document.getElementById('closeItemModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalDescription = document.getElementById('modalDescription');
    
    // Add click listeners to all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const image = this.getAttribute('data-image');
            const title = this.querySelector('h3').textContent;
            const price = this.querySelector('.text-yellow-500').textContent;
            const description = this.querySelector('p:last-child').textContent;
            
            // Populate modal content
            modalImage.src = image;
            modalImage.alt = title;
            modalTitle.textContent = title;
            modalPrice.textContent = price;
            modalDescription.textContent = description;
            
            // Show modal
            itemModal.classList.remove('hidden');
            itemModal.classList.add('flex');
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        });
    });
    
    function hideItemModal() {
        itemModal.classList.remove('flex');
        itemModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    closeItemModal?.addEventListener('click', hideItemModal);
    
    // Close modal when clicking on backdrop
    itemModal?.addEventListener('click', function(e) {
        if (e.target === itemModal) {
            hideItemModal();
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (!welcomeModal.style.display || welcomeModal.style.display !== 'none') {
                hideWelcomeModal();
            }
            if (itemModal.classList.contains('flex')) {
                hideItemModal();
            }
        }
    });
    
    // Form Submission Handling
    const contactForm = document.querySelector('#contacto form');
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        const requiredFields = ['nombre', 'email', 'telefono', 'fecha'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = this.querySelector(`[name="${field}"]`);
            if (!input || !input.value.trim()) {
                isValid = false;
                input?.classList.add('border-red-500');
            } else {
                input?.classList.remove('border-red-500');
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('¡Gracias! Tu reserva ha sido enviada. Te contactaremos pronto.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            alert('Por favor, completa todos los campos requeridos.');
        }
    });
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe menu items for animations
    document.querySelectorAll('.menu-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });
    
    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-bg');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Image Lazy Loading Enhancement
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger loading
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0.7';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
    
    // Share Functionality using Web Share API
    function shareContent() {
        if (navigator.share) {
            navigator.share({
                title: 'MI RESTAURANTE - Experiencia Gastronómica Única',
                text: 'Descubre los mejores platillos y bebidas en MI RESTAURANTE',
                url: window.location.href
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback: copy URL to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('URL copiada al portapapeles');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = window.location.href;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('URL copiada al portapapeles');
            });
        }
    }
    
    // Add share button functionality if any share buttons exist
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', shareContent);
    });
    
    // Performance Optimization: Debounced Scroll Handler
    let scrollTimer = null;
    const optimizedScrollHandler = function() {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function() {
            // Scroll-dependent operations here
        }, 150);
    };
    
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    
    // Accessibility Improvements
    document.addEventListener('keydown', function(e) {
        // Tab navigation for modals
        if (e.key === 'Tab') {
            const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            
            if (itemModal.classList.contains('flex')) {
                const focusableContent = itemModal.querySelectorAll(focusableElements);
                const firstFocusableElement = focusableContent[0];
                const lastFocusableElement = focusableContent[focusableContent.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    });
    
    // Error Handling for Images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            // Optional: Set a placeholder image
            // this.src = '/path/to/placeholder.jpg';
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
    
    // Console welcome message
    console.log('%c🍽️ Bienvenido a MI RESTAURANTE', 'color: #eab308; font-size: 24px; font-weight: bold;');
    console.log('%c¡Gracias por visitar nuestro sitio web!', 'color: #6b7280; font-size: 14px;');
});

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Service Worker Registration for PWA (Optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment if you want to add PWA functionality
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}
