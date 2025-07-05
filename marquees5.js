let initIndex = 0;

function marqueeInit() {
    if(window.innerWidth > 1030) {

        const wrapperList = document.querySelectorAll('.marquee-wrapper');
        wrapperList.forEach((el, index) => {
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
    
            // Initial determining center coordinates
            // Issue here
            function centerWhite(el) {
                set = el.querySelector('.marquee-set');
                totalWidth = set.clientWidth;
                const whiteWidth = el.querySelector('.white').getBoundingClientRect().width
                allSets.forEach((el, j) => { if (j !== 1) el.style.opacity = '0' });
                let newTranslate;
                if(index%2 === 0) newTranslate = (totalWidth*-2) + (window.innerWidth / 2) + (whiteWidth / 2) + 10;
                else newTranslate = -(window.innerWidth / 2) + (whiteWidth / 2) + 10 + totalWidth;
                track = el.querySelector('.marquee-track');
                track.style.transform = `translateX(${newTranslate}px)`
                translateNumber = newTranslate;
                currentTransform = newTranslate;
            }
    
            centerWhite(el);
    
            function handleMouseEnter(i) {
                // Prevents event from triggering if it's old (created before window resize)
                if(i === initIndex) {
                    coloredTexts.forEach(chi => chi.style.opacity = '1');
                    allSets.forEach(chi => chi.style.opacity = '1');
        
                    // Make sure animation isn't already running
                    if (!animationRunning) {
                        myInterval = setInterval(() => {
                            let newTransform;
                            // If loop is close to end
                            if (currentTransform - (translateNumber - totalWidth) < 3) {
                                // If no hovering, finish animation
                                if (!isHovering) {
                                    coloredTexts.forEach(el => el.style.opacity = '0');
                                    allSets.forEach((el, j) => { if (j !== 1) el.style.opacity = '0' });
                                    clearInterval(myInterval);
                                    animationRunning = false;
                                    restart = true
                                }
                                // Otherwise, keep looping.
                                else {
                                    // Avoids slowing down when getting close to end of the loop
                                    restart = false;
                                }
                                newTransform = translateNumber;
                            }
                            // Normal animation
                            else {
                                // Normal anim
                                if (!isHovering && (currentTransform < (translateNumber - totalWidth) + 50)) {
                                    const diff = currentTransform - (translateNumber - totalWidth);
                                    newTransform = currentTransform - (diff / 50) * 2;
                                }
                                // If animation is less than 50px from ending, slowing down gradually
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
    
              function handleMouseEnterReverse(i) {
                // Prevents event from triggering if it's old (created before window resize)
                if(i === initIndex) {
                    coloredTexts.forEach(chi => chi.style.opacity = '1');
                    allSets.forEach(chi => chi.style.opacity = '1');
        
                    // Make sure animation isn't already running
                    if (!animationRunning) {
                        myInterval = setInterval(() => {
                            let newTransform;
                            if (currentTransform - translateNumber - totalWidth > 3) {
                                if (!isHovering) {
                                    coloredTexts.forEach(el => el.style.opacity = '0');
                                    allSets.forEach((el, j) => { if (j !== 1) el.style.opacity = '0' });
                                    clearInterval(myInterval);
                                    animationRunning = false;
                                    restart = true
                                }
                                // Otherwise, keep looping.
                                else {
                                    // Avoids slowing down when getting close to end of the loop
                                    restart = false;
                                }
                                newTransform = translateNumber;
                            }
                            // Normal animation
                            else {
                                if (!isHovering && (currentTransform < (translateNumber - totalWidth) + 50)) {
                                    const diff = currentTransform - translateNumber - totalWidth;
                                    newTransform = (diff / 50) * 2 + currentTransform;
                                }
                                // Normal anim
                                else {
                                    const diff = currentTransform - translateNumber - totalWidth + 5;
                                    const newNumber = (diff > 50 && restart) ? (diff / 50) * 2 : +2;
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
                    coloredTexts.forEach(chi => chi.style.opacity = '0');
                    isHovering = false;
                }
            }
            
            let currentIndex = Number(initIndex);
            let nextIndex = Number(initIndex+1);
    
            function stopAnim() {
                clearInterval(myInterval);
                animationRunning = false;
                restart = true
            }
    
            if(index%2 === 0) el.removeEventListener('mouseenter', () => handleMouseEnter(currentIndex));
            else el.removeEventListener('mouseenter', () => handleMouseEnterReverse(currentIndex));
            el.removeEventListener('mouseleave', () => handleMouseLeave(currentIndex));
    
            if(index%2 === 0) el.addEventListener('mouseenter', () => handleMouseEnter(nextIndex));
            else el.addEventListener('mouseenter', () => handleMouseEnterReverse(nextIndex));
            el.addEventListener('mouseleave', () => handleMouseLeave(nextIndex));
            window.addEventListener('resize', stopAnim)
        })
        initIndex ++;
    }
    else {
        initIndex ++;
    }
}

marqueeInit()
window.addEventListener('resize', () => {
    marqueeInit();
})

