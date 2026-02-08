// --- ORIGINAL ANIMATION LOGIC ---
const qs = document.querySelector.bind(document);
const easingHeart = mojs.easing.path("M0,100C2.9,86.7,33.6-7.3,46-7.3s15.2,22.7,26,22.7S89,0,100,0");

const el = {
  container: qs(".mo-container"),
  i: qs(".lttr--I"), l: qs(".lttr--L"), o: qs(".lttr--O"), v: qs(".lttr--V"),
  e: qs(".lttr--E"), y: qs(".lttr--Y"), o2: qs(".lttr--O2"), u: qs(".lttr--U"),
  lineLeft: qs(".line--left"), lineRight: qs(".line--rght"),
  colTxt: "#ff4d6d", colHeart: "#ff4d6d",
  blup: qs(".blup"), blop: qs(".blop")
};

class Heart extends mojs.CustomShape {
  getShape() { return '<path d="M50,88.9C25.5,78.2,0.5,54.4,3.8,31.1S41.3,1.8,50,29.9c8.7-28.2,42.8-22.2,46.2,1.2S74.5,78.2,50,88.9z"/>'; }
  getLength() { return 200; }
}
mojs.addShape("heart", Heart);

const crtBoom = (delay = 0, x = 0, rd = 46) => {
  const parent = el.container;
  const crcl = new mojs.Shape({ shape: "circle", fill: "none", stroke: el.colTxt, strokeWidth: { 5: 0 }, radius: { [rd]: [rd + 20] }, easing: "quint.out", duration: 500 / 3, parent, delay, x });
  const brst = new mojs.Burst({ radius: { [rd + 15]: 110 }, angle: "rand(60, 180)", count: 3, timeline: { delay }, parent, x, children: { radius: [5, 3, 7], fill: el.colTxt, scale: { 1: 0, easing: "quad.in" }, pathScale: [0.8, null], degreeShift: ["rand(13, 60)", null], duration: 1000 / 3, easing: "quint.out" } });
  return [crcl, brst];
};

const crtLoveTl = () => {
  const move = 1000; const boom = 200; const easing = "sin.inOut"; const easingBoom = "sin.in"; const easingOut = "sin.out";
  const opts = { duration: move, easing, opacity: 1 }; const delta = 150;
  return new mojs.Timeline().add([
    new mojs.Tween({ duration: move, onStart: () => { [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(item => { item.style.opacity = 1; item.style.transform = "translate(0,0)"; }); } }),
    new mojs.Html({ ...opts, el: el.lineLeft, x: { 0: 52 } }).then({ duration: boom + move, x: { to: 106 } }).then({ duration: boom + move, x: { to: 166 } }).then({ duration: 150, x: { to: 176 } }).then({ duration: 300 }).then({ duration: 350, x: { to: 0 }, easing: easingOut }),
    new mojs.Html({ ...opts, el: el.lineRight, x: { 0: -52 } }).then({ duration: boom + move, x: { to: -106 } }).then({ duration: boom + move, x: { to: -166 } }).then({ duration: 150, x: { to: -176 } }).then({ duration: 300 }).then({ duration: 350, x: { to: 0 }, easing: easingOut }),
    new mojs.Shape({ parent: el.container, shape: "heart", delay: move, fill: el.colHeart, x: -64, scale: { 0: 0.95, easing: easingHeart }, duration: 500 }).then({ x: { to: -62 }, scale: { to: 0.65 }, duration: boom + move - 500 }).then({ duration: boom - 50, x: { to: -14 }, scale: { to: 0.9 }, easing: easingBoom }).then({ duration: 125, scale: { to: 0.8 } }).then({ duration: 125, scale: { to: 0.85 } }).then({ duration: move - 200, scale: { to: 0.45 } }).then({ delay: -75, duration: 150, x: { to: 0 }, scale: { to: 0.9 }, easing: easingBoom }).then({ duration: 350, scale: { to: 0 }, easing: easingOut }),
    ...crtBoom(move, -64, 46), ...crtBoom(move * 2 + boom, 18, 34), ...crtBoom(move * 3 + boom * 2 - delta, -64, 34), ...crtBoom(move * 3 + boom * 2, 45, 34)
  ]);
};

const loveTl = crtLoveTl().play();
setInterval(() => { loveTl.replay(); }, 4300);

// --- VIRAL INTERACTION LOGIC ---
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const bearImg = document.getElementById('bearImg');
const questionText = document.querySelector('.question');
let yesSize = 1.5;

noBtn.addEventListener('mouseover', () => {
    // 1. Move the No button
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // 2. Make Yes button bigger
    yesSize += 0.5;
    yesBtn.style.fontSize = `${yesSize}rem`;
    yesBtn.style.padding = `${10 + yesSize * 5}px ${20 + yesSize * 10}px`;
    
    // 3. Change bear to "sad/shocked" bear while she tries to click no
    bearImg.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpueGZ3bmZueGZ3bmZueGZ3JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZAmS8dyy5eG/K97pG4v9/giphy.gif";
});

yesBtn.addEventListener('click', () => {
    // Change UI
    questionText.innerHTML = "I Love You So Much! ❤️";
    document.querySelector('.btn-group').style.display = 'none';
    
    // Happy Hugging Bears
    bearImg.src = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZueGZ3bmZueGZ3bmZueGZ3JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZAmS8dyy5eG/148x4W9-5-18mK/giphy.gif";

    // Confetti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff758f', '#ffffff']
    });
});
