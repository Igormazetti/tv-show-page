export function groupEpisodesBySeason(episodes) {
  return episodes.reduce((acc, episode) => {
    const season = episode.SeasonNumber;
    if (!acc[season]) {
      acc[season] = [];
    }
    acc[season].push(episode);
    return acc;
  }, {});
}

export function formatDuration(minutes) {
  if (!minutes) return 'N/A';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}min`;
  }

  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

export function createElement(tag, options = {}) {
  const element = document.createElement(tag);

  if (options.classes) {
    element.className = Array.isArray(options.classes)
      ? options.classes.join(' ')
      : options.classes;
  }

  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  if (options.html) {
    element.innerHTML = options.html;
  }

  if (options.text) {
    element.textContent = options.text;
  }

  return element;
}

export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
