function initBasicCustomCursor() {  
  
  gsap.set(".cursor", {xPercent:-50, yPercent: -50});
  gsap.set(".cursor__dot", {xPercent:-50, yPercent: -50});

  let xTo = gsap.quickTo(".cursor", "x", {duration: 0.6, ease: "power3"});
  let yTo = gsap.quickTo(".cursor", "y", {duration: 0.6, ease: "power3"});
  let xTo2 = gsap.quickTo(".cursor__dot", "x", {duration: 0.1, ease: "power3"});
  let yTo2 = gsap.quickTo(".cursor__dot", "y", {duration: 0.1, ease: "power3"});

  window.addEventListener("mousemove", e => {
    xTo(e.clientX);
    yTo(e.clientY);
    xTo2(e.clientX);
    yTo2(e.clientY);
  });
}

// Initialize Basic Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
  initBasicCustomCursor();
});