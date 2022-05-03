import { model } from "./model";
import { view } from "./view";
import { players } from "./index";

export const controller = (() => {

    let moveCounter = 2;
    
    const _randomMoveGen = () => {
        const randomMove = 1 + `${Math.floor(Math.random() * (10))}` + `${Math.floor(Math.random() * (10))}`;
        return randomMove;
    };

    const gameLoop = (cell, players) => {
        // console.log(moveCounter);
        // console.log(players);
        // if (moveCounter % 2 === 0) {
        //     console.log('Im here' + moveCounter);
        //     players[0].board.receiveAttack(randomMove);
        //     moveCounter += 1;
        // } else {
        //     players[1].board.receiveAttack(cell);
        //     moveCounter += 1;
        // }; console.log(moveCounter);

        players[1].board.receiveAttack(cell);
      
        console.log('Im here' + moveCounter);

        players[0].board.receiveAttack(_randomMoveGen());
        moveCounter += 1;

    };

    
    
    

    return { moveCounter, gameLoop};

})();
