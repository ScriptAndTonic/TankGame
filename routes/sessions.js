var express = require('express');
const Session = require('../models/Session');
const liveSession = require('../live/live_session.js');
var router = express.Router();

router.get('/', async(_req, res) => {
    const sessions = await Session.find();
    res.send(sessions);
});

router.get('/:id', async(req, res) => {
    res.send(await Session.findById(req.params.id));
});

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