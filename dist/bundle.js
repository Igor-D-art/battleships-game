/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "controller": () => (/* binding */ controller)
/* harmony export */ });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./src/view.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/index.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model */ "./src/model.js");



var controller = function () {
  var moveCounter = 0;

  var _randomMoveGen = function _randomMoveGen(player) {
    var randomMove = 1 + "".concat(Math.ceil(Math.random() * 10)) + "".concat(Math.ceil(Math.random() * 10));

    if (player.board.illegalMoves.indexOf(randomMove) === -1) {
      return randomMove;
    } else {
      return _randomMoveGen(player);
    }

    ;
  };

  var makeMove = function makeMove(cell, players) {
    if (players[1].board.illegalMoves.indexOf(cell) === -1) {
      players[1].board.receiveAttack(cell, players[1]);
      players[0].board.receiveAttack(_randomMoveGen(players[0]), players[0]);
      moveCounter += 1;
      checkWinner(players);
    }

    ;
  };

  var checkWinner = function checkWinner(players) {
    if (players[0].board.shipsSunk().length === 10) {
      players[1].isWinner = true;
      _view__WEBPACK_IMPORTED_MODULE_0__.view.displayStartNew("Stupid computer wins!");
    } else if (players[1].board.shipsSunk().length === 10) {
      players[0].isWinner = true;
      _view__WEBPACK_IMPORTED_MODULE_0__.view.displayStartNew("You win!");
    }

    ;
  };

  var startNew = function startNew() {
    var players = _model__WEBPACK_IMPORTED_MODULE_2__.model.initPlayers();
    (0,_index__WEBPACK_IMPORTED_MODULE_1__.initPopup)();
  };

  var startRandom = function startRandom() {
    var players = _model__WEBPACK_IMPORTED_MODULE_2__.model.initPlayers();
    players[0].board.randomLocations();
    players[1].board.randomLocations();
    _view__WEBPACK_IMPORTED_MODULE_0__.view.removePlaceShipPopup();
    _view__WEBPACK_IMPORTED_MODULE_0__.view.displayBoards(players);
    _view__WEBPACK_IMPORTED_MODULE_0__.view.displayShips(players[0].getFleet());
  };

  var parseCoords = function parseCoords(coords) {
    var parsedCoords = [];

    for (var i = 0; i < coords.length; i++) {
      parsedCoords.push([]);

      for (var j = 0; j < coords[i].length; j++) {
        var shipCoords = "1".concat(coords[i][j]);
        parsedCoords[i].push(shipCoords);
      }
    }

    return parsedCoords;
  };

  var passCoords = function passCoords(coords) {
    var players = _model__WEBPACK_IMPORTED_MODULE_2__.model.initPlayers();

    for (var i = 0; i < coords.length; i++) {
      players[0].board.ships[i].locations = coords[i];
    }

    _startPlaced(players);
  };

  var _startPlaced = function _startPlaced(players) {
    players[1].board.randomLocations();
    _view__WEBPACK_IMPORTED_MODULE_0__.view.removePlaceShipPopup();
    _view__WEBPACK_IMPORTED_MODULE_0__.view.displayBoards(players);
    _view__WEBPACK_IMPORTED_MODULE_0__.view.displayShips(players[0].getFleet());
  };

  return {
    moveCounter: moveCounter,
    makeMove: makeMove,
    checkWinner: checkWinner,
    startNew: startNew,
    startRandom: startRandom,
    parseCoords: parseCoords,
    passCoords: passCoords
  };
}();

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initPopup": () => (/* binding */ initPopup)
/* harmony export */ });
/* harmony import */ var _src_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/style.css */ "./src/style.css");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");


function initPopup() {
  _view__WEBPACK_IMPORTED_MODULE_1__.view.placeShipsPopup();
}
;
initPopup();

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "model": () => (/* binding */ model)
/* harmony export */ });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./src/view.js");
function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }


var model = function () {
  var shipFactory = function shipFactory(length) {
    var shipLength = length;
    var direction = Math.ceil(Math.random() * 2);
    var startLocation;
    var locations = [];
    var surLocations = [];
    var forbLocations = [];
    var hits = [];
    var isSunk = false;

    var setCoord = function setCoord(coords) {
      coords, _readOnlyError("locations");
    };

    var gettingHit = function gettingHit(location) {
      hits[location] = 'hit';
    };

    var gettingSunk = function gettingSunk(ship) {
      if (ship.hits.indexOf('') === -1) {
        ship.isSunk = true;
        _view__WEBPACK_IMPORTED_MODULE_0__.view.displaySurLocations(ship.surLocations);
      }

      ;
      return ship.isSunk;
    };

    return {
      setCoord: setCoord,
      locations: locations,
      hits: hits,
      isSunk: isSunk,
      gettingSunk: gettingSunk,
      direction: direction,
      gettingHit: gettingHit,
      shipLength: shipLength,
      surLocations: surLocations,
      forbLocations: forbLocations,
      startLocation: startLocation
    };
  };

  var boardFactory = function boardFactory(id) {
    var boardId = id;
    var boardSize = 10;
    var ships = [shipFactory(4), shipFactory(3), shipFactory(3), shipFactory(2), shipFactory(2), shipFactory(2), shipFactory(1), shipFactory(1), shipFactory(1), shipFactory(1)];

    var shipsSunk = function shipsSunk() {
      var shipsSunk = [];

      for (var i = 0; i < ships.length; i++) {
        if (ships[i].isSunk === true) {
          shipsSunk.push(ships[i]);
        }

        ;
      }

      ;
      return shipsSunk;
    };

    var illegalMoves = [];

    var randomLocations = function randomLocations() {
      var shipLocations;
      var surLocations;
      var forbLocations;

      for (var i = 0; i < ships.length; i++) {
        if (ships[i].startLocation === undefined) {
          do {
            var shipSpot = generateLocations(ships[i]);
            shipLocations = shipSpot[0];
            surLocations = shipSpot[1];
            forbLocations = shipLocations.concat(surLocations);
          } while (checkCollision(shipLocations));

          ships[i].locations = shipLocations;
          ships[i].surLocations = surLocations;
          ships[i].forbLocations = forbLocations;
        } else {
          customLocations();
        }

        for (var j = 0; j < ships[i].shipLength; j++) {
          ships[i].hits.push('');
        }
      }

      ;
    };

    var generateLocations = function generateLocations(ship) {
      var col;
      var row;
      var newLocations = [];
      var surLocations = [];

      if (ship.direction === 1) {
        row = Math.ceil(Math.random() * boardSize);
        col = Math.ceil(Math.random() * (boardSize - (ship.shipLength + 1)));
      } else {
        row = Math.ceil(Math.random() * (boardSize - (ship.shipLength + 1)));
        col = Math.ceil(Math.random() * boardSize);
      }

      ;

      for (var i = 0; i < ship.shipLength; i++) {
        if (ship.direction === 1) {
          newLocations.push(boardId + "".concat(row) + (col + i));
        } else {
          newLocations.push(boardId + "".concat(row + i) + "".concat(col));
        }

        ;
      }

      ;

      if (ship.direction === 1) {
        for (var _i = 0; _i < ship.shipLength; _i++) {
          surLocations.push(boardId + "".concat(row + 1) + (col + _i));
          surLocations.push(boardId + "".concat(row - 1) + (col + _i));
        }

        ;
        surLocations.push(boardId + "".concat(row - 1) + (col - 1));
        surLocations.push(boardId + "".concat(row) + (col - 1));
        surLocations.push(boardId + "".concat(row + 1) + (col - 1));
        surLocations.push(boardId + "".concat(row - 1) + (col + ship.shipLength));
        surLocations.push(boardId + "".concat(row) + (col + ship.shipLength));
        surLocations.push(boardId + "".concat(row + 1) + (col + ship.shipLength));
      } else {
        for (var _i2 = 0; _i2 < ship.shipLength; _i2++) {
          surLocations.push(boardId + "".concat(row + _i2) + (col + 1));
          surLocations.push(boardId + "".concat(row + _i2) + (col - 1));
        }

        ;
        surLocations.push(boardId + "".concat(row - 1) + (col - 1));
        surLocations.push(boardId + "".concat(row - 1) + col);
        surLocations.push(boardId + "".concat(row - 1) + (col + 1));
        surLocations.push(boardId + "".concat(row + ship.shipLength) + (col - 1));
        surLocations.push(boardId + "".concat(row + ship.shipLength) + col);
        surLocations.push(boardId + "".concat(row + ship.shipLength) + (col + 1));
      }

      ;
      return [newLocations, surLocations];
    };

    var checkCollision = function checkCollision(locations) {
      for (var i = 0; i < ships.length; i++) {
        for (var j = 0; j < locations.length; j++) {
          if (ships[i].forbLocations.indexOf(locations[j]) >= 0) {
            return true;
          }

          ;
        }

        ;
        console.log("no collisions on ship ".concat(ships[i]));
      }

      ;
      return false;
    };

    var customLocations = function customLocations() {// code goes here if needed
    };

    var receiveAttack = function receiveAttack(cell, player) {
      player.board.illegalMoves.push(cell);
      console.log(player.board.illegalMoves);

      for (var i = 0; i < ships.length; i++) {
        if (ships[i].locations.indexOf(cell) >= 0) {
          _view__WEBPACK_IMPORTED_MODULE_0__.view.displayHit(cell);
          ships[i].gettingHit(ships[i].locations.indexOf(cell));
          ships[i].gettingSunk(ships[i]);

          if (ships[i].gettingSunk(ships[i])) {
            player.board.illegalMoves = player.board.illegalMoves.concat(ships[i].surLocations);
          }

          ;
          break;
        } else if (ships[i].locations.indexOf(cell) === -1) {
          _view__WEBPACK_IMPORTED_MODULE_0__.view.displayMiss(cell);
        }

        ;
      }

      ;
    };

    return {
      ships: ships,
      illegalMoves: illegalMoves,
      receiveAttack: receiveAttack,
      shipsSunk: shipsSunk,
      randomLocations: randomLocations
    };
  };

  var player = function player(id) {
    var playerId = id;
    var board = boardFactory(playerId);

    var getFleet = function getFleet() {
      var fleetCoords = [];

      for (var i = 0; i < board.ships.length; i++) {
        for (var j = 0; j < board.ships[i].locations.length; j++) {
          fleetCoords.push(board.ships[i].locations[j]);
        }

        ;
      }

      ;
      return fleetCoords;
    };

    var isWinner = false;
    return {
      playerId: playerId,
      board: board,
      getFleet: getFleet,
      isWinner: isWinner
    };
  };

  function initPlayers() {
    var player1 = player(1);
    var player2 = player(2);
    return [player1, player2];
  }

  ;
  return {
    initPlayers: initPlayers
  };
}();

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "view": () => (/* binding */ view)
/* harmony export */ });
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./src/controller.js");

