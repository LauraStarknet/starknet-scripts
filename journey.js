function calculateVideosJourney() {
    let currentScroll = - document.querySelector('#journeys').getBoundingClientRect().top - 0.8*window.innerHeight;
    if(currentScroll > document.querySelector('#journeys').clientHeight || currentScroll < 0) return;
    else {
        let allVideos = Array.from(document.querySelectorAll('.video-wrap'));
        for (let i = 0; i < 4; i++) {
            allVideos[i].style.transform = `translateY(${currentScroll - (window.innerHeight * i)}px)`
            if(i === 3 && currentScroll > window.innerHeight * 3) {
                let percent = (currentScroll - window.innerHeight * 3) / window.innerHeight
                allVideos[i].style.transform = `translateY(${currentScroll - (window.innerHeight * i)}px) scale(${1+3.5*percent})`;
                allVideos[i].style.filter = `blur(${20*percent}px)`;
                allVideos[i].style.opacity = 1-(0.2*percent);
            }
        }
    }
}

window.addEventListener('scroll', () => calculateVideosJourney())
