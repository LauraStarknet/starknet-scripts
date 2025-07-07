function openVideo() {
    document.querySelector('.fs-video').style.display = 'block';
    setTimeout(() => {
        document.querySelector('.fs-video').style.opacity = '1'
    }, 10);
     setTimeout(() => {
        document.querySelector('.fs-video').play();
    }, 500);
}

document.querySelector('.widget-video-wrapper').addEventListener('click', openVideo)

// display: none;
    // opacity: 0;
    // transition-duration: .5s;
    // transition-property: opacity;
    // position: fixed;
    // top: 0;
    // left: 0;
    // width: 100vw;
    // height: 100vh;
    // z-index: 10000;