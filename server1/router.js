const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	if (process.env.NODE_ENV !== 'production') {
		res.redirect('http://localhost:3000/');
	}
});

module.exports = router;
