const User = require('./User');
const Listing = require('./Listing');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Favorites = require('./Favorites');
const FavItem = require('./FavItem');

User.hasMany(Listing, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Listing.belongsTo(User, {
  foreignKey: 'user_id',
});

// will probably need more than this!!
Cart.belongsTo(User, {
  // cart info
});

Favorites.belongsTo(User, {
  // favorites info
});

Cart.hasMany(CartItem, {
  // cart info
});

Favorites.hasMany(FavItem, {
  // favorites info
});

module.exports = { User, Listing };
