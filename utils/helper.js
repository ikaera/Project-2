const dayjs = require('dayjs');

module.exports = {
  getEmoji: () => {
    const randomNumber = Math.random();
    // Return a random emoji
    if (randomNumber > 0.6) {
      return `<span for="img" aria-label="lightbulb">📀 🎧</span>`;
    } else if (randomNumber > 0.3) {
      return `<span for="img" aria-label="laptop">💽 🎧</span>`;
    } else {
      return `<span for="img" aria-label="gear"> 💿 🎵 </span>`;
    }
  },
};
