(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[9],{

/***/ "./node_modules/scratch-vm/src/extensions/scratch3_video_sensing/index.js":
/*!********************************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extensions/scratch3_video_sensing/index.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Runtime = __webpack_require__(/*! ../../engine/runtime */ "./node_modules/scratch-vm/src/engine/runtime.js");
const ArgumentType = __webpack_require__(/*! ../../extension-support/argument-type */ "./node_modules/scratch-vm/src/extension-support/argument-type.js");
const BlockType = __webpack_require__(/*! ../../extension-support/block-type */ "./node_modules/scratch-vm/src/extension-support/block-type.js");
const Clone = __webpack_require__(/*! ../../util/clone */ "./node_modules/scratch-vm/src/util/clone.js");
const Cast = __webpack_require__(/*! ../../util/cast */ "./node_modules/scratch-vm/src/util/cast.js");
const formatMessage = __webpack_require__(/*! format-message */ "./node_modules/scratch-vm/node_modules/format-message/index.js");
const Video = __webpack_require__(/*! ../../io/video */ "./node_modules/scratch-vm/src/io/video.js");
const VideoMotion = __webpack_require__(/*! ./library */ "./node_modules/scratch-vm/src/extensions/scratch3_video_sensing/library.js");

/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjIgKDY3MTQ1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5FeHRlbnNpb25zL1NvZnR3YXJlL1ZpZGVvLVNlbnNpbmctTWVudTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJFeHRlbnNpb25zL1NvZnR3YXJlL1ZpZGVvLVNlbnNpbmctTWVudSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9InZpZGVvLW1vdGlvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDUuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC1Db3B5IiBmaWxsPSIjMEVCRDhDIiBvcGFjaXR5PSIwLjI1IiBjeD0iMTYiIGN5PSI4IiByPSIyIj48L2NpcmNsZT4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC1Db3B5IiBmaWxsPSIjMEVCRDhDIiBvcGFjaXR5PSIwLjUiIGN4PSIxNiIgY3k9IjYiIHI9IjIiPjwvY2lyY2xlPgogICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLUNvcHkiIGZpbGw9IiMwRUJEOEMiIG9wYWNpdHk9IjAuNzUiIGN4PSIxNiIgY3k9IjQiIHI9IjIiPjwvY2lyY2xlPgogICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBmaWxsPSIjMEVCRDhDIiBjeD0iMTYiIGN5PSIyIiByPSIyIj48L2NpcmNsZT4KICAgICAgICAgICAgPHBhdGggZD0iTTExLjMzNTk3MzksMi4yMDk3ODgyNSBMOC4yNSw0LjIwOTk1NjQ5IEw4LjI1LDMuMDUgQzguMjUsMi4wNDQ4ODIyNyA3LjQ2ODU5MDMxLDEuMjUgNi41LDEuMjUgTDIuMDUsMS4yNSBDMS4wMzgwNzExOSwxLjI1IDAuMjUsMi4wMzgwNzExOSAwLjI1LDMuMDUgTDAuMjUsNyBDMC4yNSw3Ljk2MzY5OTM3IDEuMDQyMjQ5MTksOC43NTU5NDg1NiAyLjA1LDguOCBMNi41LDguOCBDNy40NTA4MzAwOSw4LjggOC4yNSw3Ljk3MzI3MjUgOC4yNSw3IEw4LjI1LDUuODU4NDUyNDEgTDguNjI4NjIzOTQsNi4wODU2MjY3NyBMMTEuNDI2Nzc2Nyw3Ljc3MzIyMzMgQzExLjQzNjg5NDMsNy43ODMzNDA5MSAxMS40NzU3NjU1LDcuOCAxMS41LDcuOCBDMTEuNjMzNDkzMiw3LjggMTEuNzUsNy42OTEyNjAzNCAxMS43NSw3LjU1IEwxMS43NSwyLjQgQzExLjc1LDIuNDE4MzgyNjkgMTEuNzIxOTAyOSwyLjM1MjgyMjgyIDExLjY4NTYyNjgsMi4yNzg2MjM5NCBDMTEuNjEyOTUyOCwyLjE1NzUwMDY5IDExLjQ3MDc5NjgsMi4xMjkwNjk1IDExLjMzNTk3MzksMi4yMDk3ODgyNSBaIiBpZD0idmlkZW9fMzdfIiBzdHJva2Utb3BhY2l0eT0iMC4xNSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuNSIgZmlsbD0iIzRENEQ0RCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+';

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgNDAgNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjIgKDY3MTQ1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5FeHRlbnNpb25zL1NvZnR3YXJlL1ZpZGVvLVNlbnNpbmctQmxvY2s8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iRXh0ZW5zaW9ucy9Tb2Z0d2FyZS9WaWRlby1TZW5zaW5nLUJsb2NrIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2Utb3BhY2l0eT0iMC4xNSI+CiAgICAgICAgPGcgaWQ9InZpZGVvLW1vdGlvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDEwLjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjMDAwMDAwIj4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC1Db3B5IiBmaWxsPSIjRkZGRkZGIiBvcGFjaXR5PSIwLjI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGN4PSIzMiIgY3k9IjE2IiByPSI0LjUiPjwvY2lyY2xlPgogICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLUNvcHkiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjeD0iMzIiIGN5PSIxMiIgcj0iNC41Ij48L2NpcmNsZT4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC1Db3B5IiBmaWxsPSIjRkZGRkZGIiBvcGFjaXR5PSIwLjc1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGN4PSIzMiIgY3k9IjgiIHI9IjQuNSI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY3g9IjMyIiBjeT0iNCIgcj0iNC41Ij48L2NpcmNsZT4KICAgICAgICAgICAgPHBhdGggZD0iTTIyLjY3MTk0NzcsNC40MTk1NzY0OSBMMTYuNSw4LjQxOTkxMjk4IEwxNi41LDYuMSBDMTYuNSw0LjA4OTc2NDU0IDE0LjkzNzE4MDYsMi41IDEzLDIuNSBMNC4xLDIuNSBDMi4wNzYxNDIzNywyLjUgMC41LDQuMDc2MTQyMzcgMC41LDYuMSBMMC41LDE0IEMwLjUsMTUuOTI3Mzk4NyAyLjA4NDQ5ODM5LDE3LjUxMTg5NzEgNC4xLDE3LjYgTDEzLDE3LjYgQzE0LjkwMTY2MDIsMTcuNiAxNi41LDE1Ljk0NjU0NSAxNi41LDE0IEwxNi41LDExLjcxNjkwNDggTDIyLjc1NzI0NzksMTUuNDcxMjUzNSBMMjIuODUzNTUzNCwxNS41NDY0NDY2IEMyMi44NzM3ODg2LDE1LjU2NjY4MTggMjIuOTUxNTMxLDE1LjYgMjMsMTUuNiBDMjMuMjY2OTg2NSwxNS42IDIzLjUsMTUuMzgyNTIwNyAyMy41LDE1LjEgTDIzLjUsNC44IEMyMy41LDQuODM2NzY1MzggMjMuNDQzODA1OCw0LjcwNTY0NTYzIDIzLjM3MTI1MzUsNC41NTcyNDc4OCBDMjMuMjI1OTA1Niw0LjMxNTAwMTM5IDIyLjk0MTU5MzcsNC4yNTgxMzg5OSAyMi42NzE5NDc3LDQuNDE5NTc2NDkgWiIgaWQ9InZpZGVvXzM3XyIgZmlsbD0iIzRENEQ0RCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+';

/**
 * Sensor attribute video sensor block should report.
 * @readonly
 * @enum {string}
 */
const SensingAttribute = {
  /** The amount of motion. */
  MOTION: 'motion',
  /** The direction of the motion. */
  DIRECTION: 'direction'
};

/**
 * Subject video sensor block should report for.
 * @readonly
 * @enum {string}
 */
const SensingSubject = {
  /** The sensor traits of the whole stage. */
  STAGE: 'Stage',
  /** The senosr traits of the area overlapped by this sprite. */
  SPRITE: 'this sprite'
};

/**
 * States the video sensing activity can be set to.
 * @readonly
 * @enum {string}
 */
const VideoState = {
  /** Video turned off. */
  OFF: 'off',
  /** Video turned on with default y axis mirroring. */
  ON: 'on',
  /** Video turned on without default y axis mirroring. */
  ON_FLIPPED: 'on-flipped'
};

/**
 * Class for the motion-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class Scratch3VideoSensingBlocks {
  constructor(runtime) {
    /**
     * The runtime instantiating this block package.
     * @type {Runtime}
     */
    this.runtime = runtime;

    /**
     * The motion detection algoritm used to power the motion amount and
     * direction values.
     * @type {VideoMotion}
     */
    this.detect = new VideoMotion();

    /**
     * The last millisecond epoch timestamp that the video stream was
     * analyzed.
     * @type {number}
     */
    this._lastUpdate = null;

    /**
     * A flag to determine if this extension has been installed in a project.
     * It is set to false the first time getInfo is run.
     * @type {boolean}
     */
    this.firstInstall = true;
    if (this.runtime.ioDevices) {
      // Configure the video device with values from globally stored locations.
      this.runtime.on(Runtime.PROJECT_LOADED, this.updateVideoDisplay.bind(this));

      // Clear target motion state values when the project starts.
      this.runtime.on(Runtime.PROJECT_RUN_START, this.reset.bind(this));

      // Kick off looping the analysis logic.
      this._loop();
    }
  }

  /**
   * After analyzing a frame the amount of milliseconds until another frame
   * is analyzed.
   * @type {number}
   */
  static get INTERVAL() {
    return 33;
  }

  /**
   * Dimensions the video stream is analyzed at after its rendered to the
   * sample canvas.
   * @type {Array.<number>}
   */
  static get DIMENSIONS() {
    return [480, 360];
  }

  /**
   * The key to load & store a target's motion-related state.
   * @type {string}
   */
  static get STATE_KEY() {
    return 'Scratch.videoSensing';
  }

  /**
   * The default motion-related state, to be used when a target has no existing motion state.
   * @type {MotionState}
   */
  static get DEFAULT_MOTION_STATE() {
    return {
      motionFrameNumber: 0,
      motionAmount: 0,
      motionDirection: 0
    };
  }

  /**
   * The transparency setting of the video preview stored in a value
   * accessible by any object connected to the virtual machine.
   * @type {number}
   */
  get globalVideoTransparency() {
    const stage = this.runtime.getTargetForStage();
    if (stage) {
      return stage.videoTransparency;
    }
    return 50;
  }
  set globalVideoTransparency(transparency) {
    const stage = this.runtime.getTargetForStage();
    if (stage) {
      stage.videoTransparency = transparency;
    }
    return transparency;
  }

  /**
   * The video state of the video preview stored in a value accessible by any
   * object connected to the virtual machine.
   * @type {number}
   */
  get globalVideoState() {
    const stage = this.runtime.getTargetForStage();
    if (stage) {
      return stage.videoState;
    }
    // Though the default value for the stage is normally 'on', we need to default
    // to 'off' here to prevent the video device from briefly activating
    // while waiting for stage targets to be installed that say it should be off
    return VideoState.OFF;
  }
  set globalVideoState(state) {
    const stage = this.runtime.getTargetForStage();
    if (stage) {
      stage.videoState = state;
    }
    return state;
  }

  /**
   * Get the latest values for video transparency and state,
   * and set the video device to use them.
   */
  updateVideoDisplay() {
    this.setVideoTransparency({
      TRANSPARENCY: this.globalVideoTransparency
    });
    this.videoToggle({
      VIDEO_STATE: this.globalVideoState
    });
  }

  /**
   * Reset the extension's data motion detection data. This will clear out
   * for example old frames, so the first analyzed frame will not be compared
   * against a frame from before reset was called.
   */
  reset() {
    this.detect.reset();
    const targets = this.runtime.targets;
    for (let i = 0; i < targets.length; i++) {
      const state = targets[i].getCustomState(Scratch3VideoSensingBlocks.STATE_KEY);
      if (state) {
        state.motionAmount = 0;
        state.motionDirection = 0;
      }
    }
  }

  /**
   * Occasionally step a loop to sample the video, stamp it to the preview
   * skin, and add a TypedArray copy of the canvas's pixel data.
   * @private
   */
  _loop() {
    setTimeout(this._loop.bind(this), Math.max(this.runtime.currentStepTime, Scratch3VideoSensingBlocks.INTERVAL));

    // Add frame to detector
    const time = Date.now();
    if (this._lastUpdate === null) {
      this._lastUpdate = time;
    }
    const offset = time - this._lastUpdate;
    if (offset > Scratch3VideoSensingBlocks.INTERVAL) {
      const frame = this.runtime.ioDevices.video.getFrame({
        format: Video.FORMAT_IMAGE_DATA,
        dimensions: Scratch3VideoSensingBlocks.DIMENSIONS
      });
      if (frame) {
        this._lastUpdate = time;
        this.detect.addFrame(frame.data);
      }
    }
  }

  /**
   * Create data for a menu in scratch-blocks format, consisting of an array
   * of objects with text and value properties. The text is a translated
   * string, and the value is one-indexed.
   * @param {object[]} info - An array of info objects each having a name
   *   property.
   * @return {array} - An array of objects with text and value properties.
   * @private
   */
  _buildMenu(info) {
    return info.map((entry, index) => {
      const obj = {};
      obj.text = entry.name;
      obj.value = entry.value || String(index + 1);
      return obj;
    });
  }

  /**
   * @param {Target} target - collect motion state for this target.
   * @returns {MotionState} the mutable motion state associated with that
   *   target. This will be created if necessary.
   * @private
   */
  _getMotionState(target) {
    let motionState = target.getCustomState(Scratch3VideoSensingBlocks.STATE_KEY);
    if (!motionState) {
      motionState = Clone.simple(Scratch3VideoSensingBlocks.DEFAULT_MOTION_STATE);
      target.setCustomState(Scratch3VideoSensingBlocks.STATE_KEY, motionState);
    }
    return motionState;
  }
  static get SensingAttribute() {
    return SensingAttribute;
  }

  /**
   * An array of choices of whether a reporter should return the frame's
   * motion amount or direction.
   * @type {object[]}
   * @param {string} name - the translatable name to display in sensor
   *   attribute menu
   * @param {string} value - the serializable value of the attribute
   */
  get ATTRIBUTE_INFO() {
    return [{
      name: formatMessage({
        id: 'videoSensing.motion',
        default: 'motion',
        description: 'Attribute for the "video [ATTRIBUTE] on [SUBJECT]" block'
      }),
      value: SensingAttribute.MOTION
    }, {
      name: formatMessage({
        id: 'videoSensing.direction',
        default: 'direction',
        description: 'Attribute for the "video [ATTRIBUTE] on [SUBJECT]" block'
      }),
      value: SensingAttribute.DIRECTION
    }];
  }
  static get SensingSubject() {
    return SensingSubject;
  }

  /**
   * An array of info about the subject choices.
   * @type {object[]}
   * @param {string} name - the translatable name to display in the subject menu
   * @param {string} value - the serializable value of the subject
   */
  get SUBJECT_INFO() {
    return [{
      name: formatMessage({
        id: 'videoSensing.sprite',
        default: 'sprite',
        description: 'Subject for the "video [ATTRIBUTE] on [SUBJECT]" block'
      }),
      value: SensingSubject.SPRITE
    }, {
      name: formatMessage({
        id: 'videoSensing.stage',
        default: 'stage',
        description: 'Subject for the "video [ATTRIBUTE] on [SUBJECT]" block'
      }),
      value: SensingSubject.STAGE
    }];
  }

  /**
   * States the video sensing activity can be set to.
   * @readonly
   * @enum {string}
   */
  static get VideoState() {
    return VideoState;
  }

  /**
   * An array of info on video state options for the "turn video [STATE]" block.
   * @type {object[]}
   * @param {string} name - the translatable name to display in the video state menu
   * @param {string} value - the serializable value stored in the block
   */
  get VIDEO_STATE_INFO() {
    return [{
      name: formatMessage({
        id: 'videoSensing.off',
        default: 'off',
        description: 'Option for the "turn video [STATE]" block'
      }),
      value: VideoState.OFF
    }, {
      name: formatMessage({
        id: 'videoSensing.on',
        default: 'on',
        description: 'Option for the "turn video [STATE]" block'
      }),
      value: VideoState.ON
    }, {
      name: formatMessage({
        id: 'videoSensing.onFlipped',
        default: 'on flipped',
        description: 'Option for the "turn video [STATE]" block that causes the video to be flipped' + ' horizontally (reversed as in a mirror)'
      }),
      value: VideoState.ON_FLIPPED
    }];
  }

  /**
   * @returns {object} metadata for this extension and its blocks.
   */
  getInfo() {
    // Set the video display properties to defaults the first time
    // getInfo is run. This turns on the video device when it is
    // first added to a project, and is overwritten by a PROJECT_LOADED
    // event listener that later calls updateVideoDisplay
    if (this.firstInstall) {
      this.globalVideoState = VideoState.ON;
      this.globalVideoTransparency = 50;
      this.updateVideoDisplay();
      this.firstInstall = false;
    }

    // Return extension definition
    return {
      id: 'videoSensing',
      name: formatMessage({
        id: 'videoSensing.categoryName',
        default: 'Video Sensing',
        description: 'Label for the video sensing extension category'
      }),
      blockIconURI: blockIconURI,
      menuIconURI: menuIconURI,
      blocks: [{
        // @todo this hat needs to be set itself to restart existing
        // threads like Scratch 2's behaviour.
        opcode: 'whenMotionGreaterThan',
        text: formatMessage({
          id: 'videoSensing.whenMotionGreaterThan',
          default: 'when video motion > [REFERENCE]',
          description: 'Event that triggers when the amount of motion is greater than [REFERENCE]'
        }),
        blockType: BlockType.HAT,
        arguments: {
          REFERENCE: {
            type: ArgumentType.NUMBER,
            defaultValue: 10
          }
        }
      }, {
        opcode: 'videoOn',
        blockType: BlockType.REPORTER,
        text: formatMessage({
          id: 'videoSensing.videoOn',
          default: 'video [ATTRIBUTE] on [SUBJECT]',
          description: 'Reporter that returns the amount of [ATTRIBUTE] for the selected [SUBJECT]'
        }),
        arguments: {
          ATTRIBUTE: {
            type: ArgumentType.NUMBER,
            menu: 'ATTRIBUTE',
            defaultValue: SensingAttribute.MOTION
          },
          SUBJECT: {
            type: ArgumentType.NUMBER,
            menu: 'SUBJECT',
            defaultValue: SensingSubject.SPRITE
          }
        }
      }, {
        opcode: 'videoToggle',
        text: formatMessage({
          id: 'videoSensing.videoToggle',
          default: 'turn video [VIDEO_STATE]',
          description: 'Controls display of the video preview layer'
        }),
        arguments: {
          VIDEO_STATE: {
            type: ArgumentType.NUMBER,
            menu: 'VIDEO_STATE',
            defaultValue: VideoState.ON
          }
        }
      }, {
        opcode: 'setVideoTransparency',
        text: formatMessage({
          id: 'videoSensing.setVideoTransparency',
          default: 'set video transparency to [TRANSPARENCY]',
          description: 'Controls transparency of the video preview layer'
        }),
        arguments: {
          TRANSPARENCY: {
            type: ArgumentType.NUMBER,
            defaultValue: 50
          }
        }
      }],
      menus: {
        ATTRIBUTE: {
          acceptReporters: true,
          items: this._buildMenu(this.ATTRIBUTE_INFO)
        },
        SUBJECT: {
          acceptReporters: true,
          items: this._buildMenu(this.SUBJECT_INFO)
        },
        VIDEO_STATE: {
          acceptReporters: true,
          items: this._buildMenu(this.VIDEO_STATE_INFO)
        }
      }
    };
  }

  /**
   * Analyze a part of the frame that a target overlaps.
   * @param {Target} target - a target to determine where to analyze
   * @returns {MotionState} the motion state for the given target
   */
  _analyzeLocalMotion(target) {
    const drawable = this.runtime.renderer._allDrawables[target.drawableID];
    const state = this._getMotionState(target);
    this.detect.getLocalMotion(drawable, state);
    return state;
  }

  /**
   * A scratch reporter block handle that analyzes the last two frames and
   * depending on the arguments, returns the motion or direction for the
   * whole stage or just the target sprite.
   * @param {object} args - the block arguments
   * @param {BlockUtility} util - the block utility
   * @returns {number} the motion amount or direction of the stage or sprite
   */
  videoOn(args, util) {
    this.detect.analyzeFrame();
    let state = this.detect;
    if (args.SUBJECT === SensingSubject.SPRITE) {
      state = this._analyzeLocalMotion(util.target);
    }
    if (args.ATTRIBUTE === SensingAttribute.MOTION) {
      return state.motionAmount;
    }
    return state.motionDirection;
  }

  /**
   * A scratch hat block edge handle that analyzes the last two frames where
   * the target sprite overlaps and if it has more motion than the given
   * reference value.
   * @param {object} args - the block arguments
   * @param {BlockUtility} util - the block utility
   * @returns {boolean} true if the sprite overlaps more motion than the
   *   reference
   */
  whenMotionGreaterThan(args, util) {
    this.detect.analyzeFrame();
    const state = this._analyzeLocalMotion(util.target);
    return state.motionAmount > Number(args.REFERENCE);
  }

  /**
   * A scratch command block handle that configures the video state from
   * passed arguments.
   * @param {object} args - the block arguments
   * @param {VideoState} args.VIDEO_STATE - the video state to set the device to
   */
  videoToggle(args) {
    const state = args.VIDEO_STATE;
    this.globalVideoState = state;
    if (state === VideoState.OFF) {
      this.runtime.ioDevices.video.disableVideo();
    } else {
      this.runtime.ioDevices.video.enableVideo();
      // Mirror if state is ON. Do not mirror if state is ON_FLIPPED.
      this.runtime.ioDevices.video.mirror = state === VideoState.ON;
    }
  }

  /**
   * A scratch command block handle that configures the video preview's
   * transparency from passed arguments.
   * @param {object} args - the block arguments
   * @param {number} args.TRANSPARENCY - the transparency to set the video
   *   preview to
   */
  setVideoTransparency(args) {
    const transparency = Cast.toNumber(args.TRANSPARENCY);
    this.globalVideoTransparency = transparency;
    this.runtime.ioDevices.video.setPreviewGhost(transparency);
  }
}
module.exports = Scratch3VideoSensingBlocks;

