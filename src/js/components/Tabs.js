import { createElement } from '../utils/helpers.js';

export class Tabs {
  constructor(onTabChange) {
    this.onTabChange = onTabChange;
    this.element = null;
    this.activeTab = 'general';
    this.tabs = [
      { id: 'general', label: 'GERAL' },
      { id: 'cast', label: 'ELENCO' },
      { id: 'awards', label: 'PRINCIPAIS PREMIOS' }
    ];
  }

  render() {
    this.element = createElement('div', {
      classes: 'tabs'
    });

    const tabsNav = createElement('nav', {
      classes: 'tabs__nav'
    });

    this.tabs.forEach(tab => {
      const button = createElement('button', {
        classes: ['tabs__button', tab.id === this.activeTab ? 'tabs__button--active' : ''],
        attributes: {
          'data-tab': tab.id
        },
        text: tab.label
      });

      button.addEventListener('click', () => this.switchTab(tab.id));
      tabsNav.appendChild(button);
    });

    this.element.appendChild(tabsNav);

    return this.element;
  }

  switchTab(tabId) {
    if (this.activeTab === tabId) return;

    this.activeTab = tabId;

    const buttons = this.element.querySelectorAll('.tabs__button');
    buttons.forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('tabs__button--active');
      } else {
        btn.classList.remove('tabs__button--active');
      }
    });

    if (this.onTabChange) {
      this.onTabChange(tabId);
    }
  }
}
