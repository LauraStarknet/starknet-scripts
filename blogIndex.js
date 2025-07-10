document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.jetboost-list-search-input-j2rx').addEventListener('keyup', () => {
        setTimeout(() => {
            document.querySelector('.sticky-section-wrapper').scrollIntoView({ behavior: "instant", block: "start" });
        }, 1000)
    })

      window.addEventListener('scroll', () => {
        if (document.querySelector('.div-block-67 .close').style.opacity === '1') {
            document.querySelector('#w-node-_74558fc4-48fa-19d7-2353-112be6f4595f-1bf8af6a').click()
        }
    });
})