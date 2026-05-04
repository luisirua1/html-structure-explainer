document.addEventListener('DOMContentLoaded', () => {
    const semanticElements = document.querySelectorAll('.semantic-element');
    const tooltip = document.getElementById('tooltip');
    const tooltipTitle = document.getElementById('tooltip-title');
    const tooltipDesc = document.getElementById('tooltip-desc');
    const overlay = document.getElementById('instruction-overlay');
    const startBtn = document.getElementById('start-btn');

    // Dismiss overlay
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            overlay.classList.add('hidden');
        });
    }

    // Function to handle element activation
    const activateElement = (element) => {
        // Remove active class from all elements
        document.querySelectorAll('.semantic-element').forEach(el => {
            el.classList.remove('active-hover');
        });

        // Add active class to current
        element.classList.add('active-hover');

        // Update tooltip data
        const title = element.getAttribute('data-title');
        const desc = element.getAttribute('data-desc');

        if (title && desc) {
            tooltipTitle.textContent = title;
            tooltipDesc.textContent = desc;
            tooltip.classList.add('visible');
        }
    };

    // Handle mouse events for semantic elements
    semanticElements.forEach(element => {
        // Mouse enter
        element.addEventListener('mouseenter', (e) => {
            // Stop propagation so parent elements don't trigger if hovering over child
            e.stopPropagation();
            activateElement(element);
        });

        // Mouse leave
        element.addEventListener('mouseleave', (e) => {
            e.stopPropagation();
            element.classList.remove('active-hover');
            
            // If we leave a child and enter a parent, we need to re-activate the parent
            // We use setTimeout to allow mouseenter of the new element to fire first
            setTimeout(() => {
                const hoveredElements = document.querySelectorAll('.semantic-element:hover');
                if (hoveredElements.length > 0) {
                    // Activate the deepest hovered element
                    const deepest = hoveredElements[hoveredElements.length - 1];
                    activateElement(deepest);
                } else {
                    tooltip.classList.remove('visible');
                }
            }, 10);
        });
    });
    
    // Hide tooltip when leaving the entire website container
    const websiteContainer = document.querySelector('.website-container');
    if (websiteContainer) {
        websiteContainer.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
            document.querySelectorAll('.semantic-element').forEach(el => {
                el.classList.remove('active-hover');
            });
        });
    }
});
