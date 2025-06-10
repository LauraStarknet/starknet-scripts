const filterParent = document.querySelector('.applied-filter-container')
const granteesWrapper = document.querySelector('#grantees-wrapper')
const config = { attributes: true, childList: true, subtree: true };

let sorted = false;

// const selectedFilterAmount = document.querySelectorAll('.tier-0-card').length
function createTag() {
    const allCards = document.querySelector('#grantees-wrapper').querySelectorAll('.grantee-card');
    for(let i = 0; i < allCards.length; i++) {
        if(allCards[i].className.indexOf('tag-fn') === -1) {
            if(!allCards[i].querySelector('.grantees__subcategories')) return;
            const allTags = allCards[i].querySelector('.grantees__subcategories').querySelector('h2').innerHTML.split(',');
            allCards[i].querySelector('.grantees__subcategories').innerHTML = ''
            if(allTags[0] !== '') {
                for(let j = 0; j < allTags.length; j++) {
                    const newTag = document.createElement('div');
                    newTag.className = "tag is--border";
                    newTag.innerHTML = `<p class="span-xs _100">${allTags[j]}</p>`
                    allCards[i].querySelector('.tag-wrapper').appendChild(newTag)
                }
            }
            allCards[i].classList.add('tag-fn')
        }
    }
}

function unsortCards () {
    document.querySelector('#grantees-wrapper--sorted').classList.add('hidden');
    document.querySelector('#grantees-wrapper').classList.remove('hidden');
    const tierZero = document.querySelector('#grantees-wrapper').querySelectorAll('.grantee-card')
    tierZero.forEach((el) => {
        if(el.querySelector('.tier').innerHTML.indexOf('0') > -1) el.style.display = 'none'
    })
    if(sorted) document.querySelector('.is--ecosystem').scrollIntoView({ behavior: "instant", block: "start"});
    sorted = false;
}

function sortCards () {
    document.querySelector('#grantees-wrapper').classList.add('hidden');
    document.querySelector('#grantees-wrapper--sorted').classList.remove('hidden');
    const tierZero = document.querySelector('#grantees-wrapper').querySelectorAll('.grantee-card')
    tierZero.forEach((el) => {
        if(el.querySelector('.tier').innerHTML.indexOf('0') > -1) el.style.display = 'block'
    })
    const allCards = [...document.querySelector('#grantees-wrapper').querySelectorAll('.grantee-card')];
    let selectedFiltersName = Array.from(document.querySelectorAll('.jetboost-filter-active')).map(element => element.querySelector('.span-s').textContent);
    selectedFiltersName = selectedFiltersName.sort((a, b) => a.localeCompare(b))

    const sortedCards = []

    for(let i = 0; i < selectedFiltersName.length; i++) {
        let categorySortedCards = Array.from(allCards).filter(el => {
            const tagList = [...el.querySelectorAll('.tag--category'), el.querySelector('.card-category-heading')]
            for(let j = 0; j < tagList.length; j++) {
                if(tagList[j].innerHTML === selectedFiltersName[i]) {
                    // Making sure the card doesn't already appear in another category
                    // for(let k = 0; k < sortedCards.length; k++) {
                    //     if(sortedCards[k] === el) return false
                    // }
                    return true
                }
            }
            return false;
        })
        categorySortedCards.sort((a, b) => {
            // Extract the tier number from the class name
            const tierA = parseInt(a.querySelector('.tier').innerHTML);
            const tierB = parseInt(b.querySelector('.tier').innerHTML);

            // Sort in ascending order
            return tierA - tierB;
        });
        // sortedCards[i] = categorySortedCards
        sortedCards.push(...categorySortedCards)
    }

    document.querySelector('#grantees-wrapper--sorted').innerHTML = '';
    for(let i = 0; i < sortedCards.length; i++) {
        const clone = sortedCards[i].cloneNode(true);
        document.querySelector('#grantees-wrapper--sorted').appendChild(clone)
    }
    document.querySelector('#grantees-wrapper--sorted').scrollIntoView({ behavior: "instant", block: "start"});
    sorted = true;
}

function checkFilters() {
    ScrollTrigger.refresh();
    const selectedFiltersAmount = document.querySelectorAll('.jetboost-filter-active').length
    if(selectedFiltersAmount > 0) sortCards();
    else unsortCards()
}


// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    const targetElement = mutation.target;
    const targetId = targetElement.id;
    if (mutation.type === "attributes" && targetId !== "grantees-wrapper") setTimeout(() => checkFilters(), 400)
    if (mutation.type === "attributes" && targetId === "grantees-wrapper") setTimeout(() => createTag(), 400)
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

function loadAll() {
    let myInterval = setInterval(() => {
        if(document.querySelector('#load-more-button')) document.querySelector('#load-more-button').click();
        else {
            checkFilters()
            clearInterval(myInterval)
        }
    }, 500)
}

function init() {
    setTimeout(() => {
        const selectedFiltersAmount = document.querySelectorAll('.jetboost-filter-active').length
        if(selectedFiltersAmount > 0) loadAll()
        else checkFilters()
        createTag()
    }, 500)
    document.querySelector('.jetboost-list-search-input-x9k3').addEventListener('keyup',() => {
         document.querySelector('.is--ecosystem').scrollIntoView({ behavior: "instant", block: "start"});
    })
    // Start observing the target node for configured mutations
    observer.observe(filterParent, config);
    observer.observe(granteesWrapper, config);

}

// document.addEventListener('DOMContentLoaded', () => {
// })
setTimeout(() => {
    init();
}, 1000)


// Later, you can stop observing
// observer.disconnect();