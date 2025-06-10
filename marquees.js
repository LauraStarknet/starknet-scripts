let initIndex = 0;

function marqueeInit() {
    const wrapperList = document.querySelectorAll('.marquee-wrapper');
    wrapperList.forEach((el) => {
        let myInterval;
        let isHovering = false
        let animationRunning = false;
        let translateNumber;
        let currentTransform;
        let totalWidth;
        let set;
        let allSets = el.querySelectorAll('.marquee-set');
        let track;
        let coloredTexts = el.querySelectorAll('.colored');
        let restart = true;

        function centerWhite(el) {
            set = el.querySelector('.marquee-set');
            totalWidth = set.clientWidth;
            const whiteWidth = el.querySelector('.white').getBoundingClientRect().width
            allSets.forEach((el, i) => { if (i !== 1) el.style.opacity = '0' });
            let newTranslate = - totalWidth + (window.innerWidth / 2) - totalWidth + (whiteWidth / 2) + 10;
            track = el.querySelector('.marquee-track');
            track.style.transform = `translateX(${newTranslate}px)`
            translateNumber = newTranslate;
            currentTransform = newTranslate;
        }

        centerWhite(el);

        function handleMouseEnter(i) {
            console.log(i, initIndex)
            if(i === initIndex) {
                coloredTexts.forEach(chi => chi.style.opacity = '1');
                allSets.forEach(chi => chi.style.opacity = '1');
    
                if (!animationRunning) {
                    myInterval = setInterval((i) => {
                        let newTransform;
                        if (currentTransform - (translateNumber - totalWidth) < 3) {
                            if (!isHovering) {
                                coloredTexts.forEach(el => el.style.opacity = '0');
                                allSets.forEach((el, i) => { if (i !== 1) el.style.opacity = '0' });
                                clearInterval(myInterval);
                                animationRunning = false;
                                restart = true
                            }
                            else {
                                restart = false;
                            }
                            newTransform = translateNumber;
                        }
                        else {
                            if (!isHovering && (currentTransform < (translateNumber - totalWidth) + 50)) {
                                const diff = currentTransform - (translateNumber - totalWidth);
                                newTransform = currentTransform - (diff / 50) * 2;
                            }
                            else {
                                const diff = currentTransform - translateNumber - 5;
                                const newNumber = (diff > -50 && restart) ? (diff / 50) * 2 : -2;
                                newTransform = currentTransform + newNumber;
                            }
                        }
                        track.style.transform = `translateX(${newTransform}px)`
                        currentTransform = newTransform;
                    }, 10)
                    animationRunning = true;
                }
                isHovering = true;
            }
        }

        function handleMouseLeave(i) {
            if(i === initIndex) {
                isHovering = false;
            }
        }
        
        let currentIndex = Number(initIndex);
        let nextIndex = Number(initIndex+1);

        el.removeEventListener('mouseenter', () => handleMouseEnter(currentIndex));
        el.removeEventListener('mouseleave', () => handleMouseLeave(currentIndex));
        el.addEventListener('mouseenter', () => handleMouseEnter(nextIndex));
        el.addEventListener('mouseleave', () => handleMouseLeave(nextIndex));
    })
    initIndex ++;
}


document.addEventListener('DOMContentLoaded', () => {
    console.log('Marquee code activating')
    setTimeout(() => {
        marqueeInit()
    }, 1000)
    window.addEventListener('resize', marqueeInit)
})

