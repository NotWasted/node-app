const express = require('express');

const router = express.Router();

router.get('/search', (req, res) => {
	res.send('GET RECIPE SEARCH');
});

router.get('/pantry/:userId', async (req, res) => {
	res.send('GET PANTRY BY USER ID ');
})

module.exports = router;