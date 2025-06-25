function createHeadingsAll() {
    const headings = document.querySelectorAll('[data-split="heading"]');
    const headingsSmall = document.querySelectorAll('.animated-heading-scroll, .heading-small');
    headings.forEach(heading => {
        const customStart = heading.getAttribute('data-trigger-start');
        const scrollTriggerStart = customStart || "top 70%";
        SplitText.create(heading, {
            type: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit(split) {
                return gsap.timeline({
                    scrollTrigger: {
                        trigger: heading,
                        start: scrollTriggerStart,
                        once: true,
                    }
                }).from(split.lines, {
                   opacity: 1,
                    y: 0,
                    stagger: 0.05,
                    duration: 0.75,
                    delay: 0.5,
                    ease: 'power2.out',
                });
            }
        });
    });

    headingsSmall.forEach(heading => {
        const customStart = heading.getAttribute('data-trigger-start');
        const scrollTriggerStart = customStart || "top 70%";
        SplitText.create(heading, {
            type: "chars",
            linesClass: "letter",
            autoSplit: true,
            onSplit(split) {
                return gsap.timeline({
                    scrollTrigger: {
                        trigger: heading,
                        start: scrollTriggerStart,
                        once: true,
                    }
                }).from(split.lines, {
                    yPercent: 100,
                    delay: 0.25,
                    opacity: 0,
                    duration: 1,
                    ease: "expo.out",
                    stagger: 0.1,
                });
            }
        });
    });
    gsap.registerPlugin(SplitText, ScrollTrigger);
}

document.addEventListener('DOMContentLoaded', function () {
    createHeadingsAll()
});