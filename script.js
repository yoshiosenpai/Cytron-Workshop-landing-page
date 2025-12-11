/**
 * Cytron Technical Workshops - Landing Page Scripts
 * Handles navigation, animations, modals, FAQ accordion, and form submission
 */

(function() {
    'use strict';

    // ============================================
    // SYLLABUS DATA
    // ============================================
    const syllabusData = {
        jetson: {
            title: 'NVIDIA Jetson Edge AI Hands-On Workshop',
            modules: [
                {
                    name: 'Module 1: Introduction to Jetson Orin Nano',
                    topics: [
                        'Understanding edge computing and AI at the edge',
                        'NVIDIA Jetson Orin Nano platform architecture',
                        'Setting up JetPack and development environment'
                    ]
                },
                {
                    name: 'Module 2: Deep Learning Fundamentals',
                    topics: [
                        'Core concepts of machine learning and deep learning',
                        'Working with pre-trained AI models',
                        'Converting and optimizing models with TensorRT'
                    ]
                },
                {
                    name: 'Module 3: Hands-On AI Projects',
                    topics: [
                        'Image classification project',
                        'Image regression techniques',
                        'Real-time object detection deployment'
                    ]
                },
                {
                    name: 'Certification',
                    topics: [
                        'Official NVIDIA AI Certification upon completion',
                        'Certificate of Completion from Cytron',
                        'Take-home Jetson Orin Nano Training Kit included'
                    ]
                }
            ]
        },
        iriv: {
            title: 'IRIV PiControl Industry 4.0 Workshop',
            modules: [
                {
                    name: 'Module 1: Industrial Controller Fundamentals',
                    topics: [
                        'Introduction to IRIV PiControl with Raspberry Pi CM4',
                        'Industrial-grade I/O configuration',
                        'Understanding DIN rail mounting and wiring'
                    ]
                },
                {
                    name: 'Module 2: RS485 Communication Protocols',
                    topics: [
                        'Modbus RTU protocol implementation',
                        'Reading industrial sensors via RS485',
                        'Integrating ADL200 AC Power Meter'
                    ]
                },
                {
                    name: 'Module 3: IoT Dashboard Development',
                    topics: [
                        'Building dashboards with Node-RED',
                        'Real-time data visualization',
                        'MQTT for industrial IoT applications'
                    ]
                },
                {
                    name: 'What You Get',
                    topics: [
                        'Complete IRIV PiControl Training Kit to keep',
                        'Certificate of completion',
                        'HRD Corp claimable for Malaysian companies'
                    ]
                }
            ]
        },
        irivedge: {
            title: 'IRIV EdgeAI Industry 4.0 Training',
            modules: [
                {
                    name: 'Module 1: Getting Started with EdgeAI Vision',
                    topics: [
                        'Introduction to Edge AI in industrial settings',
                        'IRIV EdgeAI hardware overview',
                        'Setting up the development environment'
                    ]
                },
                {
                    name: 'Module 2: Computer Vision Fundamentals',
                    topics: [
                        'Image processing basics for industrial applications',
                        'Object detection and recognition',
                        'Quality inspection use cases'
                    ]
                },
                {
                    name: 'Module 3: AI Model Deployment',
                    topics: [
                        'Deploying AI models on industrial controllers',
                        'Real-time inference optimization',
                        'Integration with existing production systems'
                    ]
                },
                {
                    name: 'Module 4: Practical Applications',
                    topics: [
                        'Defect detection in manufacturing',
                        'Automated visual inspection',
                        'Building production-ready AI solutions'
                    ]
                }
            ]
        },
        raspbot: {
            title: 'Cytron Raspbot Workshop (Introduction to AI)',
            modules: [
                {
                    name: 'Module 1: Introduction to AI & Robotics',
                    topics: [
                        'Fundamentals of artificial intelligence',
                        'Overview of Raspbot platform and capabilities',
                        'Setting up the Raspberry Pi environment'
                    ]
                },
                {
                    name: 'Module 2: Building Your Robot',
                    topics: [
                        'Assembling the Raspbot mobile robot',
                        'Motor control and sensor integration',
                        'Basic programming with Python'
                    ]
                },
                {
                    name: 'Module 3: AI-Powered Features',
                    topics: [
                        'Introduction to machine learning concepts',
                        'Image recognition basics',
                        'Training simple AI models'
                    ]
                },
                {
                    name: 'Module 4: Hands-On Project',
                    topics: [
                        'Building an autonomous navigation system',
                        'Object detection and avoidance',
                        'Showcase and demonstration'
                    ]
                }
            ]
        }
    };


    // ============================================
    // DOM ELEMENTS
    // ============================================
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const navLinks = document.querySelectorAll('.navbar-link');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const workshopCtas = document.querySelectorAll('.workshop-cta');
    const faqItems = document.querySelectorAll('.faq-item');
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const currentYearSpan = document.getElementById('current-year');
    const heroShapes = document.querySelectorAll('.hero-shape');


    // ============================================
    // SET CURRENT YEAR
    // ============================================
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }


    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();


    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
    }


    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // ============================================
    // WORKSHOP MODAL
    // ============================================
    function openModal(workshopKey) {
        const data = syllabusData[workshopKey];
        if (!data) return;

        modalTitle.textContent = data.title;
        
        let bodyHTML = '';
        data.modules.forEach(module => {
            bodyHTML += `<h4>${module.name}</h4><ul>`;
            module.topics.forEach(topic => {
                bodyHTML += `<li>${topic}</li>`;
            });
            bodyHTML += '</ul>';
        });
        
        modalBody.innerHTML = bodyHTML;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    workshopCtas.forEach(btn => {
        btn.addEventListener('click', () => {
            const workshopKey = btn.getAttribute('data-workshop');
            openModal(workshopKey);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });


    // ============================================
    // FAQ ACCORDION
    // ============================================
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active', !isActive);
            });
        }
    });


    // ============================================
    // CONTACT FORM SUBMISSION
    // ============================================
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                formSuccess.classList.add('show');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                this.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);
            }, 1000);
        });
    }


    // ============================================
    // PARALLAX EFFECT FOR HERO SHAPES
    // ============================================
    if (heroShapes.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            heroShapes.forEach((shape, index) => {
                const speed = 0.08 + (index * 0.04);
                shape.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    }

})();

