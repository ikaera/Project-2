const router = require('express').Router();
const userRoutes = require('./userRoutes');
const listingRoutes = require('./listingRoutes');
const cartRoutes = require('/.cartRoutes');
const cartItemRoutes = require('/.cartItemRoutes');

router.use('/users', userRoutes);
router.use('/listings', listingRoutes);
router.use('/cart', cartRoutes);
router.use('/cartItem', cartItemRoutes);

module.exports = router;