var view = function () {
  var displayBoards = function displayBoards(players) {
    for (var i = 1; i < 3; i++) {
      var _board = document.getElementById('p' + i + 'b');

      while (_board.firstChild) {
        _board.firstChild.remove();
      }

      ;

      for (var j = 1; j < 11; j++) {
        var _loop = function _loop(k) {
          var cell = document.createElement('div');
          cell.setAttribute('id', i + "".concat(j) + k);
          cell.setAttribute('class', 'cell');

          if (i === 2 && players !== undefined) {
            cell.addEventListener('click', function () {
              _controller__WEBPACK_IMPORTED_MODULE_0__.controller.makeMove(cell.id, players);
            });
          }

          ;

          _board.appendChild(cell);
        };

        for (var k = 1; k < 11; k++) {
          _loop(k);
        }

        ;
      }

      ;
    }

    ;
  };

  var displayHit = function displayHit(cellID) {
    var cell = document.getElementById(cellID);
    cell.classList.remove('ship');
    cell.classList.remove('miss');
    cell.classList.add('hit');
  };

  var displayMiss = function displayMiss(cellID) {
    var cell = document.getElementById(cellID);
    cell.classList.remove('ship');
    cell.classList.add('miss');
  };

  var displayShips = function displayShips(ships) {
    for (var i = 0; i < ships.length; i++) {
      if (ships[i] !== "") {
        var cell = document.getElementById("".concat(ships[i]));
        cell.classList.add('ship');
      }

      ;
    }

    ;
  };

  var displaySurLocations = function displaySurLocations(cells) {
    var _loop2 = function _loop2(i) {
      var cell = document.getElementById(cells[i]);

      if (cell !== undefined && cell !== null) {
        cell.classList.add('sur');
        cell.classList.add('scale');
        setTimeout(function () {
          cell.classList.remove('scale');
        }, 150);
      }

      ;
    };

    for (var i = 0; i < cells.length; i++) {
      _loop2(i);
    }

    ;
  };

  var displayStartNew = function displayStartNew(phraze) {
    var startNewPopup = document.createElement('div');
    startNewPopup.classList.add('startNew');
    startNewPopup.innerHTML = "\n            <p> ".concat(phraze, " </p>\n            <button id=\"playAgain\"> Play again </button> ");
    var cutrain = document.createElement('div');
    cutrain.classList.add('curtain');
    var main = document.getElementById('main');
    var p2b = document.getElementById('p2b');
    p2b.appendChild(cutrain);
    main.appendChild(startNewPopup);
    var playAgain = document.getElementById('playAgain');
    playAgain.addEventListener('click', function () {
      p2b.removeChild(cutrain);
      main.removeChild(startNewPopup);
      _controller__WEBPACK_IMPORTED_MODULE_0__.controller.startNew();
    });
  };

  var board = document.getElementById('board');

  var placeShipsPopup = function placeShipsPopup() {
    displayBoards();
    var placeShipsPopup = document.getElementById('placeShips');
    placeShipsPopup.style.display = 'flex'; // const board = document.getElementById('board');

    _renderBoard(board);

    var ok = document.getElementById('ok');
    ok.addEventListener('click', function () {
      console.log('hi there!');
    });
    var random = document.getElementById('random');
    random.addEventListener('click', function () {
      _controller__WEBPACK_IMPORTED_MODULE_0__.controller.startRandom();
    });
    var rotate = document.getElementById('rotate');
    rotate.addEventListener('click', function () {
      if (shipPlacer.vertical) {
        shipPlacer.vertical = false;
        console.log(shipPlacer.vertical);

        _renderBoard(board);
      } else {
        shipPlacer.vertical = true;
        console.log(shipPlacer.vertical);

        _renderBoard(board);
      }
    });
  };

  var _renderBoard = function _renderBoard(board) {
    var initBoard = board;
    var coords;

    while (initBoard.firstChild) {
      initBoard.firstChild.remove();
    }

    ;

    for (var j = 1; j < 11; j++) {
      for (var k = 1; k < 11; k++) {
        var cell = document.createElement('div');
        cell.setAttribute('id', "".concat(j).concat(k));
        cell.setAttribute('class', 'container');

        if (shipPlacer.carrierCounter < 1) {
          _placeCarrier(cell, j, k);
        } else if (shipPlacer.cruiserCounter < 2) {
          _placeCruiser(cell, j, k);
        } else if (shipPlacer.destroyerCounter < 3) {
          _placeDestroyer(cell, j, k);
        } else if (shipPlacer.gunboatCounter < 4) {
          _placeGunboat(cell, j, k);
        } else {
          coords = _controller__WEBPACK_IMPORTED_MODULE_0__.controller.parseCoords(shipPlacer.coords);
        }

        initBoard.appendChild(cell);

        for (var i = 0; i < shipPlacer.coords.length; i++) {
          if (shipPlacer.coords[i].indexOf(cell.id) >= 0) {
            cell.classList.add('ship');
          }
        }

        ;
      }

      ;
    }

    ;

    if (coords != undefined && coords.length >= 10) {
      _controller__WEBPACK_IMPORTED_MODULE_0__.controller.passCoords(coords);
    }
  };

  var shipPlacer = {
    coords: [],
    vertical: false,
    carrierCounter: 0,
    cruiserCounter: 0,
    destroyerCounter: 0,
    gunboatCounter: 0,
    allPlaced: false
  };

  var _placeCarrier = function _placeCarrier(cell, j, k) {
    var part1, part2, part3, part4;
    part1 = cell;

    if (shipPlacer.vertical === false) {
      if (k < 8) {
        part1.addEventListener('mouseover', function () {
          part2 = part1.nextElementSibling;
          part3 = part2.nextElementSibling;
          part4 = part3.nextElementSibling;
          var carrier = [part1, part2, part3, part4];
          carrier.forEach(function (part) {
            part.classList.add('shipspot');
          });
        });
        part1.addEventListener('mouseleave', function () {
          var part2 = part1.nextElementSibling;
          var part3 = part2.nextElementSibling;
          var part4 = part3.nextElementSibling;
          var carrier = [part1, part2, part3, part4];
          carrier.forEach(function (part) {
            part.classList.remove('shipspot');
          });
        });
        part1.addEventListener('click', function () {
          var part2 = part1.nextElementSibling;
          var part3 = part2.nextElementSibling;
          var part4 = part3.nextElementSibling;
          var carrier = [part1, part2, part3, part4];
          carrier.forEach(function (part) {
            part.classList.add('ships');
          });
          shipPlacer.coords.push(["".concat(part1.id), "".concat(part2.id), "".concat(part3.id), "".concat(part4.id)]);
          console.log(shipPlacer.coords);
          shipPlacer.carrierCounter += 1;

          _renderBoard(board);

          return;
        });
      }
    } else if (shipPlacer.vertical === true) {
      if (j < 8) {
        part1.addEventListener('mouseover', function () {
          var part2 = document.getElementById("".concat(j + 1).concat(k));
          var part3 = document.getElementById("".concat(j + 2).concat(k));
          var part4 = document.getElementById("".concat(j + 3).concat(k));
          var carrier = [part1, part2, part3, part4];
          carrier.forEach(function (part) {
            part.classList.add('shipspot');
          });
        });
        part1.addEventListener('mouseleave', function () {
          var part2 = document.getElementById("".concat(j + 1).concat(k));
          var part3 = document.getElementById("".concat(j + 2).concat(k));
          var part4 = document.getElementById("".concat(j + 3).concat(k));
          var carrier = [part1, part2, part3, part4];
          carrier.forEach(function (part) {
            part.classList.remove('shipspot');
          });
        });
        part1.addEventListener('click', function () {
          var part2 = document.getElementById("".concat(j + 1).concat(k));
          var part3 = document.getElementById("".concat(j + 2).concat(k));
          var part4 = document.getElementById("".concat(j + 3).concat(k));
          var carrier = [part1, part2, part3, part4];
          carrier.forEach(function (part) {
            part.classList.add('ship');
          });
          shipPlacer.coords.push(["".concat(part1.id), "".concat(part2.id), "".concat(part3.id), "".concat(part4.id)]);
          console.log(shipPlacer.coords);
          shipPlacer.carrierCounter += 1;

          _renderBoard(board);

          return;
        });
      }
    }
  };

  var _placeCruiser = function _placeCruiser(cell, j, k) {
    var part1, part2, part3;
    part1 = cell;

    if (shipPlacer.vertical === false) {
      if (k < 9) {
        part1.addEventListener('mouseover', function () {
          part2 = part1.nextElementSibling;
          part3 = part2.nextElementSibling;
          var carrier = [part1, part2, part3];
          carrier.forEach(function (part) {
            part.classList.add('shipspot');
          });
        });
        part1.addEventListener('mouseleave', function () {
          var part2 = part1.nextElementSibling;
          var part3 = part2.nextElementSibling;
          var carrier = [part1, part2, part3];
          carrier.forEach(function (part) {
            part.classList.remove('shipspot');
          });
        });
        part1.addEventListener('click', function () {
          var part2 = part1.nextElementSibling;
          var part3 = part2.nextElementSibling;
          var carrier = [part1, part2, part3];
          carrier.forEach(function (part) {
            part.classList.add('ships');
          });
          shipPlacer.coords.push(["".concat(part1.id), "".concat(part2.id), "".concat(part3.id)]);
          console.log(shipPlacer.coords);
          shipPlacer.cruiserCounter += 1;

          _renderBoard(board);

          return;
        });
      }
    } else if (shipPlacer.vertical === true) {
      if (j < 9) {
        part1.addEventListener('mouseover', function () {
          var part2 = document.getElementById("".concat(j + 1).concat(k));
          var part3 = document.getElementById("".concat(j + 2).concat(k));
          var carrier = [part1, part2, part3];
          carrier.forEach(function (part) {
            part.classList.add('shipspot');
          });
        });
        part1.addEventListener('mouseleave', function () {
          var part2 = document.getElementById("".concat(j + 1).concat(k));
          var part3 = document.getElementById("".concat(j + 2).concat(k));
          var carrier = [part1, part2, part3];
          carrier.forEach(function (part) {
            part.classList.remove('shipspot');
          });
        });
        part1.addEventListener('click', function () {
          var part2 = document.getElementById("".concat(j + 1).concat(k));
          var part3 = document.getElementById("".concat(j + 2).concat(k));
          var carrier = [part1, part2, part3];
          carrier.forEach(function (part) {
            part.classList.add('ship');
          });
          shipPlacer.coords.push(["".concat(part1.id), "".concat(part2.id), "".concat(part3.id)]);
          console.log(shipPlacer.coords);
          shipPlacer.cruiserCounter += 1;

          _renderBoard(board);

          return;
        });
      }
    }
  };

  var _placeDestroyer = function _placeDestroyer(cell, j, k) {
    var part1, part2;
    part1 = cell;

    if (shipPlacer.vertical === false) {
      if (k < 10) {
        part1.addEventListener('mouseover', function () {
          part2 = part1.nextElementSibling;
          var carrier = [part1, part2];
          carrier.forEach(function (part) {
            part.classList.add('shipspot');
          });
        });
        part1.addEventListener('mouseleave', function () {
          var part2 = part1.nextElementSibling;
          var carrier = [part1, part2];
          carrier.forEach(function (part) {
            part.classList.remove('shipspot');
          });
        });
        part1.addEventListener('click', function () {
          var part2 = part1.nextElementSibling;
          var carrier = [part1, part2];
          carrier.forEach(function (part) {
            part.classList.add('ships');
          });
          shipPlacer.coords.push(["".concat(part1.id), "".concat(part2.id)]);
          console.log(shipPlacer.coords);
          shipPlacer.destroyerCounter += 1;

          _renderBoard(board);

          return;
        });
      }
    } else if (shipPlacer.vertical === true) {
      if (j < 10) {
        part1.addEventListener('mouseover', function () {
          var part2 = document.getElementById("".concat(j + 1).concat(k));
          var carrier = [part1, part2];
          carrier.forEach(function (part) {
            part.classList.add('shipspot');
          });
        });
        part1.addEventListener('mouseleave', function () {
          var part2 = document.getElementById("".concat(j + 1).concat(k));
          var carrier = [part1, part2];
          carrier.forEach(function (part) {
            part.classList.remove('shipspot');
          });
        });
        part1.addEventListener('click', function () {
          var part2 = document.getElementById("".concat(j + 1).concat(k));
          var carrier = [part1, part2];
          carrier.forEach(function (part) {
            part.classList.add('ship');
          });
          shipPlacer.coords.push(["".concat(part1.id), "".concat(part2.id)]);
          console.log(shipPlacer.coords);
          shipPlacer.destroyerCounter += 1;

          _renderBoard(board);

          return;
        });
      }
    }
  };

  var _placeGunboat = function _placeGunboat(cell) {
    var part1 = cell;
    part1.addEventListener('mouseover', function () {
      part1.classList.add('shipspot');
    });
    part1.addEventListener('mouseleave', function () {
      part1.classList.remove('shipspot');
    });
    part1.addEventListener('click', function () {
      part1.classList.add('ships');
      shipPlacer.coords.push(["".concat(part1.id)]);
      console.log(shipPlacer.coords);
      shipPlacer.gunboatCounter += 1;

      _renderBoard(board);

      return;
    });
  };

  var removePlaceShipPopup = function removePlaceShipPopup() {
    var placeShipsPopup = document.getElementById('placeShips');
    placeShipsPopup.style.display = 'none';
  };

  return {
    removePlaceShipPopup: removePlaceShipPopup,
    displayBoards: displayBoards,
    displayHit: displayHit,
    displayShips: displayShips,
    displayMiss: displayMiss,
    displaySurLocations: displaySurLocations,
    displayStartNew: displayStartNew,
    placeShipsPopup: placeShipsPopup
  };
}();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../src/images/icons8-fire-48.png */ "./src/images/icons8-fire-48.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../src/images/close.png */ "./src/images/close.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n    margin: 0;\n    border: none;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    height: 100vh;\n    width: 100vw;\n}\n\n.main {\n    display: flex;\n    justify-content: space-around;\n    height: min(70vh);\n    align-items: center;\n}\n\n.p1b,\n.p2b, \n.board {\n    height: 500px;\n    width: 500px;\n    border: 1px solid black;\n    background-color: white;\n    display: grid;\n    grid-template-columns: repeat(10, minmax(50px, 1fr));\n    grid-template-rows: repeat(10, minmax(50px, 1fr));\n\n}\n\n.p1b div,\n.p2b div {\n    /* display: flex;\n    justify-content: center;\n    align-items: center; */\n    border: 1px solid black;\n}\n\n.curtain {\n    position: absolute;\n    height: 500px;\n    width: 500px;\n}\n\nfooter,\nheader {\n    display: flex;\n    background-color: rgb(122, 151, 248);\n    height: min(15vh);\n    font-size: 7vh;\n    justify-content: center;\n    align-items: center;\n}\n\nfooter{\n    font-size: large;\n}\n\n.hit {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n    background-color: rgb(245, 169, 169);\n    background-size: 100%;\n}\n\n.ship, .shipGroup>div {\n    background-color: blue;\n}\n\n.miss {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n    background-repeat: no-repeat;\n    background-size: 70%;\n    background-position: center;\n}\n\n.sur{\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n    background-repeat: no-repeat;\n    background-size: 70%;\n    background-position: center;\n}\n\n.scale{\n    background-size: 100%;\n}\n\n.startNew{\n    display: flex;\n    flex-direction: column;\n    height: 150px;\n    width: 200px;\n    background-color: rgb(122, 151, 248);\n    position: absolute;\n    top: 25%;\n    left: 44%;\n    border: 1px solid rgb(0, 0, 0);\n    justify-content: space-around;\n    align-items: center;\n}\n\n.startNew p{\n    font-size: 24px;\n    text-align: center;\n}\n\nbutton {\n    height: 50px;\n    width: 100px;\n    border: 1px solid rgb(0, 0, 0);\n    font-size: 15px;\n}\n\n.placeShips{\n    display: none;\n    flex-direction: column;\n    height: 600px;\n    width: 900px;\n    background-color: rgb(122, 151, 248);\n    position: absolute;\n    border: 2px solid rgb(0, 0, 0);\n    justify-content: space-around;\n    align-items: center;\n}\n\n.placeShips #board>div{\n    border: 1px solid rgb(0, 0, 0);\n}\n\n.boardwrap{\n    display: flex;\n    width: 800px;\n    justify-content: space-between;\n}\n\n.ships{\n    display: flex;\n    flex-direction: column;\n    height: 500px;\n    width: 300px;\n    background-color: white;\n    margin-left: 30px;\n    align-items: flex-end;\n    background-color: rgb(122, 151, 248);\n}\n\n.ships button{\n    margin-top: 20px;\n}\n\n.ships p{\n    font-size: 25px;\n}\n\nbutton:hover {\n    background-color: rgb(17, 0, 255);\n    color: white;\n}\n\n.shipGroup{\n    display: flex;\n    justify-content: space-between;\n    position: relative;\n    width: 95%;\n    align-items: center;\n    margin-top: 20px;\n}\n\n#carrier{\n    grid-template-columns: repeat(4, min(50px));\n}\n\n#battlecruiser{\n    grid-template-columns: repeat(3, min(50px));\n}\n\n#destroyer{\n    grid-template-columns: repeat(2, min(50px));\n}\n\n#gunship{\n    grid-template-columns: repeat(1, min(50px));\n}\n\n#carrier, #battlecruiser, #destroyer, #gunship {\n    display: grid;\n    background-color: white; \n    grid-template-rows: max(48px);\n}\n\n.part{\n    border: 1px solid black;\n    background-color: rgb(17, 0, 255);\n}\n\n.noBorder{\n    border: none;\n}\n\n.shipspot{\n    background-color: blueviolet;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,YAAY;IACZ,UAAU;IACV,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,iBAAiB;IACjB,mBAAmB;AACvB;;AAEA;;;IAGI,aAAa;IACb,YAAY;IACZ,uBAAuB;IACvB,uBAAuB;IACvB,aAAa;IACb,oDAAoD;IACpD,iDAAiD;;AAErD;;AAEA;;IAEI;;0BAEsB;IACtB,uBAAuB;AAC3B;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,YAAY;AAChB;;AAEA;;IAEI,aAAa;IACb,oCAAoC;IACpC,iBAAiB;IACjB,cAAc;IACd,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,yDAAuD;IACvD,oCAAoC;IACpC,qBAAqB;AACzB;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,yDAA8C;IAC9C,4BAA4B;IAC5B,oBAAoB;IACpB,2BAA2B;AAC/B;;AAEA;IACI,yDAA8C;IAC9C,4BAA4B;IAC5B,oBAAoB;IACpB,2BAA2B;AAC/B;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,YAAY;IACZ,oCAAoC;IACpC,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,8BAA8B;IAC9B,6BAA6B;IAC7B,mBAAmB;AACvB;;AAEA;IACI,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,8BAA8B;IAC9B,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,YAAY;IACZ,oCAAoC;IACpC,kBAAkB;IAClB,8BAA8B;IAC9B,6BAA6B;IAC7B,mBAAmB;AACvB;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,aAAa;IACb,YAAY;IACZ,8BAA8B;AAClC;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,YAAY;IACZ,uBAAuB;IACvB,iBAAiB;IACjB,qBAAqB;IACrB,oCAAoC;AACxC;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,iCAAiC;IACjC,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,kBAAkB;IAClB,UAAU;IACV,mBAAmB;IACnB,gBAAgB;AACpB;;AAEA;IACI,2CAA2C;AAC/C;;AAEA;IACI,2CAA2C;AAC/C;;AAEA;IACI,2CAA2C;AAC/C;;AAEA;IACI,2CAA2C;AAC/C;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,6BAA6B;AACjC;;AAEA;IACI,uBAAuB;IACvB,iCAAiC;AACrC;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,4BAA4B;AAChC","sourcesContent":["* {\n    margin: 0;\n    border: none;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    height: 100vh;\n    width: 100vw;\n}\n\n.main {\n    display: flex;\n    justify-content: space-around;\n    height: min(70vh);\n    align-items: center;\n}\n\n.p1b,\n.p2b, \n.board {\n    height: 500px;\n    width: 500px;\n    border: 1px solid black;\n    background-color: white;\n    display: grid;\n    grid-template-columns: repeat(10, minmax(50px, 1fr));\n    grid-template-rows: repeat(10, minmax(50px, 1fr));\n\n}\n\n.p1b div,\n.p2b div {\n    /* display: flex;\n    justify-content: center;\n    align-items: center; */\n    border: 1px solid black;\n}\n\n.curtain {\n    position: absolute;\n    height: 500px;\n    width: 500px;\n}\n\nfooter,\nheader {\n    display: flex;\n    background-color: rgb(122, 151, 248);\n    height: min(15vh);\n    font-size: 7vh;\n    justify-content: center;\n    align-items: center;\n}\n\nfooter{\n    font-size: large;\n}\n\n.hit {\n    background-image: url(../src/images/icons8-fire-48.png);\n    background-color: rgb(245, 169, 169);\n    background-size: 100%;\n}\n\n.ship, .shipGroup>div {\n    background-color: blue;\n}\n\n.miss {\n    background-image: url(../src/images/close.png);\n    background-repeat: no-repeat;\n    background-size: 70%;\n    background-position: center;\n}\n\n.sur{\n    background-image: url(../src/images/close.png);\n    background-repeat: no-repeat;\n    background-size: 70%;\n    background-position: center;\n}\n\n.scale{\n    background-size: 100%;\n}\n\n.startNew{\n    display: flex;\n    flex-direction: column;\n    height: 150px;\n    width: 200px;\n    background-color: rgb(122, 151, 248);\n    position: absolute;\n    top: 25%;\n    left: 44%;\n    border: 1px solid rgb(0, 0, 0);\n    justify-content: space-around;\n    align-items: center;\n}\n\n.startNew p{\n    font-size: 24px;\n    text-align: center;\n}\n\nbutton {\n    height: 50px;\n    width: 100px;\n    border: 1px solid rgb(0, 0, 0);\n    font-size: 15px;\n}\n\n.placeShips{\n    display: none;\n    flex-direction: column;\n    height: 600px;\n    width: 900px;\n    background-color: rgb(122, 151, 248);\n    position: absolute;\n    border: 2px solid rgb(0, 0, 0);\n    justify-content: space-around;\n    align-items: center;\n}\n\n.placeShips #board>div{\n    border: 1px solid rgb(0, 0, 0);\n}\n\n.boardwrap{\n    display: flex;\n    width: 800px;\n    justify-content: space-between;\n}\n\n.ships{\n    display: flex;\n    flex-direction: column;\n    height: 500px;\n    width: 300px;\n    background-color: white;\n    margin-left: 30px;\n    align-items: flex-end;\n    background-color: rgb(122, 151, 248);\n}\n\n.ships button{\n    margin-top: 20px;\n}\n\n.ships p{\n    font-size: 25px;\n}\n\nbutton:hover {\n    background-color: rgb(17, 0, 255);\n    color: white;\n}\n\n.shipGroup{\n    display: flex;\n    justify-content: space-between;\n    position: relative;\n    width: 95%;\n    align-items: center;\n    margin-top: 20px;\n}\n\n#carrier{\n    grid-template-columns: repeat(4, min(50px));\n}\n\n#battlecruiser{\n    grid-template-columns: repeat(3, min(50px));\n}\n\n#destroyer{\n    grid-template-columns: repeat(2, min(50px));\n}\n\n#gunship{\n    grid-template-columns: repeat(1, min(50px));\n}\n\n#carrier, #battlecruiser, #destroyer, #gunship {\n    display: grid;\n    background-color: white; \n    grid-template-rows: max(48px);\n}\n\n.part{\n    border: 1px solid black;\n    background-color: rgb(17, 0, 255);\n}\n\n.noBorder{\n    border: none;\n}\n\n.shipspot{\n    background-color: blueviolet;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/images/close.png":
/*!******************************!*\
  !*** ./src/images/close.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3f1efb87491214c146da.png";

/***/ }),

