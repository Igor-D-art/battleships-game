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



var controller = function () {// const addListeners = (cell)=>{
  //     cell.addEventListener('click', () => {
  //         index.player2.board.receiveAttack(cell.id);
  //     });
  // };
  // return { addListeners };
}();

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/style.css */ "./src/style.css");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ "./src/model.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ "./src/view.js");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controller */ "./src/controller.js");





(function init() {
  var player1 = _model__WEBPACK_IMPORTED_MODULE_1__.model.player(1);
  var player2 = _model__WEBPACK_IMPORTED_MODULE_1__.model.player(2);
  var players = [player1, player2];
  player1.board.ships[0].locations = ['111', '112', '113', '114'];
  player2.board.ships[0].locations = ['211', '212', '213', '214'];
  _view__WEBPACK_IMPORTED_MODULE_2__.view.displayBoards(players);
  _view__WEBPACK_IMPORTED_MODULE_2__.view.displayShips(player1.getFleet());
  console.log(player1.board.ships[0].locations);
  console.log(player2.board.ships[0].locations);
  console.log(player1);
  console.log(player2);
  return {
    player1: player1,
    player2: player2
  };
})();

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
    var direction = Math.floor(Math.random() * 2);
    var locations = [];
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

    var gettingHit = function gettingHit(cell) {
      hits[cell] = 'hit';
      _view__WEBPACK_IMPORTED_MODULE_0__.view.displayHit(cell);
    };

    var gettingSunk = function gettingSunk() {
      if (hits.indexOf('') === -1) {
        isSunk = true;
        console.log(isSunk);
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
      gettingHit: gettingHit
    };
  };

  var boardFactory = function boardFactory() {
    var boardSize = 10;
    var ships = [shipFactory(4), shipFactory(3), shipFactory(3), shipFactory(2), shipFactory(2), shipFactory(2), shipFactory(1), shipFactory(1), shipFactory(1), shipFactory(1)];
    var illegalMoves = []; // const randomLocations = () => {
    //     let shipLocations;
    //     for (let i = 0; i < ships.length; i++){
    //         do { shipLocations = generateLocations(ships[i]) }
    //         while (checkCollision(shipLocations));
    //         ships[i].locations = shipLocations;
    //     };
    // };
    // const generateLocations = (ship) => {
    //     let col;
    //     let row;
    //     let shipLocations = [];
    //     if (ship.direction === 1) {
    //         row = Math.floor(Math.random() * boardSize);
    //         col = Math.floor(Math.random() * (boardSize - (ship.shipLength + 1)));
    //     } else {
    //         row = Math.floor(Math.random() * (boardSize - (ship.shipLength + 1)));
    //         col = Math.floor(Math.random() * boardSize);
    //     }
    //     for (let i = 0; i < ship.shipLength; i++){
    //         if (ship.direction === 1) {
    //         shipLocations.push()
    //     } else {
    //         row = Math.floor(Math.random() * (boardSize - (ship.shipLength + 1)));
    //         col = Math.floor(Math.random() * boardSize);
    //     }
    //     }
    // }
    // const receiveAttack = (cell) => {
    //     for (let i=0; i < player.ships.length; i++) {
    //         if (player.board.ships[i].locations.indexOf(cell) === -1) {
    //             console.log(player.ships[i].locations);
    //             console.log(player.ships[i].locations.indexOf(cell));
    //             view.displayMiss(cell);
    //        }
    //     };
    //     illegalMoves.push(cell);
    //     console.log(player1.board.illegalMoves);
    //     console.log(player2.board.illegalMoves);
    //     console.log(player.ships);
    // };

    var receiveAttack = function receiveAttack(cell) {
      for (var i = 0; i < ships.length; i++) {
        if (illegalMoves.indexOf(cell) === -1) {
          if (ships[i].locations.indexOf(cell) > -1) {
            ships[i].gettingHit(ships[i].locations.indexOf(cell));
          }

          ;
        }

        ;
      }

      ;
      illegalMoves.push(cell);
    };

    return {
      ships: ships,
      illegalMoves: illegalMoves,
      receiveAttack: receiveAttack
    };
  };

  var player = function player(id) {
    var playerId = id;
    var board = boardFactory();

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

    return {
      playerId: playerId,
      board: board,
      getFleet: getFleet
    };
  }; // const player1 = player(1);
  // const player2 = player(2);
  // player1.board.ships[0].locations = ['111', '112', '113', '114'];
  // player2.board.ships[0].locations = ['211', '212', '213', '214'];
  // player1.board.receiveAttack('112');
  // player1.board.receiveAttack('113');
  // player1.board.receiveAttack('114');
  // player2.board.receiveAttack('212');
  // console.log(player1.board.ships[0].locations)
  // console.log(player2.board.ships[0].locations)
  // return { player1, player2 };


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
    console.log(players);

    for (var i = 1; i < 3; i++) {
      var board = document.getElementById('p' + i + 'b');

      for (var j = 1; j < 11; j++) {
        var _loop = function _loop(k) {
          var cell = document.createElement('div');
          cell.setAttribute('id', i + "".concat(j) + k); // console.log(typeof (cell.id))
          // console.log(cell.id)

          cell.setAttribute('class', 'cell');
          board.appendChild(cell);

          if (i === 2) {
            cell.addEventListener('click', function () {
              console.log(cell.id);
              console.log(cell.classList);
              players[1].board.receiveAttack(cell.id);
            });
          }

          ;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRU8sSUFBTUcsVUFBVSxHQUFJLFlBQU0sQ0FFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUgsQ0FWeUIsRUFBbkI7Ozs7Ozs7Ozs7Ozs7OztBQ0pQO0FBRUE7QUFDQTtBQUNBOztBQUlBLENBQUMsU0FBU0MsSUFBVCxHQUFnQjtBQUViLE1BQU1DLE9BQU8sR0FBR0wsZ0RBQUEsQ0FBYSxDQUFiLENBQWhCO0FBQ0EsTUFBTU8sT0FBTyxHQUFHUCxnREFBQSxDQUFhLENBQWIsQ0FBaEI7QUFFQSxNQUFNUSxPQUFPLEdBQUcsQ0FBQ0gsT0FBRCxFQUFVRSxPQUFWLENBQWhCO0FBRUFGLEVBQUFBLE9BQU8sQ0FBQ0ksS0FBUixDQUFjQyxLQUFkLENBQW9CLENBQXBCLEVBQXVCQyxTQUF2QixHQUFtQyxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixFQUFzQixLQUF0QixDQUFuQztBQUNBSixFQUFBQSxPQUFPLENBQUNFLEtBQVIsQ0FBY0MsS0FBZCxDQUFvQixDQUFwQixFQUF1QkMsU0FBdkIsR0FBbUMsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsQ0FBbkM7QUFFQVYsRUFBQUEscURBQUEsQ0FBbUJPLE9BQW5CO0FBQ0FQLEVBQUFBLG9EQUFBLENBQWtCSSxPQUFPLENBQUNTLFFBQVIsRUFBbEI7QUFFQUMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlYLE9BQU8sQ0FBQ0ksS0FBUixDQUFjQyxLQUFkLENBQW9CLENBQXBCLEVBQXVCQyxTQUFuQztBQUNBSSxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWVQsT0FBTyxDQUFDRSxLQUFSLENBQWNDLEtBQWQsQ0FBb0IsQ0FBcEIsRUFBdUJDLFNBQW5DO0FBRUFJLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZWCxPQUFaO0FBQ0FVLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZVCxPQUFaO0FBRUEsU0FBTztBQUFFRixJQUFBQSxPQUFPLEVBQVBBLE9BQUY7QUFBV0UsSUFBQUEsT0FBTyxFQUFQQTtBQUFYLEdBQVA7QUFFSCxDQXJCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUVPLElBQU1QLEtBQUssR0FBSSxZQUFNO0FBRXhCLE1BQU1pQixXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDQyxNQUFELEVBQVk7QUFDNUIsUUFBTUMsVUFBVSxHQUFHRCxNQUFuQjtBQUNBLFFBQU1FLFNBQVMsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQixDQUEzQixDQUFsQjtBQUNBLFFBQU1aLFNBQVMsR0FBRyxFQUFsQjtBQUNBLFFBQU1hLElBQUksR0FBRyxFQUFiO0FBQ0EsUUFBSUMsTUFBTSxHQUFHLEtBQWI7O0FBRUEsUUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0MsS0FBRCxFQUFXO0FBQ3hCLFVBQUlBLEtBQUosRUFBVztBQUNLLFVBQVo7O0FBQ0EsYUFBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHVCxVQUFwQixFQUFnQ1MsQ0FBQyxFQUFqQyxFQUFxQztBQUNqQ2pCLFVBQUFBLFNBQVMsQ0FBQ2tCLElBQVYsV0FBa0JGLEtBQUssQ0FBQ0MsQ0FBRCxDQUF2QjtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixLQVBEOztBQVNBLFFBQU1FLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNDLElBQUQsRUFBVTtBQUN6QlAsTUFBQUEsSUFBSSxDQUFDTyxJQUFELENBQUosR0FBYSxLQUFiO0FBQ0E5QixNQUFBQSxrREFBQSxDQUFnQjhCLElBQWhCO0FBQ0gsS0FIRDs7QUFLQSxRQUFNRSxXQUFXLEdBQUcsU0FBZEEsV0FBYyxHQUFNO0FBQ3RCLFVBQUlULElBQUksQ0FBQ1UsT0FBTCxDQUFhLEVBQWIsTUFBcUIsQ0FBQyxDQUExQixFQUE2QjtBQUN6QlQsUUFBQUEsTUFBTSxHQUFHLElBQVQ7QUFDQVYsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlTLE1BQVo7QUFDSDs7QUFBQTtBQUNKLEtBTEQ7O0FBT0EsV0FBTztBQUFFQyxNQUFBQSxRQUFRLEVBQVJBLFFBQUY7QUFBWWYsTUFBQUEsU0FBUyxFQUFUQSxTQUFaO0FBQXVCYSxNQUFBQSxJQUFJLEVBQUpBLElBQXZCO0FBQTZCQyxNQUFBQSxNQUFNLEVBQU5BLE1BQTdCO0FBQXFDUSxNQUFBQSxXQUFXLEVBQVhBLFdBQXJDO0FBQWtEYixNQUFBQSxTQUFTLEVBQVRBLFNBQWxEO0FBQTZEVSxNQUFBQSxVQUFVLEVBQVZBO0FBQTdELEtBQVA7QUFDSCxHQTdCRDs7QUErQkEsTUFBTUssWUFBWSxHQUFHLFNBQWZBLFlBQWUsR0FBTTtBQUN2QixRQUFNQyxTQUFTLEdBQUcsRUFBbEI7QUFFQSxRQUFNMUIsS0FBSyxHQUFHLENBQUNPLFdBQVcsQ0FBQyxDQUFELENBQVosRUFDRUEsV0FBVyxDQUFDLENBQUQsQ0FEYixFQUVFQSxXQUFXLENBQUMsQ0FBRCxDQUZiLEVBR0VBLFdBQVcsQ0FBQyxDQUFELENBSGIsRUFJRUEsV0FBVyxDQUFDLENBQUQsQ0FKYixFQUtFQSxXQUFXLENBQUMsQ0FBRCxDQUxiLEVBTUVBLFdBQVcsQ0FBQyxDQUFELENBTmIsRUFPRUEsV0FBVyxDQUFDLENBQUQsQ0FQYixFQVFFQSxXQUFXLENBQUMsQ0FBRCxDQVJiLEVBU0VBLFdBQVcsQ0FBQyxDQUFELENBVGIsQ0FBZDtBQVdBLFFBQU1vQixZQUFZLEdBQUcsRUFBckIsQ0FkdUIsQ0FnQnZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0EsUUFBTUMsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDUCxJQUFELEVBQVU7QUFDNUIsV0FBSyxJQUFJSCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHbEIsS0FBSyxDQUFDUSxNQUExQixFQUFrQ1UsQ0FBQyxFQUFuQyxFQUF1QztBQUMvQixZQUFJUyxZQUFZLENBQUNILE9BQWIsQ0FBcUJILElBQXJCLE1BQStCLENBQUMsQ0FBcEMsRUFBdUM7QUFDbkMsY0FBSXJCLEtBQUssQ0FBQ2tCLENBQUQsQ0FBTCxDQUFTakIsU0FBVCxDQUFtQnVCLE9BQW5CLENBQTJCSCxJQUEzQixJQUFtQyxDQUFDLENBQXhDLEVBQTJDO0FBQzNDckIsWUFBQUEsS0FBSyxDQUFDa0IsQ0FBRCxDQUFMLENBQVNFLFVBQVQsQ0FBb0JwQixLQUFLLENBQUNrQixDQUFELENBQUwsQ0FBU2pCLFNBQVQsQ0FBbUJ1QixPQUFuQixDQUEyQkgsSUFBM0IsQ0FBcEI7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0o7O0FBQUE7QUFDRE0sTUFBQUEsWUFBWSxDQUFDUixJQUFiLENBQWtCRSxJQUFsQjtBQUNILEtBVEQ7O0FBV0EsV0FBTTtBQUFDckIsTUFBQUEsS0FBSyxFQUFMQSxLQUFEO0FBQVEyQixNQUFBQSxZQUFZLEVBQVpBLFlBQVI7QUFBc0JDLE1BQUFBLGFBQWEsRUFBYkE7QUFBdEIsS0FBTjtBQUNILEdBMUVEOztBQTRFQSxNQUFNaEMsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQ2lDLEVBQUQsRUFBUTtBQUNuQixRQUFNQyxRQUFRLEdBQUdELEVBQWpCO0FBRUEsUUFBTTlCLEtBQUssR0FBRzBCLFlBQVksRUFBMUI7O0FBRUEsUUFBTXJCLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQU07QUFDbkIsVUFBTTJCLFdBQVcsR0FBRyxFQUFwQjs7QUFDQSxXQUFLLElBQUliLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUduQixLQUFLLENBQUNDLEtBQU4sQ0FBWVEsTUFBaEMsRUFBd0NVLENBQUMsRUFBekMsRUFBNkM7QUFDekMsYUFBSyxJQUFJYyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHakMsS0FBSyxDQUFDQyxLQUFOLENBQVlrQixDQUFaLEVBQWVqQixTQUFmLENBQXlCTyxNQUE3QyxFQUFxRHdCLENBQUMsRUFBdEQsRUFBMEQ7QUFDdERELFVBQUFBLFdBQVcsQ0FBQ1osSUFBWixDQUFpQnBCLEtBQUssQ0FBQ0MsS0FBTixDQUFZa0IsQ0FBWixFQUFlakIsU0FBZixDQUF5QitCLENBQXpCLENBQWpCO0FBQ0g7O0FBQUE7QUFDSjs7QUFBQTtBQUNELGFBQU9ELFdBQVA7QUFDSCxLQVJEOztBQVVBLFdBQU07QUFBQ0QsTUFBQUEsUUFBUSxFQUFSQSxRQUFEO0FBQVcvQixNQUFBQSxLQUFLLEVBQUxBLEtBQVg7QUFBa0JLLE1BQUFBLFFBQVEsRUFBUkE7QUFBbEIsS0FBTjtBQUNILEdBaEJELENBN0d3QixDQWdJeEI7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7O0FBRUEsU0FBTztBQUFFUixJQUFBQSxNQUFNLEVBQU5BO0FBQUYsR0FBUDtBQUVILENBbEpvQixFQUFkOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0hQO0FBQ0E7QUFDQTtBQUVPLElBQU1MLElBQUksR0FBSSxZQUFNO0FBRXZCLE1BQU1XLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ0osT0FBRCxFQUFhO0FBQy9CTyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWVIsT0FBWjs7QUFDQSxTQUFLLElBQUlvQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLENBQXBCLEVBQXVCQSxDQUFDLEVBQXhCLEVBQTJCO0FBQ3ZCLFVBQU1uQixLQUFLLEdBQUdrQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsTUFBTWhCLENBQU4sR0FBVSxHQUFsQyxDQUFkOztBQUNBLFdBQUssSUFBSWMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxFQUFwQixFQUF3QkEsQ0FBQyxFQUF6QixFQUE2QjtBQUFBLG1DQUNoQkcsQ0FEZ0I7QUFFckIsY0FBTWQsSUFBSSxHQUFHWSxRQUFRLENBQUNHLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBZixVQUFBQSxJQUFJLENBQUNnQixZQUFMLENBQWtCLElBQWxCLEVBQXdCbkIsQ0FBQyxhQUFNYyxDQUFOLENBQUQsR0FBYUcsQ0FBckMsRUFIcUIsQ0FJckI7QUFDQTs7QUFDQWQsVUFBQUEsSUFBSSxDQUFDZ0IsWUFBTCxDQUFrQixPQUFsQixFQUEyQixNQUEzQjtBQUNBdEMsVUFBQUEsS0FBSyxDQUFDdUMsV0FBTixDQUFrQmpCLElBQWxCOztBQUVBLGNBQUlILENBQUMsS0FBSyxDQUFWLEVBQWE7QUFDVEcsWUFBQUEsSUFBSSxDQUFDa0IsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBTTtBQUNqQ2xDLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZZSxJQUFJLENBQUNRLEVBQWpCO0FBQ0F4QixjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWWUsSUFBSSxDQUFDbUIsU0FBakI7QUFDQTFDLGNBQUFBLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV0MsS0FBWCxDQUFpQjZCLGFBQWpCLENBQStCUCxJQUFJLENBQUNRLEVBQXBDO0FBRUosYUFMQTtBQU1IOztBQUFBO0FBaEJvQjs7QUFDekIsYUFBSyxJQUFJTSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO0FBQUEsZ0JBQXBCQSxDQUFvQjtBQWdCNUI7O0FBQUE7QUFFSjs7QUFBQTtBQUNKOztBQUFBO0FBQ0osR0F6QkQ7O0FBMkJBLE1BQU1iLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNtQixNQUFELEVBQVk7QUFDM0IsUUFBTXBCLElBQUksR0FBR1ksUUFBUSxDQUFDQyxjQUFULENBQXdCTyxNQUF4QixDQUFiO0FBQ0FwQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWWUsSUFBWjtBQUNBQSxJQUFBQSxJQUFJLENBQUNtQixTQUFMLENBQWVFLE1BQWYsQ0FBc0IsTUFBdEI7QUFDQXJCLElBQUFBLElBQUksQ0FBQ21CLFNBQUwsQ0FBZUcsR0FBZixDQUFtQixLQUFuQjtBQUNILEdBTEQ7O0FBT0EsTUFBTUMsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ0gsTUFBRCxFQUFZO0FBQzVCLFFBQU1wQixJQUFJLEdBQUdZLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3Qk8sTUFBeEIsQ0FBYjtBQUNBcEIsSUFBQUEsSUFBSSxDQUFDbUIsU0FBTCxDQUFlRSxNQUFmLENBQXNCLE1BQXRCO0FBQ0FyQixJQUFBQSxJQUFJLENBQUNtQixTQUFMLENBQWVHLEdBQWYsQ0FBbUIsTUFBbkI7QUFDSCxHQUpEOztBQU1BLE1BQU14QyxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDSCxLQUFELEVBQVc7QUFDNUIsU0FBSyxJQUFJa0IsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2xCLEtBQUssQ0FBQ1EsTUFBMUIsRUFBa0NVLENBQUMsRUFBbkMsRUFBdUM7QUFDbkMsVUFBSWxCLEtBQUssQ0FBQ2tCLENBQUQsQ0FBTCxLQUFhLEVBQWpCLEVBQXFCO0FBQ3JCLFlBQU1HLElBQUksR0FBR1ksUUFBUSxDQUFDQyxjQUFULFdBQTJCbEMsS0FBSyxDQUFDa0IsQ0FBRCxDQUFoQyxFQUFiO0FBQ0FHLFFBQUFBLElBQUksQ0FBQ21CLFNBQUwsQ0FBZUcsR0FBZixDQUFtQixNQUFuQjtBQUNDO0FBRUo7O0FBQUE7QUFFSixHQVREOztBQVdBLFNBQU87QUFBQ3pDLElBQUFBLGFBQWEsRUFBYkEsYUFBRDtBQUFnQm9CLElBQUFBLFVBQVUsRUFBVkEsVUFBaEI7QUFBNEJuQixJQUFBQSxZQUFZLEVBQVpBLFlBQTVCO0FBQTBDeUMsSUFBQUEsV0FBVyxFQUFYQTtBQUExQyxHQUFQO0FBQ0gsQ0F0RG1CLEVBQWI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSlA7QUFDMEc7QUFDakI7QUFDTztBQUNoRyw0Q0FBNEMsd0lBQW1EO0FBQy9GLDRDQUE0QyxzSEFBMEM7QUFDdEYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRix5Q0FBeUMsc0ZBQStCO0FBQ3hFLHlDQUF5QyxzRkFBK0I7QUFDeEU7QUFDQSw2Q0FBNkMsZ0JBQWdCLG1CQUFtQixpQkFBaUIsR0FBRyxVQUFVLG9CQUFvQixtQkFBbUIsR0FBRyxjQUFjLG1CQUFtQixHQUFHLFdBQVcsb0JBQW9CLG9DQUFvQyx5QkFBeUIsbUJBQW1CLEdBQUcsaUJBQWlCLG9CQUFvQixtQkFBbUIsOEJBQThCLG9CQUFvQiw2Q0FBNkMsMENBQTBDLEdBQUcseUJBQXlCLG9CQUFvQiw4QkFBOEIsMEJBQTBCLDZCQUE2QixHQUFHLHFCQUFxQiw2QkFBNkIsbUJBQW1CLEdBQUcsVUFBVSx3RUFBd0UsMkNBQTJDLDRCQUE0QixHQUFHLFdBQVcsNkJBQTZCLEdBQUcsV0FBVyx3RUFBd0UsNEJBQTRCLEdBQUcsU0FBUyxnRkFBZ0YsVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxNQUFNLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSw2QkFBNkIsZ0JBQWdCLG1CQUFtQixpQkFBaUIsR0FBRyxVQUFVLG9CQUFvQixtQkFBbUIsR0FBRyxjQUFjLG1CQUFtQixHQUFHLFdBQVcsb0JBQW9CLG9DQUFvQyx5QkFBeUIsbUJBQW1CLEdBQUcsaUJBQWlCLG9CQUFvQixtQkFBbUIsOEJBQThCLG9CQUFvQiw2Q0FBNkMsMENBQTBDLEdBQUcseUJBQXlCLG9CQUFvQiw4QkFBOEIsMEJBQTBCLDZCQUE2QixHQUFHLHFCQUFxQiw2QkFBNkIsbUJBQW1CLEdBQUcsVUFBVSw4REFBOEQsMkNBQTJDLDRCQUE0QixHQUFHLFdBQVcsNkJBQTZCLEdBQUcsV0FBVyxxREFBcUQsNEJBQTRCLEdBQUcscUJBQXFCO0FBQy85RTtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ1oxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFEQUFxRDtBQUNyRDs7QUFFQTtBQUNBLGdEQUFnRDtBQUNoRDs7QUFFQTtBQUNBLHFGQUFxRjtBQUNyRjs7QUFFQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLEtBQUs7QUFDTCxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIscUJBQXFCO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ3JHYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0RBQW9EOztBQUVwRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM1QmE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQSxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFtRztBQUNuRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHNGQUFPOzs7O0FBSTZDO0FBQ3JFLE9BQU8saUVBQWUsc0ZBQU8sSUFBSSw2RkFBYyxHQUFHLDZGQUFjLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUJBQXFCLDZCQUE2QjtBQUNsRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2R2E7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDdENhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDVmE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJOztBQUVqRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1hhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTs7QUFFQTtBQUNBLGlGQUFpRjtBQUNqRjs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7VUVyQkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vc3JjL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vc3JjL21vZGVsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9zcmMvdmlldy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1vZGVsIH0gZnJvbSBcIi4vbW9kZWxcIjtcbmltcG9ydCB7IHZpZXcgfSBmcm9tIFwiLi92aWV3XCI7XG5pbXBvcnQgeyBpbmRleCB9IGZyb20gXCIuL2luZGV4XCI7XG5cbmV4cG9ydCBjb25zdCBjb250cm9sbGVyID0gKCgpID0+IHtcbiAgICBcbiAgICAvLyBjb25zdCBhZGRMaXN0ZW5lcnMgPSAoY2VsbCk9PntcbiAgICAvLyAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAvLyAgICAgICAgIGluZGV4LnBsYXllcjIuYm9hcmQucmVjZWl2ZUF0dGFjayhjZWxsLmlkKTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfTtcblxuICAgIC8vIHJldHVybiB7IGFkZExpc3RlbmVycyB9O1xuXG59KSgpO1xuIiwiaW1wb3J0ICcuLi9zcmMvc3R5bGUuY3NzJztcblxuaW1wb3J0IHsgbW9kZWwgfSBmcm9tIFwiLi9tb2RlbFwiO1xuaW1wb3J0IHsgdmlldyB9IGZyb20gXCIuL3ZpZXdcIjtcbmltcG9ydCB7IGNvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5cblxuXG4oZnVuY3Rpb24gaW5pdCgpIHtcblxuICAgIGNvbnN0IHBsYXllcjEgPSBtb2RlbC5wbGF5ZXIoMSk7XG4gICAgY29uc3QgcGxheWVyMiA9IG1vZGVsLnBsYXllcigyKTtcblxuICAgIGNvbnN0IHBsYXllcnMgPSBbcGxheWVyMSwgcGxheWVyMl07XG5cbiAgICBwbGF5ZXIxLmJvYXJkLnNoaXBzWzBdLmxvY2F0aW9ucyA9IFsnMTExJywgJzExMicsICcxMTMnLCAnMTE0J107XG4gICAgcGxheWVyMi5ib2FyZC5zaGlwc1swXS5sb2NhdGlvbnMgPSBbJzIxMScsICcyMTInLCAnMjEzJywgJzIxNCddO1xuXG4gICAgdmlldy5kaXNwbGF5Qm9hcmRzKHBsYXllcnMpO1xuICAgIHZpZXcuZGlzcGxheVNoaXBzKHBsYXllcjEuZ2V0RmxlZXQoKSk7XG5cbiAgICBjb25zb2xlLmxvZyhwbGF5ZXIxLmJvYXJkLnNoaXBzWzBdLmxvY2F0aW9ucylcbiAgICBjb25zb2xlLmxvZyhwbGF5ZXIyLmJvYXJkLnNoaXBzWzBdLmxvY2F0aW9ucylcbiAgICBcbiAgICBjb25zb2xlLmxvZyhwbGF5ZXIxKTtcbiAgICBjb25zb2xlLmxvZyhwbGF5ZXIyKTtcblxuICAgIHJldHVybiB7IHBsYXllcjEsIHBsYXllcjIgfVxuICAgIFxufSkoKTtcblxuXG4iLCJpbXBvcnQgeyB2aWV3IH0gZnJvbSBcIi4vdmlld1wiO1xuaW1wb3J0IHsgY29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGNvbnN0IG1vZGVsID0gKCgpID0+IHtcblxuICAgIGNvbnN0IHNoaXBGYWN0b3J5ID0gKGxlbmd0aCkgPT4ge1xuICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICAgICAgY29uc3QgbG9jYXRpb25zID0gW107XG4gICAgICAgIGNvbnN0IGhpdHMgPSBbXTtcbiAgICAgICAgbGV0IGlzU3VuayA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IHNldENvb3JkID0gKGNlbGxzKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2VsbHMpIHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbnMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbnMucHVzaChgJHtjZWxsc1tpXX1gKTtcbiAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZ2V0dGluZ0hpdCA9IChjZWxsKSA9PiB7XG4gICAgICAgICAgICBoaXRzW2NlbGxdID0gJ2hpdCc7XG4gICAgICAgICAgICB2aWV3LmRpc3BsYXlIaXQoY2VsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBnZXR0aW5nU3VuayA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChoaXRzLmluZGV4T2YoJycpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGlzU3VuayA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaXNTdW5rKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHsgc2V0Q29vcmQgLGxvY2F0aW9ucywgaGl0cywgaXNTdW5rLCBnZXR0aW5nU3VuaywgZGlyZWN0aW9uLCBnZXR0aW5nSGl0fTtcbiAgICB9O1xuXG4gICAgY29uc3QgYm9hcmRGYWN0b3J5ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBib2FyZFNpemUgPSAxMDtcblxuICAgICAgICBjb25zdCBzaGlwcyA9IFtzaGlwRmFjdG9yeSg0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBGYWN0b3J5KDMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEZhY3RvcnkoMyksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwRmFjdG9yeSgyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBGYWN0b3J5KDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEZhY3RvcnkoMiksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwRmFjdG9yeSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBGYWN0b3J5KDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEZhY3RvcnkoMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwRmFjdG9yeSgxKV07XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbGxlZ2FsTW92ZXMgPSBbXTtcblxuICAgICAgICAvLyBjb25zdCByYW5kb21Mb2NhdGlvbnMgPSAoKSA9PiB7XG4gICAgICAgIC8vICAgICBsZXQgc2hpcExvY2F0aW9ucztcbiAgICAgICAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAvLyAgICAgICAgIGRvIHsgc2hpcExvY2F0aW9ucyA9IGdlbmVyYXRlTG9jYXRpb25zKHNoaXBzW2ldKSB9XG4gICAgICAgIC8vICAgICAgICAgd2hpbGUgKGNoZWNrQ29sbGlzaW9uKHNoaXBMb2NhdGlvbnMpKTtcbiAgICAgICAgLy8gICAgICAgICBzaGlwc1tpXS5sb2NhdGlvbnMgPSBzaGlwTG9jYXRpb25zO1xuICAgICAgICAvLyAgICAgfTtcbiAgICAgICAgLy8gfTtcblxuICAgICAgICAvLyBjb25zdCBnZW5lcmF0ZUxvY2F0aW9ucyA9IChzaGlwKSA9PiB7XG4gICAgICAgIC8vICAgICBsZXQgY29sO1xuICAgICAgICAvLyAgICAgbGV0IHJvdztcbiAgICAgICAgLy8gICAgIGxldCBzaGlwTG9jYXRpb25zID0gW107XG4gICAgICAgIC8vICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IDEpIHtcbiAgICAgICAgLy8gICAgICAgICByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZFNpemUpO1xuICAgICAgICAvLyAgICAgICAgIGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChib2FyZFNpemUgLSAoc2hpcC5zaGlwTGVuZ3RoICsgMSkpKTtcbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSAtIChzaGlwLnNoaXBMZW5ndGggKyAxKSkpO1xuICAgICAgICAvLyAgICAgICAgIGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkU2l6ZSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2hpcExlbmd0aDsgaSsrKXtcbiAgICAgICAgLy8gICAgICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IDEpIHtcbiAgICAgICAgLy8gICAgICAgICBzaGlwTG9jYXRpb25zLnB1c2goKVxuICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYm9hcmRTaXplIC0gKHNoaXAuc2hpcExlbmd0aCArIDEpKSk7XG4gICAgICAgIC8vICAgICAgICAgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmRTaXplKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIH1cblxuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjZWxsKSA9PiB7XG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpPTA7IGkgPCBwbGF5ZXIuc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gICAgICAgICBpZiAocGxheWVyLmJvYXJkLnNoaXBzW2ldLmxvY2F0aW9ucy5pbmRleE9mKGNlbGwpID09PSAtMSkge1xuICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIuc2hpcHNbaV0ubG9jYXRpb25zKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2cocGxheWVyLnNoaXBzW2ldLmxvY2F0aW9ucy5pbmRleE9mKGNlbGwpKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgdmlldy5kaXNwbGF5TWlzcyhjZWxsKTtcbiAgICAgICAgLy8gICAgICAgIH1cbiAgICAgICAgLy8gICAgIH07XG4gICAgICAgIC8vICAgICBpbGxlZ2FsTW92ZXMucHVzaChjZWxsKTtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHBsYXllcjEuYm9hcmQuaWxsZWdhbE1vdmVzKTtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHBsYXllcjIuYm9hcmQuaWxsZWdhbE1vdmVzKTtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHBsYXllci5zaGlwcyk7XG4gICAgICAgIC8vIH07XG4gICAgICAgIFxuXG4gICAgICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY2VsbCkgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWxsZWdhbE1vdmVzLmluZGV4T2YoY2VsbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcHNbaV0ubG9jYXRpb25zLmluZGV4T2YoY2VsbCkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcHNbaV0uZ2V0dGluZ0hpdChzaGlwc1tpXS5sb2NhdGlvbnMuaW5kZXhPZihjZWxsKSk7XG4gICAgICAgICAgICAgICAgICAgIH07IFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWxsZWdhbE1vdmVzLnB1c2goY2VsbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJue3NoaXBzLCBpbGxlZ2FsTW92ZXMsIHJlY2VpdmVBdHRhY2t9XG4gICAgfTtcblxuICAgIGNvbnN0IHBsYXllciA9IChpZCkgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJJZCA9IGlkO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYm9hcmQgPSBib2FyZEZhY3RvcnkoKTtcblxuICAgICAgICBjb25zdCBnZXRGbGVldCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsZWV0Q29vcmRzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLnNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZC5zaGlwc1tpXS5sb2NhdGlvbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZmxlZXRDb29yZHMucHVzaChib2FyZC5zaGlwc1tpXS5sb2NhdGlvbnNbal0pXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gZmxlZXRDb29yZHM7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJue3BsYXllcklkLCBib2FyZCwgZ2V0RmxlZXR9XG4gICAgfTtcblxuXG4gICAgLy8gY29uc3QgcGxheWVyMSA9IHBsYXllcigxKTtcbiAgICAvLyBjb25zdCBwbGF5ZXIyID0gcGxheWVyKDIpO1xuXG4gICAgLy8gcGxheWVyMS5ib2FyZC5zaGlwc1swXS5sb2NhdGlvbnMgPSBbJzExMScsICcxMTInLCAnMTEzJywgJzExNCddO1xuICAgIC8vIHBsYXllcjIuYm9hcmQuc2hpcHNbMF0ubG9jYXRpb25zID0gWycyMTEnLCAnMjEyJywgJzIxMycsICcyMTQnXTtcblxuICAgIC8vIHBsYXllcjEuYm9hcmQucmVjZWl2ZUF0dGFjaygnMTEyJyk7XG4gICAgLy8gcGxheWVyMS5ib2FyZC5yZWNlaXZlQXR0YWNrKCcxMTMnKTtcbiAgICAvLyBwbGF5ZXIxLmJvYXJkLnJlY2VpdmVBdHRhY2soJzExNCcpO1xuICAgIC8vIHBsYXllcjIuYm9hcmQucmVjZWl2ZUF0dGFjaygnMjEyJyk7XG4gIFxuICAgIC8vIGNvbnNvbGUubG9nKHBsYXllcjEuYm9hcmQuc2hpcHNbMF0ubG9jYXRpb25zKVxuICAgIC8vIGNvbnNvbGUubG9nKHBsYXllcjIuYm9hcmQuc2hpcHNbMF0ubG9jYXRpb25zKVxuXG4gICAgLy8gcmV0dXJuIHsgcGxheWVyMSwgcGxheWVyMiB9O1xuICAgIFxuICAgIHJldHVybiB7IHBsYXllciB9O1xuXG59KSgpIiwiaW1wb3J0IHsgY29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IG1vZGVsIH0gZnJvbSBcIi4vbW9kZWxcIjtcbmltcG9ydCB7IGluZGV4IH0gZnJvbSBcIi4vaW5kZXhcIjtcblxuZXhwb3J0IGNvbnN0IHZpZXcgPSAoKCkgPT4ge1xuXG4gICAgY29uc3QgZGlzcGxheUJvYXJkcyA9IChwbGF5ZXJzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBsYXllcnMpXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMzsgaSsrKXtcbiAgICAgICAgICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AnICsgaSArICdiJyk7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDExOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnaWQnLCBpICsgYCR7an1gICsgayk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHR5cGVvZiAoY2VsbC5pZCkpXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNlbGwuaWQpXG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjZWxsJyk7XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNlbGwuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNlbGwuY2xhc3NMaXN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcnNbMV0uYm9hcmQucmVjZWl2ZUF0dGFjayhjZWxsLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IGRpc3BsYXlIaXQgPSAoY2VsbElEKSA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjZWxsSUQpO1xuICAgICAgICBjb25zb2xlLmxvZyhjZWxsKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRpc3BsYXlNaXNzID0gKGNlbGxJRCkgPT4ge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2VsbElEKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgIH07XG5cbiAgICBjb25zdCBkaXNwbGF5U2hpcHMgPSAoc2hpcHMpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNoaXBzW2ldICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7c2hpcHNbaV19YCk7XG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIFxuICAgICAgICB9O1xuXG4gICAgfTtcblxuICAgIHJldHVybiB7ZGlzcGxheUJvYXJkcywgZGlzcGxheUhpdCwgZGlzcGxheVNoaXBzLCBkaXNwbGF5TWlzc31cbn0pKCkiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vc3JjL2ltYWdlcy9pY29uczgtZmlyZS00OC5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9zcmMvaW1hZ2VzL2Nsb3NlLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxufVxcblxcbi5tZXNzYWdlIHtcXG4gICAgaGVpZ2h0OiAxMHZoO1xcbn1cXG5cXG4ubWFpbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGhlaWdodDogNzB2aDtcXG59XFxuXFxuLnAxYixcXG4ucDJiIHtcXG4gICAgaGVpZ2h0OiA1MDBweDtcXG4gICAgd2lkdGg6IDUwMHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4ucDFiIGRpdixcXG4ucDJiIGRpdiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibHVlO1xcbn1cXG5cXG5mb290ZXIsXFxuaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcXG4gICAgaGVpZ2h0OiAxMHZoO1xcbn1cXG5cXG4uaGl0IHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMTY5LCAxNjkpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblxcbi5zaGlwIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcXG59XFxuXFxuLm1pc3Mge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxTQUFTO0lBQ1QsWUFBWTtJQUNaLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGFBQWE7SUFDYixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw2QkFBNkI7SUFDN0Isa0JBQWtCO0lBQ2xCLFlBQVk7QUFDaEI7O0FBRUE7O0lBRUksYUFBYTtJQUNiLFlBQVk7SUFDWix1QkFBdUI7SUFDdkIsYUFBYTtJQUNiLHNDQUFzQztJQUN0QyxtQ0FBbUM7QUFDdkM7O0FBRUE7O0lBRUksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsc0JBQXNCO0FBQzFCOztBQUVBOztJQUVJLHNCQUFzQjtJQUN0QixZQUFZO0FBQ2hCOztBQUVBO0lBQ0kseURBQXVEO0lBQ3ZELG9DQUFvQztJQUNwQyxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSx5REFBOEM7SUFDOUMscUJBQXFCO0FBQ3pCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgcGFkZGluZzogMDtcXG59XFxuXFxuYm9keSB7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG59XFxuXFxuLm1lc3NhZ2Uge1xcbiAgICBoZWlnaHQ6IDEwdmg7XFxufVxcblxcbi5tYWluIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgaGVpZ2h0OiA3MHZoO1xcbn1cXG5cXG4ucDFiLFxcbi5wMmIge1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICB3aWR0aDogNTAwcHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5wMWIgZGl2LFxcbi5wMmIgZGl2IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsdWU7XFxufVxcblxcbmZvb3RlcixcXG5oZWFkZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xcbiAgICBoZWlnaHQ6IDEwdmg7XFxufVxcblxcbi5oaXQge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi4vc3JjL2ltYWdlcy9pY29uczgtZmlyZS00OC5wbmcpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ1LCAxNjksIDE2OSk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG59XFxuXFxuLnNoaXAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcbn1cXG5cXG4ubWlzcyB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi9zcmMvaW1hZ2VzL2Nsb3NlLnBuZyk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTsgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsibW9kZWwiLCJ2aWV3IiwiaW5kZXgiLCJjb250cm9sbGVyIiwiaW5pdCIsInBsYXllcjEiLCJwbGF5ZXIiLCJwbGF5ZXIyIiwicGxheWVycyIsImJvYXJkIiwic2hpcHMiLCJsb2NhdGlvbnMiLCJkaXNwbGF5Qm9hcmRzIiwiZGlzcGxheVNoaXBzIiwiZ2V0RmxlZXQiLCJjb25zb2xlIiwibG9nIiwic2hpcEZhY3RvcnkiLCJsZW5ndGgiLCJzaGlwTGVuZ3RoIiwiZGlyZWN0aW9uIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaGl0cyIsImlzU3VuayIsInNldENvb3JkIiwiY2VsbHMiLCJpIiwicHVzaCIsImdldHRpbmdIaXQiLCJjZWxsIiwiZGlzcGxheUhpdCIsImdldHRpbmdTdW5rIiwiaW5kZXhPZiIsImJvYXJkRmFjdG9yeSIsImJvYXJkU2l6ZSIsImlsbGVnYWxNb3ZlcyIsInJlY2VpdmVBdHRhY2siLCJpZCIsInBsYXllcklkIiwiZmxlZXRDb29yZHMiLCJqIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImsiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NMaXN0IiwiY2VsbElEIiwicmVtb3ZlIiwiYWRkIiwiZGlzcGxheU1pc3MiXSwic291cmNlUm9vdCI6IiJ9