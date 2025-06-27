function createHeadingsAll() {
    const headings = document.querySelectorAll('[data-split="heading"]');
    headings.forEach(heading => {
        const customStart = heading.getAttribute('data-trigger-start');
        const scrollTriggerStart = customStart || "top 70%";
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
                        once: true,
                        toggleActions: "none play none reset"
                    }
                }).from(split.lines, {
                    opacity: 0.8,
                    yPercent: 110,
                    stagger: 0.1,
                    duration: 0.5,
                    // delay: 0.1,
                    ease: 'power2.out',
                });
            }
        });
        gsap.set(heading, {autoAlpha: 1});
        gsap.registerPlugin(SplitText, ScrollTrigger);
    });
    const headingsSmall = document.querySelectorAll('.animated-heading-scroll, .heading-small');

    headingsSmall.forEach(heading => {
        const customStart = heading.getAttribute('data-trigger-start');
        const scrollTriggerStart = customStart || "top 70%";
        SplitText.create(heading, {
            type: "chars",
            charsClass: 'letter',
            autoSplit: true,
            onSplit(split) {
                return gsap.timeline({
                    scrollTrigger: {
                        trigger: heading,
                        start: scrollTriggerStart,
                        once: true,
                        toggleActions: "none play none reset"
                    }
                }).from(split.chars, {
                    opacity: 0,
                    y: 20,
                    stagger: 0.04,
                    duration: 0.75,
                    delay: 0.5,
                    ease: 'power2.out',
                    filter: 'blur(10px)'
                });
            }
        });
        gsap.set(heading, {autoAlpha: 1});
        gsap.registerPlugin(SplitText, ScrollTrigger);
    });

    const eyebrows = document.querySelectorAll('.text-anim');

    eyebrows.forEach(heading => {
        const customStart = heading.getAttribute('data-trigger-start');
        const scrollTriggerStart = customStart || "top 60%";
        SplitText.create(heading, {
            type: "words, chars",
            tagName: "span",
            autoSplit: true,
            onSplit(split) {
                return gsap.timeline({
                    scrollTrigger: {
                        trigger: heading,
                        start: scrollTriggerStart,
                        once: true,
                        toggleActions: "none play none reset"
                    }
                }).from(split.chars, {
                     opacity: 0,
                    duration: 0.05,
                    ease: "power1.out",
                    stagger: { amount: 0.4, from: "random" }
                });
            }
        });
        gsap.set(heading, {autoAlpha: 1});
        gsap.registerPlugin(SplitText, ScrollTrigger);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    window.scrollTo(0,0)
    setTimeout(() => {
        createHeadingsAll()
    }, 10)
});