const router = require('express').Router();

const userRoutes = require('./userRoutes');
const listingRoutes = require('./listingRoutes');

const cartRoutes = require('./cartRoutes');
/* const cartItemRoutes = require('./cartItemRoutes'); */

const favoritesRoutes = require('./favoritesRoutes');
/* const favItemRoutes = require('./favItemRoutes'); */

router.use('/users', userRoutes);
router.use('/listings', listingRoutes);

router.use('/cart', cartRoutes);
/* router.use('/cartItem', cartItemRoutes); */

router.use('/favorites', favoritesRoutes);
/* router.use('/favItem', favItemRoutes); */

// /favItem and /cartItem weren't doing ANYTHING from what I can tell, noted out entirely

module.exports = router;
