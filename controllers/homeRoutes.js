const router = require('express').Router();
const { User, Listing } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbListingData = await Listing.findAll({
            include: [
                {
                    model: Listing,
                    attributes: ['coverart', 'description', 'price'],
                },
            ],
        });

        const listings = dbListingData.map((listing) => listing.get({ plain: true }));

        res.render('homepage', {
            listings,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// this will need be GET for all listings by a specific user ID, needs reformatting
router.get('/user/:id'. withAuth, async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        try {
            const dbUserData = await User.findByPk(req.params.id, {
                include: [
                    {
                        model: Listing,
                        attributes: [
                            'id',
                            'title',
                            'artist',
                            'release_date',
                            'coverart',
                            'label',
                            'price',
                            'description',
                        ],
                    },
                ],
            });
            const user = dbUserData.get({ plain: true });
            res.render('user', { user, logged_in: req.session.logged_in });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

router.get('/listing/:id'. withAuth, async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        try {
            const dbListingData = await Listing.findByPk(req.params.id);

            const listing = dbListingData.get({ plain: true });

            res.render('listing', { listing, logged_in: req.session.logged_in });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;