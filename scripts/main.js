document.addEventListener('DOMContentLoaded', () => {
    // Alter berechnen
    const displayAge = document.getElementById('display-age');
    if (displayAge) {
        const birthDate = new Date(2002, 8, 24); // 24. September 2002
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        displayAge.textContent = age;
    }

    // Language Toggle Funktionalität
    const langButtons = document.querySelectorAll('.lang-btn');
    
    const setLanguage = (lang) => {
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('language', lang);
        
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Browsertitel und Meta-Description aktualisieren
        const translationElement = document.getElementById('translations');
        if (translationElement) {
            try {
                const translations = JSON.parse(translationElement.textContent);
                if (translations[lang]) {
                    document.title = translations[lang].title;
                    const metaDesc = document.querySelector('meta[name="description"]');
                    if (metaDesc) {
                        metaDesc.setAttribute('content', translations[lang].description);
                    }
                }
            } catch (e) {
                console.error("Error parsing translations", e);
            }
        } else {
            // Fallback für altes Format
            const deTitle = document.querySelector('title.lang-de');
            const enTitle = document.querySelector('title.lang-en');
            if (deTitle && enTitle) {
                document.title = (lang === 'de') ? deTitle.textContent : enTitle.textContent;
            }
        }
    };

    // Initial Language Setup
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        setLanguage(savedLanguage);
    } else {
        const browserLang = navigator.language.split('-')[0];
        setLanguage(browserLang === 'de' ? 'de' : 'en');
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.getAttribute('data-lang'));
        });
    });

    // Accessibility Mode Funktionalität
    const a11yButtons = document.querySelectorAll('.a11y-btn');
    
    const setA11yMode = (enabled) => {
        if (enabled) {
            document.body.classList.add('a11y-mode');
            localStorage.setItem('a11y-mode', 'true');
        } else {
            document.body.classList.remove('a11y-mode');
            localStorage.setItem('a11y-mode', 'false');
        }
    };

    // Initial A11y Setup
    const savedA11y = localStorage.getItem('a11y-mode');
    if (savedA11y === 'true') {
        setA11yMode(true);
    }

    a11yButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const isEnabled = document.body.classList.contains('a11y-mode');
            setA11yMode(!isEnabled);
        });
    });

    // Smooth Scrolling für interne Links (verhindert das Verschieben des Fensters)
    const handleInternalLinkClick = (e, anchor) => {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const contentContainer = document.querySelector(".content");
                if (contentContainer) {
                    const behavior = document.body.classList.contains('a11y-mode') ? 'auto' : 'smooth';
                    contentContainer.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: behavior,
                    });
                    
                    // Viewport-Verschiebung verhindern/korrigieren
                    window.scrollTo(0, 0);
                    
                    // Bei mobiler Navigation: Nach Klick ggf. URL-Fragment aktualisieren ohne Scroll-Sprung
                    history.pushState(null, null, href);
                }
            }
        }
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            handleInternalLinkClick(e, this);
        });
    });

    // Fix für URL-Hashes beim Laden (verhindert das Verschieben des Fensters beim Direktaufruf)
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // Kurze Verzögerung, um den Standard-Browser-Sprung abzufangen
            setTimeout(() => {
                window.scrollTo(0, 0);
                const contentContainer = document.querySelector(".content");
                if (contentContainer) {
                    contentContainer.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: "auto"
                    });
                }
            }, 50);
        }
    }

    // Sidebar Active Link Highlight
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('section.content-section');
    const content = document.querySelector('.content');

    if (content && sections.length > 0) {
        const updateActiveLink = () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (content.scrollTop >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });

            sidebarLinks.forEach(a => {
                a.classList.remove('active');
                const href = a.getAttribute('href');
                if (href.includes('#' + current) && current !== '') {
                    a.classList.add('active');
                }
            });
        };

        let ticking = false;
        content.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateActiveLink();
                    ticking = false;
                });
                ticking = true;
            }
        });
        updateActiveLink(); // Initial call
    }

    // Service Worker Registration for PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            const swPath = window.location.pathname.includes('/projects/') ? '../sw.js' : 'sw.js';
            navigator.serviceWorker.register(swPath)
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }

    // Email Protection
    const decodeEmails = () => {
        document.querySelectorAll('.email-link').forEach(link => {
            const user = link.getAttribute('data-user');
            const domain = link.getAttribute('data-domain');
            if (user && domain) {
                const email = `${user}@${domain}`;
                link.href = `mailto:${email}`;
                const textSpan = link.querySelector('.email-text');
                if (textSpan) textSpan.textContent = email;
                
                // Update copy button if it's in the same container
                const container = link.closest('.email-container');
                if (container) {
                    const copyBtn = container.querySelector('.copy-btn');
                    if (copyBtn) copyBtn.setAttribute('data-copy', email);
                }
            }
        });
    };
    decodeEmails();

    // Copy to Clipboard
    const showCopyFeedback = () => {
        let feedback = document.querySelector('.copy-feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'copy-feedback';
            feedback.innerHTML = '<span class="lang-de">In die Zwischenablage kopiert!</span><span class="lang-en">Copied to clipboard!</span>';
            document.body.appendChild(feedback);
        }
        feedback.classList.add('show');
        setTimeout(() => feedback.classList.remove('show'), 2000);
    };

    document.addEventListener('click', (e) => {
        const copyBtn = e.target.closest('.copy-btn');
        if (copyBtn) {
            const text = copyBtn.getAttribute('data-copy');
            if (text) {
                navigator.clipboard.writeText(text).then(showCopyFeedback);
            }
        }
    });

    // Back to Top Button
    const contentArea = document.querySelector('.content');
    if (contentArea) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTopBtn);

        contentArea.addEventListener('scroll', () => {
            if (contentArea.scrollTop > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            const behavior = document.body.classList.contains('a11y-mode') ? 'auto' : 'smooth';
            contentArea.scrollTo({ top: 0, behavior: behavior });
        });
    }

    // External Links security
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        if (!link.rel) {
            link.rel = 'noopener noreferrer';
        }
    });
});
