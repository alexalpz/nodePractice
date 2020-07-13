const express = require('express');

const chatRoute = require('./chat');
const reviewsRoute = require('./reviews');
const peopleRoute = require('./people');


const router = express.Router();

module.exports = () => {
    router.get('/', (req, res) => {
        res.render('pages/index', {
            pageTitle: 'EJS Test'
        });
    });

    router.use('/chat', chatRoute());
    router.use('/reviews', reviewsRoute());
    router.use('/people', peopleRoute());

    return router;
};