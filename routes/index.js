var express = require('express');
var router = express.Router();
const Map = require('../models/Map');
const Tank = require('../models/Tank');

/**
 * POST /demo
 * @summary Populates the database with 2 demo tanks and 1 demo map
 * @tags demo
 * @return {string} 200 - success response - string
 */
router.post('/demo', (_req, res) => {
    new Map({
        name: "Demo_Map",
        obstacles: [{
                row: 20,
                column: 20
            },
            {
                row: 30,
                column: 30
            },
            {
                row: 40,
                column: 40
            }
        ]
    }).save();

    new Tank({
        name: 'Powerful',
        maxHealth: 130,
        damage: 20,
        range: 3,
        speed: 1
    }).save();

    new Tank({
        name: 'Fast',
        maxHealth: 100,
        damage: 10,
        range: 5,
        speed: 2
    }).save();

    res.send('Demo data created');
});

module.exports = router;