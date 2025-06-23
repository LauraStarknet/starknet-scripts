let xTo, yTo, yTo2, xTo2;

function initBasicCustomCursor() {

  gsap.set(".cursor", { xPercent: -50, yPercent: -50 });
  gsap.set(".cursor__inner", { xPercent: -50, yPercent: -50 });

  xTo = gsap.quickTo(".cursor", "x", { duration: 0.5, ease: "power3" });
  yTo = gsap.quickTo(".cursor", "y", { duration: 0.5, ease: "power3" });
  xTo2 = gsap.quickTo(".cursor__inner", "x", { duration: 0.1, ease: "power3" });
  yTo2 = gsap.quickTo(".cursor__inner", "y", { duration: 0.1, ease: "power3" });

  window.addEventListener("mousemove", e => {
    xTo(e.clientX);
    yTo(e.clientY);
    xTo2(e.clientX);
    yTo2(e.clientY);
  });
}

let cursorTimeOut;
window.addEventListener("mousemove", e => {
  if (cursorTimeOut) clearTimeout(cursorTimeOut)
  cursorTimeOut = setTimeout(() => {
    document.querySelector('.cursor__inner').classList.remove('cursor__inner--moving')
  }, 100)
  if (document.querySelector('.cursor__inner--moving')) return;
  else document.querySelector('.cursor__inner').classList.add('cursor__inner--moving')
});

// Initialize Basic Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
  initBasicCustomCursor();
});