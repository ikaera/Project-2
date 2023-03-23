const dayjs = require('dayjs');

module.exports = {
  formatTime: (date) => {
    return date.toLocaleTimeString();
  },
  formatDate: (date) => {
    return dayjs(new Date(date)).format('ddd, MMM D, YYYY [@] h:mm:ss a');
    // `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
    //   new Date(date).getFullYear() + 5
    // }`;
  },
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
