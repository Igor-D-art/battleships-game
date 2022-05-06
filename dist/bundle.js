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
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/model.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./src/index.js");



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
    console.table(players[1].board.illegalMoves);

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
      alert("Player ".concat(players[1].playerId, " is the winner!"));
    } else if (players[1].board.shipsSunk().length === 10) {
      players[0].isWinner = true;
      alert("Player ".concat(players[0].playerId, " is the winner!"));
      startNew();
    }

    ;
  };

  var startNew = function startNew() {
    (0,_index__WEBPACK_IMPORTED_MODULE_2__.init)();
  };

  return {
    moveCounter: moveCounter,
    makeMove: makeMove,
    checkWinner: checkWinner
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
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _src_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/style.css */ "./src/style.css");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ "./src/model.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ "./src/view.js");



function init() {
  var player1 = _model__WEBPACK_IMPORTED_MODULE_1__.model.player(1);
  var player2 = _model__WEBPACK_IMPORTED_MODULE_1__.model.player(2);
  var players = [player1, player2];
  player1.board.randomLocations();
  player2.board.randomLocations();
  _view__WEBPACK_IMPORTED_MODULE_2__.view.displayBoards(players);
  _view__WEBPACK_IMPORTED_MODULE_2__.view.displayShips(player1.getFleet());
}
;
init();

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
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller */ "./src/controller.js");
function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }



