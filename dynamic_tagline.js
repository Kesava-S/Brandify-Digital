
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
    let charIndex = phrases[0].length; // Start fully typed
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            taglineElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 30; // Faster deleting
        } else {
            taglineElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80; // Normal typing
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 3000; // Pause at end before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing next
        }

        setTimeout(type, typeSpeed);
    }

    // Start the typing loop after initial delay
    setTimeout(type, 3000);
}

// Initialize dynamic tagline on load
window.addEventListener('load', initDynamicTagline);