/***/ "./src/images/icons8-fire-48.png":
/*!***************************************!*\
  !*** ./src/images/icons8-fire-48.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "790566af980138ba22cf.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDZkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NmQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7Ozs7O1VFckJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL3NyYy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL3NyYy9tb2RlbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vc3JjL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2aWV3IH0gZnJvbSBcIi4vdmlld1wiO1xuaW1wb3J0IHsgaW5pdFBvcHVwIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7IG1vZGVsIH0gZnJvbSBcIi4vbW9kZWxcIjtcblxuZXhwb3J0IGNvbnN0IGNvbnRyb2xsZXIgPSAoKCkgPT4ge1xuXG4gICAgbGV0IG1vdmVDb3VudGVyID0gMDtcbiAgICBcbiAgICBjb25zdCBfcmFuZG9tTW92ZUdlbiA9IChwbGF5ZXIpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZG9tTW92ZSA9IDEgKyBgJHtNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqICgxMCkpfWAgKyBgJHtNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqICgxMCkpfWA7XG4gICAgICAgIGlmIChwbGF5ZXIuYm9hcmQuaWxsZWdhbE1vdmVzLmluZGV4T2YocmFuZG9tTW92ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gcmFuZG9tTW92ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gX3JhbmRvbU1vdmVHZW4ocGxheWVyKTtcbiAgICAgICAgfTsgIFxuICAgIH07XG5cbiAgICBjb25zdCBtYWtlTW92ZSA9IChjZWxsLCBwbGF5ZXJzKSA9PiB7XG4gICAgICAgIGlmIChwbGF5ZXJzWzFdLmJvYXJkLmlsbGVnYWxNb3Zlcy5pbmRleE9mKGNlbGwpID09PSAtMSkge1xuICAgICAgICAgICAgcGxheWVyc1sxXS5ib2FyZC5yZWNlaXZlQXR0YWNrKGNlbGwsIHBsYXllcnNbMV0pO1xuICAgICAgICAgICAgcGxheWVyc1swXS5ib2FyZC5yZWNlaXZlQXR0YWNrKF9yYW5kb21Nb3ZlR2VuKHBsYXllcnNbMF0pLCBwbGF5ZXJzWzBdKTtcbiAgICAgICAgICAgIG1vdmVDb3VudGVyICs9IDE7XG4gICAgICAgICAgICBjaGVja1dpbm5lcihwbGF5ZXJzKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2hlY2tXaW5uZXIgPSAocGxheWVycykgPT4ge1xuICAgICAgICBpZiAocGxheWVyc1swXS5ib2FyZC5zaGlwc1N1bmsoKS5sZW5ndGggPT09IDEwKSB7XG4gICAgICAgICAgICBwbGF5ZXJzWzFdLmlzV2lubmVyID0gdHJ1ZTsgXG4gICAgICAgICAgICB2aWV3LmRpc3BsYXlTdGFydE5ldyhgU3R1cGlkIGNvbXB1dGVyIHdpbnMhYCk7XG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVyc1sxXS5ib2FyZC5zaGlwc1N1bmsoKS5sZW5ndGggPT09IDEwKSB7XG4gICAgICAgICAgICBwbGF5ZXJzWzBdLmlzV2lubmVyID0gdHJ1ZTsgXG4gICAgICAgICAgICB2aWV3LmRpc3BsYXlTdGFydE5ldyhgWW91IHdpbiFgKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RhcnROZXcgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBsYXllcnMgPSBtb2RlbC5pbml0UGxheWVycygpO1xuICAgICAgICBpbml0UG9wdXAoKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RhcnRSYW5kb20gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBsYXllcnMgPSBtb2RlbC5pbml0UGxheWVycygpO1xuICAgICAgICBwbGF5ZXJzWzBdLmJvYXJkLnJhbmRvbUxvY2F0aW9ucygpO1xuICAgICAgICBwbGF5ZXJzWzFdLmJvYXJkLnJhbmRvbUxvY2F0aW9ucygpO1xuICAgICAgICB2aWV3LnJlbW92ZVBsYWNlU2hpcFBvcHVwKCk7XG4gICAgICAgIHZpZXcuZGlzcGxheUJvYXJkcyhwbGF5ZXJzKTtcbiAgICAgICAgdmlldy5kaXNwbGF5U2hpcHMocGxheWVyc1swXS5nZXRGbGVldCgpKTtcbiAgICAgICAgXG4gICAgfTtcblxuICAgIGNvbnN0IHBhcnNlQ29vcmRzID0gKGNvb3JkcykgPT4ge1xuICAgICAgICBjb25zdCBwYXJzZWRDb29yZHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhcnNlZENvb3Jkcy5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29vcmRzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hpcENvb3JkcyA9IGAxJHtjb29yZHNbaV1bal19YDtcbiAgICAgICAgICAgICAgICBwYXJzZWRDb29yZHNbaV0ucHVzaChzaGlwQ29vcmRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyc2VkQ29vcmRzO1xuICAgIH07XG5cbiAgICBjb25zdCBwYXNzQ29vcmRzID0gKGNvb3JkcykgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJzID0gbW9kZWwuaW5pdFBsYXllcnMoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgcGxheWVyc1swXS5ib2FyZC5zaGlwc1tpXS5sb2NhdGlvbnMgPSBjb29yZHNbaV07XG4gICAgICAgIH1cbiAgICAgICAgX3N0YXJ0UGxhY2VkKHBsYXllcnMpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBjb25zdCBfc3RhcnRQbGFjZWQgPSAocGxheWVycykgPT4ge1xuICAgICAgICBwbGF5ZXJzWzFdLmJvYXJkLnJhbmRvbUxvY2F0aW9ucygpO1xuICAgICAgICB2aWV3LnJlbW92ZVBsYWNlU2hpcFBvcHVwKCk7XG4gICAgICAgIHZpZXcuZGlzcGxheUJvYXJkcyhwbGF5ZXJzKTtcbiAgICAgICAgdmlldy5kaXNwbGF5U2hpcHMocGxheWVyc1swXS5nZXRGbGVldCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBtb3ZlQ291bnRlciwgbWFrZU1vdmUsIGNoZWNrV2lubmVyLCBzdGFydE5ldywgc3RhcnRSYW5kb20sIHBhcnNlQ29vcmRzLCBwYXNzQ29vcmRzfTtcblxufSkoKTtcbiIsImltcG9ydCAnLi4vc3JjL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyB2aWV3IH0gZnJvbSBcIi4vdmlld1wiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0UG9wdXAoKSB7XG4gICAgdmlldy5wbGFjZVNoaXBzUG9wdXAoKTtcbn07XG5cblxuaW5pdFBvcHVwKCk7IiwiaW1wb3J0IHsgdmlldyB9IGZyb20gXCIuL3ZpZXdcIjtcblxuZXhwb3J0IGNvbnN0IG1vZGVsID0gKCgpID0+IHtcblxuICAgIGNvbnN0IHNoaXBGYWN0b3J5ID0gKGxlbmd0aCkgPT4ge1xuICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgICBsZXQgc3RhcnRMb2NhdGlvbjsgXG4gICAgICAgIGNvbnN0IGxvY2F0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBzdXJMb2NhdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3QgZm9yYkxvY2F0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBoaXRzID0gW107XG4gICAgICAgIGxldCBpc1N1bmsgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBzZXRDb29yZCA9IChjb29yZHMpID0+IHtcbiAgICAgICAgICAgIGxvY2F0aW9ucyA9IGNvb3JkcztcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBnZXR0aW5nSGl0ID0gKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgICAgICBoaXRzW2xvY2F0aW9uXSA9ICdoaXQnO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZ2V0dGluZ1N1bmsgPSAoc2hpcCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNoaXAuaGl0cy5pbmRleE9mKCcnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzaGlwLmlzU3VuayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmlldy5kaXNwbGF5U3VyTG9jYXRpb25zKHNoaXAuc3VyTG9jYXRpb25zKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gc2hpcC5pc1N1bms7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHsgc2V0Q29vcmQgLGxvY2F0aW9ucywgaGl0cywgaXNTdW5rLCBnZXR0aW5nU3VuaywgZGlyZWN0aW9uLCBnZXR0aW5nSGl0LCBzaGlwTGVuZ3RoLCBzdXJMb2NhdGlvbnMsIGZvcmJMb2NhdGlvbnMsIHN0YXJ0TG9jYXRpb259O1xuICAgIH07XG5cbiAgICBjb25zdCBib2FyZEZhY3RvcnkgPSAoaWQpID0+IHtcblxuICAgICAgICBjb25zdCBib2FyZElkID0gaWQ7XG5cbiAgICAgICAgY29uc3QgYm9hcmRTaXplID0gMTA7XG5cbiAgICAgICAgY29uc3Qgc2hpcHMgPSBbc2hpcEZhY3RvcnkoNCksXG4gICAgICAgIHNoaXBGYWN0b3J5KDMpLFxuICAgICAgICBzaGlwRmFjdG9yeSgzKSxcbiAgICAgICAgc2hpcEZhY3RvcnkoMiksXG4gICAgICAgIHNoaXBGYWN0b3J5KDIpLFxuICAgICAgICBzaGlwRmFjdG9yeSgyKSxcbiAgICAgICAgc2hpcEZhY3RvcnkoMSksXG4gICAgICAgIHNoaXBGYWN0b3J5KDEpLFxuICAgICAgICBzaGlwRmFjdG9yeSgxKSxcbiAgICAgICAgc2hpcEZhY3RvcnkoMSldO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2hpcHNTdW5rID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hpcHNTdW5rID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNoaXBzW2ldLmlzU3VuayA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzaGlwc1N1bmsucHVzaChzaGlwc1tpXSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gc2hpcHNTdW5rO1xuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBpbGxlZ2FsTW92ZXMgPSBbXTtcblxuICAgICAgICBjb25zdCByYW5kb21Mb2NhdGlvbnMgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2hpcExvY2F0aW9ucztcbiAgICAgICAgICAgIGxldCBzdXJMb2NhdGlvbnM7XG4gICAgICAgICAgICBsZXQgZm9yYkxvY2F0aW9ucztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2hpcHNbaV0uc3RhcnRMb2NhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoaXBTcG90ID0gZ2VuZXJhdGVMb2NhdGlvbnMoc2hpcHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcExvY2F0aW9ucyA9IHNoaXBTcG90WzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zID0gc2hpcFNwb3RbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JiTG9jYXRpb25zID0gc2hpcExvY2F0aW9ucy5jb25jYXQoc3VyTG9jYXRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfSB3aGlsZSAoY2hlY2tDb2xsaXNpb24oc2hpcExvY2F0aW9ucykpO1xuICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5sb2NhdGlvbnMgPSBzaGlwTG9jYXRpb25zO1xuICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5zdXJMb2NhdGlvbnMgPSBzdXJMb2NhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLmZvcmJMb2NhdGlvbnMgPSBmb3JiTG9jYXRpb25zO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUxvY2F0aW9ucygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNoaXBzW2ldLnNoaXBMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5oaXRzLnB1c2goJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZ2VuZXJhdGVMb2NhdGlvbnMgPSAoc2hpcCkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgY29sO1xuICAgICAgICAgICAgbGV0IHJvdztcblxuICAgICAgICAgICAgY29uc3QgbmV3TG9jYXRpb25zID0gW107XG4gICAgICAgICAgICBjb25zdCBzdXJMb2NhdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJvdyA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogYm9hcmRTaXplKTtcbiAgICAgICAgICAgICAgICBjb2wgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIChib2FyZFNpemUgLSAoc2hpcC5zaGlwTGVuZ3RoICsgMSkpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm93ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAoYm9hcmRTaXplIC0gKHNoaXAuc2hpcExlbmd0aCArIDEpKSk7XG4gICAgICAgICAgICAgICAgY29sID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiBib2FyZFNpemUpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93fWAgKyAoY29sICsgaSkpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3TG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAkeyhyb3cgKyBpKX1gICsgYCR7Y29sfWApXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIDF9YCArIChjb2wgKyBpKSk7XG4gICAgICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgLSAxfWAgKyAoY29sICsgaSkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyAtIDF9YCArIChjb2wgLSAxKSk7XG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3Jvd31gICsgKGNvbCAtIDEpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93ICsgMX1gICsgKGNvbCAtIDEpKTtcblxuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgLSAxfWAgKyAoY29sICsgc2hpcC5zaGlwTGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3Jvd31gICsgKGNvbCArIHNoaXAuc2hpcExlbmd0aCkpO1xuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgKyAxfWAgKyAoY29sICsgc2hpcC5zaGlwTGVuZ3RoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIGl9YCArIChjb2wgKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgKyBpfWAgKyAoY29sIC0gMSkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyAtIDF9YCArIChjb2wgLSAxKSk7XG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyAtIDF9YCArIChjb2wpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93IC0gMX1gICsgKGNvbCArIDEpKTtcblxuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgKyBzaGlwLnNoaXBMZW5ndGh9YCArIChjb2wgLSAxKSk7XG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIHNoaXAuc2hpcExlbmd0aH1gICsgKGNvbCkpO1xuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgKyBzaGlwLnNoaXBMZW5ndGh9YCArIChjb2wgKyAxKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIFtuZXdMb2NhdGlvbnMsIHN1ckxvY2F0aW9uc107XG5cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjaGVja0NvbGxpc2lvbiA9IChsb2NhdGlvbnMpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxvY2F0aW9ucy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcHNbaV0uZm9yYkxvY2F0aW9ucy5pbmRleE9mKGxvY2F0aW9uc1tqXSkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgbm8gY29sbGlzaW9ucyBvbiBzaGlwICR7c2hpcHNbaV19YClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY3VzdG9tTG9jYXRpb25zID0gKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjb2RlIGdvZXMgaGVyZSBpZiBuZWVkZWRcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNlbGwsIHBsYXllcikgPT4ge1xuICAgICAgICAgICAgcGxheWVyLmJvYXJkLmlsbGVnYWxNb3Zlcy5wdXNoKGNlbGwpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGxheWVyLmJvYXJkLmlsbGVnYWxNb3Zlcyk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNoaXBzW2ldLmxvY2F0aW9ucy5pbmRleE9mKGNlbGwpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5kaXNwbGF5SGl0KGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5nZXR0aW5nSGl0KHNoaXBzW2ldLmxvY2F0aW9ucy5pbmRleE9mKGNlbGwpKTtcbiAgICAgICAgICAgICAgICAgICAgc2hpcHNbaV0uZ2V0dGluZ1N1bmsoc2hpcHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcHNbaV0uZ2V0dGluZ1N1bmsoc2hpcHNbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuYm9hcmQuaWxsZWdhbE1vdmVzID0gcGxheWVyLmJvYXJkLmlsbGVnYWxNb3Zlcy5jb25jYXQoc2hpcHNbaV0uc3VyTG9jYXRpb25zKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNoaXBzW2ldLmxvY2F0aW9ucy5pbmRleE9mKGNlbGwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LmRpc3BsYXlNaXNzKGNlbGwpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9OyBcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJue3NoaXBzLCBpbGxlZ2FsTW92ZXMsIHJlY2VpdmVBdHRhY2ssIHNoaXBzU3VuaywgcmFuZG9tTG9jYXRpb25zfVxuICAgIH07XG5cbiAgICBjb25zdCBwbGF5ZXIgPSAoaWQpID0+IHtcbiAgICAgICAgY29uc3QgcGxheWVySWQgPSBpZDtcbiAgICAgICAgY29uc3QgYm9hcmQgPSBib2FyZEZhY3RvcnkocGxheWVySWQpO1xuICAgICAgICBjb25zdCBnZXRGbGVldCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsZWV0Q29vcmRzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLnNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZC5zaGlwc1tpXS5sb2NhdGlvbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZmxlZXRDb29yZHMucHVzaChib2FyZC5zaGlwc1tpXS5sb2NhdGlvbnNbal0pXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gZmxlZXRDb29yZHM7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGlzV2lubmVyID0gZmFsc2U7XG4gICAgICAgIHJldHVybntwbGF5ZXJJZCwgYm9hcmQsIGdldEZsZWV0LCBpc1dpbm5lcn1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaW5pdFBsYXllcnMoKSB7XG4gICAgXG4gICAgbGV0IHBsYXllcjEgPSBwbGF5ZXIoMSk7XG4gICAgbGV0IHBsYXllcjIgPSBwbGF5ZXIoMik7XG5cbiAgICByZXR1cm4gW3BsYXllcjEsIHBsYXllcjJdO1xuICAgIFxufTtcbiAgICBcbiAgICByZXR1cm4geyBpbml0UGxheWVycyB9O1xuXG59KSgpIiwiaW1wb3J0IHsgY29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJcIjsgXG5cbmV4cG9ydCBjb25zdCB2aWV3ID0gKCgpID0+IHtcblxuICAgIGNvbnN0IGRpc3BsYXlCb2FyZHMgPSAocGxheWVycykgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncCcgKyBpICsgJ2InKTtcbiAgICAgICAgICAgIHdoaWxlIChib2FyZC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgYm9hcmQuZmlyc3RDaGlsZC5yZW1vdmUoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgMTE7IGorKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgMTE7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdpZCcsIGkgKyBgJHtqfWAgKyBrKTtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NlbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAyICYmIHBsYXllcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLm1ha2VNb3ZlKGNlbGwuaWQsIHBsYXllcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG4gICAgXG4gICAgY29uc3QgZGlzcGxheUhpdCA9IChjZWxsSUQpID0+IHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNlbGxJRCk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ21pc3MnKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGlzcGxheU1pc3MgPSAoY2VsbElEKSA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjZWxsSUQpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRpc3BsYXlTaGlwcyA9IChzaGlwcykgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2hpcHNbaV0gIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7c2hpcHNbaV19YCk7XG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBkaXNwbGF5U3VyTG9jYXRpb25zID0gKGNlbGxzKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjZWxsc1tpXSk7XG4gICAgICAgICAgICBpZiAoY2VsbCAhPT0gdW5kZWZpbmVkICYmIGNlbGwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3N1cicpO1xuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2NhbGUnKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzY2FsZScpIH0sIDE1MCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBkaXNwbGF5U3RhcnROZXcgPSAocGhyYXplKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXJ0TmV3UG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3RhcnROZXdQb3B1cC5jbGFzc0xpc3QuYWRkKCdzdGFydE5ldycpO1xuICAgICAgICBzdGFydE5ld1BvcHVwLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxwPiAke3BocmF6ZX0gPC9wPlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInBsYXlBZ2FpblwiPiBQbGF5IGFnYWluIDwvYnV0dG9uPiBgO1xuICAgICAgICBjb25zdCBjdXRyYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGN1dHJhaW4uY2xhc3NMaXN0LmFkZCgnY3VydGFpbicpO1xuICAgICAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKTtcbiAgICAgICAgY29uc3QgcDJiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AyYicpO1xuICAgICAgICBwMmIuYXBwZW5kQ2hpbGQoY3V0cmFpbik7XG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoc3RhcnROZXdQb3B1cCk7XG4gICAgICAgIGNvbnN0IHBsYXlBZ2FpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5QWdhaW4nKTtcbiAgICAgICAgcGxheUFnYWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcDJiLnJlbW92ZUNoaWxkKGN1dHJhaW4pO1xuICAgICAgICAgICAgbWFpbi5yZW1vdmVDaGlsZChzdGFydE5ld1BvcHVwKTtcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuc3RhcnROZXcoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkJyk7XG5cbiAgICBjb25zdCBwbGFjZVNoaXBzUG9wdXAgPSAoKSA9PiB7XG4gICAgICAgIGRpc3BsYXlCb2FyZHMoKTtcbiAgICAgICAgY29uc3QgcGxhY2VTaGlwc1BvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlU2hpcHMnKTtcbiAgICAgICAgcGxhY2VTaGlwc1BvcHVwLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIC8vIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkJyk7XG4gICAgICAgIF9yZW5kZXJCb2FyZChib2FyZCk7XG5cbiAgICAgICAgY29uc3Qgb2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2snKTtcbiAgICAgICAgb2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaGkgdGhlcmUhJylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcmFuZG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhbmRvbScpO1xuICAgICAgICByYW5kb20uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb250cm9sbGVyLnN0YXJ0UmFuZG9tKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJvdGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3RhdGUnKTtcbiAgICAgICAgcm90YXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNoaXBQbGFjZXIudmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICBzaGlwUGxhY2VyLnZlcnRpY2FsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2hpcFBsYWNlci52ZXJ0aWNhbCk7XG4gICAgICAgICAgICAgICAgX3JlbmRlckJvYXJkKGJvYXJkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hpcFBsYWNlci52ZXJ0aWNhbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2hpcFBsYWNlci52ZXJ0aWNhbCk7XG4gICAgICAgICAgICAgICAgX3JlbmRlckJvYXJkKGJvYXJkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IF9yZW5kZXJCb2FyZCA9IChib2FyZCkgPT4ge1xuICAgICAgICBjb25zdCBpbml0Qm9hcmQgPSBib2FyZDtcbiAgICAgICAgbGV0IGNvb3JkcztcbiAgICAgICAgd2hpbGUgKGluaXRCb2FyZC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBpbml0Qm9hcmQuZmlyc3RDaGlsZC5yZW1vdmUoKVxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgMTE7IGorKykge1xuICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCAxMTsgaysrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdpZCcsIGAke2p9JHtrfWApO1xuICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjb250YWluZXInKTtcblxuICAgICAgICAgICAgICAgIGlmIChzaGlwUGxhY2VyLmNhcnJpZXJDb3VudGVyPDEpIHtcbiAgICAgICAgICAgICAgICAgICAgX3BsYWNlQ2FycmllcihjZWxsLCBqLCBrKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNoaXBQbGFjZXIuY3J1aXNlckNvdW50ZXI8Mikge1xuICAgICAgICAgICAgICAgICAgICBfcGxhY2VDcnVpc2VyKGNlbGwsIGosIGspO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hpcFBsYWNlci5kZXN0cm95ZXJDb3VudGVyPDMpIHtcbiAgICAgICAgICAgICAgICAgICAgX3BsYWNlRGVzdHJveWVyKGNlbGwsIGosIGspO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hpcFBsYWNlci5ndW5ib2F0Q291bnRlciA8IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3BsYWNlR3VuYm9hdChjZWxsLCBqLCBrKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvb3JkcyA9IGNvbnRyb2xsZXIucGFyc2VDb29yZHMoc2hpcFBsYWNlci5jb29yZHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpbml0Qm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBQbGFjZXIuY29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwUGxhY2VyLmNvb3Jkc1tpXS5pbmRleE9mKGNlbGwuaWQpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIGlmIChjb29yZHMhPXVuZGVmaW5lZCAmJiBjb29yZHMubGVuZ3RoID49IDEwKSB7XG4gICAgICAgICAgICBjb250cm9sbGVyLnBhc3NDb29yZHMoY29vcmRzKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9O1xuXG4gICAgY29uc3Qgc2hpcFBsYWNlciA9IHtcbiAgICAgICAgY29vcmRzOiBbXSxcbiAgICAgICAgdmVydGljYWw6IGZhbHNlLFxuICAgICAgICBjYXJyaWVyQ291bnRlcjogMCxcbiAgICAgICAgY3J1aXNlckNvdW50ZXI6IDAsXG4gICAgICAgIGRlc3Ryb3llckNvdW50ZXI6IDAsXG4gICAgICAgIGd1bmJvYXRDb3VudGVyOiAwLFxuICAgICAgICBhbGxQbGFjZWQ6ZmFsc2UsXG4gICAgfVxuXG5cbiAgICBjb25zdCBfcGxhY2VDYXJyaWVyID0gKGNlbGwsIGosIGspID0+IHtcblxuICAgICAgICBsZXQgcGFydDEsIHBhcnQyLCBwYXJ0MywgcGFydDQ7XG4gICAgICAgIHBhcnQxID0gY2VsbDtcbiAgICAgICAgaWYgKHNoaXBQbGFjZXIudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAoayA8IDgpIHtcbiAgICAgICAgICAgICAgICBwYXJ0MS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnQyID0gcGFydDEubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0MyA9IHBhcnQyLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgcGFydDQgPSBwYXJ0My5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcnJpZXIgPSBbcGFydDEsIHBhcnQyLCBwYXJ0MywgcGFydDRdO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhcnJpZXIuZm9yRWFjaChwYXJ0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnQuY2xhc3NMaXN0LmFkZCgnc2hpcHNwb3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHBhcnQxLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQyID0gcGFydDEubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0MyA9IHBhcnQyLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDQgPSBwYXJ0My5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcnJpZXIgPSBbcGFydDEsIHBhcnQyLCBwYXJ0MywgcGFydDRdO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhcnJpZXIuZm9yRWFjaChwYXJ0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcHNwb3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgcGFydDEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQyID0gcGFydDEubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0MyA9IHBhcnQyLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDQgPSBwYXJ0My5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcnJpZXIgPSBbcGFydDEsIHBhcnQyLCBwYXJ0MywgcGFydDRdO1xuXG4gICAgICAgICAgICAgICAgICAgICBjYXJyaWVyLmZvckVhY2gocGFydCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0LmNsYXNzTGlzdC5hZGQoJ3NoaXBzJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBzaGlwUGxhY2VyLmNvb3Jkcy5wdXNoKFtgJHtwYXJ0MS5pZH1gLCBgJHtwYXJ0Mi5pZH1gLCBgJHtwYXJ0My5pZH1gLCBgJHtwYXJ0NC5pZH1gXSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNoaXBQbGFjZXIuY29vcmRzKTtcbiAgICAgICAgICAgICAgICAgICAgc2hpcFBsYWNlci5jYXJyaWVyQ291bnRlciArPSAxO1xuICAgICAgICAgICAgICAgICAgICBfcmVuZGVyQm9hcmQoYm9hcmQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzaGlwUGxhY2VyLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoaiA8IDgpIHtcbiAgICAgICAgICAgICAgICBwYXJ0MS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aiArIDF9JHtrfWApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0MyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2ogKyAyfSR7a31gKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtqICsgM30ke2t9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcnJpZXIgPSBbcGFydDEsIHBhcnQyLCBwYXJ0MywgcGFydDRdO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhcnJpZXIuZm9yRWFjaChwYXJ0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnQuY2xhc3NMaXN0LmFkZCgnc2hpcHNwb3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcGFydDEuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtqICsgMX0ke2t9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aiArIDJ9JHtrfWApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0NCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2ogKyAzfSR7a31gKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FycmllciA9IFtwYXJ0MSwgcGFydDIsIHBhcnQzLCBwYXJ0NF07XG5cbiAgICAgICAgICAgICAgICAgICAgY2Fycmllci5mb3JFYWNoKHBhcnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBwYXJ0MS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtqICsgMX0ke2t9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aiArIDJ9JHtrfWApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0NCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2ogKyAzfSR7a31gKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FycmllciA9IFtwYXJ0MSwgcGFydDIsIHBhcnQzLCBwYXJ0NF07XG5cbiAgICAgICAgICAgICAgICAgICAgY2Fycmllci5mb3JFYWNoKHBhcnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgc2hpcFBsYWNlci5jb29yZHMucHVzaChbYCR7cGFydDEuaWR9YCwgYCR7cGFydDIuaWR9YCwgYCR7cGFydDMuaWR9YCwgYCR7cGFydDQuaWR9YF0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwUGxhY2VyLmNvb3Jkcyk7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBQbGFjZXIuY2FycmllckNvdW50ZXIgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgX3JlbmRlckJvYXJkKGJvYXJkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgX3BsYWNlQ3J1aXNlciA9IChjZWxsLCBqLCBrKSA9PiB7XG4gICAgICAgbGV0IHBhcnQxLCBwYXJ0MiwgcGFydDM7XG4gICAgICAgIHBhcnQxID0gY2VsbDtcbiAgICAgICAgaWYgKHNoaXBQbGFjZXIudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAoayA8IDkpIHtcbiAgICAgICAgICAgICAgICBwYXJ0MS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnQyID0gcGFydDEubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0MyA9IHBhcnQyLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FycmllciA9IFtwYXJ0MSwgcGFydDIsIHBhcnQzXTtcblxuICAgICAgICAgICAgICAgICAgICBjYXJyaWVyLmZvckVhY2gocGFydCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0LmNsYXNzTGlzdC5hZGQoJ3NoaXBzcG90Jyk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwYXJ0MS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0MiA9IHBhcnQxLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDMgPSBwYXJ0Mi5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcnJpZXIgPSBbcGFydDEsIHBhcnQyLCBwYXJ0M107XG5cbiAgICAgICAgICAgICAgICAgICAgY2Fycmllci5mb3JFYWNoKHBhcnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBwYXJ0MS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDIgPSBwYXJ0MS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQzID0gcGFydDIubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXJyaWVyID0gW3BhcnQxLCBwYXJ0MiwgcGFydDNdO1xuXG4gICAgICAgICAgICAgICAgICAgICBjYXJyaWVyLmZvckVhY2gocGFydCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0LmNsYXNzTGlzdC5hZGQoJ3NoaXBzJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBzaGlwUGxhY2VyLmNvb3Jkcy5wdXNoKFtgJHtwYXJ0MS5pZH1gLCBgJHtwYXJ0Mi5pZH1gLCBgJHtwYXJ0My5pZH1gXSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNoaXBQbGFjZXIuY29vcmRzKTtcbiAgICAgICAgICAgICAgICAgICAgc2hpcFBsYWNlci5jcnVpc2VyQ291bnRlcis9MTtcbiAgICAgICAgICAgICAgICAgICAgX3JlbmRlckJvYXJkKGJvYXJkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2hpcFBsYWNlci52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKGogPCA5KSB7XG4gICAgICAgICAgICAgICAgcGFydDEuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2ogKyAxfSR7a31gKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtqICsgMn0ke2t9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcnJpZXIgPSBbcGFydDEsIHBhcnQyLCBwYXJ0M107XG5cbiAgICAgICAgICAgICAgICAgICAgY2Fycmllci5mb3JFYWNoKHBhcnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydC5jbGFzc0xpc3QuYWRkKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwYXJ0MS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2ogKyAxfSR7a31gKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtqICsgMn0ke2t9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcnJpZXIgPSBbcGFydDEsIHBhcnQyLCBwYXJ0M107XG5cbiAgICAgICAgICAgICAgICAgICAgY2Fycmllci5mb3JFYWNoKHBhcnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBwYXJ0MS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtqICsgMX0ke2t9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aiArIDJ9JHtrfWApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXJyaWVyID0gW3BhcnQxLCBwYXJ0MiwgcGFydDNdO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhcnJpZXIuZm9yRWFjaChwYXJ0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnQuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIHNoaXBQbGFjZXIuY29vcmRzLnB1c2goW2Ake3BhcnQxLmlkfWAsIGAke3BhcnQyLmlkfWAsIGAke3BhcnQzLmlkfWBdKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2hpcFBsYWNlci5jb29yZHMpO1xuICAgICAgICAgICAgICAgICAgICBzaGlwUGxhY2VyLmNydWlzZXJDb3VudGVyKz0xO1xuICAgICAgICAgICAgICAgICAgICBfcmVuZGVyQm9hcmQoYm9hcmQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICBjb25zdCBfcGxhY2VEZXN0cm95ZXIgPSAoY2VsbCwgaiwgaykgPT4ge1xuICAgICAgIGxldCBwYXJ0MSwgcGFydDI7XG4gICAgICAgIHBhcnQxID0gY2VsbDtcbiAgICAgICAgaWYgKHNoaXBQbGFjZXIudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAoayA8IDEwKSB7XG4gICAgICAgICAgICAgICAgcGFydDEuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0MiA9IHBhcnQxLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FycmllciA9IFtwYXJ0MSwgcGFydDJdO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhcnJpZXIuZm9yRWFjaChwYXJ0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnQuY2xhc3NMaXN0LmFkZCgnc2hpcHNwb3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHBhcnQxLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQyID0gcGFydDEubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXJyaWVyID0gW3BhcnQxLCBwYXJ0Ml07XG5cbiAgICAgICAgICAgICAgICAgICAgY2Fycmllci5mb3JFYWNoKHBhcnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBwYXJ0MS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDIgPSBwYXJ0MS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcnJpZXIgPSBbcGFydDEsIHBhcnQyXTtcblxuICAgICAgICAgICAgICAgICAgICAgY2Fycmllci5mb3JFYWNoKHBhcnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydC5jbGFzc0xpc3QuYWRkKCdzaGlwcycpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgc2hpcFBsYWNlci5jb29yZHMucHVzaChbYCR7cGFydDEuaWR9YCwgYCR7cGFydDIuaWR9YF0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwUGxhY2VyLmNvb3Jkcyk7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBQbGFjZXIuZGVzdHJveWVyQ291bnRlcis9MTtcbiAgICAgICAgICAgICAgICAgICAgX3JlbmRlckJvYXJkKGJvYXJkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2hpcFBsYWNlci52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKGogPCAxMCkge1xuICAgICAgICAgICAgICAgIHBhcnQxLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtqICsgMX0ke2t9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcnJpZXIgPSBbcGFydDEsIHBhcnQyXTtcblxuICAgICAgICAgICAgICAgICAgICBjYXJyaWVyLmZvckVhY2gocGFydCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0LmNsYXNzTGlzdC5hZGQoJ3NoaXBzcG90Jyk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHBhcnQxLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aiArIDF9JHtrfWApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXJyaWVyID0gW3BhcnQxLCBwYXJ0Ml07XG5cbiAgICAgICAgICAgICAgICAgICAgY2Fycmllci5mb3JFYWNoKHBhcnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBwYXJ0MS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtqICsgMX0ke2t9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcnJpZXIgPSBbcGFydDEsIHBhcnQyXTtcblxuICAgICAgICAgICAgICAgICAgICBjYXJyaWVyLmZvckVhY2gocGFydCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0LmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICBzaGlwUGxhY2VyLmNvb3Jkcy5wdXNoKFtgJHtwYXJ0MS5pZH1gLCBgJHtwYXJ0Mi5pZH1gXSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNoaXBQbGFjZXIuY29vcmRzKTtcbiAgICAgICAgICAgICAgICAgICAgc2hpcFBsYWNlci5kZXN0cm95ZXJDb3VudGVyKz0xO1xuICAgICAgICAgICAgICAgICAgICBfcmVuZGVyQm9hcmQoYm9hcmQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcblxuICAgIGNvbnN0IF9wbGFjZUd1bmJvYXQgPSAoY2VsbCkgPT4ge1xuICAgICAgICBjb25zdCAgcGFydDEgPSBjZWxsO1xuICAgIFxuICAgICAgICBwYXJ0MS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBwYXJ0MS5jbGFzc0xpc3QuYWRkKCdzaGlwc3BvdCcpO1xuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgcGFydDEuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICAgIHBhcnQxLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXBzcG90Jyk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgcGFydDEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBwYXJ0MS5jbGFzc0xpc3QuYWRkKCdzaGlwcycpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzaGlwUGxhY2VyLmNvb3Jkcy5wdXNoKFtgJHtwYXJ0MS5pZH1gXSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwUGxhY2VyLmNvb3Jkcyk7XG4gICAgICAgICAgICBzaGlwUGxhY2VyLmd1bmJvYXRDb3VudGVyICs9IDE7XG4gICAgICAgICAgICBfcmVuZGVyQm9hcmQoYm9hcmQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZVBsYWNlU2hpcFBvcHVwID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwbGFjZVNoaXBzUG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2VTaGlwcycpO1xuICAgICAgICBwbGFjZVNoaXBzUG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9O1xuXG5cbiAgICByZXR1cm4ge3JlbW92ZVBsYWNlU2hpcFBvcHVwLCBkaXNwbGF5Qm9hcmRzLCBkaXNwbGF5SGl0LCBkaXNwbGF5U2hpcHMsIGRpc3BsYXlNaXNzLCBkaXNwbGF5U3VyTG9jYXRpb25zLCBkaXNwbGF5U3RhcnROZXcsIHBsYWNlU2hpcHNQb3B1cH1cbn0pKCkiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vc3JjL2ltYWdlcy9pY29uczgtZmlyZS00OC5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9zcmMvaW1hZ2VzL2Nsb3NlLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxufVxcblxcbi5tYWluIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGhlaWdodDogbWluKDcwdmgpO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ucDFiLFxcbi5wMmIsIFxcbi5ib2FyZCB7XFxuICAgIGhlaWdodDogNTAwcHg7XFxuICAgIHdpZHRoOiA1MDBweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgbWlubWF4KDUwcHgsIDFmcikpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgbWlubWF4KDUwcHgsIDFmcikpO1xcblxcbn1cXG5cXG4ucDFiIGRpdixcXG4ucDJiIGRpdiB7XFxuICAgIC8qIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyAqL1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmN1cnRhaW4ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGhlaWdodDogNTAwcHg7XFxuICAgIHdpZHRoOiA1MDBweDtcXG59XFxuXFxuZm9vdGVyLFxcbmhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMjIsIDE1MSwgMjQ4KTtcXG4gICAgaGVpZ2h0OiBtaW4oMTV2aCk7XFxuICAgIGZvbnQtc2l6ZTogN3ZoO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuZm9vdGVye1xcbiAgICBmb250LXNpemU6IGxhcmdlO1xcbn1cXG5cXG4uaGl0IHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMTY5LCAxNjkpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblxcbi5zaGlwLCAuc2hpcEdyb3VwPmRpdiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XFxufVxcblxcbi5taXNzIHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiA3MCU7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuXFxuLnN1cntcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiA3MCU7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuXFxuLnNjYWxle1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblxcbi5zdGFydE5ld3tcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgaGVpZ2h0OiAxNTBweDtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTIyLCAxNTEsIDI0OCk7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyNSU7XFxuICAgIGxlZnQ6IDQ0JTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDAsIDAsIDApO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnN0YXJ0TmV3IHB7XFxuICAgIGZvbnQtc2l6ZTogMjRweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIHdpZHRoOiAxMDBweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDAsIDAsIDApO1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxufVxcblxcbi5wbGFjZVNoaXBze1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBoZWlnaHQ6IDYwMHB4O1xcbiAgICB3aWR0aDogOTAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMjIsIDE1MSwgMjQ4KTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCByZ2IoMCwgMCwgMCk7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ucGxhY2VTaGlwcyAjYm9hcmQ+ZGl2e1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMCwgMCwgMCk7XFxufVxcblxcbi5ib2FyZHdyYXB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHdpZHRoOiA4MDBweDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4uc2hpcHN7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGhlaWdodDogNTAwcHg7XFxuICAgIHdpZHRoOiAzMDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAgIG1hcmdpbi1sZWZ0OiAzMHB4O1xcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMjIsIDE1MSwgMjQ4KTtcXG59XFxuXFxuLnNoaXBzIGJ1dHRvbntcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuXFxuLnNoaXBzIHB7XFxuICAgIGZvbnQtc2l6ZTogMjVweDtcXG59XFxuXFxuYnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE3LCAwLCAyNTUpO1xcbiAgICBjb2xvcjogd2hpdGU7XFxufVxcblxcbi5zaGlwR3JvdXB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB3aWR0aDogOTUlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG5cXG4jY2FycmllcntcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgbWluKDUwcHgpKTtcXG59XFxuXFxuI2JhdHRsZWNydWlzZXJ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIG1pbig1MHB4KSk7XFxufVxcblxcbiNkZXN0cm95ZXJ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIG1pbig1MHB4KSk7XFxufVxcblxcbiNndW5zaGlwe1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxLCBtaW4oNTBweCkpO1xcbn1cXG5cXG4jY2FycmllciwgI2JhdHRsZWNydWlzZXIsICNkZXN0cm95ZXIsICNndW5zaGlwIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7IFxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heCg0OHB4KTtcXG59XFxuXFxuLnBhcnR7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTcsIDAsIDI1NSk7XFxufVxcblxcbi5ub0JvcmRlcntcXG4gICAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG4uc2hpcHNwb3R7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWV2aW9sZXQ7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxTQUFTO0lBQ1QsWUFBWTtJQUNaLFVBQVU7SUFDVixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw2QkFBNkI7SUFDN0IsaUJBQWlCO0lBQ2pCLG1CQUFtQjtBQUN2Qjs7QUFFQTs7O0lBR0ksYUFBYTtJQUNiLFlBQVk7SUFDWix1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLGFBQWE7SUFDYixvREFBb0Q7SUFDcEQsaURBQWlEOztBQUVyRDs7QUFFQTs7SUFFSTs7MEJBRXNCO0lBQ3RCLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsWUFBWTtBQUNoQjs7QUFFQTs7SUFFSSxhQUFhO0lBQ2Isb0NBQW9DO0lBQ3BDLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLHlEQUF1RDtJQUN2RCxvQ0FBb0M7SUFDcEMscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0kseURBQThDO0lBQzlDLDRCQUE0QjtJQUM1QixvQkFBb0I7SUFDcEIsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0kseURBQThDO0lBQzlDLDRCQUE0QjtJQUM1QixvQkFBb0I7SUFDcEIsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsWUFBWTtJQUNaLG9DQUFvQztJQUNwQyxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFNBQVM7SUFDVCw4QkFBOEI7SUFDOUIsNkJBQTZCO0lBQzdCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osWUFBWTtJQUNaLDhCQUE4QjtJQUM5QixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsWUFBWTtJQUNaLG9DQUFvQztJQUNwQyxrQkFBa0I7SUFDbEIsOEJBQThCO0lBQzlCLDZCQUE2QjtJQUM3QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtJQUNaLDhCQUE4QjtBQUNsQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsYUFBYTtJQUNiLFlBQVk7SUFDWix1QkFBdUI7SUFDdkIsaUJBQWlCO0lBQ2pCLHFCQUFxQjtJQUNyQixvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0ksaUNBQWlDO0lBQ2pDLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsOEJBQThCO0lBQzlCLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsbUJBQW1CO0lBQ25CLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLDJDQUEyQztBQUMvQzs7QUFFQTtJQUNJLDJDQUEyQztBQUMvQzs7QUFFQTtJQUNJLDJDQUEyQztBQUMvQzs7QUFFQTtJQUNJLDJDQUEyQztBQUMvQzs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsNkJBQTZCO0FBQ2pDOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSw0QkFBNEI7QUFDaENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbn1cXG5cXG4ubWFpbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBoZWlnaHQ6IG1pbig3MHZoKTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnAxYixcXG4ucDJiLCBcXG4uYm9hcmQge1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICB3aWR0aDogNTAwcHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIG1pbm1heCg1MHB4LCAxZnIpKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIG1pbm1heCg1MHB4LCAxZnIpKTtcXG5cXG59XFxuXFxuLnAxYiBkaXYsXFxuLnAyYiBkaXYge1xcbiAgICAvKiBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgKi9cXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jdXJ0YWluIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICB3aWR0aDogNTAwcHg7XFxufVxcblxcbmZvb3RlcixcXG5oZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTIyLCAxNTEsIDI0OCk7XFxuICAgIGhlaWdodDogbWluKDE1dmgpO1xcbiAgICBmb250LXNpemU6IDd2aDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmZvb3RlcntcXG4gICAgZm9udC1zaXplOiBsYXJnZTtcXG59XFxuXFxuLmhpdCB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi9zcmMvaW1hZ2VzL2ljb25zOC1maXJlLTQ4LnBuZyk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDE2OSwgMTY5KTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbn1cXG5cXG4uc2hpcCwgLnNoaXBHcm91cD5kaXYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcbn1cXG5cXG4ubWlzcyB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi9zcmMvaW1hZ2VzL2Nsb3NlLnBuZyk7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogNzAlO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxufVxcblxcbi5zdXJ7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi9zcmMvaW1hZ2VzL2Nsb3NlLnBuZyk7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogNzAlO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxufVxcblxcbi5zY2FsZXtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbn1cXG5cXG4uc3RhcnROZXd7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGhlaWdodDogMTUwcHg7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEyMiwgMTUxLCAyNDgpO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMjUlO1xcbiAgICBsZWZ0OiA0NCU7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigwLCAwLCAwKTtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zdGFydE5ldyBwe1xcbiAgICBmb250LXNpemU6IDI0cHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICB3aWR0aDogMTAwcHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigwLCAwLCAwKTtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbn1cXG5cXG4ucGxhY2VTaGlwc3tcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgaGVpZ2h0OiA2MDBweDtcXG4gICAgd2lkdGg6IDkwMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTIyLCAxNTEsIDI0OCk7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYm9yZGVyOiAycHggc29saWQgcmdiKDAsIDAsIDApO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnBsYWNlU2hpcHMgI2JvYXJkPmRpdntcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDAsIDAsIDApO1xcbn1cXG5cXG4uYm9hcmR3cmFwe1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB3aWR0aDogODAwcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuLnNoaXBze1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICB3aWR0aDogMzAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBtYXJnaW4tbGVmdDogMzBweDtcXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTIyLCAxNTEsIDI0OCk7XFxufVxcblxcbi5zaGlwcyBidXR0b257XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcblxcbi5zaGlwcyBwe1xcbiAgICBmb250LXNpemU6IDI1cHg7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxNywgMCwgMjU1KTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4uc2hpcEdyb3Vwe1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgd2lkdGg6IDk1JTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuXFxuI2NhcnJpZXJ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIG1pbig1MHB4KSk7XFxufVxcblxcbiNiYXR0bGVjcnVpc2Vye1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCBtaW4oNTBweCkpO1xcbn1cXG5cXG4jZGVzdHJveWVye1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCBtaW4oNTBweCkpO1xcbn1cXG5cXG4jZ3Vuc2hpcHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgbWluKDUwcHgpKTtcXG59XFxuXFxuI2NhcnJpZXIsICNiYXR0bGVjcnVpc2VyLCAjZGVzdHJveWVyLCAjZ3Vuc2hpcCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOyBcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtYXgoNDhweCk7XFxufVxcblxcbi5wYXJ0e1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE3LCAwLCAyNTUpO1xcbn1cXG5cXG4ubm9Cb3JkZXJ7XFxuICAgIGJvcmRlcjogbm9uZTtcXG59XFxuXFxuLnNoaXBzcG90e1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVldmlvbGV0O1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpOyAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJ2aWV3IiwiaW5pdFBvcHVwIiwibW9kZWwiLCJjb250cm9sbGVyIiwibW92ZUNvdW50ZXIiLCJfcmFuZG9tTW92ZUdlbiIsInBsYXllciIsInJhbmRvbU1vdmUiLCJNYXRoIiwiY2VpbCIsInJhbmRvbSIsImJvYXJkIiwiaWxsZWdhbE1vdmVzIiwiaW5kZXhPZiIsIm1ha2VNb3ZlIiwiY2VsbCIsInBsYXllcnMiLCJyZWNlaXZlQXR0YWNrIiwiY2hlY2tXaW5uZXIiLCJzaGlwc1N1bmsiLCJsZW5ndGgiLCJpc1dpbm5lciIsImRpc3BsYXlTdGFydE5ldyIsInN0YXJ0TmV3IiwiaW5pdFBsYXllcnMiLCJzdGFydFJhbmRvbSIsInJhbmRvbUxvY2F0aW9ucyIsInJlbW92ZVBsYWNlU2hpcFBvcHVwIiwiZGlzcGxheUJvYXJkcyIsImRpc3BsYXlTaGlwcyIsImdldEZsZWV0IiwicGFyc2VDb29yZHMiLCJjb29yZHMiLCJwYXJzZWRDb29yZHMiLCJpIiwicHVzaCIsImoiLCJzaGlwQ29vcmRzIiwicGFzc0Nvb3JkcyIsInNoaXBzIiwibG9jYXRpb25zIiwiX3N0YXJ0UGxhY2VkIiwicGxhY2VTaGlwc1BvcHVwIiwic2hpcEZhY3RvcnkiLCJzaGlwTGVuZ3RoIiwiZGlyZWN0aW9uIiwic3RhcnRMb2NhdGlvbiIsInN1ckxvY2F0aW9ucyIsImZvcmJMb2NhdGlvbnMiLCJoaXRzIiwiaXNTdW5rIiwic2V0Q29vcmQiLCJnZXR0aW5nSGl0IiwibG9jYXRpb24iLCJnZXR0aW5nU3VuayIsInNoaXAiLCJkaXNwbGF5U3VyTG9jYXRpb25zIiwiYm9hcmRGYWN0b3J5IiwiaWQiLCJib2FyZElkIiwiYm9hcmRTaXplIiwic2hpcExvY2F0aW9ucyIsInVuZGVmaW5lZCIsInNoaXBTcG90IiwiZ2VuZXJhdGVMb2NhdGlvbnMiLCJjb25jYXQiLCJjaGVja0NvbGxpc2lvbiIsImN1c3RvbUxvY2F0aW9ucyIsImNvbCIsInJvdyIsIm5ld0xvY2F0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJkaXNwbGF5SGl0IiwiZGlzcGxheU1pc3MiLCJwbGF5ZXJJZCIsImZsZWV0Q29vcmRzIiwicGxheWVyMSIsInBsYXllcjIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZmlyc3RDaGlsZCIsInJlbW92ZSIsImsiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFwcGVuZENoaWxkIiwiY2VsbElEIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2VsbHMiLCJzZXRUaW1lb3V0IiwicGhyYXplIiwic3RhcnROZXdQb3B1cCIsImlubmVySFRNTCIsImN1dHJhaW4iLCJtYWluIiwicDJiIiwicGxheUFnYWluIiwicmVtb3ZlQ2hpbGQiLCJzdHlsZSIsImRpc3BsYXkiLCJfcmVuZGVyQm9hcmQiLCJvayIsInJvdGF0ZSIsInNoaXBQbGFjZXIiLCJ2ZXJ0aWNhbCIsImluaXRCb2FyZCIsImNhcnJpZXJDb3VudGVyIiwiX3BsYWNlQ2FycmllciIsImNydWlzZXJDb3VudGVyIiwiX3BsYWNlQ3J1aXNlciIsImRlc3Ryb3llckNvdW50ZXIiLCJfcGxhY2VEZXN0cm95ZXIiLCJndW5ib2F0Q291bnRlciIsIl9wbGFjZUd1bmJvYXQiLCJhbGxQbGFjZWQiLCJwYXJ0MSIsInBhcnQyIiwicGFydDMiLCJwYXJ0NCIsIm5leHRFbGVtZW50U2libGluZyIsImNhcnJpZXIiLCJmb3JFYWNoIiwicGFydCJdLCJzb3VyY2VSb290IjoiIn0=