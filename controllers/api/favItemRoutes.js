// this doesn't seem to be doing anything
// changed two of these to start with capital letters, for formatting consistency

const router = require('express').Router();
const Listing = require('../../models/Listing');
const { Favorites } = require('../../models');
const withAuth = require('../../utils/auth');

module.exports = router;
