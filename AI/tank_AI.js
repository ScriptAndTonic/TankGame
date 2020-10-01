const takeTurn = (tankInfo, liveSession, tankNumber) => {
    let updatedSession = liveSession;
    const distanceToOpponent = calculateDistance(liveSession.tank1Position, liveSession.tank2Position);
    if (tankInfo.range >= distanceToOpponent) {
        if (tankNumber == 1) {
            console.log('TANK1 FIRE');
            updatedSession.tank2Health = updatedSession.tank2Health - tankInfo.damage;
            console.log('Opponent health: ' + liveSession.tank2Health);
        } else {
            console.log('TANK2 FIRE');
            updatedSession.tank1Health = updatedSession.tank1Health - tankInfo.damage;
            console.log('Opponent health: ' + liveSession.tank1Health);
        }
    } else {
        if (tankNumber == 1) {
            console.log('TANK1 MOVE');
            let tank1NewPosition = moveTowardsPoint(liveSession.tank1Position, liveSession.tank2Position, tankInfo.speed);
            updatedSession.tank1Position = tank1NewPosition;
            console.log('New position: ' + tank1NewPosition.row + ', ' + tank1NewPosition.column);
        } else {
            console.log('TANK2 MOVE');
            let tank2NewPosition = moveTowardsPoint(liveSession.tank2Position, liveSession.tank1Position, tankInfo.speed);
            updatedSession.tank2Position = tank2NewPosition;
            console.log('New position: ' + tank2NewPosition.row + ', ' + tank2NewPosition.column);
        }
    }
    return updatedSession;
}

function calculateDistance(a, b) {
    return Math.sqrt(Math.pow(a.row - b.row, 2) + Math.pow(a.column - b.column, 2));
}

function moveTowardsPoint(position, point, speed) {
    if (Math.sqrt(Math.pow(position.row - point.row, 2)) >= Math.sqrt(Math.pow(position.column - point.column, 2))) {
        if (position.row > point.row) {
            return { row: position.row - speed, column: position.column };
        } else {
            return { row: position.row + speed, column: position.column };
        }
    } else {
        if (position.column > point.column) {
            return { row: position.row, column: position.column - speed };
        } else {
            return { row: position.row, column: position.column + speed };
        }
    }
}

module.exports.takeTurn = takeTurn;