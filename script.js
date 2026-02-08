const qs = document.querySelector.bind(document);

const el = {
  container: qs(".mo-container"),
  i: qs(".lttr--I"),
  l: qs(".lttr--L"),
  o: qs(".lttr--O"),
  v: qs(".lttr--V"),
  e: qs(".lttr--E"),
  y: qs(".lttr--Y"),
  o2: qs(".lttr--O2"),
  u: qs(".lttr--U"),
  lineLeft: qs(".line--left"),
  lineRight: qs(".line--rght"),
  colTxt: "#ff4d6d",
  colHeart: "#fa4843"
};

const easingHeart = mojs.easing.path("M0,100C2.9,86.7,33.6-7.3,46-7.3s15.2,22.7,26,22.7S89,0,100,0");

class Heart extends mojs.CustomShape {
  getShape() { return '<path d="M50,88.9C25.5,78.2,0.5,54.4,3.8,31.1S41.3,1.8,50,29.9c8.7-28.2,42.8-22.2,46.2,1.2S74.5,78.2,50,88.9z"/>'; }
  getLength() { return 200; }
}
mojs.addShape("heart", Heart);

const crtBoom = (delay = 0, x = 0, rd = 46) => {
  const brst = new mojs.Burst({
    radius: { [rd + 15]: 110 }, angle: "rand(60, 180)", count: 3, timeline: { delay },
    parent: el.container, x,
    children: { radius: [5, 3, 7], fill: el.colTxt, scale: { 1: 0, easing: "quad.in" }, duration: 400 }
  });
  return [brst];
};

const crtLoveTl = () => {
  const move = 1000; const boom = 200; const easing = "sin.inOut"; const opts = { duration: move, easing, opacity: 1 };
  
  return new mojs.Timeline().add([
    new mojs.Tween({
      duration: move,
      onUpdate: (p) => { [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(letter => letter.style.opacity = p); }
    }),
    new mojs.Html({ ...opts, el: el.lineLeft, x: { 0: 52 } }).then({ duration: boom + move, x: 106 }).then({ duration: boom + move, x: 166 }).then({ duration: 350, x: 0 }),
    new mojs.Html({ ...opts, el: el.lineRight, x: { 0: -52 } }).then({ duration: boom + move, x: -106 }).then({ duration: boom + move, x: -166 }).then({ duration: 350, x: 0 }),
    new mojs.Shape({
      parent: el.container, shape: "heart", delay: move, fill: el.colHeart, x: -64, scale: { 0: 0.95, easing: easingHeart }, duration: 500
    }).then({ x: -14, scale: 0.9, duration: 1200 }).then({ scale: 0, duration: 500 }),
    ...crtBoom(move, -64, 46), ...crtBoom(move * 2 + boom, 18, 34)
  ]);
};

const loveTl = crtLoveTl().play();
setInterval(() => { loveTl.replay(); }, 4300);

// Interaction
const noBtn = qs('#noBtn');
const yesBtn = qs('#yesBtn');
const bearImg = qs('#bearImg');
let scale = 1;

noBtn.addEventListener('mouseover', () => {
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.random() * 80 + '%';
    noBtn.style.top = Math.random() * 80 + '%';
    scale += 0.2;
    yesBtn.style.transform = `scale(${scale})`;
    bearImg.src = "https://media.tenor.com/XGf8O27Y-KAAAAAi/milk-and-mocha-bear.gif";
});

yesBtn.addEventListener('click', () => {
    qs('.question').innerHTML = "I Love You Forever! ❤️";
    qs('.btn-group').style.display = 'none';
    bearImg.src = "https://media.tenor.com/Z-7u8mO0GvUAAAAi/milk-and-mocha.gif";
    confetti({ particleCount: 150, spread: 70 });
});
