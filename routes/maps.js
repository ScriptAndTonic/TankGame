var express = require('express');
const Map = require('../models/Map');
var router = express.Router();

router.get('/', async(req, res, next) => {
    const maps = await Map.find();
    res.send(maps);
});

module.exports = router;