// this doesn't seem to be doing anything
const listing = require('../../models/Listing');

const router = require('express').Router();
const { favorites } = require('../../models');
const withAuth = require('../../utils/auth');

module.exports = router;
