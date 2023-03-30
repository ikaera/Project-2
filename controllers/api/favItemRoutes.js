// this doesn't seem to be doing anything
// changed two of these to start with capital letters, for formatting consistency

const Listing = require('../../models/Listing');

const router = require('express').Router();
const { Favorites } = require('../../models');
const withAuth = require('../../utils/auth');

module.exports = router;
