# 3D Developer Avatar Portfolio 🚀

A professional, modern interactive 3D developer avatar portfolio built with **Three.js**, featuring dark/light theme toggle, smooth animations, and developer-focused design.

## ✨ Features

- **3D Interactive Avatar** - Procedurally generated 3D developer character
- **Modern UI** - Professional gradient-based interface with glassmorphism
- **Dark/Light Theme** - Toggle between dark and light modes with persistent storage
- **Smooth Animations** - GSAP-powered animations for avatar interactions
- **Responsive Design** - Works seamlessly on desktop and tablet
- **Tech Stack Display** - Showcase your skills and experience
- **Performance Optimized** - Efficient rendering with Three.js best practices

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone or download the repository
cd 3d-developer-avatar-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
├── index.html           # Main HTML file
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
├── src/
│   ├── main.js          # Application entry point
│   ├── styles.css       # Global styles and theme
│   ├── Avatar3D.js      # 3D avatar model and geometry
│   ├── Scene3D.js       # Three.js scene setup
│   ├── AnimationManager.js  # GSAP animations
│   └── UIController.js  # UI interactions and theme toggle
└── README.md
```

## 🎨 Customization

### Modify Avatar Appearance

Edit `src/Avatar3D.js`:
```javascript
// Change avatar color
const headMaterial = new THREE.MeshPhongMaterial({
  color: 0xYOURCOLOR,  // Hex color code
  shininess: 100,
});
```

### Update Theme Colors

Edit `src/styles.css` CSS variables:
```css
:root {
  --primary: #00d9ff;      /* Cyan */
  --secondary: #1e90ff;    /* Blue */
  --accent: #ff006e;       /* Pink */
  --dark-bg: #0a0e27;      /* Dark background */
}
```

### Update Developer Stats

Edit `index.html` stats section:
```html
<div class="stat">
  <span class="stat-label">Skills</span>
  <span class="stat-value">20+</span>
</div>
```

### Add Your Tech Stack

Edit `index.html` tech stack list:
```html
<ul class="tech-stack">
  <li>React & Vue</li>
  <li>Three.js</li>
  <!-- Add more -->
</ul>
```

## 🎮 Interactive Controls

- **Rotate Avatar** - Click "Rotate Avatar" button for smooth 360° rotation
- **Dark/Light Mode** - Toggle theme with button in bottom controls
- **Animate** - Trigger special animation sequence
- **Mouse Follow** - Avatar responds to mouse movement (optional)

## 🛠 Technologies Used

- **Three.js** - 3D graphics library
- **GSAP** - Animation library
- **Vite** - Build tool and dev server
- **CSS3** - Styling and animations
- **JavaScript ES6+** - Application logic

## 📱 Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Performance Tips

1. **WebGL Context** - Check browser WebGL support
2. **Shadow Maps** - Disable for lower-end devices
3. **Particle Count** - Adjust in `Avatar3D.js` for performance

## 📄 License

Open source - feel free to use and modify!

## 🤝 Contributing

Suggestions and improvements are welcome! Feel free to fork and submit pull requests.

## 🌟 Show Your Support

If you find this useful, please give it a ⭐!

---

**Created with ❤️ for developers | Powered by Three.js & GSAP**