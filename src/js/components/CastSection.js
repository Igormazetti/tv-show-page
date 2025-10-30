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

    const carousel = createElement('div', {
      classes: 'cast-section__carousel'
    });

    this.cast.forEach(member => {
      const card = createElement('div', {
        classes: 'cast-card'
      });

      card.innerHTML = `
        <h4 class="cast-card__name">${member.Name}</h4>
        <p class="cast-card__character">Personagem</p>
      `;

      carousel.appendChild(card);
    });

    this.element.appendChild(carousel);

    return this.element;
  }
}
