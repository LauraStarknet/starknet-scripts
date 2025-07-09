function showGrid() {
    const transition = document.querySelector('.transition');
    transition.classList.add('transition--in');
}

function hideGrid() {
    const transition = document.querySelector('.transition');
    transition.classList.remove('transition--in')
}

function loadTransition() {
    showGrid()
    let timeOut = window.location.hash = '/' ? 2500:10;
    setTimeout(() => hideGrid(), timeOut);

    // Pre-process all valid links
    const validLinks = Array.from(document.querySelectorAll("a")).filter(link => {
        const href = link.getAttribute("href") || "";
        const hostname = new URL(link.href, window.location.origin).hostname;

        return (
            hostname === window.location.hostname && // Same domain
            !href.startsWith("#") &&                 // Not an anchor link
            link.getAttribute("target") !== "_blank" && // Not opening in a new tab
            !link.hasAttribute("data-transition-prevent") // No 'data-transition-prevent' attribute
        );
    });

    // Add event listeners to pre-processed valid links
    validLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const destination = link.href;
            showGrid()
            // Show loading grid with animation
            setTimeout(() => {
                window.location.href = destination;
            }, 500)
        }
        );
    });

    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            window.location.reload();
        }
    });

    window.addEventListener('resize', () => {
        showGrid();
        setTimeout(() => hideGrid(), 500);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    loadTransition()
});

loadTransition()