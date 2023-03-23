const router = require('express').Router();
const { Listing } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newListing = await Listing.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newListing);
    } catch (err) {
        res.status(400).json(err);
    }
});

// need a .update functionality so that users can change the price, shipping information, etc. for their listings

router.delete('/:id', async (req, res) => {
    try {
        const listingData = await Listing.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!listingData) {
            res.status(404).json({ message: 'No listing found with this ID!' });
            return;
        };
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;