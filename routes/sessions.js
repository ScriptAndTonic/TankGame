var express = require('express');
const Session = require('../models/Session');
var router = express.Router();

router.get('/', async(req, res, next) => {
    const sessions = await Session.find();
    res.send(sessions);
});

router.get('/:id/render', async(req, res, next) => {
    const sessionId = req.params.id;
    let session = await Session.findById(sessionId);
    let render = '<h3>';

    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
            if (i == session.tank1StartingPosition.row && j == session.tank1StartingPosition.column) {
                render += '1';
            } else {
                if (i == session.tank2StartingPosition.row && j == session.tank2StartingPosition.column) {
                    render += '2';
                } else {
                    render += '-';
                }
            }
        }
        render += '<br>';
    }
    render += '</h3>';

    res.send(render);
});


module.exports = router;