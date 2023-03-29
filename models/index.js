const User = require('./User');
const Listing = require('./Listing');
// const Cart = require('./Cart');
// const CartItem = require('./CartItem');
const Favorites = require('./Favorites');
const FavItem = require('./FavItem');

User.hasMany(Listing, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Listing.belongsTo(User, {
  foreignKey: 'user_id',
});

// Favorites.hasMany(FavItem, {
//   foreignKey: 'favitem_id',
//   onDelete: 'CASCADE',
// });

// //FAVitmes belongs to favorites
// FavItem.belongsTo(Favorites, {
//   foreignKey: 'favitem_id',
//   // onDelete: 'CASCADE'
// });

//user hasMany
User.hasMany(Favorites, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

//favitem belong to
Favorites.belongsTo(User, {
  foreignKey: 'favitem',
});

/* // will probably need more than this!!
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
}); */

module.exports = { User, Listing, Favorites, FavItem };

// "how to get it so that when the "save to favorites" button is pressed on a listing, it creates a new Fav Item that clones specific parts of the Listing information and then goes into the '/myitems' page and stays there with cookies"
