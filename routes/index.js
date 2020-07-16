const express = require('express');

const chatRoute = require('./chat');
const reviewsRoute = require('./reviews');
const profileRoute = require('./profile');


const router = express.Router();

module.exports = params => {
    router.get('/', (req, res) => {

        /*
        if(!req.session.visitcount){
            req.session.visitcount= 0;
        }

        req.session.visitcount += 1;
        console.log(`Number of visits: ${req.session.visitcount}`);
*/

        res.render('layout', {
            template: 'index'
        });
    });

    router.use('/chat', chatRoute(params));
    router.use('/reviews', reviewsRoute(params));
    router.use('/profile', profileRoute(params));

    return router;
};