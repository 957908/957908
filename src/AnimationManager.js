import gsap from 'gsap';

export class AnimationManager {
  constructor(avatar, scene3D) {
    this.avatar = avatar;
    this.scene3D = scene3D;
    this.timeline = null;
  }

  rotateAvatar() {
    gsap.to(this.avatar.getGroup().rotation, {
      y: this.avatar.getGroup().rotation.y + Math.PI * 2,
      duration: 2,
      ease: 'power2.inOut',
    });
  }

  playAnimation() {
    const avatarGroup = this.avatar.getGroup();
    const timeline = gsap.timeline();

    // Head bob
    timeline.to(
      avatarGroup.position,
      {
        y: 0.5,
        duration: 0.3,
        ease: 'power2.inOut',
      },
      0
    );

    timeline.to(
      avatarGroup.position,
      {
        y: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      }
    );

    // Arm wave
    if (this.avatar.arms.length > 0) {
      timeline.to(
        this.avatar.arms[1].rotation,
        {
          z: -Math.PI / 3,
          duration: 0.3,
          ease: 'back.inOut',
        },
        0
      );

      timeline.to(
        this.avatar.arms[1].rotation,
        {
          z: -Math.PI / 6,
          duration: 0.3,
          ease: 'back.inOut',
        }
      );
    }

    // Spin
    timeline.to(
      avatarGroup.rotation,
      {
        y: avatarGroup.rotation.y + Math.PI,
        duration: 0.6,
        ease: 'power2.inOut',
      },
      0.3
    );

    return timeline;
  }

  pulseLight() {
    // Optional: Add light pulse effect
    gsap.to(this.scene3D.lights[2], {
      intensity: 1.5,
      duration: 0.5,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1,
    });
  }

  floatingAnimation() {
    const avatarGroup = this.avatar.getGroup();
    gsap.to(avatarGroup.position, {
      y: 0.5,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }
}