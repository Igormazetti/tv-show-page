import { TVShowService } from './api/tvShowService.js';
import { Header } from './components/Header.js';
import { Tabs } from './components/Tabs.js';
import { EpisodeList } from './components/EpisodeList.js';
import { EpisodeDetail } from './components/EpisodeDetail.js';
import { CastSection } from './components/CastSection.js';

class App {
  constructor() {
    this.data = null;
    this.currentTab = 'general';
    this.selectedEpisode = null;
    this.contentArea = null;
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

    const mainSection = document.createElement('div');
    mainSection.className = 'show-main';

    const leftColumn = document.createElement('div');
    leftColumn.className = 'show-main__left';
    const header = new Header(this.data.show);
    leftColumn.appendChild(header.render());

    const rightColumn = document.createElement('div');
    rightColumn.className = 'show-main__right';
    const episodeList = new EpisodeList(this.data.episodes, (episode) => this.handleEpisodeClick(episode));
    rightColumn.appendChild(episodeList.render());

    mainSection.appendChild(leftColumn);
    mainSection.appendChild(rightColumn);
    container.appendChild(mainSection);

    const bottomSection = document.createElement('div');
    bottomSection.className = 'show-bottom';

    const tabs = new Tabs((tabId) => this.handleTabChange(tabId));
    bottomSection.appendChild(tabs.render());

    this.contentArea = document.createElement('div');
    this.contentArea.className = 'content-area';
    bottomSection.appendChild(this.contentArea);

    this.renderContent();

    container.appendChild(bottomSection);

    loader.style.display = 'none';
    content.appendChild(container);

    const closeButton = overlay.querySelector('.show-overlay__close');
    closeButton.addEventListener('click', () => this.handleClose());
  }

  renderContent() {
    this.contentArea.innerHTML = '';

    if (this.currentTab === 'general') {
      const generalContent = document.createElement('div');
      generalContent.className = 'general-content';

      generalContent.innerHTML = `
        <div class="synopsis-section">
          <h3 class="synopsis-section__title">SINOPSE</h3>
          <p class="synopsis-section__text">${this.data.show.Synopsis}</p>
          <div class="synopsis-section__actions">
            <button class="action-icon" aria-label="Me gusta" title="Me gusta">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              <span>My List</span>
            </button>
            <button class="action-icon" aria-label="Guardar para después" title="Guardar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              <span>Guardar</span>
            </button>
            <button class="action-icon" aria-label="Compartir" title="Compartir">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" fill="currentColor"/>
              </svg>
              <span>Compartir</span>
            </button>
            <button class="action-icon" aria-label="Comentar" title="Comentar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              <span>Comentar</span>
            </button>
          </div>
        </div>
      `;

      this.contentArea.appendChild(generalContent);

      if (this.selectedEpisode) {
        const episodeDetail = new EpisodeDetail(this.selectedEpisode, () => this.handleEpisodeDetailClose());
        this.contentArea.appendChild(episodeDetail.render());
      }
    } else if (this.currentTab === 'cast') {
      const castSection = new CastSection(this.data.show.Cast);
      this.contentArea.appendChild(castSection.render());
    } else if (this.currentTab === 'awards') {
      this.contentArea.innerHTML = '<p style="color: white; padding: 20px;">Seção de prêmios em desenvolvimento</p>';
    }
  }

  handleTabChange(tabId) {
    this.currentTab = tabId;
    this.selectedEpisode = null;
    this.renderContent();
  }

  handleEpisodeClick(episode) {
    this.selectedEpisode = episode;
    this.renderContent();
  }

  handleEpisodeDetailClose() {
    this.selectedEpisode = null;
    this.renderContent();
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