/***/ }),

/***/ "./node_modules/scratch-vm/src/extensions/scratch3_video_sensing/library.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extensions/scratch3_video_sensing/library.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @file library.js
 *
 * Tony Hwang and John Maloney, January 2011
 * Michael "Z" Goddard, March 2018
 *
 * Video motion sensing primitives.
 */

const _require = __webpack_require__(/*! ./math */ "./node_modules/scratch-vm/src/extensions/scratch3_video_sensing/math.js"),
  motionVector = _require.motionVector,
  scratchAtan2 = _require.scratchAtan2;

/**
 * The width of the intended resolution to analyze for motion.
 * @type {number}
 */
const WIDTH = 480;

/**
 * The height of the intended resolution to analyze for motion.
 * @type {number}
 */
const HEIGHT = 360;

/**
 * A constant value to scale the magnitude of the x and y components called u
 * and v. This creates the motionAmount value.
 *
 * Old note: chosen empirically to give a range of roughly 0-100
 *
 * @type {number}
 */
const AMOUNT_SCALE = 100;

/**
 * A constant value to scale the magnitude of the x and y components called u
 * and v in the local motion derivative. This creates the motionAmount value on
 * a target's motion state.
 *
 * Old note: note 2e-4 * activePixelNum is an experimentally tuned threshold
 * for my logitech Pro 9000 webcam - TTH
 *
 * @type {number}
 */
