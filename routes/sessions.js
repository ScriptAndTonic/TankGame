var express = require('express');
const Session = require('../models/Session');
const liveSession = require('../live/live_session.js');
var router = express.Router();

/**
 * A playing simulation session
 * @typedef {object} Session
 * @property {string} map - The name of the map to be used
 * @property {string} tank1 - The name of tank 1
 * @property {string} tank2 - The name of tank 2
 * @property {string} status - The status of the session
 * @property {string} winner - The session winner, if finished
 * @property {string} liveInfo - Some JSON live information of the simulation
 */

/**
 * Simulation starting info
 * @typedef {object} SessionStartingInfo
 * @property {string} map - The name of the map to be used
 * @property {string} tank1 - The name of tank 1
 * @property {string} tank2 - The name of tank 2
 * @property {Position} tank1StartingPosition - The starting position of Tank 1
 * @property {Position} tank2StartingPosition - The starting position of Tank 2
 */

/**
 * An position on the map
 * @typedef {object} Position
 * @property {number} row.required - The position row
 * @property {number} column.required - The position column
 */

/**
 * GET /sessions
 * @summary Returns a list of all the sessions currently in the database
 * @param {string} id.query - The session ID to search for
 * @tags session
 * @return {object} 200 - success response - application/json
 */
router.get('/', async(req, res) => {
    if (req.query.id != null && req.query.id != '') {
        res.send(await Session.findById(req.query.id));
    } else {
        res.send(await Session.find());
    }
});

/**
 * POST /sessions
 * @summary Creates a session,  stores it into the database and starts the simulation
 * @tags session
 * @param {SessionStartingInfo} request.body.required - The simulation info
 * @return {Session} 201 - session response
 */
router.post('/', async(req, res) => {
    let session = await Session.create({
        map: req.body.map,
        tank1: req.body.tank1,
        tank2: req.body.tank2,
        status: 'new',
        winner: ''
    });

    liveSession.startSession(session, req.body.tank1StartingPosition, req.body.tank2StartingPosition);
    res.send('Session started, check status by the following session ID: ' + session.id);
});

module.exports = router;