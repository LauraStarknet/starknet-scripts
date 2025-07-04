let videoList = Array.from(document.querySelectorAll('video'));

function handleVideoIntersection(entries) {
    entries.map((entry) => {
        if (entry.isIntersecting) {
            entry.target.parentElement.classList.add('currently-in-view');
            if(window.innerWidth > 1280 && entry.target.className.indexOf('desktop') > -1) entry.target.play()
            if(window.innerWidth < 1280 && entry.target.className.indexOf('tablet') > -1) entry.target.play()
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
        if(window.innerWidth > 1440 && entry.target.className.indexOf('desktop') > -1) vid.play()
        else if(window.innerWidth < 1440 && entry.target.className.indexOf('tablet') > -1) vid.play()
        else vid.pause()
    })
}

document.addEventListener('DOMContentLoaded', function () {
    prepareVideos()
})

window.addEventListener('resize', function () {
    refreshVideos()
})

prepareVideos()