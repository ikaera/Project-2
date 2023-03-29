const router = require('express').Router();
const { cart } = require('../../models');
const withAuth = require('../../utils/auth');


const express = require('express');
const shopController = require('./cartItemRoutes');

router.get('/', shopController.getIndex);
router.get('/listing', shopController.getProducts);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);
router.get('/listing/:listingId', shopController.getProduct);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
router.post('/create-order', shopController.postOrder);

module.exports = router;