const LOCAL_AMOUNT_SCALE = AMOUNT_SCALE * 2e-4;

/**
 * The motion amount must be higher than the THRESHOLD to calculate a new
 * direction value.
 * @type {number}
 */
const THRESHOLD = 10;

/**
 * The size of the radius of the window of summarized values when considering
 * the motion inside the full resolution of the sample.
 * @type {number}
 */
const WINSIZE = 8;

/**
 * A ceiling for the motionAmount stored to a local target's motion state. The
 * motionAmount is not allowed to be larger than LOCAL_MAX_AMOUNT.
 * @type {number}
 */
const LOCAL_MAX_AMOUNT = 100;

/**
 * The motion amount for a target's local motion must be higher than the
 * LOCAL_THRESHOLD to calculate a new direction value.
 * @type {number}
 */
const LOCAL_THRESHOLD = THRESHOLD / 3;

/**
 * Store the necessary image pixel data to compares frames of a video and
 * detect an amount and direction of motion in the full sample or in a
 * specified area.
 * @constructor
 */
class VideoMotion {
  constructor() {
    /**
     * The number of frames that have been added from a source.
     * @type {number}
     */
    this.frameNumber = 0;

    /**
     * The frameNumber last analyzed.
     * @type {number}
     */
    this.lastAnalyzedFrame = 0;

    /**
     * The amount of motion detected in the current frame.
     * @type {number}
     */
    this.motionAmount = 0;

    /**
     * The direction the motion detected in the frame is general moving in.
     * @type {number}
     */
    this.motionDirection = 0;

    /**
     * A copy of the current frame's pixel values. A index of the array is
     * represented in RGBA. The lowest byte is red. The next is green. The
     * next is blue. And the last is the alpha value of that pixel.
     * @type {Uint32Array}
     */
    this.curr = null;

    /**
     * A copy of the last frame's pixel values.
     * @type {Uint32Array}
     */
    this.prev = null;

    /**
     * A buffer for holding one component of a pixel's full value twice.
     * One for the current value. And one for the last value.
     * @type {number}
     */
    this._arrays = new ArrayBuffer(WIDTH * HEIGHT * 2 * 1);

    /**
     * A clamped uint8 view of _arrays. One component of each index of the
     * curr member is copied into this array.
     * @type {number}
     */
    this._curr = new Uint8ClampedArray(this._arrays, WIDTH * HEIGHT * 0 * 1, WIDTH * HEIGHT);

    /**
     * A clamped uint8 view of _arrays. One component of each index of the
     * prev member is copied into this array.
     * @type {number}
     */
    this._prev = new Uint8ClampedArray(this._arrays, WIDTH * HEIGHT * 1 * 1, WIDTH * HEIGHT);
  }

