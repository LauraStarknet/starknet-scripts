const target = document.querySelectorAll('.scroll-child');
let scrollSpeed = 1.27;
let extraScroll;

function defineScrollSpeed() {
  if(window.innerWidth < 991) scrollSpeed = 2.5;
  if(window.innerWidth < 479) scrollSpeed = 5;
  extraScroll = (window.innerHeight/scrollSpeed);
  if(document.querySelector('.sticky-scroll')) document.querySelector('.sticky-scroll').style.height = `${300*scrollSpeed}vw`
}

function outro(el) {
  el.classList.remove('visible');
  const videoToCall = window.innerWidth < 991 ? '.video-tablet':'.video-desktop'
  if (el.querySelector(videoToCall)) el.querySelector(videoToCall).pause();
  const elid = el.id.replace('scroll', 'text')
  document.querySelector(`.${elid}`).classList.remove('visible');
  setTimeout(() => {
    document.querySelector(`.${elid}`).classList.remove('visible');
  }, 400)
}

function intro(el) {
  el.classList.add('visible');
  const videoToCall = window.innerWidth < 991 ? '.video-tablet':'.video-desktop'
  if (el.querySelector(videoToCall)) el.querySelector(videoToCall).play();
  const elid = el.id.replace('scroll', 'text');
  if (Number(el.id.replace('scroll-child--', '')) > 0 && !typeAnimationRunning && window.innerWidth > 479) initType();
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
        left: (-topScroll + extraScroll) / scrollSpeed,
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

defineScrollSpeed()

window.addEventListener('resize', () => {
  defineScrollSpeed()
  if(window.innerWidth < 479) finishType()
})