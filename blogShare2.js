function addShareLinks2() {
    if(document.querySelector('.social-link--x')) {
        document.querySelector('.social-link--x').href = `https://twitter.com/intent/tweet?url=${window.location.href}`
        document.querySelector('.social-link--facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
        document.querySelector('.social-link--linkedin').href = `http://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`
        document.querySelector('.social-link--copy').addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    addShareLinks()
})