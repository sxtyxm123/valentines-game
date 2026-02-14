// ==========================================
// DIGITAL BOUQUET - MAIN JAVASCRIPT
// ==========================================

// Flower database with emojis
const FLOWERS = [
    { id: 'rose', name: 'Rose', emoji: '🌹', color: '#E8A5A5' },
    { id: 'tulip', name: 'Tulip', emoji: '🌷', color: '#F4C2D9' },
    { id: 'sunflower', name: 'Sunflower', emoji: '🌻', color: '#F5C4A5' },
    { id: 'blossom', name: 'Blossom', emoji: '🌸', color: '#F5D5E0' },
    { id: 'hibiscus', name: 'Hibiscus', emoji: '🌺', color: '#F5A5B8' },
    { id: 'daisy', name: 'Daisy', emoji: '🌼', color: '#F5F1E8' },
    { id: 'lotus', name: 'Lotus', emoji: '🪷', color: '#D4B5E8' },
    { id: 'bouquet', name: 'Bouquet', emoji: '💐', color: '#B8A5D9' }
];

// State management
let selectedFlowers = [];

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'index.html' || currentPage === '') {
        initializeCreationPage();
    } else if (currentPage === 'bouquet.html') {
        initializeBouquetPage();
    }
});

// ==========================================
// CREATION PAGE LOGIC
// ==========================================
function initializeCreationPage() {
    renderFlowerGrid();
    setupFormHandlers();
    setupCharacterCounter();
}

function renderFlowerGrid() {
    const grid = document.getElementById('flowerGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    FLOWERS.forEach(flower => {
        const flowerItem = document.createElement('div');
        flowerItem.className = 'flower-item';
        flowerItem.dataset.flowerId = flower.id;
        
        flowerItem.innerHTML = `
            <div class="flower-icon">${flower.emoji}</div>
            <div class="flower-name">${flower.name}</div>
        `;
        
        flowerItem.addEventListener('click', () => addFlower(flower, flowerItem));
        grid.appendChild(flowerItem);
    });
}

function addFlower(flower, element) {
    selectedFlowers.push(flower);
    updateFlowerCount();
    updateFlowerItemDisplay(element);
    
    // Add animation
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'popIn 0.3s ease';
    }, 10);
}

function updateFlowerItemDisplay(element) {
    const flowerId = element.dataset.flowerId;
    const count = selectedFlowers.filter(f => f.id === flowerId).length;
    
    // Remove existing count badge
    const existingBadge = element.querySelector('.flower-count');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    // Add count badge if > 0
    if (count > 0) {
        element.classList.add('selected');
        const badge = document.createElement('div');
        badge.className = 'flower-count';
        badge.textContent = count;
        element.appendChild(badge);
    } else {
        element.classList.remove('selected');
    }
}

function updateFlowerCount() {
    const countElement = document.getElementById('flowerCount');
    if (countElement) {
        countElement.textContent = selectedFlowers.length;
    }
}

function setupCharacterCounter() {
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', () => {
            charCount.textContent = messageTextarea.value.length;
        });
    }
}

function setupFormHandlers() {
    const form = document.getElementById('bouquetForm');
    const previewBtn = document.getElementById('previewBtn');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    if (previewBtn) {
        previewBtn.addEventListener('click', showPreview);
    }
}

function showPreview() {
    const recipientName = document.getElementById('recipientName').value;
    const message = document.getElementById('message').value;
    const senderName = document.getElementById('senderName').value;
    
    if (!recipientName || !message || !senderName) {
        alert('Please fill in all fields to preview your bouquet');
        return;
    }
    
    if (selectedFlowers.length === 0) {
        alert('Please select at least one flower for your bouquet');
        return;
    }
    
    // Update preview content
    document.getElementById('previewRecipient').textContent = recipientName;
    document.getElementById('previewMessage').textContent = message;
    document.getElementById('previewSender').textContent = senderName;
    
    // Render preview flowers
    renderBouquet('previewFlowers', selectedFlowers);
    
    // Show preview section
    const previewSection = document.getElementById('previewSection');
    previewSection.classList.remove('hidden');
    previewSection.classList.add('fade-in');
    
    // Scroll to preview
    previewSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (selectedFlowers.length === 0) {
        alert('Please select at least one flower for your bouquet');
        return;
    }
    
    const recipientName = document.getElementById('recipientName').value;
    const message = document.getElementById('message').value;
    const senderName = document.getElementById('senderName').value;
    
    // Create bouquet data
    const bouquetData = {
        flowers: selectedFlowers.map(f => f.id),
        to: recipientName,
        message: message,
        from: senderName
    };
    
    // Encode and create URL
    const encodedData = encodeBouquetData(bouquetData);
    const bouquetUrl = `bouquet.html?data=${encodedData}`;
    
    // Redirect to bouquet page
    window.location.href = bouquetUrl;
}

