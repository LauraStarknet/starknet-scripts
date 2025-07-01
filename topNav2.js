function topNavFn() {
    const links = Array.from(document.querySelectorAll('.menu-nav-link'));
    const megaWrapper = document.querySelector('.megamenu-wrapper');
    const linkBg = document.querySelector('.menu-link-bg');
    const menus = {
        explore: document.querySelector('.explore'),
        build: document.querySelector('.build'),
        grow: document.querySelector('.grow'),
        connect: document.querySelector('.connect')
    };
    let currentMenu = null;
    let activeLinkElement = null;
    let closeTimer = null;

    //   INTRO
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

    function show(menu, link) {
        clearTimeout(closeTimer);

        // Hide previous menu
        if (currentMenu && currentMenu !== menu) {
            currentMenu.classList.remove('visible')
        }

        if (menu.className.indexOf('visible') > -1 && currentMenu === menu) {
            return;
        }

        // currentMenu = menu;
        activeLinkElement = link;
        // console.log(link);

        setTimeout(() => {
            // console.log(activeLinkElement, link)
            if(activeLinkElement === link) {
                activeLinkElement = link;
                currentMenu = menu;
                // console.log('adding visible to'+link)
                currentMenu.classList.add('visible')
                megaWrapper.style.height = `${currentMenu.clientHeight}px`;
                requestAnimationFrame(() => {
                    animateMenuLinks(menu);
                });
            }
        }, 300)
        linkBg.style.left = `${link.getBoundingClientRect().left - document.querySelector('.menu-wrapper').getBoundingClientRect().left}px`;
        linkBg.style.width = `${link.getBoundingClientRect().width}px`
        setTimeout(() => linkBg.style.opacity = 1, 300)


        // links.forEach(l => l.classList.remove('is-active'));
        // link.classList.add('is-active');
    }

    function scheduleHide(menuToHide, relatedLink) {
        clearTimeout(closeTimer);

        closeTimer = setTimeout(() => {
            if (menuToHide.matches(':hover') || relatedLink.matches(':hover')) {
                clearTimeout(closeTimer);
                return;
            }

            menuToHide.classList.remove('visible')
            megaWrapper.style.height = `${0}px`;

            setTimeout(() => {
                if (currentMenu === menuToHide) {
                    linkBg.style.opacity = 0;
                    currentMenu = null;
                    activeLinkElement = null;
                    menuToHide.classList.remove('visible')
                    links.forEach(link => link.classList.remove('is-active'));
                }
            }, 300);
        }, 150);
    }

    links.forEach(link => {
        const targetMenuClass = link.getAttribute('data-target-menu');
        const menu = menus[targetMenuClass];

        if (!menu) {
            return;
        }

        link.addEventListener('mouseenter', () => show(menu, link));
        // link.addEventListener('mouseleave', () => scheduleHide(menu, link));

        menu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
        menu.addEventListener('mouseleave', () => scheduleHide(menu, link));
    });
};

document.addEventListener("DOMContentLoaded", function () {
    topNavFn()
});

topNavFn()

