import { controller } from "./controller";
import { model } from "./model";

export const view = (() => {

    const displayBoards = () => {
        
        for (let i = 1; i < 3; i++){
            const board = document.getElementById('p' + i + 'b');
            for (let j = 1; j < 11; j++) {
                for (let k = 1; k < 11; k++) {
                    const cell = document.createElement('div');
                    cell.setAttribute('id', i + `${j}` + k);
                    // console.log(typeof (cell.id))
                    // console.log(cell.id)
                    cell.setAttribute('class', 'cell');
                    board.appendChild(cell);

                    if (i === 2) {
                        controller.addListeners(cell);
                    };
                }

            };
        };
    };
    
    const displayHit = (cellID) => {
        const cell = document.getElementById(cellID);
        // console.log(typeof(cellID));
        // console.log(cellID);
        console.log(cell);
        // cell.classList.remove('ship');
        // cell.classList.add('hit');
    };

    const displayMiss = (cellID) => {
        const cell = document.getElementById(cellID);
        // cell.classList.remove('ship');
        // cell.classList.add('miss');
    };

    const displayShips = (ships) => {
        for (let i = 0; i < ships.length; i++) {
            if (ships[i] !== "") {
            const cell = document.getElementById(`${ships[i]}`);
            cell.classList.add('ship');
            }
         
        };

    };

    return {displayBoards, displayHit, displayShips, displayMiss}
})()