const target = document.querySelectorAll(".scroll-child");
let scrollSpeed = 1.27;
let extraScroll;

function defineScrollSpeed() {
  if (window.innerWidth < 1030) scrollSpeed = 2.5; extraScroll = 0;
  if (window.innerWidth < 479) scrollSpeed = 3.5; extraScroll = 0;
  extraScroll = 0;
  if (document.querySelector(".sticky-scroll"))
    document.querySelector(".sticky-scroll").style.height = `${
      315 * scrollSpeed
    }vw`;
}

function outro(el) {
    if(el) {
    el.classList.remove("visible");
    const videoToCall =
      window.innerWidth < 1030 ? ".video-tablet" : ".video-desktop";
    if (el.querySelector(videoToCall)) el.querySelector(videoToCall).pause();
    const elid = el.id.replace("scroll", "text");
    document.querySelector(`.${elid}`).classList.remove("visible");
    setTimeout(() => {
      document.querySelector(`.${elid}`).classList.remove("visible");
    }, 400);
  }
}

function intro(el) {
  if(el) {
    el.classList.add("visible");
    const videoToCall =
      window.innerWidth < 1030 ? ".video-tablet" : ".video-desktop";
    if (el.querySelector(videoToCall)) el.querySelector(videoToCall).play();
    const elid = el.id.replace("scroll", "text");
    if (
      Number(el.id.replace("scroll-child--", "")) > 0 &&
      !typeAnimationRunning &&
      window.innerWidth > 479
    )
      initType();
    setTimeout(() => {
      document.querySelector(`.${elid}`).classList.add("visible");
    }, 390);
  }
  }

let currentStep = -1;

function calculateScroll() {
  if (document.querySelector(".sticky-scroll")) {
    let topScroll = document.querySelector(".sticky-scroll").getBoundingClientRect().y;
    topScroll = topScroll > 0 ? 0 : topScroll;

    if (document.querySelector(".scroll-parent")) {
      newCurrentStep = Math.round(((-topScroll + extraScroll) / ((window.innerWidth * 3 * scrollSpeed) - window.innerHeight)) * 4
      );
      if (newCurrentStep !== currentStep) {
        if (currentStep !== 5 && currentStep !== -1)
          outro(document.querySelector(`#scroll-child--${currentStep}`));
        if (newCurrentStep !== 5)
          intro(document.querySelector(`#scroll-child--${newCurrentStep}`));
      }
      currentStep = newCurrentStep;
      // document.querySelector('#step').innerHTML = currentStep;
      let left = currentStep * (window.innerWidth / 2) + window.innerWidth / 2;
      document.querySelector(
        ".scroll-wrapper"
      ).style.transform = `translateX(-${left}px)`;
      let boundaries = ((-topScroll + extraScroll) / ((window.innerWidth * 3 * scrollSpeed) - window.innerHeight))
      if(boundaries <= 0 || boundaries >= 1.15) finishType();
        
    }
  }
}

window.addEventListener("scroll", (e) => {
  calculateScroll();
});

let i = 0;
let txt = ""; /* The text */
let speed = 100; /* The speed/duration of the effect in milliseconds */
let myInterval2;
let typeAnimationRunning = false;
let typewriter;

function scrollDown() {
  if (
    document.querySelector(".dapp-list").scrollTop <
    document.querySelector(".dapp-list").scrollHeight - window.innerHeight - 5
  ) {
    document.querySelector(".dapp-list").scrollTop =
      document.querySelector(".dapp-list").scrollHeight;
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
  if (txt === "") txt = document.querySelector(".dapp-list").innerHTML;
  document.querySelector(".dapp-list").innerHTML = "";
  document.querySelector(".dapp-list").style.opacity = "0.4";
  typeAnimationRunning = true;
  var app = document.querySelector(".dapp-list");
  typewriter = new Typewriter(app, {
    loop: false,
    delay: 5,
    onCreateTextNode: (character) => {
      scrollDown();
      return document.createTextNode(character);
    },
  });
  typeWriterFn();
}

function finishType() {
  if (typewriter) {
    typewriter.deleteAll(0);
    document.querySelector(".dapp-list").innerHTML = "";
    typewriter.stop();
  }
  typeAnimationRunning = false;
}

defineScrollSpeed();
calculateScroll();

window.addEventListener("resize", () => {
  defineScrollSpeed();
  calculateScroll();
  if (window.innerWidth < 479) finishType();
});
