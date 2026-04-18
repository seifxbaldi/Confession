// Set dynamic date
document.getElementById('current-date').innerText = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

function startSequence() {
    const flap = document.getElementById('flap');
    const envelope = document.getElementById('envelope-wrapper');
    const field = document.getElementById('flower-field');
    const card = document.getElementById('final-card');

    // 1. Open the flap
    flap.classList.add('open-flap');

    // 2. Start explosion after flap opens
    setTimeout(() => {
        envelope.style.opacity = '0';
        envelope.style.transition = 'opacity 1s';

        // --- NEW IMAGE-BASED FLOWER GENERATION ---
        const imagePath = 'flower_images/'; // Path to your folder
        const numberOfImages = 12; // ADJUST THIS to the actual number of images you collected!

        for (let i = 0; i < 180; i++) {
            setTimeout(() => {
                const f = document.createElement('div');
                f.className = 'flower-particle';
                
                // Construct the image URL
                const randomImageIndex = Math.floor(Math.random() * numberOfImages) + 1;
                const imageUrl = `${imagePath}flower${randomImageIndex}.png`;
                
                f.innerHTML = `<img src="${imageUrl}" alt="Flower">`;
                
                f.style.left = '50%';
                f.style.top = '50%';
                
                // Randomize particle size (adjust base size as needed)
                const size = (Math.random() * 40 + 60) + 'px';
                f.style.width = size;
                f.style.height = size;

                field.appendChild(f);

                // Calculate trajectory (extended spread)
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * window.innerWidth * 0.9;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                // Animate and show the flower
                requestAnimationFrame(() => {
                    f.style.opacity = '1';
                    f.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 900}deg) scale(${Math.random() * 1.8 + 1})`;
                });
            }, i * 12);
        }
    }, 800);

    // 3. Show the letter after the flower cloud peaks
    setTimeout(() => {
        field.style.opacity = '0.35';
        field.style.filter = 'blur(4px)';
        field.style.transition = 'all 3s';
        
        card.classList.add('visible');
    }, 4200);
}