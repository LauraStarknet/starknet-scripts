let videoList = Array.from(document.querySelectorAll('video'));

function handleVideoIntersection(entries) {
    entries.map((entry) => {
        if (entry.isIntersecting) {
            entry.target.parentElement.classList.add('currently-in-view');
            let portraitMode = window.innerWidth < window.innerHeight;
            if(window.innerWidth > 1280 && entry.target.className.indexOf('desktop') > -1 && !portraitMode) entry.target.play()
            if(window.innerWidth < 1280 && entry.target.className.indexOf('tablet') > -1 || portraitMode) entry.target.play()
            if(entry.target.parentElement.className.indexOf('responsive-embed-video') === -1) entry.target.play()
        } else {
            entry.target.parentElement.classList.remove('currently-in-view');
            entry.target.pause()
        }
    });
}

const observerVideos = new IntersectionObserver(handleVideoIntersection, { threshold: 0.01, rootMargin: '100%' });

function prepareVideos() {
    videoList.forEach((vid) => {
        if (vid.className.indexOf('preload') > -1) {
            observerVideos.observe(vid);
        }
        else {
            vid.muted = true;
            vid.autoplay = false;
            vid.preload = false;
            observerVideos.observe(vid);
        }
    })
}

function refreshVideos() {
    let currentVideoList = Array.from(document.querySelectorAll('.currently-in-view video'));
    currentVideoList.forEach((vid) => {
        let portraitMode = window.innerWidth < window.innerHeight;
        if(window.innerWidth > 1280 && entry.target.className.indexOf('desktop') > -1 && !portraitMode) vid.play()
        if(window.innerWidth < 1280 && entry.target.className.indexOf('tablet') > -1 || portraitMode) vid.play()
        else vid.pause()
    })
}

document.addEventListener('DOMContentLoaded', function () {
    if(window.location.href.indexOf('ecosystem') === -1) prepareVideos()
})

window.addEventListener('resize', function () {
    refreshVideos()
})

prepareVideos()