  /**
   * Reset internal state so future frame analysis does not consider values
   * from before this method was called.
   */
  reset() {
    this.frameNumber = 0;
    this.lastAnalyzedFrame = 0;
    this.motionAmount = this.motionDirection = 0;
    this.prev = this.curr = null;
  }

  /**
   * Add a frame to be next analyzed. The passed array represent a pixel with
   * each index in the RGBA format.
   * @param {Uint32Array} source - a source frame of pixels to copy
   */
  addFrame(source) {
    this.frameNumber++;

    // Swap curr to prev.
    this.prev = this.curr;
    // Create a clone of the array so any modifications made to the source
    // array do not affect the work done in here.
    this.curr = new Uint32Array(source.buffer.slice(0));

    // Swap _prev and _curr. Copy one of the color components of the new
    // array into _curr overwriting what was the old _prev data.
    const _tmp = this._prev;
    this._prev = this._curr;
    this._curr = _tmp;
    for (let i = 0; i < this.curr.length; i++) {
      this._curr[i] = this.curr[i] & 0xff;
    }
  }

  /**
   * Analyze the current frame against the previous frame determining the
   * amount of motion and direction of the motion.
   */
  analyzeFrame() {
    if (!this.curr || !this.prev) {
      this.motionAmount = this.motionDirection = -1;
      // Don't have two frames to analyze yet
      return;
    }

    // Return early if new data has not been received.
    if (this.lastAnalyzedFrame === this.frameNumber) {
      return;
    }
    this.lastAnalyzedFrame = this.frameNumber;
    const curr = this._curr,
      prev = this._prev;
    const winStep = WINSIZE * 2 + 1;
    const wmax = WIDTH - WINSIZE - 1;
    const hmax = HEIGHT - WINSIZE - 1;

    // Accumulate 2d motion vectors from groups of pixels and average it
    // later.
    let uu = 0;
    let vv = 0;
    let n = 0;

    // Iterate over groups of cells building up the components to determine
    // a motion vector for each cell instead of the whole frame to avoid
    // integer overflows.
    for (let i = WINSIZE + 1; i < hmax; i += winStep) {
      for (let j = WINSIZE + 1; j < wmax; j += winStep) {
        let A2 = 0;
        let A1B2 = 0;
        let B1 = 0;
        let C1 = 0;
        let C2 = 0;

        // This is a performance critical math region.
        let address = (i - WINSIZE) * WIDTH + j - WINSIZE;
        let nextAddress = address + winStep;
        const maxAddress = (i + WINSIZE) * WIDTH + j + WINSIZE;
        for (; address <= maxAddress; address += WIDTH - winStep, nextAddress += WIDTH) {
          for (; address <= nextAddress; address += 1) {
            // The difference in color between the last frame and
            // the current frame.
            const gradT = prev[address] - curr[address];
            // The difference between the pixel to the left and the
            // pixel to the right.
            const gradX = curr[address - 1] - curr[address + 1];
            // The difference between the pixel above and the pixel
            // below.
            const gradY = curr[address - WIDTH] - curr[address + WIDTH];

            // Add the combined values of this pixel to previously
            // considered pixels.
            A2 += gradX * gradX;
            A1B2 += gradX * gradY;
            B1 += gradY * gradY;
            C2 += gradX * gradT;
            C1 += gradY * gradT;
          }
        }

        // Use the accumalated values from the for loop to determine a
        // motion direction.
        const _motionVector = motionVector(A2, A1B2, B1, C2, C1),
          u = _motionVector.u,
          v = _motionVector.v;

        // If u and v are within negative winStep to positive winStep,
        // add them to a sum that will later be averaged.
        if (-winStep < u && u < winStep && -winStep < v && v < winStep) {
          uu += u;
          vv += v;
          n++;
        }
      }
    }

    // Average the summed vector values of all of the motion groups.
    uu /= n;
    vv /= n;

    // Scale the magnitude of the averaged UV vector.
    this.motionAmount = Math.round(AMOUNT_SCALE * Math.hypot(uu, vv));
    if (this.motionAmount > THRESHOLD) {
      // Scratch direction
      this.motionDirection = scratchAtan2(vv, uu);
    }
  }

