document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    let scale = 1;
    let lastTap = 0;

    function createItem(i, isPortrait) {
        const container = document.createElement('div');
        container.className = isPortrait ? 'image-item portrait-item' : 'image-item landscape-item';

        const img = document.createElement('img');
        img.src = `./images/${i}.jpg`;
        img.onerror = function() {
            if (this.src.endsWith('.jpg')) this.src = `./images/${i}.jpeg`;
            else container.remove();
        };

        const label = document.createElement('div');
        label.className = 'item-label';
        label.innerText = `Exhibit ${i}`;

        img.onclick = () => {
            modal.style.display = 'flex';
            modalImg.src = img.src;
            scale = 1;
            modalImg.style.transform = `scale(${scale})`;
        };

        container.appendChild(img);
        container.appendChild(label);
        galleryGrid.appendChild(container);
    }

    // 1-17 Portraits, 18-35 Landscapes
    for (let i = 1; i <= 35; i++) {
        createItem(i, i <= 17);
    }

    // --- Advanced Zoom Interactions ---
    modal.addEventListener('wheel', (e) => {
        e.preventDefault();
        scale = Math.min(Math.max(0.5, scale + (e.deltaY > 0 ? -0.2 : 0.2)), 4);
        modalImg.style.transform = `scale(${scale})`;
    }, { passive: false });

    modalImg.addEventListener('click', (e) => {
        const now = new Date().getTime();
        if (now - lastTap < 300) {
            scale = (scale > 1) ? 1 : 2.5;
            modalImg.style.transform = `scale(${scale})`;
        }
        lastTap = now;
    });

    document.getElementById('zoom-in').onclick = (e) => { e.stopPropagation(); scale = Math.min(scale + 0.5, 4); modalImg.style.transform = `scale(${scale})`; };
    document.getElementById('zoom-out').onclick = (e) => { e.stopPropagation(); scale = Math.max(scale - 0.5, 0.5); modalImg.style.transform = `scale(${scale})`; };
    document.getElementById('reset-zoom').onclick = (e) => { e.stopPropagation(); scale = 1; modalImg.style.transform = `scale(${scale})`; };

    document.querySelector('.close-btn').onclick = () => modal.style.display = 'none';
    modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
});
