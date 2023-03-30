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

//user hasMany
User.hasMany(Favorites, {
  // through: Favorites,
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

//favitem belong to
Favorites.belongsTo(User, {
  foreignKey: 'user_id',
});

Listing.hasMany(Favorites, {
  // through: Favorites,
  foreignKey: 'favitem_id',
  onDelete: 'CASCADE',
});

//favitem belong to
Favorites.belongsTo(Listing, {
  foreignKey: 'favitem_id',
});

// will probably need more than this!!
// needs specification???
/* User.hasMany(Listing); */

// needs specification???
/* User.hasOne(Cart); */

Cart.belongsTo(User, {
  foreignKey: 'user_id',
});

Cart.belongsToMany(Listing, {
    through: CartItem
});

Listing.hasMany(Cart, {
  foreignKey: 'listing_id',
  onDelete: 'CASCADE',
});

Cart.hasMany(CartItem, {
  // cart info
    foreignKey: 'cartitem_id',
});

module.exports = { User, Listing, Favorites, FavItem, Cart, CartItem };

// "how to get it so that when the "save to favorites" button is pressed on a listing, it creates a new Fav Item that clones specific parts of the Listing information and then goes into the '/myitems' page and stays there with cookies"