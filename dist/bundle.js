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

  return {
    moveCounter: moveCounter,
    makeMove: makeMove,
    checkWinner: checkWinner,
    startNew: startNew,
    startRandom: startRandom
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

    var setCoord = function setCoord(cells) {
      if (cells) {
        [], _readOnlyError("locations");

        for (var i = 0; i < shipLength; i++) {
          locations.push("".concat(cells[i]));
        }

        ;
      }

      ;
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
  var vertical = false;

  var displayBoards = function displayBoards(players) {
    for (var i = 1; i < 3; i++) {
      var board = document.getElementById('p' + i + 'b');

      while (board.firstChild) {
        board.firstChild.remove();
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
          board.appendChild(cell);
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

  var placeShipsPopup = function placeShipsPopup() {
    displayBoards();
    var placeShipsPopup = document.getElementById('placeShips');
    placeShipsPopup.style.display = 'flex';
    var board = document.getElementById('board');

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

  var _renderBoard = function _renderBoard(board) {
    var initBoard = board;

    while (initBoard.firstChild) {
      initBoard.firstChild.remove();
    }

    ;

    for (var j = 1; j < 11; j++) {
      for (var k = 1; k < 11; k++) {
        var cell = document.createElement('div');
        cell.setAttribute('id', "".concat(j).concat(k));
        cell.setAttribute('class', 'container');

        _placeCarrier(cell, j, k);

        initBoard.appendChild(cell);
      }

      ;
    }

    ;
  };

  var _placeCarrier = function _placeCarrier(cell, j, k) {
    var part1 = cell;

    if (vertical === false) {
      if (k < 8) {
        part1.addEventListener('mouseover', function () {
          var part2 = part1.nextElementSibling;
          var part3 = part2.nextElementSibling;
          var part4 = part3.nextElementSibling;
          part1.classList.add('shipspot');
          part2.classList.add('shipspot');
          part3.classList.add('shipspot');
          part4.classList.add('shipspot');
        });
        part1.addEventListener('mouseleave', function () {
          var part2 = part1.nextElementSibling;
          var part3 = part2.nextElementSibling;
          var part4 = part3.nextElementSibling;
          part1.classList.remove('shipspot');
          part2.classList.remove('shipspot');
          part3.classList.remove('shipspot');
          part4.classList.remove('shipspot');
        });
        part1.addEventListener('click', function () {
          var part2 = part1.nextElementSibling;
          var part3 = part2.nextElementSibling;
          var part4 = part3.nextElementSibling;
          part1.classList.add('ship');
          part2.classList.add('ship');
          part3.classList.add('ship');
          part4.classList.add('ship');
          console.log(vertical);
        });
      }
    } else if (vertical === true) {
      if (j < 8) {
        part1.addEventListener('mouseover', function () {
          var part2 = document.getElementById("".concat(j + 1).concat(k));
          var part3 = document.getElementById("".concat(j + 2).concat(k));
          var part4 = document.getElementById("".concat(j + 3).concat(k));
          part1.classList.add('shipspot');
          part2.classList.add('shipspot');
          part3.classList.add('shipspot');
          part4.classList.add('shipspot');
        });
        part1.addEventListener('mouseleave', function () {
          var part2 = document.getElementById("".concat(j + 1).concat(k));
          var part3 = document.getElementById("".concat(j + 2).concat(k));
          var part4 = document.getElementById("".concat(j + 3).concat(k));
          part1.classList.remove('shipspot');
          part2.classList.remove('shipspot');
          part3.classList.remove('shipspot');
          part4.classList.remove('shipspot');
        });
        part1.addEventListener('click', function () {
          var part2 = document.getElementById("".concat(j + 1).concat(k));
          var part3 = document.getElementById("".concat(j + 2).concat(k));
          var part4 = document.getElementById("".concat(j + 3).concat(k));
          part1.classList.add('ship');
          part2.classList.add('ship');
          part3.classList.add('ship');
          part4.classList.add('ship');
          return;
        });
      }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL3NyYy9tb2RlbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vc3JjL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2aWV3IH0gZnJvbSBcIi4vdmlld1wiO1xuaW1wb3J0IHsgaW5pdFBvcHVwIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7IG1vZGVsIH0gZnJvbSBcIi4vbW9kZWxcIjtcblxuZXhwb3J0IGNvbnN0IGNvbnRyb2xsZXIgPSAoKCkgPT4ge1xuXG4gICAgbGV0IG1vdmVDb3VudGVyID0gMDtcbiAgICBcbiAgICBjb25zdCBfcmFuZG9tTW92ZUdlbiA9IChwbGF5ZXIpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZG9tTW92ZSA9IDEgKyBgJHtNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqICgxMCkpfWAgKyBgJHtNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqICgxMCkpfWA7XG4gICAgICAgIGlmIChwbGF5ZXIuYm9hcmQuaWxsZWdhbE1vdmVzLmluZGV4T2YocmFuZG9tTW92ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gcmFuZG9tTW92ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gX3JhbmRvbU1vdmVHZW4ocGxheWVyKTtcbiAgICAgICAgfTsgIFxuICAgIH07XG5cbiAgICBjb25zdCBtYWtlTW92ZSA9IChjZWxsLCBwbGF5ZXJzKSA9PiB7XG4gICAgICAgIGlmIChwbGF5ZXJzWzFdLmJvYXJkLmlsbGVnYWxNb3Zlcy5pbmRleE9mKGNlbGwpID09PSAtMSkge1xuICAgICAgICAgICAgcGxheWVyc1sxXS5ib2FyZC5yZWNlaXZlQXR0YWNrKGNlbGwsIHBsYXllcnNbMV0pO1xuICAgICAgICAgICAgcGxheWVyc1swXS5ib2FyZC5yZWNlaXZlQXR0YWNrKF9yYW5kb21Nb3ZlR2VuKHBsYXllcnNbMF0pLCBwbGF5ZXJzWzBdKTtcbiAgICAgICAgICAgIG1vdmVDb3VudGVyICs9IDE7XG4gICAgICAgICAgICBjaGVja1dpbm5lcihwbGF5ZXJzKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2hlY2tXaW5uZXIgPSAocGxheWVycykgPT4ge1xuICAgICAgICBpZiAocGxheWVyc1swXS5ib2FyZC5zaGlwc1N1bmsoKS5sZW5ndGggPT09IDEwKSB7XG4gICAgICAgICAgICBwbGF5ZXJzWzFdLmlzV2lubmVyID0gdHJ1ZTsgXG4gICAgICAgICAgICB2aWV3LmRpc3BsYXlTdGFydE5ldyhgU3R1cGlkIGNvbXB1dGVyIHdpbnMhYCk7XG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVyc1sxXS5ib2FyZC5zaGlwc1N1bmsoKS5sZW5ndGggPT09IDEwKSB7XG4gICAgICAgICAgICBwbGF5ZXJzWzBdLmlzV2lubmVyID0gdHJ1ZTsgXG4gICAgICAgICAgICB2aWV3LmRpc3BsYXlTdGFydE5ldyhgWW91IHdpbiFgKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RhcnROZXcgPSAoKSA9PiB7XG4gICAgICAgIGluaXRQb3B1cCgpO1xuICAgIH07XG5cbiAgICBjb25zdCBzdGFydFJhbmRvbSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGxheWVycyA9IG1vZGVsLmluaXRQbGF5ZXJzKCk7XG4gICAgICAgIHBsYXllcnNbMF0uYm9hcmQucmFuZG9tTG9jYXRpb25zKCk7XG4gICAgICAgIHBsYXllcnNbMV0uYm9hcmQucmFuZG9tTG9jYXRpb25zKCk7XG4gICAgICAgIHZpZXcucmVtb3ZlUGxhY2VTaGlwUG9wdXAoKTtcbiAgICAgICAgdmlldy5kaXNwbGF5Qm9hcmRzKHBsYXllcnMpO1xuICAgICAgICB2aWV3LmRpc3BsYXlTaGlwcyhwbGF5ZXJzWzBdLmdldEZsZWV0KCkpO1xuICAgICAgICBcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgbW92ZUNvdW50ZXIsIG1ha2VNb3ZlLCBjaGVja1dpbm5lciwgc3RhcnROZXcsIHN0YXJ0UmFuZG9tfTtcblxufSkoKTtcbiIsImltcG9ydCAnLi4vc3JjL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyB2aWV3IH0gZnJvbSBcIi4vdmlld1wiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0UG9wdXAoKSB7XG4gICAgdmlldy5wbGFjZVNoaXBzUG9wdXAoKTtcbn07XG5cblxuaW5pdFBvcHVwKCk7IiwiaW1wb3J0IHsgdmlldyB9IGZyb20gXCIuL3ZpZXdcIjtcblxuZXhwb3J0IGNvbnN0IG1vZGVsID0gKCgpID0+IHtcblxuICAgIGNvbnN0IHNoaXBGYWN0b3J5ID0gKGxlbmd0aCkgPT4ge1xuICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgICBsZXQgc3RhcnRMb2NhdGlvbjsgXG4gICAgICAgIGNvbnN0IGxvY2F0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBzdXJMb2NhdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3QgZm9yYkxvY2F0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBoaXRzID0gW107XG4gICAgICAgIGxldCBpc1N1bmsgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBzZXRDb29yZCA9IChjZWxscykgPT4ge1xuICAgICAgICAgICAgaWYgKGNlbGxzKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb25zID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25zLnB1c2goYCR7Y2VsbHNbaV19YCk7XG4gICAgICAgICAgICAgICAgfTsgXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGdldHRpbmdIaXQgPSAobG9jYXRpb24pID0+IHtcbiAgICAgICAgICAgIGhpdHNbbG9jYXRpb25dID0gJ2hpdCc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBnZXR0aW5nU3VuayA9IChzaGlwKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2hpcC5oaXRzLmluZGV4T2YoJycpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHNoaXAuaXNTdW5rID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2aWV3LmRpc3BsYXlTdXJMb2NhdGlvbnMoc2hpcC5zdXJMb2NhdGlvbnMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBzaGlwLmlzU3VuaztcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4geyBzZXRDb29yZCAsbG9jYXRpb25zLCBoaXRzLCBpc1N1bmssIGdldHRpbmdTdW5rLCBkaXJlY3Rpb24sIGdldHRpbmdIaXQsIHNoaXBMZW5ndGgsIHN1ckxvY2F0aW9ucywgZm9yYkxvY2F0aW9ucywgc3RhcnRMb2NhdGlvbn07XG4gICAgfTtcblxuICAgIGNvbnN0IGJvYXJkRmFjdG9yeSA9IChpZCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGJvYXJkSWQgPSBpZDtcblxuICAgICAgICBjb25zdCBib2FyZFNpemUgPSAxMDtcblxuICAgICAgICBjb25zdCBzaGlwcyA9IFtzaGlwRmFjdG9yeSg0KSxcbiAgICAgICAgc2hpcEZhY3RvcnkoMyksXG4gICAgICAgIHNoaXBGYWN0b3J5KDMpLFxuICAgICAgICBzaGlwRmFjdG9yeSgyKSxcbiAgICAgICAgc2hpcEZhY3RvcnkoMiksXG4gICAgICAgIHNoaXBGYWN0b3J5KDIpLFxuICAgICAgICBzaGlwRmFjdG9yeSgxKSxcbiAgICAgICAgc2hpcEZhY3RvcnkoMSksXG4gICAgICAgIHNoaXBGYWN0b3J5KDEpLFxuICAgICAgICBzaGlwRmFjdG9yeSgxKV07XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlwc1N1bmsgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2hpcHNbaV0uaXNTdW5rID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzU3Vuay5wdXNoKHNoaXBzW2ldKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBzaGlwc1N1bms7XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IGlsbGVnYWxNb3ZlcyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IHJhbmRvbUxvY2F0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzaGlwTG9jYXRpb25zO1xuICAgICAgICAgICAgbGV0IHN1ckxvY2F0aW9ucztcbiAgICAgICAgICAgIGxldCBmb3JiTG9jYXRpb25zO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzaGlwc1tpXS5zdGFydExvY2F0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpcFNwb3QgPSBnZW5lcmF0ZUxvY2F0aW9ucyhzaGlwc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwTG9jYXRpb25zID0gc2hpcFNwb3RbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMgPSBzaGlwU3BvdFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmJMb2NhdGlvbnMgPSBzaGlwTG9jYXRpb25zLmNvbmNhdChzdXJMb2NhdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9IHdoaWxlIChjaGVja0NvbGxpc2lvbihzaGlwTG9jYXRpb25zKSk7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLmxvY2F0aW9ucyA9IHNoaXBMb2NhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLnN1ckxvY2F0aW9ucyA9IHN1ckxvY2F0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgc2hpcHNbaV0uZm9yYkxvY2F0aW9ucyA9IGZvcmJMb2NhdGlvbnM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9jYXRpb25zKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2hpcHNbaV0uc2hpcExlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLmhpdHMucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBnZW5lcmF0ZUxvY2F0aW9ucyA9IChzaGlwKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBjb2w7XG4gICAgICAgICAgICBsZXQgcm93O1xuXG4gICAgICAgICAgICBjb25zdCBuZXdMb2NhdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHN1ckxvY2F0aW9ucyA9IFtdO1xuICAgICAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcm93ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiBib2FyZFNpemUpO1xuICAgICAgICAgICAgICAgIGNvbCA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSAtIChzaGlwLnNoaXBMZW5ndGggKyAxKSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3cgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIChib2FyZFNpemUgLSAoc2hpcC5zaGlwTGVuZ3RoICsgMSkpKTtcbiAgICAgICAgICAgICAgICBjb2wgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIGJvYXJkU2l6ZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0xvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3d9YCArIChjb2wgKyBpKSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXdMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7KHJvdyArIGkpfWAgKyBgJHtjb2x9YClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93ICsgMX1gICsgKGNvbCArIGkpKTtcbiAgICAgICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyAtIDF9YCArIChjb2wgKyBpKSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93IC0gMX1gICsgKGNvbCAtIDEpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93fWAgKyAoY29sIC0gMSkpO1xuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgKyAxfWAgKyAoY29sIC0gMSkpO1xuXG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyAtIDF9YCArIChjb2wgKyBzaGlwLnNoaXBMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93fWAgKyAoY29sICsgc2hpcC5zaGlwTGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIDF9YCArIChjb2wgKyBzaGlwLnNoaXBMZW5ndGgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93ICsgaX1gICsgKGNvbCArIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIGl9YCArIChjb2wgLSAxKSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93IC0gMX1gICsgKGNvbCAtIDEpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93IC0gMX1gICsgKGNvbCkpO1xuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgLSAxfWAgKyAoY29sICsgMSkpO1xuXG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIHNoaXAuc2hpcExlbmd0aH1gICsgKGNvbCAtIDEpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93ICsgc2hpcC5zaGlwTGVuZ3RofWAgKyAoY29sKSk7XG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIHNoaXAuc2hpcExlbmd0aH1gICsgKGNvbCArIDEpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gW25ld0xvY2F0aW9ucywgc3VyTG9jYXRpb25zXTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGNoZWNrQ29sbGlzaW9uID0gKGxvY2F0aW9ucykgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbG9jYXRpb25zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwc1tpXS5mb3JiTG9jYXRpb25zLmluZGV4T2YobG9jYXRpb25zW2pdKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBubyBjb2xsaXNpb25zIG9uIHNoaXAgJHtzaGlwc1tpXX1gKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjdXN0b21Mb2NhdGlvbnMgPSAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGNvZGUgZ29lcyBoZXJlIGlmIG5lZWRlZFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY2VsbCwgcGxheWVyKSA9PiB7XG4gICAgICAgICAgICBwbGF5ZXIuYm9hcmQuaWxsZWdhbE1vdmVzLnB1c2goY2VsbCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIuYm9hcmQuaWxsZWdhbE1vdmVzKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2hpcHNbaV0ubG9jYXRpb25zLmluZGV4T2YoY2VsbCkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LmRpc3BsYXlIaXQoY2VsbCk7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLmdldHRpbmdIaXQoc2hpcHNbaV0ubG9jYXRpb25zLmluZGV4T2YoY2VsbCkpO1xuICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5nZXR0aW5nU3VuayhzaGlwc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwc1tpXS5nZXR0aW5nU3VuayhzaGlwc1tpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5ib2FyZC5pbGxlZ2FsTW92ZXMgPSBwbGF5ZXIuYm9hcmQuaWxsZWdhbE1vdmVzLmNvbmNhdChzaGlwc1tpXS5zdXJMb2NhdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hpcHNbaV0ubG9jYXRpb25zLmluZGV4T2YoY2VsbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuZGlzcGxheU1pc3MoY2VsbCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07IFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm57c2hpcHMsIGlsbGVnYWxNb3ZlcywgcmVjZWl2ZUF0dGFjaywgc2hpcHNTdW5rLCByYW5kb21Mb2NhdGlvbnN9XG4gICAgfTtcblxuICAgIGNvbnN0IHBsYXllciA9IChpZCkgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJJZCA9IGlkO1xuICAgICAgICBjb25zdCBib2FyZCA9IGJvYXJkRmFjdG9yeShwbGF5ZXJJZCk7XG4gICAgICAgIGNvbnN0IGdldEZsZWV0ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxlZXRDb29yZHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkLnNoaXBzW2ldLmxvY2F0aW9ucy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBmbGVldENvb3Jkcy5wdXNoKGJvYXJkLnNoaXBzW2ldLmxvY2F0aW9uc1tqXSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBmbGVldENvb3JkcztcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgaXNXaW5uZXIgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJue3BsYXllcklkLCBib2FyZCwgZ2V0RmxlZXQsIGlzV2lubmVyfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0UGxheWVycygpIHtcbiAgICBcbiAgICBsZXQgcGxheWVyMSA9IHBsYXllcigxKTtcbiAgICBsZXQgcGxheWVyMiA9IHBsYXllcigyKTtcblxuICAgIHJldHVybiBbcGxheWVyMSwgcGxheWVyMl07XG4gICAgXG59O1xuICAgIFxuICAgIHJldHVybiB7IGluaXRQbGF5ZXJzIH07XG5cbn0pKCkiLCJpbXBvcnQgeyBjb250cm9sbGVyIH0gZnJvbSBcIi4vY29udHJvbGxlclwiO1xuXG5leHBvcnQgY29uc3QgdmlldyA9ICgoKSA9PiB7XG5cbiAgICBsZXQgdmVydGljYWwgPSBmYWxzZTtcblxuICAgIGNvbnN0IGRpc3BsYXlCb2FyZHMgPSAocGxheWVycykgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncCcgKyBpICsgJ2InKTtcbiAgICAgICAgICAgIHdoaWxlIChib2FyZC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgYm9hcmQuZmlyc3RDaGlsZC5yZW1vdmUoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgMTE7IGorKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgMTE7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdpZCcsIGkgKyBgJHtqfWAgKyBrKTtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NlbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAyICYmIHBsYXllcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLm1ha2VNb3ZlKGNlbGwuaWQsIHBsYXllcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG4gICAgXG4gICAgY29uc3QgZGlzcGxheUhpdCA9IChjZWxsSUQpID0+IHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNlbGxJRCk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ21pc3MnKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGlzcGxheU1pc3MgPSAoY2VsbElEKSA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjZWxsSUQpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRpc3BsYXlTaGlwcyA9IChzaGlwcykgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2hpcHNbaV0gIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7c2hpcHNbaV19YCk7XG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBkaXNwbGF5U3VyTG9jYXRpb25zID0gKGNlbGxzKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjZWxsc1tpXSk7XG4gICAgICAgICAgICBpZiAoY2VsbCAhPT0gdW5kZWZpbmVkICYmIGNlbGwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3N1cicpO1xuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2NhbGUnKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzY2FsZScpIH0sIDE1MCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBkaXNwbGF5U3RhcnROZXcgPSAocGhyYXplKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXJ0TmV3UG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3RhcnROZXdQb3B1cC5jbGFzc0xpc3QuYWRkKCdzdGFydE5ldycpO1xuICAgICAgICBzdGFydE5ld1BvcHVwLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxwPiAke3BocmF6ZX0gPC9wPlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInBsYXlBZ2FpblwiPiBQbGF5IGFnYWluIDwvYnV0dG9uPiBgO1xuICAgICAgICBjb25zdCBjdXRyYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGN1dHJhaW4uY2xhc3NMaXN0LmFkZCgnY3VydGFpbicpO1xuICAgICAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKTtcbiAgICAgICAgY29uc3QgcDJiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AyYicpO1xuICAgICAgICBwMmIuYXBwZW5kQ2hpbGQoY3V0cmFpbik7XG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoc3RhcnROZXdQb3B1cCk7XG4gICAgICAgIGNvbnN0IHBsYXlBZ2FpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5QWdhaW4nKTtcbiAgICAgICAgcGxheUFnYWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcDJiLnJlbW92ZUNoaWxkKGN1dHJhaW4pO1xuICAgICAgICAgICAgbWFpbi5yZW1vdmVDaGlsZChzdGFydE5ld1BvcHVwKTtcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuc3RhcnROZXcoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHBsYWNlU2hpcHNQb3B1cCA9ICgpID0+IHtcbiAgICAgICAgZGlzcGxheUJvYXJkcygpO1xuICAgICAgICBjb25zdCBwbGFjZVNoaXBzUG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2VTaGlwcycpO1xuICAgICAgICBwbGFjZVNoaXBzUG9wdXAuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQnKTtcbiAgICAgICAgX3JlbmRlckJvYXJkKGJvYXJkKTtcblxuICAgICAgICBjb25zdCBvayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvaycpO1xuICAgICAgICBvay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaSB0aGVyZSEnKVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByYW5kb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFuZG9tJyk7XG4gICAgICAgIHJhbmRvbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuc3RhcnRSYW5kb20oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgcm90YXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdGF0ZScpO1xuICAgICAgICByb3RhdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIF9yZW5kZXJCb2FyZChib2FyZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZlcnRpY2FsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh2ZXJ0aWNhbCk7XG4gICAgICAgICAgICAgICAgX3JlbmRlckJvYXJkKGJvYXJkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IF9yZW5kZXJCb2FyZCA9IChib2FyZCkgPT4ge1xuICAgICAgICBjb25zdCBpbml0Qm9hcmQgPSBib2FyZDtcblxuICAgICAgICB3aGlsZSAoaW5pdEJvYXJkLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGluaXRCb2FyZC5maXJzdENoaWxkLnJlbW92ZSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCAxMTsgaisrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDExOyBrKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7an0ke2t9YCk7XG4gICAgICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NvbnRhaW5lcicpO1xuXG4gICAgICAgICAgICAgICAgX3BsYWNlQ2FycmllcihjZWxsLCBqLCBrKTtcblxuICAgICAgICAgICAgICAgIGluaXRCb2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IF9wbGFjZUNhcnJpZXIgPSAoY2VsbCwgaiwgaykgPT4ge1xuXG4gICAgICAgIGNvbnN0IHBhcnQxID0gY2VsbDtcbiAgICAgICAgXG4gICAgICAgIGlmICh2ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChrIDwgOCkge1xuICAgICAgICAgICAgICAgIHBhcnQxLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDIgPSBwYXJ0MS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQzID0gcGFydDIubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0NCA9IHBhcnQzLm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0MS5jbGFzc0xpc3QuYWRkKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0Mi5jbGFzc0xpc3QuYWRkKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0My5jbGFzc0xpc3QuYWRkKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0NC5jbGFzc0xpc3QuYWRkKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcGFydDEuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDIgPSBwYXJ0MS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQzID0gcGFydDIubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0NCA9IHBhcnQzLm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0MS5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0Mi5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0My5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0NC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBwYXJ0MS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDIgPSBwYXJ0MS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQzID0gcGFydDIubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0NCA9IHBhcnQzLm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0MS5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgICAgICAgICAgICAgIHBhcnQyLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgICAgICAgICAgICAgcGFydDMuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0NC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHZlcnRpY2FsKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChqIDwgOCkge1xuICAgICAgICAgICAgICAgIHBhcnQxLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtqICsgMX0ke2t9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aiArIDJ9JHtrfWApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0NCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2ogKyAzfSR7a31gKTtcblxuICAgICAgICAgICAgICAgICAgICBwYXJ0MS5jbGFzc0xpc3QuYWRkKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0Mi5jbGFzc0xpc3QuYWRkKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0My5jbGFzc0xpc3QuYWRkKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0NC5jbGFzc0xpc3QuYWRkKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwYXJ0MS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2ogKyAxfSR7a31gKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtqICsgMn0ke2t9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aiArIDN9JHtrfWApO1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnQxLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXBzcG90Jyk7XG4gICAgICAgICAgICAgICAgICAgIHBhcnQyLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXBzcG90Jyk7XG4gICAgICAgICAgICAgICAgICAgIHBhcnQzLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXBzcG90Jyk7XG4gICAgICAgICAgICAgICAgICAgIHBhcnQ0LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXBzcG90Jyk7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHBhcnQxLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2ogKyAxfSR7a31gKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydDMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtqICsgMn0ke2t9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aiArIDN9JHtrfWApO1xuXG4gICAgICAgICAgICAgICAgICAgIHBhcnQxLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgICAgICAgICAgICAgcGFydDIuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0My5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgICAgICAgICAgICAgIHBhcnQ0LmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCByZW1vdmVQbGFjZVNoaXBQb3B1cCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGxhY2VTaGlwc1BvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlU2hpcHMnKTtcbiAgICAgICAgcGxhY2VTaGlwc1BvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfTtcblxuXG4gICAgcmV0dXJuIHtyZW1vdmVQbGFjZVNoaXBQb3B1cCwgZGlzcGxheUJvYXJkcywgZGlzcGxheUhpdCwgZGlzcGxheVNoaXBzLCBkaXNwbGF5TWlzcywgZGlzcGxheVN1ckxvY2F0aW9ucywgZGlzcGxheVN0YXJ0TmV3LCBwbGFjZVNoaXBzUG9wdXB9XG59KSgpIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL3NyYy9pbWFnZXMvaWNvbnM4LWZpcmUtNDgucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi4vc3JjL2ltYWdlcy9jbG9zZS5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbn1cXG5cXG4ubWFpbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBoZWlnaHQ6IG1pbig3MHZoKTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnAxYixcXG4ucDJiLCBcXG4uYm9hcmQge1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICB3aWR0aDogNTAwcHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIG1pbm1heCg1MHB4LCAxZnIpKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIG1pbm1heCg1MHB4LCAxZnIpKTtcXG5cXG59XFxuXFxuLnAxYiBkaXYsXFxuLnAyYiBkaXYge1xcbiAgICAvKiBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgKi9cXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jdXJ0YWluIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICB3aWR0aDogNTAwcHg7XFxufVxcblxcbmZvb3RlcixcXG5oZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTIyLCAxNTEsIDI0OCk7XFxuICAgIGhlaWdodDogbWluKDE1dmgpO1xcbiAgICBmb250LXNpemU6IDd2aDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmZvb3RlcntcXG4gICAgZm9udC1zaXplOiBsYXJnZTtcXG59XFxuXFxuLmhpdCB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDE2OSwgMTY5KTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbn1cXG5cXG4uc2hpcCwgLnNoaXBHcm91cD5kaXYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcbn1cXG5cXG4ubWlzcyB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIik7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogNzAlO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxufVxcblxcbi5zdXJ7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIik7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogNzAlO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxufVxcblxcbi5zY2FsZXtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbn1cXG5cXG4uc3RhcnROZXd7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGhlaWdodDogMTUwcHg7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEyMiwgMTUxLCAyNDgpO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMjUlO1xcbiAgICBsZWZ0OiA0NCU7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigwLCAwLCAwKTtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zdGFydE5ldyBwe1xcbiAgICBmb250LXNpemU6IDI0cHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICB3aWR0aDogMTAwcHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigwLCAwLCAwKTtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbn1cXG5cXG4ucGxhY2VTaGlwc3tcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgaGVpZ2h0OiA2MDBweDtcXG4gICAgd2lkdGg6IDkwMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTIyLCAxNTEsIDI0OCk7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYm9yZGVyOiAycHggc29saWQgcmdiKDAsIDAsIDApO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnBsYWNlU2hpcHMgI2JvYXJkPmRpdntcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDAsIDAsIDApO1xcbn1cXG5cXG4uYm9hcmR3cmFwe1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB3aWR0aDogODAwcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuLnNoaXBze1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICB3aWR0aDogMzAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBtYXJnaW4tbGVmdDogMzBweDtcXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTIyLCAxNTEsIDI0OCk7XFxufVxcblxcbi5zaGlwcyBidXR0b257XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcblxcbi5zaGlwcyBwe1xcbiAgICBmb250LXNpemU6IDI1cHg7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxNywgMCwgMjU1KTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4uc2hpcEdyb3Vwe1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgd2lkdGg6IDk1JTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuXFxuI2NhcnJpZXJ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIG1pbig1MHB4KSk7XFxufVxcblxcbiNiYXR0bGVjcnVpc2Vye1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCBtaW4oNTBweCkpO1xcbn1cXG5cXG4jZGVzdHJveWVye1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCBtaW4oNTBweCkpO1xcbn1cXG5cXG4jZ3Vuc2hpcHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgbWluKDUwcHgpKTtcXG59XFxuXFxuI2NhcnJpZXIsICNiYXR0bGVjcnVpc2VyLCAjZGVzdHJveWVyLCAjZ3Vuc2hpcCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOyBcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtYXgoNDhweCk7XFxufVxcblxcbi5wYXJ0e1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE3LCAwLCAyNTUpO1xcbn1cXG5cXG4ubm9Cb3JkZXJ7XFxuICAgIGJvcmRlcjogbm9uZTtcXG59XFxuXFxuLnNoaXBzcG90e1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVldmlvbGV0O1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksU0FBUztJQUNULFlBQVk7SUFDWixVQUFVO0lBQ1Ysc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsNkJBQTZCO0lBQzdCLGlCQUFpQjtJQUNqQixtQkFBbUI7QUFDdkI7O0FBRUE7OztJQUdJLGFBQWE7SUFDYixZQUFZO0lBQ1osdUJBQXVCO0lBQ3ZCLHVCQUF1QjtJQUN2QixhQUFhO0lBQ2Isb0RBQW9EO0lBQ3BELGlEQUFpRDs7QUFFckQ7O0FBRUE7O0lBRUk7OzBCQUVzQjtJQUN0Qix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLFlBQVk7QUFDaEI7O0FBRUE7O0lBRUksYUFBYTtJQUNiLG9DQUFvQztJQUNwQyxpQkFBaUI7SUFDakIsY0FBYztJQUNkLHVCQUF1QjtJQUN2QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSx5REFBdUQ7SUFDdkQsb0NBQW9DO0lBQ3BDLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLHlEQUE4QztJQUM5Qyw0QkFBNEI7SUFDNUIsb0JBQW9CO0lBQ3BCLDJCQUEyQjtBQUMvQjs7QUFFQTtJQUNJLHlEQUE4QztJQUM5Qyw0QkFBNEI7SUFDNUIsb0JBQW9CO0lBQ3BCLDJCQUEyQjtBQUMvQjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsYUFBYTtJQUNiLFlBQVk7SUFDWixvQ0FBb0M7SUFDcEMsa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixTQUFTO0lBQ1QsOEJBQThCO0lBQzlCLDZCQUE2QjtJQUM3QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxlQUFlO0lBQ2Ysa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLFlBQVk7SUFDWiw4QkFBOEI7SUFDOUIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsYUFBYTtJQUNiLFlBQVk7SUFDWixvQ0FBb0M7SUFDcEMsa0JBQWtCO0lBQ2xCLDhCQUE4QjtJQUM5Qiw2QkFBNkI7SUFDN0IsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLFlBQVk7SUFDWiw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYixZQUFZO0lBQ1osdUJBQXVCO0lBQ3ZCLGlCQUFpQjtJQUNqQixxQkFBcUI7SUFDckIsb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGlDQUFpQztJQUNqQyxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDhCQUE4QjtJQUM5QixrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLG1CQUFtQjtJQUNuQixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSwyQ0FBMkM7QUFDL0M7O0FBRUE7SUFDSSwyQ0FBMkM7QUFDL0M7O0FBRUE7SUFDSSwyQ0FBMkM7QUFDL0M7O0FBRUE7SUFDSSwyQ0FBMkM7QUFDL0M7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLDZCQUE2QjtBQUNqQzs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixpQ0FBaUM7QUFDckM7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksNEJBQTRCO0FBQ2hDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG59XFxuXFxuLm1haW4ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgaGVpZ2h0OiBtaW4oNzB2aCk7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5wMWIsXFxuLnAyYiwgXFxuLmJvYXJkIHtcXG4gICAgaGVpZ2h0OiA1MDBweDtcXG4gICAgd2lkdGg6IDUwMHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCBtaW5tYXgoNTBweCwgMWZyKSk7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCBtaW5tYXgoNTBweCwgMWZyKSk7XFxuXFxufVxcblxcbi5wMWIgZGl2LFxcbi5wMmIgZGl2IHtcXG4gICAgLyogZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7ICovXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uY3VydGFpbiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgaGVpZ2h0OiA1MDBweDtcXG4gICAgd2lkdGg6IDUwMHB4O1xcbn1cXG5cXG5mb290ZXIsXFxuaGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEyMiwgMTUxLCAyNDgpO1xcbiAgICBoZWlnaHQ6IG1pbigxNXZoKTtcXG4gICAgZm9udC1zaXplOiA3dmg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5mb290ZXJ7XFxuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XFxufVxcblxcbi5oaXQge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi4vc3JjL2ltYWdlcy9pY29uczgtZmlyZS00OC5wbmcpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ1LCAxNjksIDE2OSk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG59XFxuXFxuLnNoaXAsIC5zaGlwR3JvdXA+ZGl2IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcXG59XFxuXFxuLm1pc3Mge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi4vc3JjL2ltYWdlcy9jbG9zZS5wbmcpO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDcwJTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbn1cXG5cXG4uc3Vye1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi4vc3JjL2ltYWdlcy9jbG9zZS5wbmcpO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDcwJTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbn1cXG5cXG4uc2NhbGV7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG59XFxuXFxuLnN0YXJ0TmV3e1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBoZWlnaHQ6IDE1MHB4O1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMjIsIDE1MSwgMjQ4KTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDI1JTtcXG4gICAgbGVmdDogNDQlO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMCwgMCwgMCk7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc3RhcnROZXcgcHtcXG4gICAgZm9udC1zaXplOiAyNHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbmJ1dHRvbiB7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgd2lkdGg6IDEwMHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMCwgMCwgMCk7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG59XFxuXFxuLnBsYWNlU2hpcHN7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGhlaWdodDogNjAwcHg7XFxuICAgIHdpZHRoOiA5MDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEyMiwgMTUxLCAyNDgpO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHJnYigwLCAwLCAwKTtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5wbGFjZVNoaXBzICNib2FyZD5kaXZ7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigwLCAwLCAwKTtcXG59XFxuXFxuLmJvYXJkd3JhcHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IDgwMHB4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbi5zaGlwc3tcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgaGVpZ2h0OiA1MDBweDtcXG4gICAgd2lkdGg6IDMwMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgbWFyZ2luLWxlZnQ6IDMwcHg7XFxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEyMiwgMTUxLCAyNDgpO1xcbn1cXG5cXG4uc2hpcHMgYnV0dG9ue1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG5cXG4uc2hpcHMgcHtcXG4gICAgZm9udC1zaXplOiAyNXB4O1xcbn1cXG5cXG5idXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTcsIDAsIDI1NSk7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLnNoaXBHcm91cHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHdpZHRoOiA5NSU7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcblxcbiNjYXJyaWVye1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCBtaW4oNTBweCkpO1xcbn1cXG5cXG4jYmF0dGxlY3J1aXNlcntcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgbWluKDUwcHgpKTtcXG59XFxuXFxuI2Rlc3Ryb3llcntcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgbWluKDUwcHgpKTtcXG59XFxuXFxuI2d1bnNoaXB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIG1pbig1MHB4KSk7XFxufVxcblxcbiNjYXJyaWVyLCAjYmF0dGxlY3J1aXNlciwgI2Rlc3Ryb3llciwgI2d1bnNoaXAge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogbWF4KDQ4cHgpO1xcbn1cXG5cXG4ucGFydHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxNywgMCwgMjU1KTtcXG59XFxuXFxuLm5vQm9yZGVye1xcbiAgICBib3JkZXI6IG5vbmU7XFxufVxcblxcbi5zaGlwc3BvdHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZXZpb2xldDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTsgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsidmlldyIsImluaXRQb3B1cCIsIm1vZGVsIiwiY29udHJvbGxlciIsIm1vdmVDb3VudGVyIiwiX3JhbmRvbU1vdmVHZW4iLCJwbGF5ZXIiLCJyYW5kb21Nb3ZlIiwiTWF0aCIsImNlaWwiLCJyYW5kb20iLCJib2FyZCIsImlsbGVnYWxNb3ZlcyIsImluZGV4T2YiLCJtYWtlTW92ZSIsImNlbGwiLCJwbGF5ZXJzIiwicmVjZWl2ZUF0dGFjayIsImNoZWNrV2lubmVyIiwic2hpcHNTdW5rIiwibGVuZ3RoIiwiaXNXaW5uZXIiLCJkaXNwbGF5U3RhcnROZXciLCJzdGFydE5ldyIsInN0YXJ0UmFuZG9tIiwiaW5pdFBsYXllcnMiLCJyYW5kb21Mb2NhdGlvbnMiLCJyZW1vdmVQbGFjZVNoaXBQb3B1cCIsImRpc3BsYXlCb2FyZHMiLCJkaXNwbGF5U2hpcHMiLCJnZXRGbGVldCIsInBsYWNlU2hpcHNQb3B1cCIsInNoaXBGYWN0b3J5Iiwic2hpcExlbmd0aCIsImRpcmVjdGlvbiIsInN0YXJ0TG9jYXRpb24iLCJsb2NhdGlvbnMiLCJzdXJMb2NhdGlvbnMiLCJmb3JiTG9jYXRpb25zIiwiaGl0cyIsImlzU3VuayIsInNldENvb3JkIiwiY2VsbHMiLCJpIiwicHVzaCIsImdldHRpbmdIaXQiLCJsb2NhdGlvbiIsImdldHRpbmdTdW5rIiwic2hpcCIsImRpc3BsYXlTdXJMb2NhdGlvbnMiLCJib2FyZEZhY3RvcnkiLCJpZCIsImJvYXJkSWQiLCJib2FyZFNpemUiLCJzaGlwcyIsInNoaXBMb2NhdGlvbnMiLCJ1bmRlZmluZWQiLCJzaGlwU3BvdCIsImdlbmVyYXRlTG9jYXRpb25zIiwiY29uY2F0IiwiY2hlY2tDb2xsaXNpb24iLCJjdXN0b21Mb2NhdGlvbnMiLCJqIiwiY29sIiwicm93IiwibmV3TG9jYXRpb25zIiwiY29uc29sZSIsImxvZyIsImRpc3BsYXlIaXQiLCJkaXNwbGF5TWlzcyIsInBsYXllcklkIiwiZmxlZXRDb29yZHMiLCJwbGF5ZXIxIiwicGxheWVyMiIsInZlcnRpY2FsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImZpcnN0Q2hpbGQiLCJyZW1vdmUiLCJrIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJhcHBlbmRDaGlsZCIsImNlbGxJRCIsImNsYXNzTGlzdCIsImFkZCIsInNldFRpbWVvdXQiLCJwaHJhemUiLCJzdGFydE5ld1BvcHVwIiwiaW5uZXJIVE1MIiwiY3V0cmFpbiIsIm1haW4iLCJwMmIiLCJwbGF5QWdhaW4iLCJyZW1vdmVDaGlsZCIsInN0eWxlIiwiZGlzcGxheSIsIl9yZW5kZXJCb2FyZCIsIm9rIiwicm90YXRlIiwiaW5pdEJvYXJkIiwiX3BsYWNlQ2FycmllciIsInBhcnQxIiwicGFydDIiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJwYXJ0MyIsInBhcnQ0Il0sInNvdXJjZVJvb3QiOiIifQ==