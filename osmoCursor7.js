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

  const allGlow = Array.from(document.querySelectorAll('.glow--blue'));
  allGlow.forEach((el) => {
    let randomId = Array.from({length: 50}, () => String.fromCharCode(65 + Math.floor(Math.random() * 52) % 26 + (Math.random() < 0.5 ? 0 : 32))).join('');

    el.id = randomId;
    setTimeout(() => {
      el.querySelector(`.cursor__glow--blue`).style.opacity = 0
      el.addEventListener("mouseenter", e => {
        setTimeout(() => document.querySelector(`#${randomId} .cursor__glow--blue`).style.opacity = 0.3, 100);
        let xTo3 = gsap.quickTo(`#${randomId} .cursor__glow--blue`, "x", { duration: 0, ease: "none" });
        let yTo3 = gsap.quickTo(`#${randomId} .cursor__glow--blue`, "y", { duration: 0, ease: "none" });
        xTo3(e.clientX);
        yTo3(e.clientY);
      })
      el.addEventListener("mousemove", e => {
        let xTo3 = gsap.quickTo(`#${randomId} .cursor__glow--blue`, "x", { duration: 0.5, ease: "power3" });
        let yTo3 = gsap.quickTo(`#${randomId} .cursor__glow--blue`, "y", { duration: 0.5, ease: "power3" });
        xTo3(e.clientX);
        yTo3(e.clientY);
      })
      el.addEventListener("mouseout", e => {
        setTimeout(() => document.querySelector(`#${randomId} .cursor__glow--blue`).style.opacity = 0, 100);
      })
    }, 400);
  })
}

let cursorTimeOut;
let cursorShown = false;

function showCursor() {
  document.querySelector('.cursor__inner').style.opacity = '1';
  document.querySelector('.cursor').style.opacity = '1';
}

window.addEventListener("mousemove", e => {
  if (window.innerWidth > 991) {
    if (cursorShown === false) {
      showCursor();
      cursorShown = true
    }
    else;
    if (cursorTimeOut) clearTimeout(cursorTimeOut)
    cursorTimeOut = setTimeout(() => {
      document.querySelector('.cursor__inner').classList.remove('cursor__inner--moving')
    }, 100)
    if (document.querySelector('.cursor__inner--moving')) return;
    else document.querySelector('.cursor__inner').classList.add('cursor__inner--moving')
  }
});

function hideCursor() {
  cursorShown = false;
  document.querySelector('.cursor__inner').style.opacity = '0';
  document.querySelector('.cursor').style.opacity = '0';
}

document.body.addEventListener("mouseleave", e => {
  hideCursor()
  // console.log('LEAVE')
})

// Initialize Basic Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
  hideCursor()
  initBasicCustomCursor();
});