(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[94],{

/***/ "./node_modules/scratch-vm/src/extensions/gm2_projectsound/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extensions/gm2_projectsound/index.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const ArgumentType = __webpack_require__(/*! ../../extension-support/argument-type */ "./node_modules/scratch-vm/src/extension-support/argument-type.js");
const BlockType = __webpack_require__(/*! ../../extension-support/block-type */ "./node_modules/scratch-vm/src/extension-support/block-type.js");
const Cast = __webpack_require__(/*! ../../util/cast */ "./node_modules/scratch-vm/src/util/cast.js");
const log = __webpack_require__(/*! ../../util/log */ "./node_modules/scratch-vm/src/util/log.js");
var audioContext = null;
var analyser = null;
var projectLoudness = -1;
function updateAnalyser() {
  if (analyser) {
    var array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    var arraySum = array.reduce((a, value) => a + value, 0);
    var average = arraySum / array.length;
    projectLoudness = average;
  }
}
function createAnalyser(audioContext, target) {
  analyser = audioContext.createAnalyser();
  analyser.smoothingTimeConstant = 0.8;
  analyser.fftSize = 1024;
  target.connect(analyser);
}
setInterval(() => {
  updateAnalyser();
}, 1);
class GvbvdxxMod2ProjectSoundData {
  constructor(runtime) {
    this.runtime = runtime;
    this.vm = runtime.vm;
    var lastContext = null;
    var audioEngine = runtime.audioEngine;
    createAnalyser(audioEngine.audioContext, audioEngine.getInputNode());
    var lastContext = audioEngine.audioContext;
    setInterval(() => {
      if (lastContext !== audioEngine.audioContext) {
        createAnalyser(audioEngine.audioContext, audioEngine.getInputNode());
        lastContext = audioEngine.audioContext;
      }
    }, 1000 / 60);
  }
  getInfo() {
    return {
      id: 'sndanalyser',
      name: 'Project Sound Data',
      color1: "#ff0073",
      color2: "#ba2b75",
      color3: "#852053",
      blocks: [{
        opcode: 'noiseLevel',
        blockType: BlockType.REPORTER,
        text: 'Get project noise level',
        arguments: {}
      }],
      menus: {}
    };
  }
  noiseLevel() {
    return Cast.toString(projectLoudness);
  }
}
module.exports = GvbvdxxMod2ProjectSoundData;

/***/ })

}]);
//# sourceMappingURL=94.js.map