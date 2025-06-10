window.addEventListener("DOMContentLoaded", () => {
  // let typeSplit = new SplitType("[text-split]", {
  //   types: "words, chars",
  //   tagName: "span"
  // });
  function createScrollTrigger(triggerElement, timeline) {
    console.log('Creating trigger element')
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 90%",
      onEnter: () => {
        console.log('entering')
        timeline.play()
      }
    });
  }
  $("[letters-fade-in-random]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      opacity: 0,
      duration: 0.05,
      ease: "power1.out",
      stagger: {
        amount: 0.4,
        from: "random"
      }
    });
    createScrollTrigger($(this), tl);
  });
  gsap.set("[text-split]", { opacity: 1 });
});


window.addEventListener("DOMContentLoaded", () => {
  console.log('content loaded')
})