// ==========================================
// BOUQUET PAGE LOGIC
// ==========================================
function initializeBouquetPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    
    if (!encodedData) {
        showDefaultBouquet();
        return;
    }
    
    try {
        const bouquetData = decodeBouquetData(encodedData);
        displayBouquet(bouquetData);
    } catch (error) {
        console.error('Error loading bouquet:', error);
        showDefaultBouquet();
    }
    
    setupShareButtons();
}

function displayBouquet(data) {
    // Update message card
    document.getElementById('recipientName').textContent = data.to || 'Love';
    document.getElementById('messageBody').textContent = data.message || 'A beautiful bouquet just for you!';
    document.getElementById('senderName').textContent = data.from || 'Someone Special';
    
    // Convert flower IDs to flower objects
    const flowers = data.flowers.map(id => FLOWERS.find(f => f.id === id)).filter(Boolean);
    
    // Render bouquet
    renderBouquet('bouquetFlowers', flowers);
}

function showDefaultBouquet() {
    const defaultData = {
        to: 'Love',
        message: 'I wish you a happy valentine day\nthanks for coming in my life I\'m\nforever grateful to have you i\nlove you soo much 🩷',
        from: 'Yours with love',
        flowers: ['rose', 'tulip', 'blossom', 'hibiscus', 'daisy']
    };
    displayBouquet(defaultData);
}

function renderBouquet(containerId, flowers) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (flowers.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--color-text-muted);">No flowers selected</p>';
        return;
    }
    
    // Calculate positions for flowers in a circular arrangement
    const positions = calculateFlowerPositions(flowers.length);
    
    flowers.forEach((flower, index) => {
        const flowerElement = document.createElement('div');
        flowerElement.className = 'arranged-flower';
        flowerElement.textContent = flower.emoji;
        flowerElement.style.left = `${positions[index].x}%`;
        flowerElement.style.top = `${positions[index].y}%`;
        flowerElement.style.transform = `translate(-50%, -50%) rotate(${positions[index].rotation}deg)`;
        flowerElement.style.animationDelay = `${index * 0.1}s`;
        
        container.appendChild(flowerElement);
    });
}

function calculateFlowerPositions(count) {
    const positions = [];
    const centerX = 50;
    const centerY = 50;
    const radius = 25; // Percentage of container
    
    if (count === 1) {
        return [{ x: centerX, y: centerY, rotation: 0 }];
    }
    
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const rotation = Math.random() * 30 - 15; // Random rotation between -15 and 15 degrees
        
        positions.push({ x, y, rotation });
    }
    
    return positions;
}

function setupShareButtons() {
    const copyBtn = document.getElementById('copyLinkBtn');
    const shareBtn = document.getElementById('shareBtn');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', copyLinkToClipboard);
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', shareBouquet);
    }
}

async function copyLinkToClipboard() {
    const url = window.location.href;
    
    try {
        await navigator.clipboard.writeText(url);
        showNotification('Link copied to clipboard! 📋');
    } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification('Link copied to clipboard! 📋');
        } catch (err) {
            showNotification('Failed to copy link. Please copy manually.');
        }
        
        document.body.removeChild(textArea);
    }
}

async function shareBouquet() {
    const url = window.location.href;
    const title = 'Digital Bouquet for You!';
    const text = 'I made this beautiful digital bouquet for you 💐';
    
    // Check if Web Share API is supported
    if (navigator.share) {
        try {
            await navigator.share({
                title: title,
                text: text,
                url: url
            });
            showNotification('Thanks for sharing! 💐');
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error sharing:', error);
                copyLinkToClipboard();
            }
        }
    } else {
        // Fallback to copy link
        copyLinkToClipboard();
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--color-accent);
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: fadeInDown 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeInUp 0.3s ease reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ==========================================
// DATA ENCODING/DECODING
// ==========================================
function encodeBouquetData(data) {
    const jsonString = JSON.stringify(data);
    return btoa(encodeURIComponent(jsonString));
}

function decodeBouquetData(encodedData) {
    const jsonString = decodeURIComponent(atob(encodedData));
    return JSON.parse(jsonString);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function resetFlowerSelection() {
    selectedFlowers = [];
    updateFlowerCount();
    
    // Reset all flower items
    document.querySelectorAll('.flower-item').forEach(item => {
        item.classList.remove('selected');
        const badge = item.querySelector('.flower-count');
        if (badge) {
            badge.remove();
        }
    });
}
