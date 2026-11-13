(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[97],{

/***/ "../scratch-vm/node_modules/raw-loader/index.js!./node_modules/scratch-vm/src/gm2-tw-extension-lib-data/10.fetch.js":
/*!*****************************************************************************************************************!*\
  !*** ../scratch-vm/node_modules/raw-loader!./node_modules/scratch-vm/src/gm2-tw-extension-lib-data/10.fetch.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "// Name: Fetch\n// ID: fetch\n// Description: Make requests to the broader internet.\n// By: GarboMuffin\n// License: MIT AND MPL-2.0\n\n/* generated l10n code */Scratch.translate.setup({\"de\":{\"_Fetch\":\"Internetquests\"},\"fi\":{\"_Fetch\":\"Datan haku\"},\"it\":{\"_Fetch\":\"Estrazione\"},\"ja\":{\"_Fetch\":\"フェッチ\"},\"nb\":{\"_Fetch\":\"Hent\"},\"ru\":{\"_Fetch\":\"Поимка\"},\"zh-cn\":{\"_Fetch\":\"请求API\"}});/* end generated l10n code */(function (Scratch) {\n  \"use strict\";\n\n  class Fetch {\n    getInfo() {\n      return {\n        id: \"fetch\",\n        name: Scratch.translate(\"Fetch\"),\n        blocks: [\n          {\n            opcode: \"get\",\n            blockType: Scratch.BlockType.REPORTER,\n            // eslint-disable-next-line extension/should-translate\n            text: \"GET [URL]\",\n            arguments: {\n              URL: {\n                type: Scratch.ArgumentType.STRING,\n                defaultValue: \"https://extensions.turbowarp.org/hello.txt\",\n              },\n            },\n          },\n        ],\n      };\n    }\n\n    get(args) {\n      return Scratch.fetch(args.URL)\n        .then((r) => r.text())\n        .catch(() => \"\");\n    }\n  }\n\n  Scratch.extensions.register(new Fetch());\n})(Scratch);\n"

/***/ })

}]);
//# sourceMappingURL=97.js.map