const Map = require('../models/Map');
const { Worker } = require('worker_threads');

const startSession = async(sessionInfo, tank1StartingPosition, tank2StartingPosition) => {
    let liveSession = {
        tank1: sessionInfo.tank1,
        tank2: sessionInfo.tank2,
        tank1Position: tank1StartingPosition,
        tank2Position: tank2StartingPosition,
        map: await Map.findOne({ name: sessionInfo.map }),
        sessionID: sessionInfo.id
    };

    const worker = new Worker('./live/session_worker.js');
    worker.on('message', message => console.log("Worker: " + message));
    worker.on('error', err => console.log('Worker threw an error: ' + err.message));
    worker.postMessage(JSON.stringify(liveSession));
}

module.exports.startSession = startSession;