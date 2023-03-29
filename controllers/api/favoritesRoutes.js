const router = require('express').Router();
const { Favorites } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const userData = await Favorites.create({
      favitem_id: req.body.id,
      user_id: req.session.user_id,
    });
    console.log(userData);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
