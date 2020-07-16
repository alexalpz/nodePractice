const express = require('express');
const router = express.Router();

module.exports = params => {
    
    const {
        chatService
    } = params;

    router.get('/', async (req, res) => {
       
        const chat = await chatService.getList();
        return res.json(chat);

    });

    router.post('/', (req, res) => {
        return res.send('Chat posted');
    });

    return router;
};