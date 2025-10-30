/**
 * Groups episodes by season number
 * @param {Array} episodes - Array of episode objects
 * @returns {Object} - Episodes grouped by season
 */
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

/**
 * Formats duration from minutes to readable format
 * @param {number} minutes - Duration in minutes
 * @returns {string} - Formatted duration (e.g., "1h 30min")
 */
export function formatDuration(minutes) {
  if (!minutes) return 'N/A';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}min`;
  }

  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

/**
 * Creates a DOM element with classes and attributes
 * @param {string} tag - HTML tag name
 * @param {Object} options - Options for the element
 * @returns {HTMLElement}
 */
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

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function}
 */
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
