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

let wordInterval;
let wordAnimPlaying = false

const gridSize = 80;
const usedPositions = new Set();

function getRandomPositionAvoidingCenterXY(existingPositions) {

  const cols = Math.floor(window.innerWidth / (gridSize * 2));
  const rows = Math.floor(window.innerHeight / gridSize);

  const centralColStart = Math.floor(cols / 3);
  const centralColEnd = Math.floor(cols * 2 / 3);
  const centralRowStart = Math.floor(rows / 3);
  const centralRowEnd = Math.floor(rows * 2 / 3);

  let xGrid, yGrid;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    xGrid = Math.floor(Math.random() * cols);
    yGrid = Math.floor(Math.random() * rows);
    attempts++;
  } while (
    attempts < maxAttempts &&
    // Reject only if x and y are BOTH in the central thirds
    (xGrid >= centralColStart && xGrid < centralColEnd &&
     yGrid >= centralRowStart && yGrid < centralRowEnd 
     ||existingPositions.has(`${xGrid},${yGrid}`)
    )
  );

  existingPositions.add(`${xGrid},${yGrid}`);
  setTimeout(() => {
    existingPositions.delete(`${xGrid},${yGrid}`);
  }, 2700)
  return {
    left: xGrid * gridSize * 2,
    top: yGrid * gridSize
  };
}


function createWord(i) {
    let newSpan = document.createElement('span');
    newSpan.innerHTML = wordList[i];
    const position = getRandomPositionAvoidingCenterXY(usedPositions);
    newSpan.style.position = 'absolute';
    newSpan.style.left = `${position.left + ((position.top / gridSize)%2 * gridSize)}px`;
    newSpan.style.top = `${position.top}px`;
    newSpan.style.color = `#F3F2F140`
    newSpan.className = 'sparkling__span span-s';
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
    }, 100)
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