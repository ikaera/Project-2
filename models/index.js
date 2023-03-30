const User = require('./User');
const Listing = require('./Listing');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Favorites = require('./Favorites');
const FavItem = require('./FavItem');

User.hasMany(Listing, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Listing.belongsTo(User, {
  foreignKey: 'user_id'
});

// will probably need more than this!!

User.hasMany(Listing);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Listing, {
    through: CartItem
});
Listing.belongsToMany(Cart, {
    through: CartItem
});
// Favorites.belongsTo(User, {
//   // favorites info
// });

Cart.hasMany(CartItem, {
  // cart info
    foreignKey: 'user_id',
});

// Favorites.hasMany(FavItem, {
//   // favorites info
// });

module.exports = { User, Listing };