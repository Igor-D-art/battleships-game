import { controller } from "./controller";

export const view = (() => {

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
                    
                    if (i === 2 && players!==undefined) {
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

        const rotate = document.getElementById('ok');
        rotate.addEventListener('click', () => {
            console.log('hi there!')
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

                cell.addEventListener('mouseover', () => {
                    _placeShips(cell, j, k);
                })


                // cell.addEventListener('mouseover', () => {
                //     cell.classList.add('shipspot');
                //     if (cell.nextElementSibling && cell.nextElementSibling.id === (`${j}` + (k + 1))) {
                //         console.log(cell.nextElementSibling.id)
                //         cell.nextElementSibling.classList.add('shipspot');
                //     }
                // })

                // cell.addEventListener('mouseleave', () => {
                //     cell.classList.remove('shipspot');
                //     if (cell.nextElementSibling && cell.nextElementSibling.id === (`${j}` + (k + 1))) {
                    
                //        cell.nextElementSibling.classList.remove('shipspot');
                //     }
                // })

                // cell.addEventListener('click', () => {
                    
                //     if (cell.nextElementSibling && cell.nextElementSibling.id === (`${j}` + (k + 1))) {
                //         cell.classList.add('ship');
                //         cell.nextElementSibling.classList.add('ship');
                //     }
                // })

                // cell.addEventListener('mouseover', () => {
                //     const nextPart = document.getElementById(`${j + 1}${k}`);
                //     cell.classList.add('shipspot');
                //     if (nextPart.id !== `11${k}`) {
                //         nextPart.classList.add('shipspot');
                //     }
                    
                // })

                // cell.addEventListener('mouseleave', () => {
                //     const nextPart = document.getElementById(`${j + 1}${k}`);
                //     cell.classList.remove('shipspot');
                //     nextPart.classList.remove('shipspot');
                // })

                // cell.addEventListener('click', () => {
                //     const nextPart = document.getElementById(`${j + 1}${k}`);
                    
                //     if (nextPart.id !== `11${k}`) {
                //         cell.classList.add('ship');
                //         nextPart.classList.add('ship');
                //     }
                // })

                initBoard.appendChild(cell);
            };
        };
    };

    const _placeShips = (cell, row, col) => {
        const forbidHor = ['11', '21', '31', '41', '51', '61', '71', '81', '91', '101']; 

        const forbidVert = [];

        _placeCarrier(cell, forbidHor, forbidVert, row, col);

    };

    const _placeCarrier = (cell, forbidHor, forbidVert, row, col) => {

        let placed = false;

        // const part2 = cell.nextElementSibling;

        const part1 = cell;
        const part2 = document.getElementById(`${row}${col + 1}`);
        const part3 = document.getElementById(`${row}${col + 2}`);
        const part4 = document.getElementById(`${row}${col + 3}`);

        const carrier = [part1, part2, part3, part4];

        carrier.forEach(part => {
            if (part !== null && part.id !== `${row}${11}` && part.id !== `${row}${12}` && part.id !== `${row}${13}`) {
                part.classList.add('shipspot');
            }

           

            part1.addEventListener('mouseleave', () => {
                part1.classList.remove('shipspot');
                if (part4 !== null || (part4!==null && part3!==null) || (part4!==null && part3!==null && part2!== null)) {
                    part2.classList.remove('shipspot');
                    part3.classList.remove('shipspot');
                    part4.classList.remove('shipspot');
                }
               
            });
        })


        // part1.classList.add('shipspot');

        // if (part2 !== null || part3 !==null || part4!==null) {
            
        //     part2.classList.add('shipspot');
        //     part3.classList.add('shipspot');
        //     part4.classList.add('shipspot'); 
        // }
        


        

    };

    const removePlaceShipPopup = () => {
        const placeShipsPopup = document.getElementById('placeShips');
        placeShipsPopup.style.display = 'none';
    };


    return {removePlaceShipPopup, displayBoards, displayHit, displayShips, displayMiss, displaySurLocations, displayStartNew, placeShipsPopup}
})()