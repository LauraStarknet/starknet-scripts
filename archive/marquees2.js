let initIndex = 0;

function marqueeInit() {
    const wrapperList = document.querySelectorAll('.marquee-wrapper');
    wrapperList.forEach((el, index) => {
        let myInterval;
        let isHovering = false;
        let animationRunning = false;
        let translateNumber;
        let currentTransform;
        let totalWidth;
        let set;
        let allSets = el.querySelectorAll('.marquee-set');
        let track;
        let coloredTexts = el.querySelectorAll('.colored');
        let restart = true;

        // Determine if this marquee should be reversed
        // Using (index + 1) to make it 1-based for "every second marquee"
        const reverseMarquee = (index + 1) % 2 === 0;

        function centerWhite(el) {
            set = el.querySelector('.marquee-set');
            totalWidth = set.clientWidth; // Width of a single marquee-set
            const whiteElement = el.querySelector('.white');
            // Ensure whiteElement exists before trying to get its width
            const whiteWidth = whiteElement ? whiteElement.getBoundingClientRect().width : 0;

            allSets.forEach((elSet, j) => {
                if (j !== 1) elSet.style.opacity = '0';
            });

            let newTranslate;
            // The goal is to center the 'white' element in the viewport.
            // When moving normally (left), the track starts further left (negative translate).
            // When reversed (right), the track starts further right (less negative translate).
            if (reverseMarquee) {
                // For reversed marquees, we want the white section to be centered.
                // The 'marquee-set' at index 1 usually contains the 'white' element.
                // We calculate the starting point so the right edge of the white element
                // in the second set (index 1) aligns with the center of the screen.
                // The track needs to be moved so that the white part is visible.
                // It's easier to think about the position of the *start* of the track.
                // If it's reversed, the white part needs to be brought from the left.
                // Let's assume the white element is always in the second set (index 1)
                // Its position relative to the start of the full track (all three sets) is totalWidth.
                const whiteAbsoluteStart = totalWidth; // Start of the second marquee-set
                newTranslate = (window.innerWidth / 2) - (whiteWidth / 2) - whiteAbsoluteStart;
            } else {
                // For normal marquees, the white element is in the second set (index 1).
                // We want the start of the second set to be at `window.innerWidth / 2 - whiteWidth / 2`.
                // The first set has `totalWidth`. So, the initial translation needs to account for the first set.
                newTranslate = (window.innerWidth / 2) - (whiteWidth / 2) - totalWidth;
            }

            track = el.querySelector('.marquee-track');
            track.style.transform = `translateX(${newTranslate}px)`;
            translateNumber = newTranslate; // This is the 'reset' position
            currentTransform = newTranslate;
        }

        centerWhite(el);

        function handleMouseEnter(i) {
            if (i === initIndex) {
                coloredTexts.forEach(chi => chi.style.opacity = '1');
                allSets.forEach(chi => chi.style.opacity = '1');

                if (!animationRunning) {
                    myInterval = setInterval(() => {
                        let newTransform;
                        if (reverseMarquee) {
                            // Reversed movement: moving right (increasing translateX)
                            // The "loop point" is when the currentTransform moves too far right.
                            // The track needs to wrap around.
                            // The total content width is totalWidth * 3 (if there are three sets)
                            const loopThreshold = translateNumber + (totalWidth * 2); // Roughly when the start of the first set reaches the reset point

                            if (currentTransform >= loopThreshold) {
                                if (!isHovering) {
                                    coloredTexts.forEach(el => el.style.opacity = '0');
                                    allSets.forEach((elSet, j) => {
                                        if (j !== 1) elSet.style.opacity = '0';
                                    });
                                    clearInterval(myInterval);
                                    animationRunning = false;
                                    restart = true;
                                } else {
                                    restart = false;
                                }
                                newTransform = translateNumber; // Reset to the starting position
                            } else {
                                // If not hovering or just started, ease in (move slower initially)
                                if (!isHovering && (currentTransform < (translateNumber + 50))) { // easing out
                                    const diff = (translateNumber + 50) - currentTransform;
                                    newTransform = currentTransform + (diff / 50) * 2;
                                } else {
                                    // Steady movement to the right (positive value)
                                    // If restart is true, means we just looped, so accelerate slowly.
                                    const diff = (loopThreshold - 50) - currentTransform; // Distance from the "end" before full speed
                                    const newNumber = (diff < 50 && restart) ? (diff / 50) * 2 : 2; // Move right by 2px
                                    newTransform = currentTransform + newNumber;
                                }
                            }
                        } else {
                            // Original movement: moving left (decreasing translateX)
                            const loopThreshold = translateNumber - (totalWidth * 2); // Roughly when the start of the first set reaches the reset point

                            if (currentTransform <= loopThreshold) { // Changed to <= as it moves left
                                if (!isHovering) {
                                    coloredTexts.forEach(el => el.style.opacity = '0');
                                    allSets.forEach((elSet, j) => {
                                        if (j !== 1) elSet.style.opacity = '0';
                                    });
                                    clearInterval(myInterval);
                                    animationRunning = false;
                                    restart = true;
                                } else {
                                    restart = false;
                                }
                                newTransform = translateNumber; // Reset to starting position
                            } else {
                                // If not hovering and nearing the end, ease out (move slower)
                                if (!isHovering && (currentTransform < (loopThreshold + 50))) {
                                    const diff = currentTransform - (loopThreshold);
                                    newTransform = currentTransform - (diff / 50) * 2;
                                } else {
                                    // Steady movement to the left (negative value)
                                    const diff = currentTransform - (loopThreshold + 50); // Distance from the "end" before full speed
                                    const newNumber = (diff < 50 && restart) ? (diff / 50) * 2 : -2; // Move left by 2px
                                    newTransform = currentTransform + newNumber;
                                }
                            }
                        }
                        track.style.transform = `translateX(${newTransform}px)`;
                        currentTransform = newTransform;
                    }, 10);
                    animationRunning = true;
                }
                isHovering = true;
            }
        }

        function handleMouseLeave(i) {
            if (i === initIndex) {
                coloredTexts.forEach(chi => chi.style.opacity = '0');
                isHovering = false;
            }
        }

        // It's crucial to correctly manage event listeners, especially with resize.
        // Instead of continually adding, we should remove the old one first.
        // However, a simpler approach for this type of problem is often to
        // make the event listeners unique or use a clean-up function.
        // For now, let's ensure they are added correctly.

        // Remove previous listeners associated with this 'el' before adding new ones
        // This is a more robust way to handle resize if marqueeInit() is called repeatedly.
        const prevMouseEnterHandler = el.marqueeMouseEnterHandler;
        const prevMouseLeaveHandler = el.marqueeMouseLeaveHandler;

        if (prevMouseEnterHandler) {
            el.removeEventListener('mouseenter', prevMouseEnterHandler);
        }
        if (prevMouseLeaveHandler) {
            el.removeEventListener('mouseleave', prevMouseLeaveHandler);
        }

        const currentMouseEnterHandler = () => handleMouseEnter(initIndex);
        const currentMouseLeaveHandler = () => handleMouseLeave(initIndex);

        el.addEventListener('mouseenter', currentMouseEnterHandler);
        el.addEventListener('mouseleave', currentMouseLeaveHandler);

        // Store references to the handlers on the element itself for later removal
        el.marqueeMouseEnterHandler = currentMouseEnterHandler;
        el.marqueeMouseLeaveHandler = currentMouseLeaveHandler;


        // Remove previous resize listener to avoid multiple calls to stopAnim for one resize
        if (el.marqueeResizeListener) {
            window.removeEventListener('resize', el.marqueeResizeListener);
        }
        const resizeListener = () => stopAnim();
        window.addEventListener('resize', resizeListener);
        el.marqueeResizeListener = resizeListener;

    });
    initIndex++;
}

console.log('Marquee code activating');
marqueeInit();
window.addEventListener('resize', () => {
    marqueeInit();
});