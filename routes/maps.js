var express = require('express');
const Map = require('../models/Map');
var router = express.Router();

router.get('/', async(_req, res) => {
    const maps = await Map.find();
    res.send(maps);
});

router.post('', async(req, res) => {
    Map.create({
        name: req.body.name,
        obstacles: req.body.obstacles
    }).then((map) => res.send(map));
})

module.exports = router;