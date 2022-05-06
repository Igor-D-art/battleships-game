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
    console.log(randomMove);

    if (player.board.illegalMoves.indexOf(randomMove) === -1) {
      console.log(randomMove);
      return randomMove;
    } else {
      return _randomMoveGen(player);
    }

    ;
  };

  var makeMove = function makeMove(cell, players) {
    if (players[1].board.illegalMoves.indexOf(cell) === -1) {
      players[1].board.receiveAttack(cell);
      players[0].board.receiveAttack(_randomMoveGen(players[0]));
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

  var startNew = function startNew(players) {
    _view__WEBPACK_IMPORTED_MODULE_1__.view.displayBoards(players);
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
  console.log(player1.board.ships);
  console.log(player2.board.ships);
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
      }

      ;
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
      surLocations: surLocations
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

      for (var i = 0; i < ships.length; i++) {
        do {
          shipLocations = generateLocations(ships[i]);
        } while (checkCollision(shipLocations) && checkCollision(ships[i - 1].surLocations));

        ships[i].locations = shipLocations;

        for (var j = 0; j < ships[i].shipLength; j++) {
          ships[i].hits.push('');
        }
      }

      ;
    };

    var generateLocations = function generateLocations(ship) {
      var col;
      var row; // let startLocation;

      var newLocations = [];
      var surLocations = [];

      if (ship.direction === 1) {
        row = Math.ceil(Math.random() * boardSize);
        col = Math.ceil(Math.random() * (boardSize - (ship.shipLength + 1)));
      } else {
        row = Math.ceil(Math.random() * (boardSize - (ship.shipLength + 1)));
        col = Math.ceil(Math.random() * boardSize);
      }

      ; // startLocation = boardId + `${row}` + col;
      // newLocations.push(startLocation);

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
      ship.surLocations = surLocations;
      return newLocations;
    };

    var checkCollision = function checkCollision(locations) {
      for (var i = 0; i < ships.length; i++) {
        for (var j = 0; j < locations.length; j++) {
          if (ships[i].locations.indexOf(locations[j]) >= 0) {
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

    var receiveAttack = function receiveAttack(cell) {
      console.log('im in receive attack start. Cell = ' + cell);

      for (var i = 0; i < ships.length; i++) {
        if (ships[i].locations.indexOf(cell) >= 0) {
          console.log('Im in receiveAttack HIT block. Giving to view cell = ' + cell);
          _view__WEBPACK_IMPORTED_MODULE_0__.view.displayHit(cell);
          ships[i].gettingHit(ships[i].locations.indexOf(cell));
          ships[i].gettingSunk(ships[i]);
          break;
        } else if (ships[i].locations.indexOf(cell) === -1) {
          console.log('Im in receiveAttack MISS block. Giving to view cell = ' + cell);
          _view__WEBPACK_IMPORTED_MODULE_0__.view.displayMiss(cell); // break;
        }

        ;
      }

      ;
      illegalMoves.push(cell);
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
    console.log(cell);
    cell.classList.remove('ship');
    cell.classList.remove('miss');
    cell.classList.add('hit');
  };

  var displayMiss = function displayMiss(cellID) {
    console.log('Im in view, cellID = ' + cellID);
    var cell = document.getElementById(cellID);
    console.log(cell);
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

  return {
    displayBoards: displayBoards,
    displayHit: displayHit,
    displayShips: displayShips,
    displayMiss: displayMiss
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n    margin: 0;\n    border: none;\n    padding: 0;\n}\n\nbody {\n    height: 100vh;\n    width: 100vw;\n}\n\n.message {\n    height: 10vh;\n}\n\n.main {\n    display: flex;\n    justify-content: space-around;\n    position: relative;\n    height: 70vh;\n}\n\n.p1b,\n.p2b {\n    height: 500px;\n    width: 500px;\n    border: 1px solid black;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n}\n\n.p1b div,\n.p2b div {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: 1px solid blue;\n}\n\nfooter,\nheader {\n    background-color: aqua;\n    height: 10vh;\n}\n\n.hit {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n    background-color: rgb(245, 169, 169);\n    background-size: 100%;\n}\n\n.ship {\n    background-color: blue;\n}\n\n.miss {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n    background-size: 100%;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,YAAY;IACZ,UAAU;AACd;;AAEA;IACI,aAAa;IACb,YAAY;AAChB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,kBAAkB;IAClB,YAAY;AAChB;;AAEA;;IAEI,aAAa;IACb,YAAY;IACZ,uBAAuB;IACvB,aAAa;IACb,sCAAsC;IACtC,mCAAmC;AACvC;;AAEA;;IAEI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,sBAAsB;AAC1B;;AAEA;;IAEI,sBAAsB;IACtB,YAAY;AAChB;;AAEA;IACI,yDAAuD;IACvD,oCAAoC;IACpC,qBAAqB;AACzB;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,yDAA8C;IAC9C,qBAAqB;AACzB","sourcesContent":["* {\n    margin: 0;\n    border: none;\n    padding: 0;\n}\n\nbody {\n    height: 100vh;\n    width: 100vw;\n}\n\n.message {\n    height: 10vh;\n}\n\n.main {\n    display: flex;\n    justify-content: space-around;\n    position: relative;\n    height: 70vh;\n}\n\n.p1b,\n.p2b {\n    height: 500px;\n    width: 500px;\n    border: 1px solid black;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n}\n\n.p1b div,\n.p2b div {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: 1px solid blue;\n}\n\nfooter,\nheader {\n    background-color: aqua;\n    height: 10vh;\n}\n\n.hit {\n    background-image: url(../src/images/icons8-fire-48.png);\n    background-color: rgb(245, 169, 169);\n    background-size: 100%;\n}\n\n.ship {\n    background-color: blue;\n}\n\n.miss {\n    background-image: url(../src/images/close.png);\n    background-size: 100%;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c2hpcHMtZ2FtZS8uL3NyYy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL3NyYy9tb2RlbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vc3JjL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtb2RlbCB9IGZyb20gXCIuL21vZGVsXCI7XG5pbXBvcnQgeyB2aWV3IH0gZnJvbSBcIi4vdmlld1wiO1xuaW1wb3J0IHsgaW5pdCB9IGZyb20gXCIuL2luZGV4XCI7XG5cbmV4cG9ydCBjb25zdCBjb250cm9sbGVyID0gKCgpID0+IHtcblxuICAgIGxldCBtb3ZlQ291bnRlciA9IDA7XG4gICAgXG4gICAgY29uc3QgX3JhbmRvbU1vdmVHZW4gPSAocGxheWVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHJhbmRvbU1vdmUgPSAxICsgYCR7TWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAoMTApKX1gICsgYCR7TWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAoMTApKX1gO1xuICAgICAgICBjb25zb2xlLmxvZyhyYW5kb21Nb3ZlKTtcbiAgICAgICAgaWYgKHBsYXllci5ib2FyZC5pbGxlZ2FsTW92ZXMuaW5kZXhPZihyYW5kb21Nb3ZlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJhbmRvbU1vdmUpO1xuICAgICAgICAgICAgcmV0dXJuIHJhbmRvbU1vdmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIF9yYW5kb21Nb3ZlR2VuKHBsYXllcik7XG4gICAgICAgIH07ICBcbiAgICB9O1xuXG4gICAgY29uc3QgbWFrZU1vdmUgPSAoY2VsbCwgcGxheWVycykgPT4ge1xuICAgICAgICBpZiAocGxheWVyc1sxXS5ib2FyZC5pbGxlZ2FsTW92ZXMuaW5kZXhPZihjZWxsKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHBsYXllcnNbMV0uYm9hcmQucmVjZWl2ZUF0dGFjayhjZWxsKTtcbiAgICAgICAgICAgIHBsYXllcnNbMF0uYm9hcmQucmVjZWl2ZUF0dGFjayhfcmFuZG9tTW92ZUdlbihwbGF5ZXJzWzBdKSk7XG4gICAgICAgICAgICBtb3ZlQ291bnRlciArPSAxO1xuICAgICAgICAgICAgY2hlY2tXaW5uZXIocGxheWVycyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IGNoZWNrV2lubmVyID0gKHBsYXllcnMpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGlmIChwbGF5ZXJzWzBdLmJvYXJkLnNoaXBzU3VuaygpLmxlbmd0aCA9PT0gMTApIHtcbiAgICAgICAgICAgIHBsYXllcnNbMV0uaXNXaW5uZXIgPSB0cnVlOyBcbiAgICAgICAgICAgIGFsZXJ0KGBQbGF5ZXIgJHtwbGF5ZXJzWzFdLnBsYXllcklkfSBpcyB0aGUgd2lubmVyIWApO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYXllcnNbMV0uYm9hcmQuc2hpcHNTdW5rKCkubGVuZ3RoID09PSAxMCkge1xuICAgICAgICAgICAgcGxheWVyc1swXS5pc1dpbm5lciA9IHRydWU7IFxuICAgICAgICAgICAgYWxlcnQoYFBsYXllciAke3BsYXllcnNbMF0ucGxheWVySWR9IGlzIHRoZSB3aW5uZXIhYCk7XG4gICAgICAgICAgICBzdGFydE5ldygpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBzdGFydE5ldyA9IChwbGF5ZXJzKSA9PiB7XG4gICAgICAgIHZpZXcuZGlzcGxheUJvYXJkcyhwbGF5ZXJzKTtcbiAgICAgICAgaW5pdCgpO1xuICAgIH07XG5cbiAgICByZXR1cm4geyBtb3ZlQ291bnRlciwgbWFrZU1vdmUsIGNoZWNrV2lubmVyfTtcblxufSkoKTtcbiIsImltcG9ydCAnLi4vc3JjL3N0eWxlLmNzcyc7XG5cbmltcG9ydCB7IG1vZGVsIH0gZnJvbSBcIi4vbW9kZWxcIjtcbmltcG9ydCB7IHZpZXcgfSBmcm9tIFwiLi92aWV3XCI7XG4gICAgXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcblxuICAgIGxldCBwbGF5ZXIxID0gbW9kZWwucGxheWVyKDEpO1xuICAgIGxldCBwbGF5ZXIyID0gbW9kZWwucGxheWVyKDIpO1xuXG4gICAgY29uc3QgcGxheWVycyA9IFtwbGF5ZXIxLCBwbGF5ZXIyXTtcblxuICAgIHBsYXllcjEuYm9hcmQucmFuZG9tTG9jYXRpb25zKCk7XG4gICAgcGxheWVyMi5ib2FyZC5yYW5kb21Mb2NhdGlvbnMoKTtcblxuICAgIHZpZXcuZGlzcGxheUJvYXJkcyhwbGF5ZXJzKTtcbiAgICB2aWV3LmRpc3BsYXlTaGlwcyhwbGF5ZXIxLmdldEZsZWV0KCkpO1xuXG4gICAgY29uc29sZS5sb2cocGxheWVyMS5ib2FyZC5zaGlwcylcbiAgICBjb25zb2xlLmxvZyhwbGF5ZXIyLmJvYXJkLnNoaXBzKVxuICAgIFxufTtcblxuaW5pdCgpO1xuXG5cblxuXG5cblxuXG4iLCJpbXBvcnQgeyB2aWV3IH0gZnJvbSBcIi4vdmlld1wiO1xuaW1wb3J0IHsgY29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGNvbnN0IG1vZGVsID0gKCgpID0+IHtcblxuICAgIGNvbnN0IHNoaXBGYWN0b3J5ID0gKGxlbmd0aCkgPT4ge1xuICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgICBjb25zdCBsb2NhdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3Qgc3VyTG9jYXRpb25zID0gW107XG4gICAgICAgIGNvbnN0IGhpdHMgPSBbXTtcbiAgICAgICAgbGV0IGlzU3VuayA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IHNldENvb3JkID0gKGNlbGxzKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2VsbHMpIHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbnMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbnMucHVzaChgJHtjZWxsc1tpXX1gKTtcbiAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZ2V0dGluZ0hpdCA9IChsb2NhdGlvbikgPT4ge1xuICAgICAgICAgICAgaGl0c1tsb2NhdGlvbl0gPSAnaGl0JztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdldHRpbmdTdW5rID0gKHNoaXApID0+IHtcbiAgICAgICAgICAgIGlmIChzaGlwLmhpdHMuaW5kZXhPZignJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc2hpcC5pc1N1bmsgPSB0cnVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4geyBzZXRDb29yZCAsbG9jYXRpb25zLCBoaXRzLCBpc1N1bmssIGdldHRpbmdTdW5rLCBkaXJlY3Rpb24sIGdldHRpbmdIaXQsIHNoaXBMZW5ndGgsIHN1ckxvY2F0aW9uc307XG4gICAgfTtcblxuICAgIGNvbnN0IGJvYXJkRmFjdG9yeSA9IChpZCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGJvYXJkSWQgPSBpZDtcblxuICAgICAgICBjb25zdCBib2FyZFNpemUgPSAxMDtcblxuICAgICAgICBjb25zdCBzaGlwcyA9IFtzaGlwRmFjdG9yeSg0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBGYWN0b3J5KDMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEZhY3RvcnkoMyksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwRmFjdG9yeSgyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBGYWN0b3J5KDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEZhY3RvcnkoMiksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwRmFjdG9yeSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBGYWN0b3J5KDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEZhY3RvcnkoMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwRmFjdG9yeSgxKV07XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlwc1N1bmsgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGlmIChzaGlwc1tpXS5pc1N1bmsgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcHNTdW5rLnB1c2goc2hpcHNbaV0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHNoaXBzU3VuaztcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBpbGxlZ2FsTW92ZXMgPSBbXTtcblxuICAgICAgICBjb25zdCByYW5kb21Mb2NhdGlvbnMgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2hpcExvY2F0aW9ucztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGRvIHsgc2hpcExvY2F0aW9ucyA9IGdlbmVyYXRlTG9jYXRpb25zKHNoaXBzW2ldKSB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKGNoZWNrQ29sbGlzaW9uKHNoaXBMb2NhdGlvbnMpICYmIGNoZWNrQ29sbGlzaW9uKHNoaXBzW2ktMV0uc3VyTG9jYXRpb25zKSk7XG4gICAgICAgICAgICAgICAgc2hpcHNbaV0ubG9jYXRpb25zID0gc2hpcExvY2F0aW9ucztcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2hpcHNbaV0uc2hpcExlbmd0aDsgaisrKXtcbiAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLmhpdHMucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBnZW5lcmF0ZUxvY2F0aW9ucyA9IChzaGlwKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29sO1xuICAgICAgICAgICAgbGV0IHJvdztcbiAgICAgICAgICAgIC8vIGxldCBzdGFydExvY2F0aW9uO1xuICAgICAgICAgICAgY29uc3QgbmV3TG9jYXRpb25zID0gW107XG4gICAgICAgICAgICBjb25zdCBzdXJMb2NhdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJvdyA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogYm9hcmRTaXplKTtcbiAgICAgICAgICAgICAgICBjb2wgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIChib2FyZFNpemUgLSAoc2hpcC5zaGlwTGVuZ3RoICsgMSkpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm93ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAoYm9hcmRTaXplIC0gKHNoaXAuc2hpcExlbmd0aCArIDEpKSk7XG4gICAgICAgICAgICAgICAgY29sID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiBib2FyZFNpemUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIHN0YXJ0TG9jYXRpb24gPSBib2FyZElkICsgYCR7cm93fWAgKyBjb2w7XG4gICAgICAgICAgICAvLyBuZXdMb2NhdGlvbnMucHVzaChzdGFydExvY2F0aW9uKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93fWAgKyAoY29sICsgaSkpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3TG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAkeyhyb3cgKyBpKX1gICsgYCR7Y29sfWApXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaGlwTGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93ICsgMX1gICsgKGNvbCArIGkpKTtcbiAgICAgICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyAtIDF9YCArIChjb2wgKyBpKSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93IC0gMX1gICsgKGNvbCAtIDEpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93fWAgKyAoY29sIC0gMSkpO1xuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgKyAxfWAgKyAoY29sIC0gMSkpO1xuXG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyAtIDF9YCArIChjb2wgKyBzaGlwLnNoaXBMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93fWAgKyAoY29sICsgc2hpcC5zaGlwTGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIDF9YCArIChjb2wgKyBzaGlwLnNoaXBMZW5ndGgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNoaXBMZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgKyBpfWAgKyAoY29sICsgMSkpO1xuICAgICAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93ICsgaX1gICsgKGNvbCAtIDEpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgLSAxfWAgKyAoY29sIC0gMSkpO1xuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgLSAxfWAgKyAoY29sKSk7XG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyAtIDF9YCArIChjb2wgKyAxKSk7XG5cbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93ICsgc2hpcC5zaGlwTGVuZ3RofWAgKyAoY29sIC0xKSk7XG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIHNoaXAuc2hpcExlbmd0aH1gICsgKGNvbCkpO1xuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgKyBzaGlwLnNoaXBMZW5ndGh9YCArIChjb2wgKyAxKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzaGlwLnN1ckxvY2F0aW9ucyA9IHN1ckxvY2F0aW9ucztcblxuICAgICAgICAgICAgcmV0dXJuIG5ld0xvY2F0aW9ucztcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjaGVja0NvbGxpc2lvbiA9IChsb2NhdGlvbnMpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbG9jYXRpb25zLmxlbmd0aDsgaisrKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoaXBzW2ldLmxvY2F0aW9ucy5pbmRleE9mKGxvY2F0aW9uc1tqXSkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgbm8gY29sbGlzaW9ucyBvbiBzaGlwICR7c2hpcHNbaV19YClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW0gaW4gcmVjZWl2ZSBhdHRhY2sgc3RhcnQuIENlbGwgPSAnICsgY2VsbCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNoaXBzW2ldLmxvY2F0aW9ucy5pbmRleE9mKGNlbGwpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0ltIGluIHJlY2VpdmVBdHRhY2sgSElUIGJsb2NrLiBHaXZpbmcgdG8gdmlldyBjZWxsID0gJyArIGNlbGwpXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmRpc3BsYXlIaXQoY2VsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5nZXR0aW5nSGl0KHNoaXBzW2ldLmxvY2F0aW9ucy5pbmRleE9mKGNlbGwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLmdldHRpbmdTdW5rKHNoaXBzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNoaXBzW2ldLmxvY2F0aW9ucy5pbmRleE9mKGNlbGwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0ltIGluIHJlY2VpdmVBdHRhY2sgTUlTUyBibG9jay4gR2l2aW5nIHRvIHZpZXcgY2VsbCA9ICcgKyBjZWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5kaXNwbGF5TWlzcyhjZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTsgXG4gICAgICAgICAgICBpbGxlZ2FsTW92ZXMucHVzaChjZWxsKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm57c2hpcHMsIGlsbGVnYWxNb3ZlcywgcmVjZWl2ZUF0dGFjaywgc2hpcHNTdW5rLCByYW5kb21Mb2NhdGlvbnN9XG4gICAgfTtcblxuICAgIGNvbnN0IHBsYXllciA9IChpZCkgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJJZCA9IGlkO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYm9hcmQgPSBib2FyZEZhY3RvcnkocGxheWVySWQpO1xuXG4gICAgICAgIGNvbnN0IGdldEZsZWV0ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxlZXRDb29yZHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkLnNoaXBzW2ldLmxvY2F0aW9ucy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBmbGVldENvb3Jkcy5wdXNoKGJvYXJkLnNoaXBzW2ldLmxvY2F0aW9uc1tqXSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBmbGVldENvb3JkcztcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBpc1dpbm5lciA9IGZhbHNlO1xuXG4gICAgICAgIHJldHVybntwbGF5ZXJJZCwgYm9hcmQsIGdldEZsZWV0LCBpc1dpbm5lcn1cbiAgICB9O1xuICAgIFxuICAgIHJldHVybiB7IHBsYXllciB9O1xuXG59KSgpIiwiaW1wb3J0IHsgY29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IG1vZGVsIH0gZnJvbSBcIi4vbW9kZWxcIjtcbmltcG9ydCB7IGluZGV4IH0gZnJvbSBcIi4vaW5kZXhcIjtcblxuZXhwb3J0IGNvbnN0IHZpZXcgPSAoKCkgPT4ge1xuXG4gICAgY29uc3QgZGlzcGxheUJvYXJkcyA9IChwbGF5ZXJzKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMzsgaSsrKXtcbiAgICAgICAgICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AnICsgaSArICdiJyk7XG4gICAgICAgICAgICB3aGlsZSAoYm9hcmQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgIGJvYXJkLmZpcnN0Q2hpbGQucmVtb3ZlKClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDExOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnaWQnLCBpICsgYCR7an1gICsgayk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjZWxsJyk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLm1ha2VNb3ZlKGNlbGwuaWQsIHBsYXllcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IGRpc3BsYXlIaXQgPSAoY2VsbElEKSA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjZWxsSUQpO1xuICAgICAgICBjb25zb2xlLmxvZyhjZWxsKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnbWlzcycpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgIH07XG5cbiAgICBjb25zdCBkaXNwbGF5TWlzcyA9IChjZWxsSUQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ltIGluIHZpZXcsIGNlbGxJRCA9ICcgKyBjZWxsSUQpO1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2VsbElEKTtcbiAgICAgICAgY29uc29sZS5sb2coY2VsbCk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGlzcGxheVNoaXBzID0gKHNoaXBzKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2hpcHNbaV0gIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7c2hpcHNbaV19YCk7XG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByZXR1cm4ge2Rpc3BsYXlCb2FyZHMsIGRpc3BsYXlIaXQsIGRpc3BsYXlTaGlwcywgZGlzcGxheU1pc3N9XG59KSgpIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL3NyYy9pbWFnZXMvaWNvbnM4LWZpcmUtNDgucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi4vc3JjL2ltYWdlcy9jbG9zZS5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbn1cXG5cXG4ubWVzc2FnZSB7XFxuICAgIGhlaWdodDogMTB2aDtcXG59XFxuXFxuLm1haW4ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBoZWlnaHQ6IDcwdmg7XFxufVxcblxcbi5wMWIsXFxuLnAyYiB7XFxuICAgIGhlaWdodDogNTAwcHg7XFxuICAgIHdpZHRoOiA1MDBweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLnAxYiBkaXYsXFxuLnAyYiBkaXYge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmx1ZTtcXG59XFxuXFxuZm9vdGVyLFxcbmhlYWRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XFxuICAgIGhlaWdodDogMTB2aDtcXG59XFxuXFxuLmhpdCB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDE2OSwgMTY5KTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbn1cXG5cXG4uc2hpcCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XFxufVxcblxcbi5taXNzIHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksU0FBUztJQUNULFlBQVk7SUFDWixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsNkJBQTZCO0lBQzdCLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCOztBQUVBOztJQUVJLGFBQWE7SUFDYixZQUFZO0lBQ1osdUJBQXVCO0lBQ3ZCLGFBQWE7SUFDYixzQ0FBc0M7SUFDdEMsbUNBQW1DO0FBQ3ZDOztBQUVBOztJQUVJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLHNCQUFzQjtBQUMxQjs7QUFFQTs7SUFFSSxzQkFBc0I7SUFDdEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHlEQUF1RDtJQUN2RCxvQ0FBb0M7SUFDcEMscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0kseURBQThDO0lBQzlDLHFCQUFxQjtBQUN6QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxufVxcblxcbi5tZXNzYWdlIHtcXG4gICAgaGVpZ2h0OiAxMHZoO1xcbn1cXG5cXG4ubWFpbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGhlaWdodDogNzB2aDtcXG59XFxuXFxuLnAxYixcXG4ucDJiIHtcXG4gICAgaGVpZ2h0OiA1MDBweDtcXG4gICAgd2lkdGg6IDUwMHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4ucDFiIGRpdixcXG4ucDJiIGRpdiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibHVlO1xcbn1cXG5cXG5mb290ZXIsXFxuaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcXG4gICAgaGVpZ2h0OiAxMHZoO1xcbn1cXG5cXG4uaGl0IHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4uL3NyYy9pbWFnZXMvaWNvbnM4LWZpcmUtNDgucG5nKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMTY5LCAxNjkpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblxcbi5zaGlwIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcXG59XFxuXFxuLm1pc3Mge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi4vc3JjL2ltYWdlcy9jbG9zZS5wbmcpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbIm1vZGVsIiwidmlldyIsImluaXQiLCJjb250cm9sbGVyIiwibW92ZUNvdW50ZXIiLCJfcmFuZG9tTW92ZUdlbiIsInBsYXllciIsInJhbmRvbU1vdmUiLCJNYXRoIiwiY2VpbCIsInJhbmRvbSIsImNvbnNvbGUiLCJsb2ciLCJib2FyZCIsImlsbGVnYWxNb3ZlcyIsImluZGV4T2YiLCJtYWtlTW92ZSIsImNlbGwiLCJwbGF5ZXJzIiwicmVjZWl2ZUF0dGFjayIsImNoZWNrV2lubmVyIiwic2hpcHNTdW5rIiwibGVuZ3RoIiwiaXNXaW5uZXIiLCJhbGVydCIsInBsYXllcklkIiwic3RhcnROZXciLCJkaXNwbGF5Qm9hcmRzIiwicGxheWVyMSIsInBsYXllcjIiLCJyYW5kb21Mb2NhdGlvbnMiLCJkaXNwbGF5U2hpcHMiLCJnZXRGbGVldCIsInNoaXBzIiwic2hpcEZhY3RvcnkiLCJzaGlwTGVuZ3RoIiwiZGlyZWN0aW9uIiwibG9jYXRpb25zIiwic3VyTG9jYXRpb25zIiwiaGl0cyIsImlzU3VuayIsInNldENvb3JkIiwiY2VsbHMiLCJpIiwicHVzaCIsImdldHRpbmdIaXQiLCJsb2NhdGlvbiIsImdldHRpbmdTdW5rIiwic2hpcCIsImJvYXJkRmFjdG9yeSIsImlkIiwiYm9hcmRJZCIsImJvYXJkU2l6ZSIsInNoaXBMb2NhdGlvbnMiLCJnZW5lcmF0ZUxvY2F0aW9ucyIsImNoZWNrQ29sbGlzaW9uIiwiaiIsImNvbCIsInJvdyIsIm5ld0xvY2F0aW9ucyIsImRpc3BsYXlIaXQiLCJkaXNwbGF5TWlzcyIsImZsZWV0Q29vcmRzIiwiaW5kZXgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZmlyc3RDaGlsZCIsInJlbW92ZSIsImsiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFwcGVuZENoaWxkIiwiY2VsbElEIiwiY2xhc3NMaXN0IiwiYWRkIl0sInNvdXJjZVJvb3QiOiIifQ==