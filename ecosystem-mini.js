const filterParent = document.querySelector('.applied-filter-container')
const granteesWrapper = document.querySelector('#grantees-wrapper')
const config = { attributes: true, childList: true, subtree: true };

let sorted = false;

function createTag() {
    const allCards = Array.from(document.querySelector('#grantees-wrapper').querySelectorAll('.grantee-card')).filter(el => el.className.indexOf('tag-fn') === -1);
    for (let i = 0; i < allCards.length; i++) {
        if (!allCards[i].querySelector('.grantees__subcategories')) return;
        const allTags = allCards[i].querySelector('.grantees__subcategories').querySelector('h2').innerHTML.split(',');
        allCards[i].querySelector('.grantees__subcategories').innerHTML = ''
        if (allTags[0] !== '') {
            for (let j = 0; j < allTags.length; j++) {
                const newTag = document.createElement('div');
                newTag.className = "tag is--border";
                newTag.innerHTML = `<p class="span-xs _100">${allTags[j]}</p>`
                allCards[i].querySelector('.tag-wrapper').appendChild(newTag)
            }
        }
        allCards[i].classList.add('tag-fn')
    }
}

function unsortCards() {
    const tierZero = document.querySelector('#grantees-wrapper').querySelectorAll('.grantee-card')
    tierZero.forEach((el) => {
        if (el.querySelector('.tier').innerHTML.indexOf('0') > -1) el.style.display = 'none'
    })
    if (sorted) document.querySelector('.is--ecosystem').scrollIntoView({ behavior: "instant", block: "start" });
    sorted = false;
}

function sortCards() {
     const tierZero = document.querySelector('#grantees-wrapper').querySelectorAll('.grantee-card')
    tierZero.forEach((el) => {
        if (el.querySelector('.tier').innerHTML.indexOf('0') > -1) el.style.display = 'block'
    })
    document.querySelector('.is--ecosystem').scrollIntoView({ behavior: "instant", block: "start" });
    sorted = true;
}

function checkFilters() {
    ScrollTrigger.refresh();
    const selectedFiltersAmount = document.querySelectorAll('.jetboost-filter-active').length
    if (selectedFiltersAmount > 0) sortCards();
    else unsortCards()
}

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        const targetElement = mutation.target;
        const targetId = targetElement.id;
        const isNotCard = targetElement.className?.indexOf('grantee-card') === -1;
        if (isNotCard && mutation.type === "attributes") {
            if (targetId === "grantees-wrapper") {
                if(mutation.attributeName === 'style') {
                    setTimeout(() => createTag(), 100)
                }
            }
            else {
                if(targetElement.className.indexOf('w-pagination-wrapper') > -1) setTimeout(() => checkFilters(), 100)
            }
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

function loadAll() {
    let myInterval = setInterval(() => {
        console.log('Interval happening')
        if (document.querySelector('#load-more-button') && document.querySelector('#load-more-button').className.indexOf('jetboost-hidden') === -1) document.querySelector('#load-more-button').click();
        else {
            checkFilters()
            clearInterval(myInterval)
        }
    }, 500)
}

function init() {
    setTimeout(() => {
        createTag()
        checkFilters()
    }, 500)
    document.querySelector('.jetboost-list-search-input-x9k3').addEventListener('keyup', () => {
        document.querySelector('.is--ecosystem').scrollIntoView({ behavior: "instant", block: "start" });
    })
    // Start observing the target node for configured mutations
    observer.observe(filterParent, config);
    observer.observe(granteesWrapper, config);

}

setTimeout(() => {
    init();
}, 1000)


// Later, you can stop observing
// observer.disconnect();