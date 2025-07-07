

// function callbackMain(entries) {
//     entries.map((entry) => {
//       console.log(entry.intersectionRatio)
//         if (entry.isIntersecting) {
//           console.log('MAIN WRAPPER IN VIEW')
//             // entry.target.parentElement.classList.add('currently-in-view');
//         } else {
//           console.log('MAIN WRAPPER OUT OF VIEW')
//             // entry.target.parentElement.classList.remove('currently-in-view');
//         }
//     });
// }
// // Create an observer instance linked to the callback function
// const observerMain = new IntersectionObserver(callbackMain, { threshold: [...Array(101).keys()].map((x) => x / 100) });
// // Start observing the target node for configured mutations
// observerMain.observe(mainWrapper);

window.addEventListener('scroll', () => {
  const mainWrapper = document.querySelector('.main-wrapper')
  if(window.scrollY > mainWrapper.clientHeight - window.innerHeight) {
    document.querySelector('.footer').classList.add('footer--anim')
    if(document.querySelector('.sticky-nav')) document.querySelector('.sticky-nav').classList.add('sticky-nav--out')
  }
  else {
    document.querySelector('.footer').classList.remove('footer--anim')
    if(document.querySelector('.sticky-nav')) document.querySelector('.sticky-nav').classList.remove('sticky-nav--out')
  }
  if(window.scrollY > mainWrapper.clientHeight - 200) {
    console.log('hiding header')
    document.querySelector('.navigation-desktop').classList.add('navigation-desktop--anim')
  }
  else {
    console.log('showing header')
    document.querySelector('.navigation-desktop').classList.remove('navigation-desktop--anim')
  }
})


window.addEventListener("resize", () => {
  if(ScrollTrigger) ScrollTrigger.update()
})