import { createElement } from '../utils/helpers.js';

export class CastSection {
  constructor(cast) {
    this.cast = cast;
    this.element = null;
  }

  render() {
    this.element = createElement('div', {
      classes: 'cast-section'
    });

    const grid = createElement('div', {
      classes: 'cast-section__grid'
    });

    this.cast.forEach(member => {
      const card = createElement('div', {
        classes: 'cast-card'
      });

      card.innerHTML = `
        <div class="cast-card__image">
          <div class="cast-card__placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        <div class="cast-card__content">
          <h4 class="cast-card__name">${member.Name}</h4>
          <p class="cast-card__role">Ator principal</p>
        </div>
      `;

      grid.appendChild(card);
    });

    this.element.appendChild(grid);

    return this.element;
  }
}
