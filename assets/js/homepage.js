document.addEventListener('DOMContentLoaded', function() {
    // --- 1. SETUP ---
    const tabs = document.querySelectorAll('.service-tab');
    const contents = document.querySelectorAll('.service-content');
    const displayImage = document.getElementById('service-display-image');
    
    const autoChangeInterval = 5000; 
    let tabInterval;

    // --- 2. CORE FUNCTION TO ACTIVATE A TAB ---
    function activateTab(tabToActivate) {
        const targetId = tabToActivate.getAttribute('data-tab');
        const targetContent = document.getElementById(targetId);

        if (!targetContent) return;

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tabToActivate.classList.add('active');
        targetContent.classList.add('active');

        const newImageSrc = targetContent.getAttribute('data-image');
        if (newImageSrc) {
            displayImage.style.backgroundImage = `url(${newImageSrc})`;
        }
    }

    // --- 3. FUNCTION TO START THE AUTOMATIC TIMER ---
    function startAutoChange() {
        clearInterval(tabInterval);
        tabInterval = setInterval(() => {
            const currentIndex = Array.from(tabs).findIndex(tab => tab.classList.contains('active'));
            const nextIndex = (currentIndex + 1) % tabs.length;
            activateTab(tabs[nextIndex]);
        }, autoChangeInterval);
    }

    // --- 4. EVENT LISTENERS FOR USER CLICKS ---
    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            activateTab(this);
            startAutoChange(); // Reset the timer on click
        });
    });

    // --- 5. INITIAL START (SIMPLIFIED) ---
    // The HTML already sets the initial image. We just need to start the timer.
    startAutoChange();
});