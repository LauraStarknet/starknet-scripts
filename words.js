const wordList = [
'DeFi',
'Gaming',
'NFT',
'Creator',
'Social',
'AI',
'RWA',
'Community',
'Education',
'Tooling',
'Infrastructure',
'Wallets',
'Exchanges',
'Custody',
'Research',
'Security/Audit'
]

// const wordList = [
// 'full_name',
// 'starkware-libs/cairo',
// 'starkware-libs/stwo',
// 'starknet-io/starknet.js',
// 'OpenZeppelin/cairo-contracts',
// 'eqlabs/pathfinder',
// 'argentlabs/argent-x',
// 'keep-starknet-strange/madara',
// 'starknet-edu/starknet-cairo-101',
// 'ZeroSync/ZeroSync',
// 'apibara/starknet-react/juno',
// 'foundry-rs/starknet-foundry',
// 'xJonathanLEI/starknet-rs',
// 'software-mansion/starknet.py',
// 'keep-starknet-strange/alexandria',
// 'keep-starknet-strange/awesome-starknet/Audit',
// 'starkscan/starkscan-verifier'
// ]

full_name
starkware-libs/cairo
starkware-libs/stwo
starknet-io/starknet.js
OpenZeppelin/cairo-contracts
eqlabs/pathfinder
argentlabs/argent-x
keep-starknet-strange/madara
starknet-edu/starknet-cairo-101
ZeroSync/ZeroSync
NethermindEth/juno
apibara/starknet-react
foundry-rs/starknet-foundry
xJonathanLEI/starknet-rs
software-mansion/starknet.py
keep-starknet-strange/alexandria
keep-starknet-strange/awesome-starknet
starkscan/starkscan-verifier

let wordInterval;
let wordAnimPlaying = false

function createWord(i) {
    let newSpan = document.createElement('span');
    newSpan.innerHTML = wordList[i];
    newSpan.style.left = `${Math.round(window.innerWidth * Math.random())}px`
    newSpan.style.top = `${Math.round(window.innerHeight * Math.random())}px`
    newSpan.className = 'sparkling__span';
    if(document.querySelector('.sparkling-wrapper') === null) clearInterval(wordInterval);
    else {
        document.querySelector('.sparkling-wrapper').appendChild(newSpan);
        setTimeout(() => { 
            newSpan.style.opacity = 0;
            setTimeout(() => newSpan.remove(), 500);
        }, 2200);
    }
}

function initWords () {
    wordAnimPlaying = true;
    if(wordInterval) clearInterval(wordInterval)
    let i = 0;
    wordInterval = setInterval(() => {
        createWord(i%wordList.length)
        i++
    }, 200)
}

window.addEventListener('scroll', () => {
    if(document.querySelector('.sparkling-wrapper')) {
        const topCoord = document.querySelector('.sparkling-wrapper').getBoundingClientRect().top;
        if(topCoord < window.innerHeight * 3 && topCoord > -(window.innerHeight * 1.5) && !wordAnimPlaying) initWords();
        else if((topCoord < window.innerHeight * -1.5 || topCoord > window.innerHeight * 3) && wordAnimPlaying) {
            clearInterval(wordInterval)
            wordAnimPlaying = false
        }
    }
})