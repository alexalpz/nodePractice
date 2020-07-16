const express = require('express');
const router = express.Router();



module.exports = params => {
    const {
        reviewService
    } = params;

    router.get('/', async (req, res) => {
        const reviews = await reviewService.getList();
        return res.json(reviews);
    });

    router.post('/', (req, res) => {
        return res.send('Review posted');
    });

    return router;
};