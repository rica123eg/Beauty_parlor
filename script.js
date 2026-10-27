document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

    navButtons.forEach((button) => {
        const href = (button.getAttribute('href') || '').split('?')[0].replace(/^\.\//, '').replace(/^#/, '').toLowerCase();
        const matchesCurrentPage = href === currentPage ||
            (currentPage === 'index.html' && (href === 'home' || href === 'home.html' || href === '')) ||
            (currentPage === 'home.html' && (href === 'index.html' || href === 'home'));

        if (matchesCurrentPage) {
            button.classList.add('active');
        }
    });

    const sectionLinks = document.querySelectorAll('.nav-btn[data-section]');
    sectionLinks.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = button.dataset.section;
            const targetSection = document.getElementById(sectionId);

            if (!targetSection) return;

            document.querySelectorAll('.content-section').forEach((section) => {
                section.classList.remove('active');
            });

            navButtons.forEach((navButton) => navButton.classList.remove('active'));
            button.classList.add('active');
            targetSection.classList.add('active');
            history.replaceState(null, '', `#${sectionId}`);
        });
    });

    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const targetSection = document.getElementById(hash);
        const matchingNav = document.querySelector(`.nav-btn[data-section="${hash}"]`);

        if (targetSection) {
            document.querySelectorAll('.content-section').forEach((section) => {
                section.classList.remove('active');
            });
            targetSection.classList.add('active');
        }

        if (matchingNav) {
            navButtons.forEach((button) => button.classList.remove('active'));
            matchingNav.classList.add('active');
        }
    }
});
