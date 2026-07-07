import * as THREE from 'three';

export class Avatar3D {
  constructor() {
    this.group = new THREE.Group();
    this.head = null;
    this.body = null;
    this.arms = [];
    this.accessories = [];
    this.createAvatar();
  }

  createAvatar() {
    // Head
    const headGeometry = new THREE.IcosahedronGeometry(1.2, 6);
    const headMaterial = new THREE.MeshPhongMaterial({
      color: 0xfdbcb4,
      shininess: 100,
      emissive: 0x1a1a1a,
    });
    this.head = new THREE.Mesh(headGeometry, headMaterial);
    this.head.position.y = 2;
    this.head.castShadow = true;
    this.head.receiveShadow = true;
    this.group.add(this.head);

    // Eyes
    this.createEyes();

    // Body (Polyhedron for tech aesthetic)
    const bodyGeometry = new THREE.OctahedronGeometry(0.8, 2);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0x00d9ff,
      shininess: 80,
      wireframe: false,
    });
    this.body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.body.position.y = 0.5;
    this.body.scale.set(1, 1.5, 1);
    this.body.castShadow = true;
    this.body.receiveShadow = true;
    this.group.add(this.body);

    // Arms
    this.createArms();

    // Code particles effect
    this.createCodeParticles();

    // Accessories (floating code elements)
    this.createAccessories();

    return this.group;
  }

  createEyes() {
    const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({
      color: 0x00d9ff,
      emissive: 0x00d9ff,
      emissiveIntensity: 0.5,
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.4, 2.4, 1);
    this.group.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.4, 2.4, 1);
    this.group.add(rightEye);

    // Pupils
    const pupilGeometry = new THREE.SphereGeometry(0.07, 8, 8);
    const pupilMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
    });

    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.4, 2.4, 1.2);
    this.group.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.4, 2.4, 1.2);
    this.group.add(rightPupil);
  }

  createArms() {
    const armGeometry = new THREE.CapsuleGeometry(0.2, 1.5, 4, 8);
    const armMaterial = new THREE.MeshPhongMaterial({
      color: 0x1e90ff,
      shininess: 60,
    });

    // Left arm
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-1.2, 1.5, 0);
    leftArm.rotation.z = Math.PI / 6;
    leftArm.castShadow = true;
    this.group.add(leftArm);
    this.arms.push(leftArm);

    // Right arm
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(1.2, 1.5, 0);
    rightArm.rotation.z = -Math.PI / 6;
    rightArm.castShadow = true;
    this.group.add(rightArm);
    this.arms.push(rightArm);
  }

  createCodeParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 5;
      positions[i + 1] = (Math.random() - 0.5) * 5;
      positions[i + 2] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00d9ff,
      size: 0.1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.group.add(particles);
  }

  createAccessories() {
    // Floating code blocks
    const blockGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const blockMaterial = new THREE.MeshPhongMaterial({
      color: 0xff006e,
      wireframe: true,
      emissive: 0xff006e,
      emissiveIntensity: 0.3,
    });

    for (let i = 0; i < 3; i++) {
      const block = new THREE.Mesh(blockGeometry, blockMaterial);
      block.position.set(
        (Math.random() - 0.5) * 3,
        Math.random() * 2 + 1,
        (Math.random() - 0.5) * 3
      );
      block.rotation.set(Math.random(), Math.random(), Math.random());
      block.userData.speed = Math.random() * 0.02 + 0.01;
      block.userData.originalY = block.position.y;
      this.group.add(block);
      this.accessories.push(block);
    }
  }

  getGroup() {
    return this.group;
  }

  updateAccessories() {
    this.accessories.forEach((accessory) => {
      accessory.rotation.x += 0.005;
      accessory.rotation.y += 0.008;
      accessory.position.y = accessory.userData.originalY + Math.sin(Date.now() * 0.001) * 0.5;
    });
  }

  animate() {
    this.updateAccessories();
    
    // Gentle rotation
    this.group.rotation.y += 0.001;
  }
}