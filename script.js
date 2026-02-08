const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
let scale = 1;

// Function to move the No button randomly
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
    
    // Make the Yes button bigger every time they try to hit No
    scale += 0.25;
    yesBtn.style.transform = `scale(${scale})`;
});

// Success action
yesBtn.addEventListener('click', () => {
    document.getElementById('qText').innerHTML = "I Love You Forever! ❤️";
    document.querySelector('.btn-group').style.display = 'none';
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
});
