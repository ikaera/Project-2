module.exports = {
  if_faved: (favorites, userId, options) => {
    console.log(userId);
    const isFavorite = favorites.some((fave) => fave.user_id === userId);
    console.log(favorites, isFavorite, userId);
    return isFavorite ? options.inverse(this) : options.fn(this);
  },
};
