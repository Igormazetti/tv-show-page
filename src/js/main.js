import { TVShowService } from './api/tvShowService.js';
import { Header } from './components/Header.js';
import { Tabs } from './components/Tabs.js';

class App {
  constructor() {
    this.data = null;
    this.currentTab = 'general';
    this.init();
  }

  async init() {
    try {
      this.data = await TVShowService.fetchAllData();
      this.render();
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.showError();
    }
  }

  render() {
    const overlay = document.querySelector('.show-overlay');
    const content = overlay.querySelector('.show-overlay__content');
    const loader = content.querySelector('.show-overlay__loader');

    if (this.data.show.Images && this.data.show.Images.Background) {
      const background = overlay.querySelector('.show-overlay__background');
      background.style.backgroundImage = `url(${this.data.show.Images.Background})`;
    }

    const container = document.createElement('div');
    container.className = 'show-container';

    const header = new Header(this.data.show);
    container.appendChild(header.render());

    const tabs = new Tabs((tabId) => this.handleTabChange(tabId));
    container.appendChild(tabs.render());

    const contentArea = document.createElement('div');
    contentArea.className = 'content-area';
    contentArea.innerHTML = '<p style="color: white;"></p>';
    container.appendChild(contentArea);

    loader.style.display = 'none';
    content.appendChild(container);

    const closeButton = overlay.querySelector('.show-overlay__close');
    closeButton.addEventListener('click', () => this.handleClose());
  }

  handleTabChange(tabId) {
    this.currentTab = tabId;
    console.log('Tab changed to:', tabId);
  }

  handleClose() {
    console.log('Close button clicked');
  }

  showError() {
    const content = document.querySelector('.show-overlay__content');
    content.innerHTML = '<div style="color: white; text-align: center;">Failed to load content. Please try again later.</div>';
  }
}

new App();
