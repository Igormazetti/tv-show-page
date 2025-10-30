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
    `;

    return this.element;
  }
}
