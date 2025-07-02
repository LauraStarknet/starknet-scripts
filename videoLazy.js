let videoList = Array.from(document.querySelectorAll('video'));

function handleVideoIntersection(entries) {
    entries.map((entry) => {
        if (entry.isIntersecting) {
            // entrytarget.forEach(el => {
            //     entry.target.pause()
            // });
            entry.target.play()
        } else {
            entry.target.pause()
        }
    });
}

const observerVideos = new IntersectionObserver(handleVideoIntersection, { threshold: 0.01, rootMargin: '100%' });

function prepareVideos() {
    console.log('preparing videos')
    videoList.forEach((vid) => {
        if (vid.className.indexOf('preload') > -1) return;
        vid.muted = true;
        vid.autoplay = false;
        vid.preload = false;
        observerVideos.observe(vid);
    })
}

document.addEventListener('DOMContentLoaded', function () {
    prepareVideos()
})

prepareVideos()