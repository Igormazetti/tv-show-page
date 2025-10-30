import { createElement, groupEpisodesBySeason, formatDuration } from '../utils/helpers.js';

export class EpisodeList {
  constructor(episodes) {
    this.allEpisodes = episodes;
    this.episodesBySeason = groupEpisodesBySeason(episodes);
    this.currentSeason = 1;
    this.selectedEpisode = null;
    this.element = null;
    this.seasons = Object.keys(this.episodesBySeason).map(Number).sort((a, b) => a - b);
  }

  render() {
    this.element = createElement('div', {
      classes: 'episode-list'
    });

    const seasonSelector = this.renderSeasonSelector();
    this.element.appendChild(seasonSelector);

    const episodesContainer = this.renderEpisodes();
    this.element.appendChild(episodesContainer);

    return this.element;
  }

  renderSeasonSelector() {
    const selector = createElement('div', {
      classes: 'season-selector'
    });

    this.seasons.forEach(season => {
      const button = createElement('button', {
        classes: ['season-selector__button', season === this.currentSeason ? 'season-selector__button--active' : ''],
        attributes: {
          'data-season': season
        },
        text: `T${season}`
      });

      button.addEventListener('click', () => this.switchSeason(season));
      selector.appendChild(button);
    });

    return selector;
  }

  renderEpisodes() {
    const container = createElement('div', {
      classes: 'episode-list__episodes'
    });

    const episodes = this.episodesBySeason[this.currentSeason] || [];

    episodes.forEach((episode, index) => {
      const isSelected = this.selectedEpisode && this.selectedEpisode.ID === episode.ID;

      const item = createElement('div', {
        classes: ['episode-item', isSelected ? 'episode-item--active' : '']
      });

      item.innerHTML = `
        <div class="episode-item__number">${episode.EpisodeNumber}</div>
        <div class="episode-item__content">
          <h4 class="episode-item__title">${episode.Title}</h4>
        </div>
        <button class="episode-item__play" aria-label="Play episode">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
          </svg>
        </button>
      `;

      item.addEventListener('click', () => {
        this.handleEpisodeClick(episode);
      });

      container.appendChild(item);

      if (isSelected) {
        const detail = this.renderEpisodeDetail(episode);
        container.appendChild(detail);
      }
    });

    return container;
  }

  renderEpisodeDetail(episode) {
    const detail = createElement('div', {
      classes: 'episode-detail-inline'
    });

    detail.innerHTML = `
      <div class="episode-detail-inline__image">
        ${episode.Image ? `<img src="${episode.Image}" alt="${episode.Title}">` : ''}
      </div>
      <div class="episode-detail-inline__content">
        ${episode.Synopsis ? `<p class="episode-detail-inline__synopsis">${episode.Synopsis}</p>` : '<p class="episode-detail-inline__synopsis">No hay sinopsis disponible.</p>'}
        <div class="episode-detail-inline__meta">
          <span>${formatDuration(episode.Duration)}</span>
          <span class="episode-detail-inline__separator">•</span>
          <span>Temporada ${episode.SeasonNumber}</span>
        </div>
      </div>
    `;

    setTimeout(() => {
      detail.classList.add('episode-detail-inline--visible');
    }, 10);

    return detail;
  }

  handleEpisodeClick(episode) {
    if (this.selectedEpisode && this.selectedEpisode.ID === episode.ID) {
      this.selectedEpisode = null;
    } else {
      this.selectedEpisode = episode;
    }
    this.refreshEpisodes();
  }

  refreshEpisodes() {
    const episodesContainer = this.element.querySelector('.episode-list__episodes');
    const newEpisodesContainer = this.renderEpisodes();
    episodesContainer.replaceWith(newEpisodesContainer);
  }

  switchSeason(season) {
    if (this.currentSeason === season) return;

    this.currentSeason = season;
    this.selectedEpisode = null;

    const buttons = this.element.querySelectorAll('.season-selector__button');
    buttons.forEach(btn => {
      if (Number(btn.dataset.season) === season) {
        btn.classList.add('season-selector__button--active');
      } else {
        btn.classList.remove('season-selector__button--active');
      }
    });

    this.refreshEpisodes();
  }
}
