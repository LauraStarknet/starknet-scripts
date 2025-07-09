function addShareLinks() {
    if(document.querySelector('.social-link--x')) {
        document.querySelector('.social-link--x').href = `https://twitter.com/intent/tweet?url=${window.location.href}`
        document.querySelector('.social-link--facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
        document.querySelector('.social-link--linkedin').href = `http://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`
        document.querySelector('.social-link--copy').addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href);
            document.querySelector('.social--copied').style.opacity = 1;
            setTimeout(() => {
                document.querySelector('.social--copied').style.opacity = 0;
            }, 2000)
        });
    }
}

function tweetFn() {
  Array.from( document.querySelectorAll(".twitter-tweet")).forEach((el) => {
      if (el.hasAttribute("data-media-max-width")) {
        el.classList.add("has-video");
      } else {
        el.classList.add("no-video");
      }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    addShareLinks()
    tweetFn()
        document.querySelector('.jetboost-list-search-input-j2rx').addEventListener('keyup', () => {
        setTimeout(() => {
            document.querySelector('.sticky-section-wrapper').scrollIntoView({ behavior: "instant", block: "start" });
        }, 100)
    })
})