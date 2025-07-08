window.addEventListener('scroll', () => {
  const mainWrapper = document.querySelector('.main-wrapper')
  if(window.scrollY > mainWrapper.clientHeight - window.innerHeight) {
    let footerOpacity = 1.3 + ((window.scrollY - mainWrapper.clientHeight) / window.innerHeight);
    document.querySelector('.footer').style.opacity = footerOpacity > 1 ? 1:footerOpacity;
    document.querySelector('.footer').classList.add('footer--anim')
    if(document.querySelector('.sticky-nav')) document.querySelector('.sticky-nav').classList.add('sticky-nav--out')
  }
  else {
    document.querySelector('.footer').classList.remove('footer--anim')
    document.querySelector('.footer').style.opacity = 0.3;
    if(document.querySelector('.sticky-nav')) document.querySelector('.sticky-nav').classList.remove('sticky-nav--out')
  }
  if(window.scrollY > mainWrapper.clientHeight - 150) {
    document.querySelector('.navbar-brand').classList.add('nav-up')
    document.querySelector('.button_wrap').classList.add('nav-up')
    document.querySelector('.navigation-mobile').classList.add('nav-up')
  }
  else {
    document.querySelector('.navbar-brand').classList.remove('nav-up')
    document.querySelector('.button_wrap').classList.remove('nav-up')
    document.querySelector('.navigation-mobile').classList.remove('nav-up')
  }
})


window.addEventListener("resize", () => {
  if(ScrollTrigger) ScrollTrigger.update()
})