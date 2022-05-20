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

    // const board = document.getElementById('board');

    const placeShipsPopup = (players) => {
        console.log(players[0].board.ships);
        console.log(players[1].board.ships);
        const board = document.getElementById('board');
        displayBoards(players);
        _clearShipPlacer();
        // _renderBoard(board);
        // _fleetSetuper();
        const placeShipsPopup = document.getElementById('placeShips');
        placeShipsPopup.style.display = 'flex';
        

        const ok = document.getElementById('ok');
        ok.addEventListener('click', () => {  
            if (shipPlacer.coords.length === 10) {
                // console.log(shipPlacer.coords)
                const coords = controller.parseCoords(shipPlacer.coords);
                controller.passCoords(coords, players);
                controller.startPlaced(players);
            }
        });

        const reset = document.getElementById('reset');
        reset.addEventListener('click', () => {
            _clearShipPlacer();
            _renderBoard(board);
            _fleetSetuper();
        });

        const random = document.getElementById('random');
        random.addEventListener('click', () => {
            controller.startRandom(players);
        });

        const rotate = document.getElementById('rotate');
        rotate.addEventListener('click', () => {
            if (shipPlacer.vertical) {
                shipPlacer.vertical = false;
                console.log(shipPlacer.vertical);
                _renderBoard(board);
                _fleetSetuper();
            } else {
                shipPlacer.vertical = true;
                console.log(shipPlacer.vertical);
                _renderBoard(board);
                _fleetSetuper();
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
                initBoard.appendChild(cell);

                for (let i = 0; i < shipPlacer.coords.length; i++) {
                    if (shipPlacer.coords[i].indexOf(cell.id) >= 0) {
                        cell.classList.add('ship');
                    }
                };
                
            };
        };
    };

    const _fleetSetuper = () => {
       console.log(shipPlacer);
       console.log(shipPlacer.vertical);
        for (let j = 1; j < 11; j++) {
            for (let k = 1; k < 11; k++) {
                const cell = document.getElementById(`${j}${k}`);

                if (shipPlacer.carrierCounter < 1) {
                    _placeCarrier(cell, j, k);
                } else if (shipPlacer.cruiserCounter<2) {
                    _placeCruiser(cell, j, k);
                } else if (shipPlacer.destroyerCounter<3) {
                    _placeDestroyer(cell, j, k);
                } else if (shipPlacer.gunboatCounter < 4) {
                    _placeGunboat(cell, j, k)
                } else {
                    return;
                };
        
            };
        };
    };

    const shipPlacer = {
        coords: [],
        vertical: false,
        carrierCounter: 0,
        cruiserCounter: 0,
        destroyerCounter: 0,
        gunboatCounter: 0,
    }

    const _clearShipPlacer = () => {
        shipPlacer.coords = [];
        shipPlacer.vertical = false;
        shipPlacer.carrierCounter = 0;
        shipPlacer.cruiserCounter = 0;
        shipPlacer.destroyerCounter = 0;
        shipPlacer.gunboatCounter = 0;
    }

    const _placeCarrier = (cell, j, k) => {
        console.log(shipPlacer);
        console.log(shipPlacer.vertical);
        let part1, part2, part3, part4;
        part1 = cell;
      
        if (shipPlacer.vertical === false) {
            // console.log(shipPlacer.vertical);
            if (k < 8) {
                part1.addEventListener('mouseover', () => {
                    part2 = part1.nextElementSibling;
                    part3 = part2.nextElementSibling;
                    part4 = part3.nextElementSibling;
                    const carrier = [part1, part2, part3, part4];

                    carrier.forEach(part => {
                        part.classList.add('shipspot');
                    })
                })
                
                part1.addEventListener('mouseleave', () => {
                    const part2 = part1.nextElementSibling;
                    const part3 = part2.nextElementSibling;
                    const part4 = part3.nextElementSibling;
                    const carrier = [part1, part2, part3, part4];

                    carrier.forEach(part => {
                        part.classList.remove('shipspot');
                    })
                })

                part1.addEventListener('click', () => {
                    const part2 = part1.nextElementSibling;
                    const part3 = part2.nextElementSibling;
                    const part4 = part3.nextElementSibling;
                    const carrier = [part1, part2, part3, part4];

                     carrier.forEach(part => {
                        part.classList.add('ship');
                    })
                    
                    shipPlacer.coords.push([`${part1.id}`, `${part2.id}`, `${part3.id}`, `${part4.id}`]);
                    shipPlacer.carrierCounter += 1;
                    // console.log(shipPlacer)
                    _renderBoard(board);
                    _fleetSetuper();
                    return;
                })
            }
        } else if (shipPlacer.vertical === true) {
            // console.log(shipPlacer.vertical);
            if (j < 8) {
                part1.addEventListener('mouseover', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const part3 = document.getElementById(`${j + 2}${k}`);
                    const part4 = document.getElementById(`${j + 3}${k}`);
                    const carrier = [part1, part2, part3, part4];

                    carrier.forEach(part => {
                        part.classList.add('shipspot');
                    })
                })
            
                part1.addEventListener('mouseleave', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const part3 = document.getElementById(`${j + 2}${k}`);
                    const part4 = document.getElementById(`${j + 3}${k}`);
                    const carrier = [part1, part2, part3, part4];

                    carrier.forEach(part => {
                        part.classList.remove('shipspot');
                    })
                })

                part1.addEventListener('click', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const part3 = document.getElementById(`${j + 2}${k}`);
                    const part4 = document.getElementById(`${j + 3}${k}`);
                    const carrier = [part1, part2, part3, part4];

                    carrier.forEach(part => {
                        part.classList.add('ship');
                    })

                    shipPlacer.coords.push([`${part1.id}`, `${part2.id}`, `${part3.id}`, `${part4.id}`]);
                    // console.log(shipPlacer);
                    shipPlacer.carrierCounter += 1;
                    _renderBoard(board);
                    _fleetSetuper();
                    return;
                })
            }
        }
    };

    const _placeCruiser = (cell, j, k) => {
       let part1, part2, part3;
        part1 = cell;
        if (shipPlacer.vertical === false) {
            if (k < 9) {
                part1.addEventListener('mouseover', () => {
                    part2 = part1.nextElementSibling;
                    part3 = part2.nextElementSibling;
                    const carrier = [part1, part2, part3];

                    carrier.forEach(part => {
                        part.classList.add('shipspot');
                    })
                })
                
                part1.addEventListener('mouseleave', () => {
                    const part2 = part1.nextElementSibling;
                    const part3 = part2.nextElementSibling;
                    const carrier = [part1, part2, part3];

                    carrier.forEach(part => {
                        part.classList.remove('shipspot');
                    })
                })

                part1.addEventListener('click', () => {
                    const part2 = part1.nextElementSibling;
                    const part3 = part2.nextElementSibling;
                    const carrier = [part1, part2, part3];

                     carrier.forEach(part => {
                        part.classList.add('ships');
                    })
                    
                    shipPlacer.coords.push([`${part1.id}`, `${part2.id}`, `${part3.id}`]);
                    // console.log(shipPlacer.coords);
                    shipPlacer.cruiserCounter+=1;
                    _renderBoard(board);
                    _fleetSetuper();
                    return;
                })
            }
        } else if (shipPlacer.vertical === true) {
            if (j < 9) {
                part1.addEventListener('mouseover', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const part3 = document.getElementById(`${j + 2}${k}`);
                    const carrier = [part1, part2, part3];

                    carrier.forEach(part => {
                        part.classList.add('shipspot');
                    })
                })
            
                part1.addEventListener('mouseleave', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const part3 = document.getElementById(`${j + 2}${k}`);
                    const carrier = [part1, part2, part3];

                    carrier.forEach(part => {
                        part.classList.remove('shipspot');
                    })
                })

                part1.addEventListener('click', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const part3 = document.getElementById(`${j + 2}${k}`);
                    const carrier = [part1, part2, part3];

                    carrier.forEach(part => {
                        part.classList.add('ship');
                    })

                    shipPlacer.coords.push([`${part1.id}`, `${part2.id}`, `${part3.id}`]);
                    // console.log(shipPlacer.coords);
                    shipPlacer.cruiserCounter+=1;
                    _renderBoard(board);
                    _fleetSetuper();
                    return;
                })
            }
        }
    }

     const _placeDestroyer = (cell, j, k) => {
       let part1, part2;
        part1 = cell;
        if (shipPlacer.vertical === false) {
            if (k < 10) {
                part1.addEventListener('mouseover', () => {
                    part2 = part1.nextElementSibling;
                    const carrier = [part1, part2];

                    carrier.forEach(part => {
                        part.classList.add('shipspot');
                    })
                })
                
                part1.addEventListener('mouseleave', () => {
                    const part2 = part1.nextElementSibling;
                    const carrier = [part1, part2];

                    carrier.forEach(part => {
                        part.classList.remove('shipspot');
                    })
                })

                part1.addEventListener('click', () => {
                    const part2 = part1.nextElementSibling;
                    const carrier = [part1, part2];

                     carrier.forEach(part => {
                        part.classList.add('ships');
                    })
                    
                    shipPlacer.coords.push([`${part1.id}`, `${part2.id}`]);
                    // console.log(shipPlacer.coords);
                    shipPlacer.destroyerCounter+=1;
                    _renderBoard(board);
                    _fleetSetuper();
                    return;
                })
            }
        } else if (shipPlacer.vertical === true) {
            if (j < 10) {
                part1.addEventListener('mouseover', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const carrier = [part1, part2];

                    carrier.forEach(part => {
                        part.classList.add('shipspot');
                    })
                })
            
                part1.addEventListener('mouseleave', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const carrier = [part1, part2];

                    carrier.forEach(part => {
                        part.classList.remove('shipspot');
                    })
                })

                part1.addEventListener('click', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const carrier = [part1, part2];

                    carrier.forEach(part => {
                        part.classList.add('ship');
                    })

                    shipPlacer.coords.push([`${part1.id}`, `${part2.id}`]);
                    // console.log(shipPlacer.coords);
                    shipPlacer.destroyerCounter+=1;
                    _renderBoard(board);
                    _fleetSetuper();
                    return;
                })
            }
        }
    }
    

    const _placeGunboat = (cell) => {
        const  part1 = cell;
    
        part1.addEventListener('mouseover', () => {
            part1.classList.add('shipspot');
        })
        
        part1.addEventListener('mouseleave', () => {
            part1.classList.remove('shipspot');
        })

        part1.addEventListener('click', () => {
            part1.classList.add('ships');
            shipPlacer.coords.push([`${part1.id}`]);
            // console.log(shipPlacer.coords);
            shipPlacer.gunboatCounter += 1;
            _renderBoard(board);
            _fleetSetuper();
            return;
        })
    }

    const removePlaceShipPopup = () => {
        const placeShipsPopup = document.getElementById('placeShips');
        placeShipsPopup.style.display = 'none';
    };


    return {removePlaceShipPopup, displayBoards, displayHit, displayShips, displayMiss, displaySurLocations, displayStartNew, placeShipsPopup}
})()




 // const shipLocator = (cell) => {
    //     let coords;
    //     if (shipPlacer.carrierCounter < 1) {
    //                 _placeCarrier(cell);
    //             } else if (shipPlacer.cruiserCounter<2) {
    //                 _placeCruiser(cell);
    //             } else if (shipPlacer.destroyerCounter<3) {
    //                 _placeDestroyer(cell);
    //             } else if (shipPlacer.gunboatCounter < 4) {
    //                 _placeGunboat(cell)
    //             } else {
    //                 coords = controller.parseCoords(shipPlacer.coords);
    //                 clearShipPlacer();
    //                 console.log(shipPlacer);
    //             }
        
    //      if (coords!=undefined && coords.length >= 10) {
    //         controller.passCoords(coords);
    //     }
    // }

      // let j;
        // let k;
        // if (cell.id.length === 4) {
        //     j = `${cell.id}`.charAt(0) + `${cell.id}`.charAt(1);
        // } else if (cell.id.length ===3 && cell.id.charAt(1)===0) {
        //     j =`${cell.id}`.charAt(0)
        // }

        // if (cell.id.length === 4) {
        //   k = `${cell.id}`.charAt(1) + `${cell.id}`.charAt(2);
        // } else if (cell.id.length === 3) {
        //   k = `${cell.id}`.charAt(2) + `${cell.id}`.charAt(3);
        // } else {
        //   k = `${cell.id}`.charAt(1);
        // }

        // console.log(j)
        // console.log(k)


        