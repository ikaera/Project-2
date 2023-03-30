const router = require('express').Router();
const userRoutes = require('./userRoutes');
const listingRoutes = require('./listingRoutes');

/* const cartRoutes = require('./cartRoutes');
const cartItemRoutes = require('/.cartItemRoutes'); */

const favoritesRoutes = require('./favoritesRoutes');
const favItemRoutes = require('./favItemRoutes');

/* router.use('/cart', cartRoutes);
router.use('/cartItem', cartItemRoutes); */
router.use('/favorites', favoritesRoutes);
router.use('/favItem', favItemRoutes);
router.use('/users', userRoutes);
router.use('/listings', listingRoutes);

module.exports = router;
