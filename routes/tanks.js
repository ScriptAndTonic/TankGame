var express = require('express');
const Tank = require('../models/Tank');
var router = express.Router();

router.get('/', async(req, res, next) => {
    const tanks = await Tank.find();
    res.send(tanks);
});

router.post('/', async(req, res, next) => {
    Tank.create({
        name: req.body.name,
        maxHealth: req.body.maxHealth,
        damage: req.body.damage,
        range: req.body.range,
        speed: req.body.speed
    }).then((tank) => res.send(tank));
})

module.exports = router;