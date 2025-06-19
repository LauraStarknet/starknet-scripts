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
  }, (Number(el.id.replace('scroll-child--', '')) === 0 && !typeAnimationRunning) ? 10 : 500)
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
      // console.log(topScroll, window.innerHeight)
    }
  }
})


let i = 0;
let txt = ''; /* The text */
let speed = 100; /* The speed/duration of the effect in milliseconds */
let myInterval2;
let typeAnimationRunning = false;
// let typewriter;


function initType() {
  // console.log('initType');
  if (txt === '') txt = document.querySelector(".dapp-list").innerHTML;
  // if (txt.length === 0) txt = document.querySelector(".dapp-list").innerHTML.split("<br>");
  document.querySelector(".dapp-list").innerHTML = '';
  document.querySelector(".dapp-list").style.opacity = '0.4';
  typeAnimationRunning = true;
  // if (myInterval2) clearInterval(myInterval2);
  // myInterval2 = setInterval(() => typeWriter(), speed);
  var app = document.querySelector('.dapp-list');
  typewriter = new Typewriter(app, {
    loop: true,
    delay: 10,
  });

  typewriter
    .typeString(txt)
    .start();
}

function finishType() {
  if(typewriter.stop) typewriter.stop()
  // clearInterval(myInterval2);
  typeAnimationRunning = false;
  // document.querySelector(".dapp-list").innerHTML = '';
  // document.querySelector(".dapp-list").style.opacity = '0';
}

// function typeWriter() {
  // if (i < txt.length) {
  //   document.querySelector(".dapp-list").innerHTML += `${txt[i]}<br>`;
  //   // document.querySelector(".dapp-list").innerHTML += txt.slice(i, i+10).replaceAll(/%/g, '<br>');
  //   document.querySelector(".dapp-list").scrollTop = document.querySelector(".dapp-list").scrollHeight;
  //   i++
  // }
  // else i = 0;
// }