  /**
   * Build motion amount and direction values based on stored current and
   * previous frame that overlaps a given drawable.
   * @param {Drawable} drawable - touchable and bounded drawable to build motion for
   * @param {MotionState} state - state to store built values to
   */
  getLocalMotion(drawable, state) {
    if (!this.curr || !this.prev) {
      state.motionAmount = state.motionDirection = -1;
      // Don't have two frames to analyze yet
      return;
    }

    // Skip if the current frame has already been considered for this state.
    if (state.motionFrameNumber !== this.frameNumber) {
      const prev = this._prev,
        curr = this._curr;

      // The public APIs for Renderer#isTouching manage keeping the matrix and
      // silhouette up-to-date, which is needed for drawable#isTouching to work (used below)
      drawable.updateCPURenderAttributes();

      // Restrict the region the amount and direction are built from to
      // the area of the current frame overlapped by the given drawable's
      // bounding box.
      const boundingRect = drawable.getFastBounds();
      // Transform the bounding box from scratch space to a space from 0,
      // 0 to WIDTH, HEIGHT.
      const xmin = Math.max(Math.floor(boundingRect.left + WIDTH / 2), 1);
      const xmax = Math.min(Math.floor(boundingRect.right + WIDTH / 2), WIDTH - 1);
      const ymin = Math.max(Math.floor(HEIGHT / 2 - boundingRect.top), 1);
      const ymax = Math.min(Math.floor(HEIGHT / 2 - boundingRect.bottom), HEIGHT - 1);
      let A2 = 0;
      let A1B2 = 0;
      let B1 = 0;
      let C1 = 0;
      let C2 = 0;
      let scaleFactor = 0;
      const position = [0, 0, 0];

      // This is a performance critical math region.
      for (let i = ymin; i < ymax; i++) {
        for (let j = xmin; j < xmax; j++) {
          // i and j are in a coordinate planning ranging from 0 to
          // HEIGHT and 0 to WIDTH. Transform that into Scratch's
          // range of HEIGHT / 2 to -HEIGHT / 2 and -WIDTH / 2 to
          // WIDTH / 2;
          position[0] = j - WIDTH / 2;
          position[1] = HEIGHT / 2 - i;
          // Consider only pixels in the drawable that can touch the
          // edge or other drawables. Empty space in the current skin
          // is skipped.
          if (drawable.isTouching(position)) {
            const address = i * WIDTH + j;
            // The difference in color between the last frame and
            // the current frame.
            const gradT = prev[address] - curr[address];
            // The difference between the pixel to the left and the
            // pixel to the right.
            const gradX = curr[address - 1] - curr[address + 1];
            // The difference between the pixel above and the pixel
            // below.
            const gradY = curr[address - WIDTH] - curr[address + WIDTH];

            // Add the combined values of this pixel to previously
            // considered pixels.
            A2 += gradX * gradX;
            A1B2 += gradX * gradY;
            B1 += gradY * gradY;
            C2 += gradX * gradT;
            C1 += gradY * gradT;
            scaleFactor++;
          }
        }
      }

      // Use the accumalated values from the for loop to determine a
      // motion direction.
      let _motionVector2 = motionVector(A2, A1B2, B1, C2, C1),
        u = _motionVector2.u,
        v = _motionVector2.v;
      let activePixelNum = 0;
      if (scaleFactor) {
        // Store the area of the sprite in pixels
        activePixelNum = scaleFactor;
        scaleFactor /= 2 * WINSIZE * 2 * WINSIZE;
        u = u / scaleFactor;
        v = v / scaleFactor;
      }

      // Scale the magnitude of the averaged UV vector and the number of
      // overlapping drawable pixels.
      state.motionAmount = Math.round(LOCAL_AMOUNT_SCALE * activePixelNum * Math.hypot(u, v));
      if (state.motionAmount > LOCAL_MAX_AMOUNT) {
        // Clip all magnitudes greater than 100.
        state.motionAmount = LOCAL_MAX_AMOUNT;
      }
      if (state.motionAmount > LOCAL_THRESHOLD) {
        // Scratch direction.
        state.motionDirection = scratchAtan2(v, u);
      }

      // Skip future calls on this state until a new frame is added.
      state.motionFrameNumber = this.frameNumber;
    }
  }
}
module.exports = VideoMotion;

