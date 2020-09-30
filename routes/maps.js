var express = require('express');
const Map = require('../models/Map');
var router = express.Router();

router.get('/', async(req, res, next) => {
    const maps = await Map.find();
    res.send(maps);
});

router.post('', async(req, res, next) => {
    Map.create({
        name: req.body.name,
        obstacles: req.body.obstacles
    }).then((map) => res.send(map));
})

module.exports = router;