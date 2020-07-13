const express = require('express');
const router = express.Router();



module.exports = () => {
    router.get('/', (req, res) => {
        return res.send('Chat page');
    });

    router.post('/', (req, res) => {
        return res.send('Chat posted');
    });

    return router;
};