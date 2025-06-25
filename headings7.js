function createHeadingsAll() {
    const headings = document.querySelectorAll('[data-split="heading"]');
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
    });
    gsap.registerPlugin(SplitText, ScrollTrigger);
}

document.addEventListener('DOMContentLoaded', function () {
    createHeadingsAll()
});