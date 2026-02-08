// 1. Animation Logic
const easingHeart = mojs.easing.path("M0,100C2.9,86.7,33.6-7.3,46-7.3s15.2,22.7,26,22.7S89,0,100,0");

const el = {
  container: document.querySelector('#js-mo-container'),
  letters: document.querySelectorAll('.lttr'),
  lineLeft: document.querySelector('.line--left'),
  lineRight: document.querySelector('.line--rght'),
  colPink: "#ff4d6d"
};

class Heart extends mojs.CustomShape {
  getShape() { return '<path d="M50,88.9C25.5,78.2,0.5,54.4,3.8,31.1S41.3,1.8,50,29.9c8.7-28.2,42.8-22.2,46.2,1.2S74.5,78.2,50,88.9z"/>'; }
  getLength() { return 200; }
}
mojs.addShape("heart", Heart);

const crtBoom = (delay = 0, x = 0) => {
  return new mojs.Burst({
    parent: el.container, radius: { 50: 120 }, angle: "rand(0, 360)", count: 12, delay, x,
    children: { shape: "circle", radius: 5, fill: el.colPink, scale: { 1: 0 }, duration: 600 }
  });
};

const loveTl = new mojs.Timeline().add([
  new mojs.Tween({
    duration: 1000,
    onUpdate: (p) => { el.letters.forEach(l => l.style.opacity = p); }
  }),
  new mojs.Html({ el: el.lineLeft, x: { 0: 200 }, duration: 1000, easing: 'bounce.out' }).then({ x: 0, duration: 1000 }),
  new mojs.Html({ el: el.lineRight, x: { 0: -200 }, duration: 1000, easing: 'bounce.out' }).then({ x: 0, duration: 1000 }),
  new mojs.Shape({
    parent: el.container, shape: "heart", delay: 500, fill: el.colPink, scale: { 0: 1 }, duration: 1000, easing: easingHeart
  }).then({ scale: 0, duration: 500 }),
  crtBoom(500, -80),
  crtBoom(1000, 80)
]);

const runAnim = () => { loveTl.replay(); setTimeout(runAnim, 4500); };
runAnim();

// 2. Interaction Logic
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const bear = document.getElementById('bearImg');
let yesScale = 1;

function moveNo() {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.position = 'fixed';
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
  yesScale += 0.2;
  yesBtn.style.transform = `scale(${yesScale})`;
  bear.src = "https://media.tenor.com/XGf8O27Y-KAAAAAi/milk-and-mocha-bear.gif";
}

noBtn.addEventListener('mouseover', moveNo);

yesBtn.addEventListener('click', () => {
  document.querySelector('.question').innerHTML = "I Love You Forever! ❤️";
  document.querySelector('.buttons').style.display = 'none';
  document.querySelector('.animation-stage').style.display = 'none';
  bear.src = "https://media.tenor.com/Z-7u8mO0GvUAAAAi/milk-and-mocha.gif";
  confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
});
