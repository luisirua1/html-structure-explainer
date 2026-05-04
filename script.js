document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.html-element, .head-element, .body-element, .semantic-element, .meta-element');
    const infoBox = document.getElementById('info-box');
    
    // Map of colors for each tag
    const tagColors = {
        'html': '#94a3b8',
        'head': '#cbd5e1',
        'body': '#f1f5f9',
        'meta': '#cbd5e1',
        'header': '#ec4899',
        'nav': '#8b5cf6',
        'main': '#3b82f6',
        'section': '#0ea5e9',
        'article': '#14b8a6',
        'aside': '#f59e0b',
        'footer': '#ef4444'
    };

    elements.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            e.stopPropagation(); // Prevent bubbling to parent elements
            
            const tag = el.getAttribute('data-tag');
            const title = el.getAttribute('data-title');
            const desc = el.getAttribute('data-desc');
            const color = tagColors[tag] || '#3b82f6';
            
            // Update info box
            infoBox.innerHTML = `
                <h2 style="color: ${color}">${title}</h2>
                <p>${desc}</p>
            `;
            
            // Add highlight class
            infoBox.classList.remove('default-state');
            infoBox.classList.add('highlight');
            infoBox.style.borderColor = color;
            infoBox.style.boxShadow = `0 10px 30px ${color}25, inset 0 0 20px rgba(0,0,0,0.2)`;
        });

        el.addEventListener('mouseleave', (e) => {
            e.stopPropagation();
        });
    });

    const browserWindow = document.querySelector('.browser-window');
    browserWindow.addEventListener('mouseleave', () => {
        infoBox.innerHTML = `
            <h2 style="color: #94a3b8">&lt;html&gt;</h2>
            <p>El elemento raíz. Todo el contenido de la página web se encuentra dentro de este elemento. Es el contenedor principal de tu sitio.</p>
        `;
        infoBox.classList.add('default-state');
        infoBox.classList.remove('highlight');
        infoBox.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        infoBox.style.boxShadow = 'inset 0 0 20px rgba(0,0,0,0.2)';
    });
});