var model = function () {
  var shipFactory = function shipFactory(length) {
    var shipLength = length;
    var direction = Math.ceil(Math.random() * 2);
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
      forbLocations: forbLocations
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
        do {
          var shipSpot = generateLocations(ships[i]);
          shipLocations = shipSpot[0];
          surLocations = shipSpot[1];
          forbLocations = shipLocations.concat(surLocations);
        } while (checkCollision(shipLocations));

        ships[i].locations = shipLocations;
        ships[i].surLocations = surLocations;
        ships[i].forbLocations = forbLocations;

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
            console.log(player.board.illegalMoves);
            console.log(ships[i].surLocations);
          }

          ;
          break;
        } else if (ships[i].locations.indexOf(cell) === -1) {
          // console.log('Im in receiveAttack MISS block. Giving to view cell = ' + cell)
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

  return {
    player: player
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
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ "./src/model.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./src/index.js");



var view = function () {
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

          if (i === 2) {
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
    for (var i = 0; i < cells.length; i++) {
      var cell = document.getElementById(cells[i]);

      if (cell !== undefined && cell !== null) {
        cell.classList.add('sur');
      }

      ;
    }

    ;
  };

  return {
    displayBoards: displayBoards,
    displayHit: displayHit,
    displayShips: displayShips,
    displayMiss: displayMiss,
    displaySurLocations: displaySurLocations
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n    margin: 0;\n    border: none;\n    padding: 0;\n}\n\nbody {\n    height: 100vh;\n    width: 100vw;\n}\n\n.message {\n    height: 10vh;\n}\n\n.main {\n    display: flex;\n    justify-content: space-around;\n    position: relative;\n    height: 70vh;\n}\n\n.p1b,\n.p2b {\n    height: 500px;\n    width: 500px;\n    border: 1px solid black;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n}\n\n.p1b div,\n.p2b div {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: 1px solid blue;\n}\n\nfooter,\nheader {\n    background-color: aqua;\n    height: 10vh;\n}\n\n.hit {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n    background-color: rgb(245, 169, 169);\n    background-size: 100%;\n}\n\n.ship {\n    background-color: blue;\n}\n\n.miss {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n    background-size: 100%;\n}\n\n.sur{\n    /* background-color: green; */\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n    background-size: 100%;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,YAAY;IACZ,UAAU;AACd;;AAEA;IACI,aAAa;IACb,YAAY;AAChB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,kBAAkB;IAClB,YAAY;AAChB;;AAEA;;IAEI,aAAa;IACb,YAAY;IACZ,uBAAuB;IACvB,aAAa;IACb,sCAAsC;IACtC,mCAAmC;AACvC;;AAEA;;IAEI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,sBAAsB;AAC1B;;AAEA;;IAEI,sBAAsB;IACtB,YAAY;AAChB;;AAEA;IACI,yDAAuD;IACvD,oCAAoC;IACpC,qBAAqB;AACzB;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,yDAA8C;IAC9C,qBAAqB;AACzB;;AAEA;IACI,6BAA6B;IAC7B,yDAA8C;IAC9C,qBAAqB;AACzB","sourcesContent":["* {\n    margin: 0;\n    border: none;\n    padding: 0;\n}\n\nbody {\n    height: 100vh;\n    width: 100vw;\n}\n\n.message {\n    height: 10vh;\n}\n\n.main {\n    display: flex;\n    justify-content: space-around;\n    position: relative;\n    height: 70vh;\n}\n\n.p1b,\n.p2b {\n    height: 500px;\n    width: 500px;\n    border: 1px solid black;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n}\n\n.p1b div,\n.p2b div {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: 1px solid blue;\n}\n\nfooter,\nheader {\n    background-color: aqua;\n    height: 10vh;\n}\n\n.hit {\n    background-image: url(../src/images/icons8-fire-48.png);\n    background-color: rgb(245, 169, 169);\n    background-size: 100%;\n}\n\n.ship {\n    background-color: blue;\n}\n\n.miss {\n    background-image: url(../src/images/close.png);\n    background-size: 100%;\n}\n\n.sur{\n    /* background-color: green; */\n    background-image: url(../src/images/close.png);\n    background-size: 100%;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Yy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL3NyYy9tb2RlbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vc3JjL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtb2RlbCB9IGZyb20gXCIuL21vZGVsXCI7XG5pbXBvcnQgeyB2aWV3IH0gZnJvbSBcIi4vdmlld1wiO1xuaW1wb3J0IHsgaW5pdCB9IGZyb20gXCIuL2luZGV4XCI7XG5cbmV4cG9ydCBjb25zdCBjb250cm9sbGVyID0gKCgpID0+IHtcblxuICAgIGxldCBtb3ZlQ291bnRlciA9IDA7XG4gICAgXG4gICAgY29uc3QgX3JhbmRvbU1vdmVHZW4gPSAocGxheWVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHJhbmRvbU1vdmUgPSAxICsgYCR7TWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAoMTApKX1gICsgYCR7TWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAoMTApKX1gO1xuICAgICAgICBpZiAocGxheWVyLmJvYXJkLmlsbGVnYWxNb3Zlcy5pbmRleE9mKHJhbmRvbU1vdmUpID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHJhbmRvbU1vdmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIF9yYW5kb21Nb3ZlR2VuKHBsYXllcik7XG4gICAgICAgIH07ICBcbiAgICB9O1xuXG4gICAgY29uc3QgbWFrZU1vdmUgPSAoY2VsbCwgcGxheWVycykgPT4ge1xuICAgICAgICBjb25zb2xlLnRhYmxlKHBsYXllcnNbMV0uYm9hcmQuaWxsZWdhbE1vdmVzKVxuICAgICAgICBpZiAocGxheWVyc1sxXS5ib2FyZC5pbGxlZ2FsTW92ZXMuaW5kZXhPZihjZWxsKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHBsYXllcnNbMV0uYm9hcmQucmVjZWl2ZUF0dGFjayhjZWxsLCBwbGF5ZXJzWzFdKTtcbiAgICAgICAgICAgIHBsYXllcnNbMF0uYm9hcmQucmVjZWl2ZUF0dGFjayhfcmFuZG9tTW92ZUdlbihwbGF5ZXJzWzBdKSwgcGxheWVyc1swXSk7XG4gICAgICAgICAgICBtb3ZlQ291bnRlciArPSAxO1xuICAgICAgICAgICAgY2hlY2tXaW5uZXIocGxheWVycyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IGNoZWNrV2lubmVyID0gKHBsYXllcnMpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGlmIChwbGF5ZXJzWzBdLmJvYXJkLnNoaXBzU3VuaygpLmxlbmd0aCA9PT0gMTApIHtcbiAgICAgICAgICAgIHBsYXllcnNbMV0uaXNXaW5uZXIgPSB0cnVlOyBcbiAgICAgICAgICAgIGFsZXJ0KGBQbGF5ZXIgJHtwbGF5ZXJzWzFdLnBsYXllcklkfSBpcyB0aGUgd2lubmVyIWApO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYXllcnNbMV0uYm9hcmQuc2hpcHNTdW5rKCkubGVuZ3RoID09PSAxMCkge1xuICAgICAgICAgICAgcGxheWVyc1swXS5pc1dpbm5lciA9IHRydWU7IFxuICAgICAgICAgICAgYWxlcnQoYFBsYXllciAke3BsYXllcnNbMF0ucGxheWVySWR9IGlzIHRoZSB3aW5uZXIhYCk7XG4gICAgICAgICAgICBzdGFydE5ldygpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBzdGFydE5ldyA9ICgpID0+IHtcbiAgICAgICAgaW5pdCgpO1xuICAgIH07XG5cbiAgICByZXR1cm4geyBtb3ZlQ291bnRlciwgbWFrZU1vdmUsIGNoZWNrV2lubmVyfTtcblxufSkoKTtcbiIsImltcG9ydCAnLi4vc3JjL3N0eWxlLmNzcyc7XG5cbmltcG9ydCB7IG1vZGVsIH0gZnJvbSBcIi4vbW9kZWxcIjtcbmltcG9ydCB7IHZpZXcgfSBmcm9tIFwiLi92aWV3XCI7XG4gICAgXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcblxuICAgIGxldCBwbGF5ZXIxID0gbW9kZWwucGxheWVyKDEpO1xuICAgIGxldCBwbGF5ZXIyID0gbW9kZWwucGxheWVyKDIpO1xuXG4gICAgY29uc3QgcGxheWVycyA9IFtwbGF5ZXIxLCBwbGF5ZXIyXTtcblxuICAgIHBsYXllcjEuYm9hcmQucmFuZG9tTG9jYXRpb25zKCk7XG4gICAgcGxheWVyMi5ib2FyZC5yYW5kb21Mb2NhdGlvbnMoKTtcblxuICAgIHZpZXcuZGlzcGxheUJvYXJkcyhwbGF5ZXJzKTtcbiAgICB2aWV3LmRpc3BsYXlTaGlwcyhwbGF5ZXIxLmdldEZsZWV0KCkpO1xuICAgIFxufTtcblxuaW5pdCgpO1xuXG5cblxuXG5cblxuXG4iLCJpbXBvcnQgeyB2aWV3IH0gZnJvbSBcIi4vdmlld1wiO1xuaW1wb3J0IHsgY29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGNvbnN0IG1vZGVsID0gKCgpID0+IHtcblxuICAgIGNvbnN0IHNoaXBGYWN0b3J5ID0gKGxlbmd0aCkgPT4ge1xuICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgICBjb25zdCBsb2NhdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3Qgc3VyTG9jYXRpb25zID0gW107XG4gICAgICAgIGNvbnN0IGZvcmJMb2NhdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3QgaGl0cyA9IFtdO1xuICAgICAgICBsZXQgaXNTdW5rID0gZmFsc2U7XG5cbiAgICAgICAgY29uc3Qgc2V0Q29vcmQgPSAoY2VsbHMpID0+IHtcbiAgICAgICAgICAgIGlmIChjZWxscykge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9ucyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9ucy5wdXNoKGAke2NlbGxzW2ldfWApO1xuICAgICAgICAgICAgICAgIH07IFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBnZXR0aW5nSGl0ID0gKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgICAgICBoaXRzW2xvY2F0aW9uXSA9ICdoaXQnO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZ2V0dGluZ1N1bmsgPSAoc2hpcCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNoaXAuaGl0cy5pbmRleE9mKCcnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzaGlwLmlzU3VuayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmlldy5kaXNwbGF5U3VyTG9jYXRpb25zKHNoaXAuc3VyTG9jYXRpb25zKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gc2hpcC5pc1N1bms7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHsgc2V0Q29vcmQgLGxvY2F0aW9ucywgaGl0cywgaXNTdW5rLCBnZXR0aW5nU3VuaywgZGlyZWN0aW9uLCBnZXR0aW5nSGl0LCBzaGlwTGVuZ3RoLCBzdXJMb2NhdGlvbnMsIGZvcmJMb2NhdGlvbnN9O1xuICAgIH07XG5cbiAgICBjb25zdCBib2FyZEZhY3RvcnkgPSAoaWQpID0+IHtcblxuICAgICAgICBjb25zdCBib2FyZElkID0gaWQ7XG5cbiAgICAgICAgY29uc3QgYm9hcmRTaXplID0gMTA7XG5cbiAgICAgICAgY29uc3Qgc2hpcHMgPSBbc2hpcEZhY3RvcnkoNCksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwRmFjdG9yeSgzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBGYWN0b3J5KDMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEZhY3RvcnkoMiksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwRmFjdG9yeSgyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBGYWN0b3J5KDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEZhY3RvcnkoMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwRmFjdG9yeSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBGYWN0b3J5KDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEZhY3RvcnkoMSldO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2hpcHNTdW5rID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hpcHNTdW5rID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBpZiAoc2hpcHNbaV0uaXNTdW5rID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzU3Vuay5wdXNoKHNoaXBzW2ldKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBzaGlwc1N1bms7XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IGlsbGVnYWxNb3ZlcyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IHJhbmRvbUxvY2F0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzaGlwTG9jYXRpb25zO1xuICAgICAgICAgICAgbGV0IHN1ckxvY2F0aW9ucztcbiAgICAgICAgICAgIGxldCBmb3JiTG9jYXRpb25zO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGlwU3BvdCA9IGdlbmVyYXRlTG9jYXRpb25zKHNoaXBzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgc2hpcExvY2F0aW9ucyA9IHNoaXBTcG90WzBdO1xuICAgICAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMgPSBzaGlwU3BvdFsxXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yYkxvY2F0aW9ucyA9IHNoaXBMb2NhdGlvbnMuY29uY2F0KHN1ckxvY2F0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoY2hlY2tDb2xsaXNpb24oc2hpcExvY2F0aW9ucykpO1xuICAgICAgICAgICAgICAgIHNoaXBzW2ldLmxvY2F0aW9ucyA9IHNoaXBMb2NhdGlvbnM7XG4gICAgICAgICAgICAgICAgc2hpcHNbaV0uc3VyTG9jYXRpb25zID0gc3VyTG9jYXRpb25zO1xuICAgICAgICAgICAgICAgIHNoaXBzW2ldLmZvcmJMb2NhdGlvbnMgPSBmb3JiTG9jYXRpb25zO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaGlwc1tpXS5zaGlwTGVuZ3RoOyBqKyspe1xuICAgICAgICAgICAgICAgICAgc2hpcHNbaV0uaGl0cy5wdXNoKCcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGdlbmVyYXRlTG9jYXRpb25zID0gKHNoaXApID0+IHtcbiAgICAgICAgICAgIGxldCBjb2w7XG4gICAgICAgICAgICBsZXQgcm93O1xuXG4gICAgICAgICAgICBjb25zdCBuZXdMb2NhdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHN1ckxvY2F0aW9ucyA9IFtdO1xuICAgICAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcm93ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiBib2FyZFNpemUpO1xuICAgICAgICAgICAgICAgIGNvbCA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSAtIChzaGlwLnNoaXBMZW5ndGggKyAxKSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3cgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIChib2FyZFNpemUgLSAoc2hpcC5zaGlwTGVuZ3RoICsgMSkpKTtcbiAgICAgICAgICAgICAgICBjb2wgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIGJvYXJkU2l6ZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0xvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3d9YCArIChjb2wgKyBpKSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXdMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7KHJvdyArIGkpfWAgKyBgJHtjb2x9YClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNoaXBMZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgKyAxfWAgKyAoY29sICsgaSkpO1xuICAgICAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93IC0gMX1gICsgKGNvbCArIGkpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgLSAxfWAgKyAoY29sIC0gMSkpO1xuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3d9YCArIChjb2wgLSAxKSk7XG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIDF9YCArIChjb2wgLSAxKSk7XG5cbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93IC0gMX1gICsgKGNvbCArIHNoaXAuc2hpcExlbmd0aCkpO1xuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3d9YCArIChjb2wgKyBzaGlwLnNoaXBMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93ICsgMX1gICsgKGNvbCArIHNoaXAuc2hpcExlbmd0aCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2hpcExlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIGl9YCArIChjb2wgKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgKyBpfWAgKyAoY29sIC0gMSkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyAtIDF9YCArIChjb2wgLSAxKSk7XG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyAtIDF9YCArIChjb2wpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93IC0gMX1gICsgKGNvbCArIDEpKTtcblxuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgKyBzaGlwLnNoaXBMZW5ndGh9YCArIChjb2wgLTEpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93ICsgc2hpcC5zaGlwTGVuZ3RofWAgKyAoY29sKSk7XG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIHNoaXAuc2hpcExlbmd0aH1gICsgKGNvbCArIDEpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gW25ld0xvY2F0aW9ucywgc3VyTG9jYXRpb25zXTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjaGVja0NvbGxpc2lvbiA9IChsb2NhdGlvbnMpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbG9jYXRpb25zLmxlbmd0aDsgaisrKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoaXBzW2ldLmZvcmJMb2NhdGlvbnMuaW5kZXhPZihsb2NhdGlvbnNbal0pID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYG5vIGNvbGxpc2lvbnMgb24gc2hpcCAke3NoaXBzW2ldfWApXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY2VsbCwgcGxheWVyKSA9PiB7XG4gICAgICAgICAgICBwbGF5ZXIuYm9hcmQuaWxsZWdhbE1vdmVzLnB1c2goY2VsbCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIuYm9hcmQuaWxsZWdhbE1vdmVzKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2hpcHNbaV0ubG9jYXRpb25zLmluZGV4T2YoY2VsbCkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LmRpc3BsYXlIaXQoY2VsbCk7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLmdldHRpbmdIaXQoc2hpcHNbaV0ubG9jYXRpb25zLmluZGV4T2YoY2VsbCkpO1xuICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5nZXR0aW5nU3VuayhzaGlwc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwc1tpXS5nZXR0aW5nU3VuayhzaGlwc1tpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5ib2FyZC5pbGxlZ2FsTW92ZXMgPSBwbGF5ZXIuYm9hcmQuaWxsZWdhbE1vdmVzLmNvbmNhdChzaGlwc1tpXS5zdXJMb2NhdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIuYm9hcmQuaWxsZWdhbE1vdmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNoaXBzW2ldLnN1ckxvY2F0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hpcHNbaV0ubG9jYXRpb25zLmluZGV4T2YoY2VsbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdJbSBpbiByZWNlaXZlQXR0YWNrIE1JU1MgYmxvY2suIEdpdmluZyB0byB2aWV3IGNlbGwgPSAnICsgY2VsbClcbiAgICAgICAgICAgICAgICAgICAgdmlldy5kaXNwbGF5TWlzcyhjZWxsKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTsgXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybntzaGlwcywgaWxsZWdhbE1vdmVzLCByZWNlaXZlQXR0YWNrLCBzaGlwc1N1bmssIHJhbmRvbUxvY2F0aW9uc31cbiAgICB9O1xuXG4gICAgY29uc3QgcGxheWVyID0gKGlkKSA9PiB7XG4gICAgICAgIGNvbnN0IHBsYXllcklkID0gaWQ7XG4gICAgICAgIGNvbnN0IGJvYXJkID0gYm9hcmRGYWN0b3J5KHBsYXllcklkKTtcbiAgICAgICAgY29uc3QgZ2V0RmxlZXQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGVldENvb3JkcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5zaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmQuc2hpcHNbaV0ubG9jYXRpb25zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZsZWV0Q29vcmRzLnB1c2goYm9hcmQuc2hpcHNbaV0ubG9jYXRpb25zW2pdKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGZsZWV0Q29vcmRzO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBpc1dpbm5lciA9IGZhbHNlO1xuICAgICAgICByZXR1cm57cGxheWVySWQsIGJvYXJkLCBnZXRGbGVldCwgaXNXaW5uZXJ9XG4gICAgfTtcbiAgICBcbiAgICByZXR1cm4geyBwbGF5ZXIgfTtcblxufSkoKSIsImltcG9ydCB7IGNvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBtb2RlbCB9IGZyb20gXCIuL21vZGVsXCI7XG5pbXBvcnQgeyBpbmRleCB9IGZyb20gXCIuL2luZGV4XCI7XG5cbmV4cG9ydCBjb25zdCB2aWV3ID0gKCgpID0+IHtcblxuICAgIGNvbnN0IGRpc3BsYXlCb2FyZHMgPSAocGxheWVycykgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDM7IGkrKyl7XG4gICAgICAgICAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwJyArIGkgKyAnYicpO1xuICAgICAgICAgICAgd2hpbGUgKGJvYXJkLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICBib2FyZC5maXJzdENoaWxkLnJlbW92ZSgpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCAxMTsgaisrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCAxMTsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2lkJywgaSArIGAke2p9YCArIGspO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2VsbCcpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5tYWtlTW92ZShjZWxsLmlkLCBwbGF5ZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBkaXNwbGF5SGl0ID0gKGNlbGxJRCkgPT4ge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2VsbElEKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnbWlzcycpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgIH07XG5cbiAgICBjb25zdCBkaXNwbGF5TWlzcyA9IChjZWxsSUQpID0+IHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNlbGxJRCk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGlzcGxheVNoaXBzID0gKHNoaXBzKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2hpcHNbaV0gIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7c2hpcHNbaV19YCk7XG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBkaXNwbGF5U3VyTG9jYXRpb25zID0gKGNlbGxzKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2VsbHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNlbGxzW2ldKTtcbiAgICAgICAgICAgIGlmIChjZWxsICE9PSB1bmRlZmluZWQgJiYgY2VsbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc3VyJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByZXR1cm4ge2Rpc3BsYXlCb2FyZHMsIGRpc3BsYXlIaXQsIGRpc3BsYXlTaGlwcywgZGlzcGxheU1pc3MsIGRpc3BsYXlTdXJMb2NhdGlvbnN9XG59KSgpIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL3NyYy9pbWFnZXMvaWNvbnM4LWZpcmUtNDgucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi4vc3JjL2ltYWdlcy9jbG9zZS5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbn1cXG5cXG4ubWVzc2FnZSB7XFxuICAgIGhlaWdodDogMTB2aDtcXG59XFxuXFxuLm1haW4ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBoZWlnaHQ6IDcwdmg7XFxufVxcblxcbi5wMWIsXFxuLnAyYiB7XFxuICAgIGhlaWdodDogNTAwcHg7XFxuICAgIHdpZHRoOiA1MDBweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLnAxYiBkaXYsXFxuLnAyYiBkaXYge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmx1ZTtcXG59XFxuXFxuZm9vdGVyLFxcbmhlYWRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XFxuICAgIGhlaWdodDogMTB2aDtcXG59XFxuXFxuLmhpdCB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDE2OSwgMTY5KTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbn1cXG5cXG4uc2hpcCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XFxufVxcblxcbi5taXNzIHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbn1cXG5cXG4uc3Vye1xcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjsgKi9cXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksU0FBUztJQUNULFlBQVk7SUFDWixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsNkJBQTZCO0lBQzdCLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCOztBQUVBOztJQUVJLGFBQWE7SUFDYixZQUFZO0lBQ1osdUJBQXVCO0lBQ3ZCLGFBQWE7SUFDYixzQ0FBc0M7SUFDdEMsbUNBQW1DO0FBQ3ZDOztBQUVBOztJQUVJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLHNCQUFzQjtBQUMxQjs7QUFFQTs7SUFFSSxzQkFBc0I7SUFDdEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHlEQUF1RDtJQUN2RCxvQ0FBb0M7SUFDcEMscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0kseURBQThDO0lBQzlDLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLDZCQUE2QjtJQUM3Qix5REFBOEM7SUFDOUMscUJBQXFCO0FBQ3pCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgcGFkZGluZzogMDtcXG59XFxuXFxuYm9keSB7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG59XFxuXFxuLm1lc3NhZ2Uge1xcbiAgICBoZWlnaHQ6IDEwdmg7XFxufVxcblxcbi5tYWluIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgaGVpZ2h0OiA3MHZoO1xcbn1cXG5cXG4ucDFiLFxcbi5wMmIge1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICB3aWR0aDogNTAwcHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5wMWIgZGl2LFxcbi5wMmIgZGl2IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsdWU7XFxufVxcblxcbmZvb3RlcixcXG5oZWFkZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xcbiAgICBoZWlnaHQ6IDEwdmg7XFxufVxcblxcbi5oaXQge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi4vc3JjL2ltYWdlcy9pY29uczgtZmlyZS00OC5wbmcpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ1LCAxNjksIDE2OSk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG59XFxuXFxuLnNoaXAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcbn1cXG5cXG4ubWlzcyB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi9zcmMvaW1hZ2VzL2Nsb3NlLnBuZyk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG59XFxuXFxuLnN1cntcXG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47ICovXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi9zcmMvaW1hZ2VzL2Nsb3NlLnBuZyk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTsgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsibW9kZWwiLCJ2aWV3IiwiaW5pdCIsImNvbnRyb2xsZXIiLCJtb3ZlQ291bnRlciIsIl9yYW5kb21Nb3ZlR2VuIiwicGxheWVyIiwicmFuZG9tTW92ZSIsIk1hdGgiLCJjZWlsIiwicmFuZG9tIiwiYm9hcmQiLCJpbGxlZ2FsTW92ZXMiLCJpbmRleE9mIiwibWFrZU1vdmUiLCJjZWxsIiwicGxheWVycyIsImNvbnNvbGUiLCJ0YWJsZSIsInJlY2VpdmVBdHRhY2siLCJjaGVja1dpbm5lciIsInNoaXBzU3VuayIsImxlbmd0aCIsImlzV2lubmVyIiwiYWxlcnQiLCJwbGF5ZXJJZCIsInN0YXJ0TmV3IiwicGxheWVyMSIsInBsYXllcjIiLCJyYW5kb21Mb2NhdGlvbnMiLCJkaXNwbGF5Qm9hcmRzIiwiZGlzcGxheVNoaXBzIiwiZ2V0RmxlZXQiLCJzaGlwRmFjdG9yeSIsInNoaXBMZW5ndGgiLCJkaXJlY3Rpb24iLCJsb2NhdGlvbnMiLCJzdXJMb2NhdGlvbnMiLCJmb3JiTG9jYXRpb25zIiwiaGl0cyIsImlzU3VuayIsInNldENvb3JkIiwiY2VsbHMiLCJpIiwicHVzaCIsImdldHRpbmdIaXQiLCJsb2NhdGlvbiIsImdldHRpbmdTdW5rIiwic2hpcCIsImRpc3BsYXlTdXJMb2NhdGlvbnMiLCJib2FyZEZhY3RvcnkiLCJpZCIsImJvYXJkSWQiLCJib2FyZFNpemUiLCJzaGlwcyIsInNoaXBMb2NhdGlvbnMiLCJzaGlwU3BvdCIsImdlbmVyYXRlTG9jYXRpb25zIiwiY29uY2F0IiwiY2hlY2tDb2xsaXNpb24iLCJqIiwiY29sIiwicm93IiwibmV3TG9jYXRpb25zIiwibG9nIiwiZGlzcGxheUhpdCIsImRpc3BsYXlNaXNzIiwiZmxlZXRDb29yZHMiLCJpbmRleCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJmaXJzdENoaWxkIiwicmVtb3ZlIiwiayIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhZGRFdmVudExpc3RlbmVyIiwiYXBwZW5kQ2hpbGQiLCJjZWxsSUQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ1bmRlZmluZWQiXSwic291cmNlUm9vdCI6IiJ9