function initHeader() {
    const links = Array.from(document.querySelectorAll('.menu-nav-link'));
    const megaWrapper = document.querySelector('.megamenu-wrapper');
    const menus = {
        explore: document.querySelector('.explore'),
        build: document.querySelector('.build'),
        grow: document.querySelector('.grow'),
        connect: document.querySelector('.connect')
    };
    const menuOrder = ['explore', 'build', 'grow', 'connect'];
    let currentMenu = null;
    let closeTimer = null;

    function animateMenuLinks(menu) {
        const items = menu.querySelectorAll('.megamenu-link-wrapper');
        if (!items.length) return;
        gsap.set(items, { opacity: 0, y: 20 });
        gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.1
        });
    }

    function show(menu) {
        if (currentMenu && currentMenu !== menu) {
            currentMenu.style.opacity = '0';
            currentMenu.style.pointerEvents = 'none';
            currentMenu.style.display = 'none';
            currentMenu.dataset.isOpen = 'false';
        }
        if (menu.dataset.isOpen === 'true') return;
        clearTimeout(closeTimer);
        currentMenu = menu;
        menu.style.display = 'flex';
        requestAnimationFrame(() => {
            menu.style.opacity = '1';
            menu.style.position = 'relative';
            menu.style.pointerEvents = 'auto';
            animateMenuLinks(menu); menu.dataset.isOpen = 'true';
        });
        const key = Object.keys(menus).find(k => menus[k] === menu);
        const index = menuOrder.indexOf(key);
        if (index > -1) {
            links.forEach(link => link.classList.remove('is-active'));
            links[index].classList.add('is-active');
        }
    }

    function scheduleHide(menu) {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
            menu.style.opacity = '0';
            menu.style.position = 'relative';
            menu.style.pointerEvents = 'none';
            setTimeout(() => {
                if (currentMenu === menu) {
                    menu.style.display = 'none';
                    currentMenu = null;
                    menu.dataset.isOpen = 'false';
                    links.forEach(link => link.classList.remove('is-active'));
                }
            }, 300);
        }, 150);
    }

    Object.values(menus).forEach(menu => {
        menu.style.opacity = '0';
        menu.style.position = 'relative';
        menu.style.pointerEvents = 'none';
        menu.style.display = 'none';
        menu.dataset.isOpen = 'false';
    });

    megaWrapper.addEventListener('mouseout', () => scheduleHide(currentMenu))

    links.forEach((link, idx) => {
        const key = menuOrder[idx];
        const menu = menus[key];
        if (!menu) return;
        link.addEventListener('mouseenter', () => show(menu));
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initHeader()
});