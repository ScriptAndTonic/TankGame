var express = require('express');
const Tank = require('../models/Tank');
var router = express.Router();

router.get('/', async(req, res, next) => {
    const tanks = await Tank.find();
    res.send(tanks);
});

module.exports = router;