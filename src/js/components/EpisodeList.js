import { createElement, groupEpisodesBySeason } from '../utils/helpers.js';

export class EpisodeList {
  constructor(episodes, onEpisodeClick) {
    this.allEpisodes = episodes;
    this.episodesBySeason = groupEpisodesBySeason(episodes);
    this.onEpisodeClick = onEpisodeClick;
    this.currentSeason = 1;
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

    episodes.forEach(episode => {
      const item = createElement('div', {
        classes: 'episode-item'
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
        if (this.onEpisodeClick) {
          this.onEpisodeClick(episode);
        }
      });

      container.appendChild(item);
    });

    return container;
  }

  switchSeason(season) {
    if (this.currentSeason === season) return;

    this.currentSeason = season;

    const buttons = this.element.querySelectorAll('.season-selector__button');
    buttons.forEach(btn => {
      if (Number(btn.dataset.season) === season) {
        btn.classList.add('season-selector__button--active');
      } else {
        btn.classList.remove('season-selector__button--active');
      }
    });

    const episodesContainer = this.element.querySelector('.episode-list__episodes');
    const newEpisodesContainer = this.renderEpisodes();
    episodesContainer.replaceWith(newEpisodesContainer);
  }
}
