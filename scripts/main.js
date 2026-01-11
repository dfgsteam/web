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

        // Browsertitel aktualisieren
        const deTitle = document.querySelector('title.lang-de');
        const enTitle = document.querySelector('title.lang-en');
        if (deTitle && enTitle) {
            document.title = (lang === 'de') ? deTitle.textContent : enTitle.textContent;
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

        content.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); // Initial call
    }

});
