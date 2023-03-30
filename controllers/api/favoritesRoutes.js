const router = require('express').Router();
const { Favorites } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const favoritesData = await Favorites.create({
      favitem_id: req.body.id,
      user_id: req.session.user_id,
    });
    console.log(favoritesData);
    res.status(200).json(favoritesData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// wouldn't this destroy the full favorites list and not just the individual favorite items?
// I think this belongs in the favItemRoutes!
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const favoritesData = await Favorites.destroy({
      where: {
        favitem_id: req.body.id,
        user_id: req.session.user_id,
      },
    });

    if (!favoritesData) {
      res.status(400).json({ message: 'No saved itme found with this ID!' });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
