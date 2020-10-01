const { parentPort } = require('worker_threads');
const tankAI = require('../ai/tank_AI');
const Tank = require('../models/Tank');
const Session = require('../models/Session');
var db = require('../db/db');
const { disconnect } = require('mongoose');

parentPort.once('message', async(liveSessionJSON) => {
    db.init();
    let liveSession = JSON.parse(liveSessionJSON);
    parentPort.postMessage('Live session worker created');
    let tank1Info = await Tank.findOne({ name: liveSession.tank1 });
    let tank2Info = await Tank.findOne({ name: liveSession.tank2 });

    liveSession.tank1Health = tank1Info.maxHealth;
    liveSession.tank2Health = tank2Info.maxHealth;

    while (liveSession.status === 'running') {
        // parentPort.postMessage('-------- Round: ' + liveSession.round + ' --------');
        if (liveSession.round % 2 == 0) {
            liveSession = tankAI.takeTurn(tank1Info, liveSession, 1);
        } else {
            liveSession = tankAI.takeTurn(tank2Info, liveSession, 2);
        }
        if (liveSession.tank1Health <= 0 || liveSession.tank2Health <= 0) {
            liveSession.status = 'finished';
        }
        liveSession.round++;
    }

    let dbSession = await Session.findById(liveSession.sessionID);
    dbSession.status = 'finished';
    dbSession.winner = liveSession.tank1Health <= 0 ? 'Tank2' : 'Tank1';
    parentPort.postMessage('SESSION FINISHED after ' + liveSession.round + ' rounds. Winner: ' + dbSession.winner);

    await dbSession.save();
    await db.disconnect();
});