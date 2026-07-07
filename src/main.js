import * as THREE from 'three';
import { Avatar3D } from './Avatar3D.js';
import { Scene3D } from './Scene3D.js';
import { UIController } from './UIController.js';
import { AnimationManager } from './AnimationManager.js';

class Application {
  constructor() {
    this.container = document.getElementById('canvas-container');
    this.scene3D = null;
    this.avatar = null;
    this.uiController = null;
    this.animationManager = null;
    this.isAnimating = false;
  }

  async init() {
    try {
      // Initialize Three.js scene
      this.scene3D = new Scene3D(this.container);
      
      // Create 3D avatar
      this.avatar = new Avatar3D();
      this.scene3D.addToScene(this.avatar.getGroup());
      
      // Initialize UI controller
      this.uiController = new UIController();
      this.setupEventListeners();
      
      // Initialize animation manager
      this.animationManager = new AnimationManager(this.avatar, this.scene3D);
      
      // Start render loop
      this.animate();
      
      console.log('✨ 3D Developer Avatar initialized successfully');
    } catch (error) {
      console.error('Failed to initialize application:', error);
    }
  }

  setupEventListeners() {
    // Rotate button
    document.getElementById('rotate-btn').addEventListener('click', () => {
      this.animationManager.rotateAvatar();
    });

    // Theme toggle
    document.getElementById('theme-btn').addEventListener('click', () => {
      this.uiController.toggleTheme();
      this.scene3D.toggleTheme();
    });

    // Animate button
    document.getElementById('animate-btn').addEventListener('click', () => {
      if (!this.isAnimating) {
        this.isAnimating = true;
        this.animationManager.playAnimation();
        setTimeout(() => {
          this.isAnimating = false;
        }, 3000);
      }
    });

    // Mouse move for avatar interaction
    window.addEventListener('mousemove', (e) => {
      this.scene3D.onMouseMove(e);
    });

    // Window resize
    window.addEventListener('resize', () => {
      this.scene3D.onWindowResize();
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.avatar.animate();
    this.scene3D.render();
  }
}

// Initialize application
const app = new Application();
app.init();