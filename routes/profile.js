const express = require('express');
const router = express.Router();



module.exports = params => {
    const {
        profileService
    } = params;

    router.get('/', async (req, res) => {
        const profile = await profileService.getList();
        return res.json(profile);
    });

    router.post('/', (req, res) => {
        return res.send('Profile posted');
    });

    return router;
};