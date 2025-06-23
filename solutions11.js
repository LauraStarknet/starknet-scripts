const target = document.querySelectorAll('.scroll-child');
const scrollSpeed = 1.27;

function outro(el) {
  el.classList.remove('visible');
  if (el.querySelector('video')) el.querySelector('video').pause();
  const elid = el.id.replace('scroll', 'text')
  document.querySelector(`.${elid}`).classList.remove('visible');
  setTimeout(() => {
    document.querySelector(`.${elid}`).classList.remove('visible');
  }, 400)
}

function intro(el) {
  el.classList.add('visible');
  if (el.querySelector('video')) el.querySelector('video').play();
  const elid = el.id.replace('scroll', 'text');
  if (Number(el.id.replace('scroll-child--', '')) > 0 && !typeAnimationRunning) initType();
  setTimeout(() => {
    document.querySelector(`.${elid}`).classList.add('visible');
  }, 500)
}

function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      target.forEach(el => {
        outro(el)
      });
      intro(entry.target)
    } else {
      outro(entry.target)
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, { threshold: 0.6 });
target.forEach(el => observer.observe(el));

window.addEventListener('scroll', (e) => {
  if (document.querySelector('.sticky-scroll')) {
    let topScroll = document.querySelector('.sticky-scroll').getBoundingClientRect().y;
    topScroll = topScroll > 0 ? 0 : topScroll;
    if (document.querySelector('.scroll-parent')) {
      document.querySelector('.scroll-parent').scrollTo({
        top: 0,
        left: (-topScroll + 250) / scrollSpeed,
        behavior: "smooth",
      });
      if (topScroll < -(5 * window.innerWidth / scrollSpeed) && typeAnimationRunning) finishType()
    }
  }
})


let i = 0;
let txt = ''; /* The text */
let speed = 100; /* The speed/duration of the effect in milliseconds */
let myInterval2;
let typeAnimationRunning = false;
let typewriter;

function scrollDown() {
  if(document.querySelector(".dapp-list").scrollTop < (document.querySelector(".dapp-list").scrollHeight - window.innerHeight - 5)) {
    document.querySelector(".dapp-list").scrollTop = document.querySelector(".dapp-list").scrollHeight;
  }
}

function typeWriterFn() {
  const localText = `${txt}`;
  typewriter
    .typeString(localText)
    .typeString(localText)
    .typeString(localText)
    .typeString(localText)
    .typeString(localText)
    .start();
}

function initType() {
  if (txt === '') txt = document.querySelector(".dapp-list").innerHTML;
  document.querySelector(".dapp-list").innerHTML = '';
  document.querySelector(".dapp-list").style.opacity = '0.4';
  typeAnimationRunning = true;
  var app = document.querySelector('.dapp-list');
  typewriter = new Typewriter(app, {
    loop: false,
    delay: 5,
    onCreateTextNode: (character) => {
      scrollDown()
      return document.createTextNode(character);
    },
  });
  typeWriterFn()
}

function finishType() {
  if(typewriter) {
    typewriter.deleteAll(0)
    document.querySelector(".dapp-list").innerHTML = '';
    typewriter.stop()
  }
  typeAnimationRunning = false;
}