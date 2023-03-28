const router = require('express').Router();
const { User, Listing } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const dbListingData = await Listing.findAll({
      // include: [
      //   {
      //     model: Listing,
      //     attributes: ['coverart', 'description', 'price'],
      //   },
      // ],
    });

    const listings = dbListingData.map((listing) =>
      listing.get({ plain: true })
    );
    
    // console.log("list", listings)

    req.session.save(() => {
      // We set up a session variable to count the number of times we visit the homepage
      if (req.session.countVisit) {
        // If the 'countVisit' session variable already exists, increment it by 1
        req.session.countVisit++;
      } else {
        // If the 'countVisit' session variable doesn't exist, set it to 1
        req.session.countVisit = 1;
      }
    });
    let expressVisitorCounter = req.session.counters;

    console.log(expressVisitorCounter);

    let visitorCounterValues = Object.values(expressVisitorCounter);
    let visitorCounterKeys = Object.keys(expressVisitorCounter);

    console.log(`VALUES:  ${visitorCounterValues}`);
    console.log(`KEYS:  ${visitorCounterKeys}`);

    let numberOfDailyUniqueSessions;
    let numberOfDailyUniqueIpAddresses;
    let numberOfDailyRequests;

    for (let i = 0; i < visitorCounterKeys.length; i++) {
      if (visitorCounterKeys[i].split('-')[1] === 'sessions') {
        numberOfDailyUniqueSessions = visitorCounterValues[i];
      } else if (visitorCounterKeys[i].split('-')[1] === 'ip') {
        numberOfDailyUniqueIpAddresses = visitorCounterValues[i];
      } else if (visitorCounterKeys[i].split('-')[1] === 'requests') {
        numberOfDailyRequests = visitorCounterValues[i];
      }
    }

    res.render('homepage', {
      listings,
      logged_in: req.session.logged_in,

      // We send over the current 'countVisit' session variable to be rendered
      countVisit: req.session.countVisit,
      // totalVisitors: Object.keys(expressVisitorCounter).length,
      numberOfDailyRequests: numberOfDailyRequests,
      numberOfDailyUniqueIpAddresses: numberOfDailyUniqueIpAddresses,
      numberOfDailyUniqueSessions: numberOfDailyUniqueSessions,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// this will need be GET for all listings by a specific user ID, needs reformatting
router.get('/user/:id', withAuth, async (req, res) => {
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

router.get('/listing/:id', withAuth, async (req, res) => {
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

router.get('/sell', async (req, res) => {
  //
  const dbListingData = await Listing.findAll({
    // include: [
    //   {
    //     model: Listing,
    //     attributes: ['coverart', 'description', 'price'],
    //   },
    // ],
  });

  const listings = dbListingData.map((listing) => listing.get({ plain: true }));

  res.render('listing', {
    vinyl: true,
    vinyls: listings,
    logged_in: req.session.logged_in,
  });
});

// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findbyPk(req.session.user_id, {
//       attributes: { exclude: ['password']},
//       include: [{model: Listing }],
//     });
//     const user = userData.get({ plain: true});

//     res.render('profile', {
//       ...user,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/profile', withAuth, async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  } else {
    res.render('profile', {
      logged_in: req.session.logged_in,
    })
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
