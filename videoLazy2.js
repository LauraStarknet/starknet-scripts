let videoList = Array.from(document.querySelectorAll('.responsive-embed-video video'));

function handleVideoIntersection(entries) {
    entries.map((entry) => {
        if (entry.isIntersecting) {
            if(window.innerWidth > 1440 && entry.target.className.indexOf('desktop') > -1) entry.target.play()
            if(window.innerWidth < 1440 && entry.target.className.indexOf('tablet') > -1) entry.target.play()
        } else {
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

document.addEventListener('DOMContentLoaded', function () {
    prepareVideos()
})

prepareVideos()