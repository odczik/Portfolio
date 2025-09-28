const landing = document.querySelector('#landing');
const cursorBlur = landing ? landing.querySelector('#blur') : null;

if (landing && cursorBlur) {
    // Use transform for better performance
    landing.addEventListener('pointermove', (e) => {
        const rect = landing.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Use transform instead of changing left/top for better performance
        cursorBlur.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    });
    
    // Optional: Hide blur when cursor leaves the section
    landing.addEventListener('pointerleave', () => {
        cursorBlur.style.opacity = '0';
    });
    
    landing.addEventListener('pointerenter', () => {
        cursorBlur.style.opacity = '1';
    });
}