export class UIController {
  constructor() {
    this.isDarkMode = true;
    this.init();
  }

  init() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    }
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  applyTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-btn');

    if (this.isDarkMode) {
      body.classList.remove('light-mode');
      themeBtn.textContent = 'Light Mode';
    } else {
      body.classList.add('light-mode');
      themeBtn.textContent = 'Dark Mode';
    }
  }

  updateStats(stats) {
    const statElements = document.querySelectorAll('.stat-value');
    if (statElements.length >= 3) {
      statElements[0].textContent = stats.skills || '20+';
      statElements[1].textContent = stats.projects || '15+';
      statElements[2].textContent = stats.experience || '5+ yrs';
    }
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0, 217, 255, 0.1);
      border: 1px solid #00d9ff;
      color: #00d9ff;
      padding: 15px 20px;
      border-radius: 8px;
      font-size: 0.9rem;
      z-index: 1000;
      animation: slideIn 0.3s ease-in-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}