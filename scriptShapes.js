const target = document.querySelectorAll('.scroll-child');
const scrollSpeed = 1.2;

function outro(el) {
  el.classList.remove('visible');
  if (el.querySelector('video')) el.querySelector('video').pause();
  const elid = el.id.replace('scroll', 'text')
  document.querySelector(`.${elid}`).classList.remove('visible');
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
        left: (-topScroll + 150) / scrollSpeed,
        behavior: "smooth",
      });
      if (topScroll < -(5 * window.innerWidth / scrollSpeed) && typeAnimationRunning) finishType()
      console.log(topScroll, window.innerHeight)
    }
  }
})


let i = 0;
let txt = ''; /* The text */
let speed = 3; /* The speed/duration of the effect in milliseconds */
let myInterval2;
let typeAnimationRunning = false;


function initType() {
  console.log('initType');
  if (txt === '') txt = document.querySelector(".dapp-list").innerHTML.replaceAll("<br>", "%");
  document.querySelector(".dapp-list").innerHTML = '';
  document.querySelector(".dapp-list").style.opacity = '0.4';
  typeAnimationRunning = true;
  if (myInterval2) clearInterval(myInterval2);
  myInterval2 = setInterval(() => typeWriter(), speed);
}

function finishType() {
  clearInterval(myInterval2);
  typeAnimationRunning = false;
  document.querySelector(".dapp-list").innerHTML = '';
  document.querySelector(".dapp-list").style.opacity = '0';
}

function typeWriter() {
  if (i < txt.length) {
    document.querySelector(".dapp-list").innerHTML += txt.charAt(i).replace('%', '<br>');
    document.querySelector(".dapp-list").scrollTop = document.querySelector(".dapp-list").scrollHeight;
    i++;
  }
  else i = 0;
}