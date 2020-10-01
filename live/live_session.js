const Map = require('../models/Map');
const Tank = require('../models/Tank');
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

const renderSession = (map, tank1Position, tank2Position) => {
    let mapMatrix = [];

    for (let i = 0; i < 50; i++) {
        mapMatrix.push([]);
        for (let j = 0; j < 50; j++) {
            mapMatrix[i].push('___');
        }
    }

    mapMatrix[tank1Position.row][tank1Position.column] = '_1_';
    mapMatrix[tank2Position.row][tank2Position.column] = '_2_';

    map.obstacles.forEach(obstacle => {
        mapMatrix[obstacle.row][obstacle.column] = '_X_';
    });

    let render = '<h3 style="font-size: 10px;" font-family="Courier New", Courier, monospace">';

    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
            render += mapMatrix[i][j];
        }
        render += '<br>';
    }

    render += '</h3>';

    return render;
}

module.exports.startSession = startSession;
module.exports.renderSession = renderSession;