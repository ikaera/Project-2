// these are copied from Nate's pull request (#44), pushing through on my account to avoid the package.json issue he seems to be having that was included in that same pull request.


// similarly with favItemRoutes, this doesn't seem to be doing anything
// going to consult my tutor tomorrow

const router = require('express').Router();
const Listing = require('../../models/Listing');
const { Cart } = require('../../models/');
const withAuth = require('../../utils/auth');

module.exports = router;