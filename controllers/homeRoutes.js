const router = require('express').Router();
const { User, Listing, Favorites, FavItem, Cart, CartItem } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const dbListingData = await Listing.findAll({
      // including the User.name so that the username of seller can be displayed
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Favorites,
        },
        {
          model: Cart,
        },
      ],
    });

    // const listingResponse = dbListingData.get({ plain: true });
    // console.log(listingResponse);

    const listings = dbListingData.map((listing) =>
      listing.get({ plain: true })
    );
    // console.log(JSON.stringify(listings, null, 4));

    // all of the site visit info was in the wrong place!
    // we only need a unique visitor counter for specific listings, not to display randomly on the homepage
    // we need to find a way to set up the visiter tracker outside of the get routes and call it into the get routes so that it can be simplified for practical usage
    console.log('ID', req.session.user_id);
    res.render('homepage', {
      listings,
      logged_in: req.session.logged_in,
      userId: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get all Listings from a specific User
router.get('/user/:id', withAuth, async (req, res) => {
  
  try {
    const userListingData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Listing,
        },
      ],
      attributes: ['id', 'name']
    });

    const userListings = userListingData.listings.map((listing) => listing.get({ plain: true }));
    console.log(userListings);

    res.render('single-user', {
      userListings,
      logged_in: req.session.logged_in,
      user: userListingData.dataValues,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// this needs to be updated (with handlebars update) so that it renders 'single-listing' and displays just the listing being selected
router.get('/listing/:id', withAuth, async (req, res) => {
  // does not need a !logged_in set up if it has withAuth function in the get
  try {
    const dbListingData = await Listing.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const listing = dbListingData.get({ plain: true });

    res.render('single-listing', {
      listing,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// this is the former /sell route, now loads the listing page with listing-details which needs to be adjusted to display less erroneous info
router.get('/listing', withAuth, (req, res) => {
  res.render('listing', {
    logged_in: req.session.logged_in,
  });
});

// route to POST listings
router.post('/listings', withAuth, async (req, res) => {
  try {
    const listingData = await Listing.create({
      ...req.body,
      logged_in: req.session.logged_in,
    });

    const newListing = listingData.get({ plain: true });
    console.log(newListing);

    res.render('single-listing', {
      newListing,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// this needs a try where it specifically finds All where format: vinyl
router.get('/vinyls', withAuth, async (req, res) => {
  try {
    const vinylData = await Listing.findAll({
      where: {
        format: 'vinyl',
      },
    });

    const vinyls = vinylData.map((listing) => listing.get({ plain: true }));
    console.log(vinyls);

    res.render('vinyls', {
      vinyls,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// this needs a try where it specifically finds All where format: CD
router.get('/cds', withAuth, async (req, res) => {
  try {
    const cdData = await Listing.findAll({
      where: {
        format: 'CD',
      },
    });

    const cds = cdData.map((listing) => listing.get({ plain: true }));
    console.log(cds);

    res.render('cds', {
      cds,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// this needs a try where it specifically finds All where format: cassette
router.get('/cassettes', withAuth, async (req, res) => {
  try {
    const cassetteData = await Listing.findAll({
      where: {
        format: 'cassette',
      },
    });

    const cassettes = cassetteData.map((listing) =>
      listing.get({ plain: true })
    );
    console.log(cassettes);

    res.render('cassettes', {
      cassettes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// loads the currently logged-in user profile, only getting listings with matching user_id
/* router.get('/profile', withAuth, async (req, res) => {
  try {
    const userListingData = await Listing.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const listingData = userListingData.map((listing) =>
      listing.get({ plain: true })
    );
    console.log(listingData);

    res.render('profile', {
      listingData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}); */

// alternative attempt at /profile using User again!
// should work!
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userListingData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Listing,
        },
      ],
      attributes: ['id', 'name']
    });

    const listingData = userListingData.listings.map((listing) => listing.get({ plain: true }));
    console.log(listingData);

    res.render('profile', {
      listingData,
      logged_in: req.session.logged_in,
      user: userListingData.dataValues,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// logout route appears to be missing?

// My saved itmes(Favitems and Favorites)
router.get('/myitems', withAuth, async (req, res) => {
  try {
    const favItemsData = await Favorites.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [Listing],
    });

    const favItems = favItemsData.map((item) => {
      return item.get({ plain: true });
    });
    console.log(favItems);

    res.render('myitems', {
      favItems,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/cart', withAuth, async (req, res) => {
  try {
    const cartItemsData = await Cart.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [Listing],
    });

    const cartItems = cartItemsData.map((item) => {
      return item.get({ plain: true });
    });
    console.log(cartItems);

    res.render('cart', {
      cartItems,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/');
      /* res.status(204).end(); */
    });
  } else {
    res.redirect('/');
    /* res.status(404).end(); */
  }
});

module.exports = router;
