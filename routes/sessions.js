var express = require('express');
const Session = require('../models/Session');
const Map = require('../models/Map');
const liveSession = require('../live/live_session.js');
var router = express.Router();

router.get('/', async(req, res, next) => {
    const sessions = await Session.find();
    res.send(sessions);
});

router.get('/:id', async(req, res, next) => {
    res.send(await Session.findById(req.params.id));
});

router.get('/:id/render', async(req, res, next) => {
    const sessionId = req.params.id;
    let session = await Session.findById(sessionId);
    const map = await Map.findOne({ name: session.map });
    const render = liveSession.renderSession(map, session.tank1Position, session.tank2Position);
    res.send(render);
});

router.post('/', async(req, res, next) => {
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