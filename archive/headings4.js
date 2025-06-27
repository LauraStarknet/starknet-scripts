// function createHeadings1() {
//     const scrollElements = document.querySelectorAll('.animated-heading-scroll, .heading-small');
//     const observer = new IntersectionObserver((entries, obs) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const el = entry.target;

//                 if (!el.dataset.splitDone) {
//                     const split = new SplitType(el, { types: 'chars' });
//                     el.dataset.splitDone = 'true';
//                 }

//                 gsap.set(el.querySelectorAll('.char'), { opacity: 0, y: 20 });
//                 gsap.to(
//                     el.querySelectorAll('.char'),
//                     {
//                         opacity: 1,
//                         y: 0,
//                         stagger: 0.05,
//                         duration: 0.75,
//                         delay: 0.5,
//                         ease: 'power2.out',
//                     }
//                 );
//                 obs.unobserve(el);
//             }
//         });
//     }, {
//         threshold: 0.5,
//     });
//     scrollElements.forEach(el => observer.observe(el));
// }

function createHeadings2() {
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
            type: "letter",
            linesClass: "split-char",
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
    // createHeadings1()
    createHeadings2()
});

// let headingTimeOut;

// function headingReset() {
//     if(headingTimeOut) {
//         console.log('clearing time out');
//         clearTimeout(headingTimeOut);
//     }
//     console.log('creating time out');
//     headingTimeOut = setTimeout(() => {
//         console.log('triggering time out');
//         const headings = document.querySelectorAll('[data-split="heading"]');
//         headings.forEach(heading => {
//           let lineList = heading.querySelectorAll('.split-line');
//           if(lineList.length > 0) {
//               let newContent = ''
//               for(let i = 0; i < lineList.length; i++) {
//                 newContent += lineList[i].innerHTML;
//               }
//             //   console.log(newContent)
//               heading.innerHTML = newContent;
//             //   setTimeout(() => createHeadings2(), 500);
//           }
//         })
//     }, 100)
// }

// window.addEventListener("resize", () => {
//   if(ScrollTrigger) headingReset()
// })