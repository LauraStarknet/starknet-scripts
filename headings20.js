function createHeadingsAll() {
    // h2, h3, h4, h5, h6
    const headings = document.querySelectorAll('[data-split="heading"]');
    headings.forEach(heading => {
        const customStart = heading.getAttribute('data-trigger-start');
        const customDelay = heading.getAttribute('data-trigger-delay');
        const customDuration = heading.getAttribute('data-trigger-duration');
        const scrollTriggerStart = customStart || "top 70%";
        const scrollTriggerDuration = customDuration || "0.5";
        const scrollTriggerDelay = customDelay || 0;
        SplitText.create(heading, {
            type: "lines",
            // linesClass: "split-line",
            autoSplit: true,
            // mask: "lines",
            onSplit(split) {
                split.lines.forEach(line => {
                    const wrapper = document.createElement("div");
                    wrapper.style.overflow = "hidden";
                    wrapper.style.display = "block";
                    wrapper.style.paddingBlock = "0.12em";
                    wrapper.style.marginBlock = "-0.2em";
                    line.parentNode.insertBefore(wrapper, line);
                    wrapper.appendChild(line);
                });
                return gsap.timeline({
                    scrollTrigger: {
                        trigger: heading,
                        start: scrollTriggerStart,
                        once: true
                    }
                }).from(split.lines, {
                    opacity: 0.8,
                    yPercent: 110,
                    stagger: 0.1,
                    duration: scrollTriggerDuration,
                    delay: scrollTriggerDelay,
                    ease: 'power2.out',
                });
            }
        });
        gsap.set(heading, {autoAlpha: 1});
    });

    // h1
    const headingsSmall = document.querySelectorAll('.animated-heading-scroll, .heading-small');
    headingsSmall.forEach(heading => {
        const customStart = heading.getAttribute('data-trigger-start');
        const scrollTriggerStart = customStart || "top 70%";
        const customDelay = heading.getAttribute('data-trigger-delay');
        const customDuration = heading.getAttribute('data-trigger-duration');
        const scrollTriggerDuration = customDuration || "0.75";
        const scrollTriggerDelay = customDelay || 0.5;
        SplitText.create(heading, {
            type: "chars",
            charsClass: 'letter',
            autoSplit: true,
            smartWrap: true,
            mask: "lines",
            onSplit(split) {
                return gsap.timeline({
                    scrollTrigger: {
                        trigger: heading,
                        start: scrollTriggerStart,
                        once: true
                    }
                }).from(split.chars, {
                    opacity: 0,
                    y: 20,
                    stagger: 0.04,
                    duration: scrollTriggerDuration,
                    delay: scrollTriggerDelay,
                    ease: 'power2.out',
                    filter: window.innerWidth > 991 ? 'blur(10px)':''
                });
            }
        });
        gsap.set(heading, {autoAlpha: 1});
    });

    // Eyebrows
    const eyebrows = document.querySelectorAll('.text-anim');
    eyebrows.forEach(heading => {
        const customStart = heading.getAttribute('data-trigger-start');
        const scrollTriggerStart = customStart || "top 60%";
        const customDelay = heading.getAttribute('data-trigger-delay');
        const scrollTriggerDelay = customDelay || 0;
        SplitText.create(heading, {
            type: "words, chars",
            tagName: "span",
            autoSplit: true,
            onSplit(split) {
                return gsap.timeline({
                    scrollTrigger: {
                        trigger: heading,
                        start: scrollTriggerStart,
                        once: true
                    }
                }).from(split.chars, {
                     opacity: 0,
                    duration: 0.05,
                    ease: "power1.out",
                    delay: scrollTriggerDelay,
                    stagger: { amount: 0.4, from: "random" }
                });
            }
        });
        gsap.set(heading, {autoAlpha: 1});

    });
}

// document.fonts.ready.then(() => {
// })


document.addEventListener('DOMContentLoaded', function () {
    if(typeof window.gsap === "undefined") document.documentElement.classList.add("gsap-not-found");
    gsap.registerPlugin(SplitText, ScrollTrigger);
        if(window.location.href.indexOf('#jobs') === -1) window.scrollTo(0,0)
    setTimeout(() => createHeadingsAll(), 10);
//     setTimeout(() => {
//         if(window.location.href.indexOf('#jobs') === -1) window.scrollTo(0,0)
//         setTimeout(() => {
//             createHeadingsAll()
//         }, 10)
//     }, 100)
});