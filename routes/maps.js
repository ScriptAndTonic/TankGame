var express = require('express');
const Map = require('../models/Map');
var router = express.Router();

/**
 * A 50x50 map with different obstacles
 * @typedef {object} Map
 * @property {string} name.required - A unique name
 * @property {array<Obstacle>} obstacles - The starting health of the tank
 */

/**
 * An obstacle on the map described by a fixed position
 * @typedef {object} Obstacle
 * @property {number} row.required - The obstacle position row
 * @property {number} column.required - The obstacle position column
 */

/**
 * GET /maps
 * @summary Returns a list of all the maps currently in the database
 * @tags map
 * @return {array<Map>} 200 - success response - application/json
 */
router.get('/', async(_req, res) => {
    const maps = await Map.find();
    res.send(maps);
});

/**
 * POST /maps
 * @summary Creates a map and stores it into the database
 * @tags map
 * @param {Map} request.body.required - The map object to be created
 * @return {Map} 201 - map response
 */
router.post('', async(req, res) => {
    Map.create({
        name: req.body.name,
        obstacles: req.body.obstacles
    }).then((map) => res.send(map));
});

module.exports = router;