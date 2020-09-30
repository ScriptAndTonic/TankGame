const Map = require('../models/Map');
const Tank = require('../models/Tank');
const tankAI = require('../AI/tank_AI.js');

const startSession = async(sessionInfo, tank1StartingPosition, tank2StartingPosition) => {
    let tank1Info = await Tank.findOne({ name: sessionInfo.tank1 });
    let tank2Info = await Tank.findOne({ name: sessionInfo.tank2 });

    let liveSession = {
        tank1Position: tank1StartingPosition,
        tank2Position: tank2StartingPosition,
        tank1Health: tank1Info.maxHealth,
        tank2Health: tank2Info.maxHealth,
        map: await Map.findOne({ name: sessionInfo.map }),
        round: 0,
        status: 'running'
    };

    while (liveSession.status === 'running') {
        console.log('-------- Round: ' + liveSession.round + ' --------');
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
    sessionInfo.status = 'finished';
    sessionInfo.winner = liveSession.tank1Health <= 0 ? 'Tank2' : 'Tank1';

    console.log('SESSION FINISHED after ' + liveSession.round + ' rounds. Winner: ' + sessionInfo.winner);
    return await sessionInfo.save();
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