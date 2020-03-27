const express = require('express');

// A middleware that parses cookies in the request
const cookieParser = require('cookie-parser');

// A middleware that's responsible for authenticating the requests
const authentication = require('./mw/authentication');

// A middleware that redirects the request if it is not authenticated
const requireUser = require('./mw/requireUser');

// A middleware that loads configurations from the database
const populateConfigs = require('./mw/populateConfigs');

// A middleware that loads parts from the database
const populateParts = require('./mw/populateParts');

// A middleware that populates available filters for a given part type
const populateFilters = require('./mw/populateFilters');

function addAllMiddleware (app) {

    // Use the cookie parser middleware for all requests
    app.use(cookieParser());

    // Use the form parser middleware for requests that
    // use POST to send forms
    app.use('/login', express.urlencoded( { extended: true } ));

    // Use the authentication middleware for all requests
    app.use(authentication());

    // Set up authorization middleware for pages that require
    // a valid login in the request
    app.use('/my-configs', requireUser());
    app.use('/new-configuration', requireUser());

    // Set up configuration populator middleware
    // TODO: Configure this middleware to retreive current
    // user's configs only
    app.use('/my-configs', populateConfigs());
    // TODO: Configure this middleware to retreive all
    // stored configurations
    app.use('/', populateConfigs());

    // Set up part populator middleware
    // TODO: Instantiate the middleware for all part
    // types, using the correct configuration
    app.use('/new-configuration', populateParts());

    // Set up part filter populator middleware
    // TODO: Write part search page
    // TODO: Configure this middleware
    app.use('/part-search', populateFilters());

}

module.exports = addAllMiddleware;