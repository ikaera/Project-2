const listing = require('../models/listing');

exports.getlistings = (req, resp) => {
    listing.findAll()
        .then(listings => {
            resp.render('shop/listing-list', {
                prods: listings,
                pageTitle: 'Shop',
                path: '/listings'
            });
        })
        .catch(err => console.log(err));
};

exports.getlisting = (req, resp) => {
    const prodId = req.params.listingId;
    listing.findByPk(prodId)
        .then((listing) => {
            resp.render('shop/listing-detail', {
                listing: listing,
                pageTitle: listing.title,
                path: '/listings'
            });
        })
        .catch(err => console.error(err));
};

exports.getIndex = (req, resp) => {
    listing.findAll()
        .then(listings => {
            resp.render('shop/index', {
                prods: listing,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => console.log(err));
};

exports.getCart = (req, resp) => {
    req.user.getCart()
        .then(cart => {
            return cart.getlistings();
        })
        .then(listings => {
            resp.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                listings: listings
            });
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, resp) => {
    const prodId = req.body.listingId;
    let fetchedCart;
    let newQty = 1;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getlistings({
                where: {
                    id: prodId
                }
            });
        })
        .then(listings => {
            let listing;
            if (listings.length > 0) {
                listing = listings[0];
            }
            if (listing) {
                const oldQty = listing.cartItem.quantity;
                newQty = oldQty + 1;
                return listing;
            } else {
                return listing.findByPk(prodId);
            }
        })
        .then((listing) => {
            return fetchedCart.addlisting(listing, {
                through: {
                    quantity: newQty
                }
            });
        })
        .then(() => resp.redirect('/cart'))
        .catch(err => console.error(err));
};

exports.postCartDeletelisting = (req, resp) => {
    const prodId = req.body.listingId;
    req.user.getCart()
        .then(cart => {
            return cart.getlistings({
                where: {
                    id: prodId
                }
            });
        })
        .then(listings => {
            const listing = listings[0];
            return listing.cartItem.destroy();
        })
        .then(() => resp.redirect('/cart'))
        .catch(err => console.error(err));
};

exports.getCheckout = (req, resp) => {
    resp.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
};

exports.getOrders = (req, resp) => {
    req.user.getOrders({include: ['listings']})
        .then(orders => {
            resp.render('shop/orders', {
                orders: orders,
                pageTitle: 'Orders',
                path: '/orders'
            });
        })
        .catch(err => console.error(err));
};

exports.postOrder = (req, resp) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getlistings();
        })
        .then(listings => {
            return req.user.createOrder()
                .then(order => {
                    return order.addlistings(listings.map(p => {
                        p.orderItem = {
                            quantity: p.cartItem.quantity
                        };
                        return p;
                    }));
                })
                .catch(err => console.error(err));
        })
        .then(result => {
            return fetchedCart.setlistings(null);
        })
        .then((result) => {
            resp.redirect('/orders');
        })
        .catch(err => console.error(err));
      }