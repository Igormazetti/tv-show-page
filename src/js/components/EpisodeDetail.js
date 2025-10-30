import { createElement, formatDuration } from '../utils/helpers.js';

export class EpisodeDetail {
  constructor(episode, onClose) {
    this.episode = episode;
    this.onClose = onClose;
    this.element = null;
  }

  render() {
    this.element = createElement('div', {
      classes: 'episode-detail'
    });

    this.element.innerHTML = `
      <div class="episode-detail__image">
        ${this.episode.Image ? `<img src="${this.episode.Image}" alt="${this.episode.Title}">` : ''}
      </div>
      <div class="episode-detail__content">
        <div class="episode-detail__header">
          <h3 class="episode-detail__title">${this.episode.EpisodeNumber} ${this.episode.Title}</h3>
          <button class="episode-detail__close" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        ${this.episode.Synopsis ? `
          <p class="episode-detail__synopsis">${this.episode.Synopsis}</p>
        ` : ''}
        <div class="episode-detail__meta">
          <span class="episode-detail__duration">${formatDuration(this.episode.Duration)}</span>
          <span class="episode-detail__separator">•</span>
          <span class="episode-detail__season">Temporada ${this.episode.SeasonNumber}</span>
        </div>
      </div>
    `;

    const closeButton = this.element.querySelector('.episode-detail__close');
    closeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });

    setTimeout(() => {
      this.element.classList.add('episode-detail--visible');
    }, 10);

    return this.element;
  }

  close() {
    this.element.classList.remove('episode-detail--visible');
    setTimeout(() => {
      if (this.onClose) {
        this.onClose();
      }
    }, 300);
  }
}
