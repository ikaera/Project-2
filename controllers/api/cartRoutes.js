// these are copied from Nate's pull request (#44), pushing through on my account to avoid the package.json issue he seems to be having that was included in that same pull request.

const router = require('express').Router();
const { Cart } = require('../../models/Cart');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        const cartData = await Cart.create({
            cartitem_id: req.body.id,
            user_id: req.session.user_id,
        });
        console.log(cartData);
        res.status(200).json(cartData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const cartData = await Cart.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!cartData) {
            res.status(400).json({
                message: 'No saved item found with this ID!'
            });
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;