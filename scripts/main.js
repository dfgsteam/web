document.addEventListener('DOMContentLoaded', () => {
    // Alter berechnen
    const displayAge = document.getElementById('display-age');
    if (displayAge) {
        const birthDate = new Date(2004, 8, 30); // 30. September 2004
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

    // Smooth Scrolling für Index-Links (z.B. Datenschutz)
    document.querySelectorAll(".index-link").forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const contentContainer = document.querySelector(".content");
                if (contentContainer) {
                    contentContainer.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: "auto",
                    });
                }
            }
        });
    });

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

});
