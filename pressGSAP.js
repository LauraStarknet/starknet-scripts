const pressWrapper = document.querySelector('#press-wrapper')
const config = { attributes: true, childList: true, subtree: true };

const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    console.log('mutation observed')
    ScrollTrigger.refresh();
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(filterParent, config);