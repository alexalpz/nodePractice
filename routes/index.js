const express = require('express');

const chatRoute = require('./chat');
const reviewsRoute = require('./reviews');
const profileRoute = require('./profile');


const router = express.Router();

module.exports = params => {
    router.get('/', (req, res) => {
        res.render('layout', {
            template: 'index'
        });
    });

    router.use('/chat', chatRoute(params));
    router.use('/reviews', reviewsRoute(params));
    router.use('/profile', profileRoute(params));

    return router;
};