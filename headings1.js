function createHeadings() {
    const scrollElements = document.querySelectorAll('.animated-heading-scroll, .heading-small');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;

                if (!el.dataset.splitDone) {
                    const split = new SplitType(el, { types: 'chars' });
                    el.dataset.splitDone = 'true';
                }

                gsap.set(el.querySelectorAll('.char'), { opacity: 0, y: 20 });
                gsap.to(
                    el.querySelectorAll('.char'),
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.05,
                        duration: 0.75,
                        delay: 0.5,
                        ease: 'power2.out',
                    }
                );
                obs.unobserve(el);
            }
        });
    }, {
        threshold: 0.5,
    });
    scrollElements.forEach(el => observer.observe(el));

    const headings = document.querySelectorAll('[data-split="heading"]');
    headings.forEach(heading => {
        const split = SplitText.create(heading, {
            type: "lines",
            linesClass: "split-line"
        });
        split.lines.forEach(line => {
            const wrapper = document.createElement("div");
            wrapper.style.overflow = "hidden";
            wrapper.style.display = "block";
            wrapper.style.paddingBlock = "0.12em";
            wrapper.style.marginBlock = "-0.2em";
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });
        const customStart = heading.getAttribute('data-trigger-start');
        const scrollTriggerStart = customStart || "top 70%";
        gsap.from(split.lines, {
            yPercent: 100,
            delay: 0.25,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: heading,
                start: scrollTriggerStart,
                once: true
            }
        });
    });
    gsap.registerPlugin(SplitText, ScrollTrigger);
}


document.addEventListener('DOMContentLoaded', function () {
    createHeadings()
});

let headingTimeOut;

function headingReset() {
    if(headingTimeOut) clearTimeout(headingTimeOut);
    headingTimeOut = setTimeout(() => {
        const headings = document.querySelectorAll('[data-split="heading"]');
        headings.forEach(heading => {
          let lineList = heading.querySelectorAll('.split-line');
          if(lineList.length > 0) {
              let newContent = ''
              for(let i = 0; i < lineList.length; i++) {
                newContent += lineList[i].innerHTML;
              }
              console.log(newContent)
              heading.innerHTML = newContent;
              setTimeout(() => createHeadings(), 10);
          }
        })
    }, 100)
}

window.addEventListener("resize", () => {
  if(ScrollTrigger) headingReset()
})