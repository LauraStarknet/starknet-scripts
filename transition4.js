let homeLottieSrc = 'https://raw.githubusercontent.com/thesvbd/Lottie-examples/master/assets/animations/loading.json';
let generalLottieSrc = './fadeout_test.json'
let transitionTimingIn = 500;
let transitionTimingOut = 1000;
let isHomePage = (window.location.pathname === '/' || window.location.pathname === '')

function showGrid() {
    const transition = document.querySelector('.transition');
    transition.classList.add('transition--in');
}

let animation;

function initGrid(url){
     // LOTTIE
    let animationContainer = document.querySelector('.transition__lottie');

    fetch(url) // Percorso del file_LOGO JSON
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nel caricamento del file JSON: ' + response.statusText);
        }
        return response.json();
    })
    .then(animationData => {
        animation = lottie.loadAnimation({
            container: animationContainer, // il contenitore per l'animazione
            renderer: 'svg',
            loop: false, // Imposta loop su false
            autoplay: true, // Imposta autoplay su true
            animationData: animationData // il JSON dell'animazione
        });
    })
}

function hideGrid() {
    const transition = document.querySelector('.transition');
    transition.classList.remove('transition--in')
}

function loadTransition() {
    initGrid(isHomePage ? homeLottieSrc:generalLottieSrc);
    let timeOut = isHomePage ? transitionTimingIn*3:transitionTimingIn;
    setTimeout(() => {
        if(isHomePage) setTimeout(() => {
            document.querySelector('.transition__lottie svg').remove();
            initGrid(generalLottieSrc)
        }, transitionTimingIn)
        hideGrid()
    }, timeOut);

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
            console.log(link.getAttribute("href"), window.location.host);
            if(link.getAttribute("href") !== `${window.location.host}`||link.getAttribute("href") !== `${window.location.host}/`) {
                animation.setDirection(-1);
                animation.play()
            }
            event.preventDefault();
            const destination = link.href;
            showGrid()
            // Show loading grid with animation
            setTimeout(() => {
                window.location.href = destination;
            }, transitionTimingOut)
        }
        );
    });

    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            window.location.reload();
        }
    });

    // window.addEventListener('resize', () => {
    //     showGrid();
    //     setTimeout(() => hideGrid(), 500);
    // });
}


document.addEventListener("DOMContentLoaded", () => {
    loadTransition()
});

// loadTransition()