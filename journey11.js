let vh = 0;
let touch = false;

function calculateVideosJourney() {
    let currentScroll = - document.querySelector('#journeys').getBoundingClientRect().top - 0.8*vh;
    if(currentScroll > document.querySelector('#journeys').clientHeight || currentScroll < 0) return;
    else {
        let allVideos = Array.from(document.querySelectorAll('.video-wrap'));
        for (let i = 0; i < 4; i++) {
            allVideos[i].style.transform = `translateY(${currentScroll - (vh * i)}px)`
            if(i === 3 && currentScroll > vh * 3 && !touch) {
                let percent = (currentScroll - vh * 3) / vh
                allVideos[i].style.transform = `translateY(${currentScroll - (vh * i)}px) scale(${1+(touch ? 1:3.5)*percent})`;
                allVideos[i].style.filter = `blur(${(touch ? 10:20)*percent}px)`;
                allVideos[i].style.opacity = 1-(0.2*percent);
            }
        }
    }
}

function initJourney() {
    vh = window.innerHeight;
    if(touch === true) {
        // console.log('touch device')
        vh = window.innerHeight;
        let allVideos = Array.from(document.querySelectorAll('.video-wrap'));
        for (let i = 0; i < 4; i++) {
            allVideos[i].style.willChange = 'transform';
        }
        document.querySelector('#journeys .content-item-0').style.height = `${vh*0.8}px`
        Array.from(document.querySelectorAll('#journeys .layout-content-item')).forEach((divItem, i) => {
            if(i < 3) divItem.style.height = `${vh}px`
            else {
                divItem.style.height = `${vh*2.5}px`
                divItem.querySelector('.cta-wrapper').style.height = `${vh*1.5}px`
            }
        })
        Array.from(document.querySelectorAll('#journeys .video-wrap')).forEach((divItem, i) => {
            divItem.style.height = `${vh}px`
        })
    }
    // else console.log('not touch device')
    
}

window.addEventListener('scroll', () => {
    calculateVideosJourney()
})

window.addEventListener('wheel', () => {
    if(vh === 0) vh = window.innerHeight;
})
window.addEventListener('resize', () => {if(touch === false)  vh = vh;})
window.addEventListener('touchstart', () => { 
    if(touch === false) {
        touch = true;
        setTimeout(() => {
            initJourney()
        }, 2000)
    }
})
