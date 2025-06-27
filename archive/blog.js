const blogWrapper = document.querySelector('#blog-filters')
const config = { attributes: true, childList: true, subtree: true };

const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    console.log('mutation observed');
    if(document.querySelectorAll('.jetboost-filter-active').length > 0) {
        document.querySelector('.blog-list-wrapper').scrollIntoView({ behavior: "instant", block: "start"});
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        observer.observe(blogWrapper, config);
    }, 1000)
})