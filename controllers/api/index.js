const router = require('express').Router();
const userRoutes = require('./userRoutes');
const listingRoutes = require('./listingRoutes');
const favoritesRoutes = require('./favoritesRoutes');
const favItemRoutes = require('./favItemRoutes');

router.use('/users', userRoutes);
router.use('/listings', listingRoutes);
router.use('favorites', favoritesRoutes);
router.use('/favItem', favItemRoutes);

module.exports = router;
