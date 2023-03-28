const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
/* I think additional routes are needed for full functionality */
/* const vinylRoutes = require('./vinylRoutes');
const cdRoutes = require('./cdRoutes');
const cassetteRoutes = require('./cassetteRoutes'); */

router.use('/api', apiRoutes);
router.use('/', homeRoutes)
/* router.use('/vinyls', vinylRoutes);
router.use('/cds', cdRoutes);
router.use('/cassettes', cassetteRoutes); */

module.exports = router;