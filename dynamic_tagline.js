
// --- Dynamic Tagline Typing Effect ---
function initDynamicTagline() {
    const taglineElement = document.querySelector('.hero-tagline');
    if (!taglineElement) return;

    const phrases = [
        "Reduce Team Cost with AI Workforce",
        "Automation is not just for big firms",
        "Automation is not expensive any more",
        "No in-house expertise? No problem.",
        "You focus on business; we handle the tech.",
        "From CRMs to social media, finance, HR, and more",
        "Complex processes become effortless",
        "Turning your current setup into a smooth, automated powerhouse"
    ];

    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let isDeleting = true; // Start by deleting after the initial pause
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            taglineElement.textContent = currentPhrase.substring(0, charIndex);
            charIndex--;
            typeSpeed = 30; // Faster deleting

            if (charIndex < 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                charIndex = 0;
                typeSpeed = 500; // Pause before typing next
            }
        } else {
            taglineElement.textContent = currentPhrase.substring(0, charIndex);
            charIndex++;
            typeSpeed = 80; // Normal typing

            if (charIndex > currentPhrase.length) {
                isDeleting = true;
                charIndex = currentPhrase.length;
                typeSpeed = 3500; // Pause at end before deleting
            }
        }

        setTimeout(type, typeSpeed);
    }

    // Start the typing loop after initial delay of 3.5s
    setTimeout(type, 3500);
}

// Initialize dynamic tagline on load
window.addEventListener('load', initDynamicTagline);
