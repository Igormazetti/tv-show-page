import { createElement } from '../utils/helpers.js';

export class Header {
  constructor(showData) {
    this.showData = showData;
    this.element = null;
  }

  render() {
    this.element = createElement('div', {
      classes: 'show-header'
    });

    const genres = this.showData.Genres.map(g => g.Title).join(' / ');
    const rating = '80% INDICADO';
    const ageRating = '14';

    this.element.innerHTML = `
      <div class="show-header__main">
        <h1 class="show-header__title">${this.showData.Title}</h1>
        <div class="show-header__metadata">
          <span class="show-header__rating">${rating}</span>
          <span class="show-header__separator">/</span>
          <span class="show-header__genre">${genres}</span>
          <span class="show-header__separator">/</span>
          <span class="show-header__year">${this.showData.Year}</span>
          <span class="show-header__separator">/</span>
          <span class="show-header__age-rating">${ageRating}</span>
        </div>
      </div>

      <div class="show-header__actions">
        <button class="action-button" aria-label="Like" title="Like">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
          </svg>
        </button>

        <button class="action-button" aria-label="Share" title="Share">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" fill="currentColor"/>
          </svg>
        </button>

        <button class="action-button" aria-label="Download" title="Download">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
          </svg>
        </button>

        <button class="action-button" aria-label="Comment" title="Comment">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    `;

    return this.element;
  }
}
