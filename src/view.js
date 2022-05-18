import { controller } from "./controller";

export const view = (() => {

    let vertical = false;

    const displayBoards = (players) => {
        for (let i = 1; i < 3; i++) {
            const board = document.getElementById('p' + i + 'b');
            while (board.firstChild) {
                board.firstChild.remove()
            };
            for (let j = 1; j < 11; j++) {
                for (let k = 1; k < 11; k++) {
                    const cell = document.createElement('div');
                    cell.setAttribute('id', i + `${j}` + k);
                    cell.setAttribute('class', 'cell');
                    
                    if (i === 2 && players !== undefined) {
                        cell.addEventListener('click', () => {
                            controller.makeMove(cell.id, players);
                        });
                    };
                    board.appendChild(cell);
                };
            };
        };
    };
    
    const displayHit = (cellID) => {
        const cell = document.getElementById(cellID);
        cell.classList.remove('ship');
        cell.classList.remove('miss');
        cell.classList.add('hit');
    };

    const displayMiss = (cellID) => {
        const cell = document.getElementById(cellID);
        cell.classList.remove('ship');
        cell.classList.add('miss');
    };

    const displayShips = (ships) => {
        for (let i = 0; i < ships.length; i++) {
            if (ships[i] !== "") {
                const cell = document.getElementById(`${ships[i]}`);
                cell.classList.add('ship');
            };
        };
    };

    const displaySurLocations = (cells) => {
        for (let i = 0; i < cells.length; i++) {
            const cell = document.getElementById(cells[i]);
            if (cell !== undefined && cell !== null) {
                cell.classList.add('sur');
                cell.classList.add('scale');
                setTimeout(() => { cell.classList.remove('scale') }, 150);
            };
        };
    };

    const displayStartNew = (phraze) => {
        const startNewPopup = document.createElement('div');
        startNewPopup.classList.add('startNew');
        startNewPopup.innerHTML = `
            <p> ${phraze} </p>
            <button id="playAgain"> Play again </button> `;
        const cutrain = document.createElement('div');
        cutrain.classList.add('curtain');
        const main = document.getElementById('main');
        const p2b = document.getElementById('p2b');
        p2b.appendChild(cutrain);
        main.appendChild(startNewPopup);
        const playAgain = document.getElementById('playAgain');
        playAgain.addEventListener('click', () => {
            p2b.removeChild(cutrain);
            main.removeChild(startNewPopup);
            controller.startNew();
        });
    };

    const placeShipsPopup = () => {
        displayBoards();
        const placeShipsPopup = document.getElementById('placeShips');
        placeShipsPopup.style.display = 'flex';
        const board = document.getElementById('board');
        _renderBoard(board);

        const ok = document.getElementById('ok');
        ok.addEventListener('click', () => {
            console.log('hi there!')
        });

        const random = document.getElementById('random');
        random.addEventListener('click', () => {
            controller.startRandom();
        });

        const rotate = document.getElementById('rotate');
        rotate.addEventListener('click', () => {
            if (vertical) {
                vertical = false;
                _renderBoard(board);
            } else {
                vertical = true;
                console.log(vertical);
                _renderBoard(board);
            }
        });
    };

    const _renderBoard = (board) => {
        const initBoard = board;

        while (initBoard.firstChild) {
            initBoard.firstChild.remove()
        };

        for (let j = 1; j < 11; j++) {
            for (let k = 1; k < 11; k++) {
                const cell = document.createElement('div');
                cell.setAttribute('id', `${j}${k}`);
                cell.setAttribute('class', 'container');

                _placeCarrier(cell, j, k);

                initBoard.appendChild(cell);
            };
        };
    };

    const _placeCarrier = (cell, j, k) => {

        const part1 = cell;
        
        if (vertical === false) {
            if (k < 8) {
                part1.addEventListener('mouseover', () => {
                    const part2 = part1.nextElementSibling;
                    const part3 = part2.nextElementSibling;
                    const part4 = part3.nextElementSibling;

                    part1.classList.add('shipspot');
                    part2.classList.add('shipspot');
                    part3.classList.add('shipspot');
                    part4.classList.add('shipspot');
                })
                
                part1.addEventListener('mouseleave', () => {
                    const part2 = part1.nextElementSibling;
                    const part3 = part2.nextElementSibling;
                    const part4 = part3.nextElementSibling;

                    part1.classList.remove('shipspot');
                    part2.classList.remove('shipspot');
                    part3.classList.remove('shipspot');
                    part4.classList.remove('shipspot');
                })

                part1.addEventListener('click', () => {
                    const part2 = part1.nextElementSibling;
                    const part3 = part2.nextElementSibling;
                    const part4 = part3.nextElementSibling;

                    part1.classList.add('ship');
                    part2.classList.add('ship');
                    part3.classList.add('ship');
                    part4.classList.add('ship');
                    console.log(vertical)
                })
            }
        } else if (vertical === true) {
            if (j < 8) {
                part1.addEventListener('mouseover', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const part3 = document.getElementById(`${j + 2}${k}`);
                    const part4 = document.getElementById(`${j + 3}${k}`);

                    part1.classList.add('shipspot');
                    part2.classList.add('shipspot');
                    part3.classList.add('shipspot');
                    part4.classList.add('shipspot');
                })
            
                part1.addEventListener('mouseleave', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const part3 = document.getElementById(`${j + 2}${k}`);
                    const part4 = document.getElementById(`${j + 3}${k}`);

                    part1.classList.remove('shipspot');
                    part2.classList.remove('shipspot');
                    part3.classList.remove('shipspot');
                    part4.classList.remove('shipspot');
                })

                part1.addEventListener('click', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const part3 = document.getElementById(`${j + 2}${k}`);
                    const part4 = document.getElementById(`${j + 3}${k}`);

                    part1.classList.add('ship');
                    part2.classList.add('ship');
                    part3.classList.add('ship');
                    part4.classList.add('ship');

                    return;
                })
            }
        }
    };

    const removePlaceShipPopup = () => {
        const placeShipsPopup = document.getElementById('placeShips');
        placeShipsPopup.style.display = 'none';
    };


    return {removePlaceShipPopup, displayBoards, displayHit, displayShips, displayMiss, displaySurLocations, displayStartNew, placeShipsPopup}
})()