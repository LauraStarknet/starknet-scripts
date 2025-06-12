const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

// for intro motion
// let mouseMoved = false;
let lastMouseMoveTime = Date.now();

const pointer = {
    x: .5 * window.innerWidth,
    y: .5 * window.innerHeight,
}
const params = {
    pointsNumber: 20,
    widthFactor: 3.5,
    mouseThreshold: .6,
    spring: .4,
    friction: .5
};

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++) {
    trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
    }
}

window.addEventListener("click", e => {
    updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("mousemove", e => {
    mouseMoved = true;
    updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("touchmove", e => {
    mouseMoved = true;
    updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});

function updateMousePosition(eX, eY) {
    pointer.x = eX;
    pointer.y = eY;
    lastMouseMoveTime = Date.now();
}

setupCanvas();
update(0);
window.addEventListener("resize", setupCanvas);


function update(t) {
    // if (Date.now() - lastMouseMoveTime > 600) {
    //     ctx.strokeStyle = `rgba(255, 255, 255, ${600 - (lastMouseMoveTime - 600)})`;
    //     // ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     return window.requestAnimationFrame(update);
    // }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? .4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
    });

    ctx.lineCap = "round";
    // ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    const timeLapse = Math.trunc((600 - (Date.now() - lastMouseMoveTime - 600)) / 100);
    const opacity = timeLapse < 0 ? 0 : timeLapse > 10 ? 1 : timeLapse / 20;
    // ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
    ctx.strokeStyle = `rgba(255, 192, 203, ${opacity})`;
    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);

    for (let i = 1; i < trail.length - 1; i++) {
        const xc = .5 * (trail[i].x + trail[i + 1].x);
        const yc = .5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
    }
    ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
    ctx.stroke();

    window.requestAnimationFrame(update);
}

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}