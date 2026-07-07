import * as THREE from 'three';

export class Scene3D {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = null;
    this.renderer = null;
    this.lights = [];
    this.isDarkMode = true;
    this.setupScene();
  }

  setupScene() {
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 1, 3);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      precision: 'highp',
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild(this.renderer.domElement);

    // Background
    this.updateBackground();

    // Lighting
    this.setupLighting();

    // Environment map (optional but nice)
    this.addEnvironment();
  }

  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
    this.lights.push(ambientLight);

    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0x00d9ff, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.far = 50;
    this.scene.add(directionalLight);
    this.lights.push(directionalLight);

    // Secondary light (fill light)
    const fillLight = new THREE.DirectionalLight(0x1e90ff, 0.5);
    fillLight.position.set(-5, 5, 5);
    this.scene.add(fillLight);
    this.lights.push(fillLight);

    // Point light for accent
    const pointLight = new THREE.PointLight(0xff006e, 0.8);
    pointLight.position.set(3, 2, 3);
    this.scene.add(pointLight);
    this.lights.push(pointLight);
  }

  addEnvironment() {
    // Create a simple sky using a gradient
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#0a0e27');
    gradient.addColorStop(0.5, '#1a1f3a');
    gradient.addColorStop(1, '#0f1a2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    this.scene.background = texture;
  }

  updateBackground() {
    if (this.isDarkMode) {
      this.scene.fog = new THREE.Fog(0x0a0e27, 100, 1000);
      if (this.renderer) {
        this.renderer.setClearColor(0x0a0e27, 1);
      }
    } else {
      this.scene.fog = new THREE.Fog(0xf5f5f5, 100, 1000);
      if (this.renderer) {
        this.renderer.setClearColor(0xf5f5f5, 1);
      }
    }
  }

  addToScene(object) {
    this.scene.add(object);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateBackground();
    this.updateLightingForTheme();
  }

  updateLightingForTheme() {
    // Update light intensities for theme
    if (this.lights.length > 0) {
      this.lights[0].intensity = this.isDarkMode ? 0.6 : 0.8;
    }
  }

  onMouseMove(event) {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Optional: Add camera follow or parallax effect
    this.camera.position.x += (x * 0.5 - this.camera.position.x) * 0.05;
    this.camera.position.y += (y * 0.5 + 1 - this.camera.position.y) * 0.05;
    this.camera.lookAt(0, 1, 0);
  }

  onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}