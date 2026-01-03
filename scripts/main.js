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

    // Dark Mode Toggle Funktionalität
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        const modeLabel = darkModeToggle.parentElement.previousElementSibling;

        const applyLightTheme = () => {
            document.body.classList.add("light-mode-active");
            if (modeLabel) modeLabel.innerHTML = '<i class="fas fa-sun"></i>';
        };

        const removeLightTheme = () => {
            document.body.classList.remove("light-mode-active");
            if (modeLabel) modeLabel.innerHTML = '<i class="fas fa-moon"></i>';
        };

        // Überprüfe gespeichertes Theme oder Systemeinstellung
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme) {
            document.documentElement.setAttribute("data-theme", currentTheme);
            if (currentTheme === "light") {
                darkModeToggle.checked = false;
                applyLightTheme();
            } else {
                darkModeToggle.checked = true;
                removeLightTheme();
            }
        } else {
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
                darkModeToggle.checked = false;
                applyLightTheme();
            } else {
                darkModeToggle.checked = true;
                removeLightTheme();
            }
        }

        darkModeToggle.addEventListener("change", function () {
            if (this.checked) {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
                removeLightTheme();
            } else {
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
                applyLightTheme();
            }
        });
    }

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