/***/ }),

/***/ "./node_modules/scratch-vm/src/extensions/scratch3_video_sensing/math.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extensions/scratch3_video_sensing/math.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A constant value helping to transform a value in radians to degrees.
 * @type {number}
 */
const TO_DEGREE = 180 / Math.PI;

/**
 * A object reused to save on memory allocation returning u and v vector from
 * motionVector.
 * @type {UV}
 */
const _motionVectorOut = {
  u: 0,
  v: 0
};

/**
 * Determine a motion vector combinations of the color component difference on
 * the x axis, y axis, and temporal axis.
 * @param {number} A2 - a sum of x axis squared
 * @param {number} A1B2 - a sum of x axis times y axis
 * @param {number} B1 - a sum of y axis squared
 * @param {number} C2 - a sum of x axis times temporal axis
 * @param {number} C1 - a sum of y axis times temporal axis
 * @param {UV} out - optional object to store return UV info in
 * @returns {UV} a uv vector representing the motion for the given input
 */
const motionVector = function motionVector(A2, A1B2, B1, C2, C1) {
  let out = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _motionVectorOut;
  // Compare sums of X * Y and sums of X squared and Y squared.
  const delta = A1B2 * A1B2 - A2 * B1;
  if (delta) {
    // System is not singular - solving by Kramer method.
    const deltaX = -(C1 * A1B2 - C2 * B1);
    const deltaY = -(A1B2 * C2 - A2 * C1);
    const Idelta = 8 / delta;
    out.u = deltaX * Idelta;
    out.v = deltaY * Idelta;
  } else {
    // Singular system - find optical flow in gradient direction.
    const Norm = (A1B2 + A2) * (A1B2 + A2) + (B1 + A1B2) * (B1 + A1B2);
    if (Norm) {
      const IGradNorm = 8 / Norm;
      const temp = -(C1 + C2) * IGradNorm;
      out.u = (A1B2 + A2) * temp;
      out.v = (B1 + A1B2) * temp;
    } else {
      out.u = 0;
      out.v = 0;
    }
  }
  return out;
};

/**
 * Translate an angle in degrees with the range -180 to 180 rotated to
 * Scratch's reference angle.
 * @param {number} degrees - angle in range -180 to 180
 * @returns {number} angle from Scratch's reference angle
 */
const scratchDegrees = function scratchDegrees(degrees) {
  return (degrees + 270) % 360 - 180;
};

/**
 * Get the angle of the y and x component of a 2d vector in degrees in
 * Scratch's coordinate plane.
 * @param {number} y - the y component of a 2d vector
 * @param {number} x - the x component of a 2d vector
 * @returns {number} angle in degrees in Scratch's coordinate plane
 */
const scratchAtan2 = function scratchAtan2(y, x) {
  return scratchDegrees(Math.atan2(y, x) * TO_DEGREE);
};
module.exports = {
  motionVector,
  scratchDegrees,
  scratchAtan2
};

/***/ })

}]);
//# sourceMappingURL=9.js.map