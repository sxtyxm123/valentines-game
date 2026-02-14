# 🌸 Digibouquet - Digital Flower Bouquet Creator

Create and share beautiful digital flower bouquets with personalized messages. A modern, romantic web application perfect for expressing your feelings to loved ones.

![Digibouquet](https://img.shields.io/badge/Made%20with-💐-pink)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- 🌹 **8 Beautiful Flowers**: Choose from roses, tulips, sunflowers, and more
- 💌 **Personalized Messages**: Write heartfelt messages to your loved ones
- 🎨 **Live Preview**: See your bouquet before sharing
- 🔗 **Shareable Links**: Generate unique URLs for each bouquet
- 📱 **Responsive Design**: Works perfectly on mobile and desktop
- 🎭 **Smooth Animations**: Delightful micro-interactions and transitions
- 🚀 **Zero Backend**: Fully client-side, no database needed

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd new\ timepass
   ```

2. **Open in browser**
   Simply open `index.html` in your web browser. No build process required!

   Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

3. **Visit** `http://localhost:8000`

## 🌐 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Manual Deployment

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy" (zero configuration needed!)

4. **Done!** Your bouquet app is live 🎉

## 📖 How to Use

### Creating a Bouquet

1. Visit the homepage (`index.html`)
2. Click on flowers to add them to your bouquet (click multiple times to add more)
3. Fill in the message form:
   - **To**: Recipient's name
   - **Message**: Your heartfelt message (up to 500 characters)
   - **From**: Your name or signature
4. Click "Preview Bouquet" to see how it looks
5. Click "Create Bouquet" to generate a shareable link
6. Share the link with your loved one!

### Viewing a Bouquet

1. Open the shared link
2. See the beautiful flower arrangement
3. Read the personalized message
4. Use "Copy Link" or "Share" buttons to spread the love

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties, animations, and gradients
- **Vanilla JavaScript**: No frameworks, pure ES6+
- **Web APIs**: Clipboard API, Share API, URL API

## 📁 Project Structure

```
new timepass/
├── index.html          # Bouquet creation page
├── bouquet.html        # Bouquet viewing page
├── styles.css          # Complete design system
├── script.js           # All interactive logic
├── vercel.json         # Vercel deployment config
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🎨 Design Features

- **Color Palette**: Warm, romantic beige and cream tones
- **Typography**: Playfair Display (headings) + Inter (body)
- **Animations**: Fade-ins, pop-ins, float effects
- **Glassmorphism**: Modern frosted glass effects
- **Responsive**: Mobile-first design approach

## 🔧 Customization

### Adding New Flowers

Edit the `FLOWERS` array in `script.js`:

```javascript
const FLOWERS = [
    { id: 'rose', name: 'Rose', emoji: '🌹', color: '#E8A5A5' },
    // Add your flower here
    { id: 'orchid', name: 'Orchid', emoji: '🌺', color: '#YOUR_COLOR' }
];
```

### Changing Colors

Modify CSS variables in `styles.css`:

```css
:root {
  --color-cream: #F5F1E8;
  --color-accent: #D4A574;
  /* Customize your colors */
}
```

## 🌟 Features in Detail

### URL-Based Storage
- Bouquet data is encoded in the URL
- No backend or database required
- Links are self-contained and permanent
- Privacy-friendly (no data collection)

### Share Functionality
- Native Web Share API support
- Fallback to clipboard copy
- Works on all modern browsers

### Responsive Design
- Mobile-optimized layouts
- Touch-friendly interactions
- Adaptive typography

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 💖 Credits

Made with 💐 by Digibouquet

---

**Spread love, one bouquet at a time! 🌸**
