module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1626919991105, function(require, module, exports) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var create_detector_1 = require("./create_detector");
exports.createDetector = create_detector_1.createDetector;
// Supported models enum.
__export(require("./types"));
// Second level exports.
// Utils for rendering.
var util = require("./util");
exports.util = util;
// General calculators.
var keypoints_to_normalized_keypoints_1 = require("./calculators/keypoints_to_normalized_keypoints");
var calculators = { keypointsToNormalizedKeypoints: keypoints_to_normalized_keypoints_1.keypointsToNormalizedKeypoints };
exports.calculators = calculators;
// MoveNet model types.
var constants_1 = require("./movenet/constants");
var movenet = {
    modelType: {
        'SINGLEPOSE_LIGHTNING': constants_1.SINGLEPOSE_LIGHTNING,
        'SINGLEPOSE_THUNDER': constants_1.SINGLEPOSE_THUNDER
    }
};
exports.movenet = movenet;
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./create_detector":1626919991106,"./types":1626919991145,"./util":1626919991146,"./calculators/keypoints_to_normalized_keypoints":1626919991121,"./movenet/constants":1626919991147}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991106, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var detector_1 = require("./blazepose_mediapipe/detector");
var detector_2 = require("./blazepose_tfjs/detector");
var detector_3 = require("./movenet/detector");
var detector_4 = require("./posenet/detector");
var types_1 = require("./types");
/**
 * Create a pose detector instance.
 *
 * @param model The name of the pipeline to load.
 */
function createDetector(model, modelConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var config, runtime;
        return __generator(this, function (_a) {
            switch (model) {
                case types_1.SupportedModels.PoseNet:
                    return [2 /*return*/, detector_4.load(modelConfig)];
                case types_1.SupportedModels.BlazePose:
                    config = modelConfig;
                    runtime = void 0;
                    if (config != null) {
                        if (config.runtime === 'tfjs') {
                            return [2 /*return*/, detector_2.load(modelConfig)];
                        }
                        if (config.runtime === 'mediapipe') {
                            return [2 /*return*/, detector_1.load(modelConfig)];
                        }
                        runtime = config.runtime;
                    }
                    throw new Error("Expect modelConfig.runtime to be either 'tfjs' " +
                        ("or 'mediapipe', but got " + runtime));
                case types_1.SupportedModels.MoveNet:
                    return [2 /*return*/, detector_3.load(modelConfig)];
                default:
                    throw new Error(model + " is not a supported model name.");
            }
            return [2 /*return*/];
        });
    });
}
exports.createDetector = createDetector;
//# sourceMappingURL=create_detector.js.map
}, function(modId) { var map = {"./blazepose_mediapipe/detector":1626919991107,"./blazepose_tfjs/detector":1626919991111,"./movenet/detector":1626919991144,"./posenet/detector":1626919991149,"./types":1626919991145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991107, function(require, module, exports) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var pose = require("@mediapipe/pose");
var constants_1 = require("../constants");
var detector_utils_1 = require("./detector_utils");
/**
 * MediaPipe detector class.
 */
var BlazePoseMediaPipeDetector = /** @class */ (function () {
    // Should not be called outside.
    function BlazePoseMediaPipeDetector(config) {
        var _this = this;
        // This will be filled out by asynchronous calls to onResults. They will be
        // stable after `await send` is called on the pose solution.
        this.width = 0;
        this.height = 0;
        this.selfieMode = false;
        this.poseSolution = new pose.Pose({
            locateFile: function (path, base) {
                if (config.solutionPath) {
                    var solutionPath = config.solutionPath.replace(/\/+$/, '');
                    return solutionPath + "/" + path;
                }
                return base + "/" + path;
            }
        });
        var modelComplexity;
        switch (config.modelType) {
            case 'lite':
                modelComplexity = 0;
                break;
            case 'heavy':
                modelComplexity = 2;
                break;
            case 'full':
            default:
                modelComplexity = 1;
                break;
        }
        this.poseSolution.setOptions({
            modelComplexity: modelComplexity,
            smoothLandmarks: config.enableSmoothing || true,
            selfieMode: this.selfieMode,
        });
        this.poseSolution.onResults(function (results) {
            _this.height = results.image.height;
            _this.width = results.image.width;
            _this.poses = _this.translateOutputs(results);
        });
    }
    BlazePoseMediaPipeDetector.prototype.translateOutputs = function (results) {
        var _this = this;
        return results.poseLandmarks != null ? [{
                keypoints: results.poseLandmarks.map(function (landmark, i) { return ({
                    x: landmark.x * _this.width,
                    y: landmark.y * _this.height,
                    z: landmark.z,
                    score: landmark.visibility,
                    name: constants_1.BLAZEPOSE_KEYPOINTS[i]
                }); })
            }] :
            [];
    };
    /**
     * Estimates poses for an image or video frame.
     *
     * It returns a single pose or multiple poses based on the maxPose parameter
     * from the `config`.
     *
     * @param image
     * ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement The input
     * image to feed through the network.
     *
     * @param config Optional.
     *       maxPoses: Optional. Max number of poses to estimate.
     *       When maxPoses = 1, a single pose is detected, it is usually much more
     *       efficient than maxPoses > 1. When maxPoses > 1, multiple poses are
     *       detected.
     *
     *       flipHorizontal: Optional. Default to false. When image data comes
     *       from camera, the result has to flip horizontally.
     *
     *       enableSmoothing: Optional. Default to true. Smooth pose landmarks
     *       coordinates and visibility scores to reduce jitter.
     *
     * @param timestamp Optional. In milliseconds. This is useful when image is
     *     a tensor, which doesn't have timestamp info. Or to override timestamp
     *     in a video.
     *
     * @return An array of `Pose`s.
     */
    BlazePoseMediaPipeDetector.prototype.estimatePoses = function (image, estimationConfig, timestamp) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (estimationConfig && estimationConfig.flipHorizontal &&
                            (estimationConfig.flipHorizontal !== this.selfieMode)) {
                            this.selfieMode = estimationConfig.flipHorizontal;
                            this.poseSolution.setOptions({
                                selfieMode: this.selfieMode,
                            });
                        }
                        return [4 /*yield*/, this.poseSolution.send({ image: image }, timestamp)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.poses];
                }
            });
        });
    };
    BlazePoseMediaPipeDetector.prototype.dispose = function () {
        this.poseSolution.close();
    };
    BlazePoseMediaPipeDetector.prototype.reset = function () {
        this.poseSolution.reset();
    };
    BlazePoseMediaPipeDetector.prototype.initialize = function () {
        return this.poseSolution.initialize();
    };
    return BlazePoseMediaPipeDetector;
}());
/**
 * Loads the MediaPipe solution.
 *
 * @param modelConfig ModelConfig object that contains parameters for
 * the BlazePose loading process. Please find more details of each parameters
 * in the documentation of the `BlazePoseMediaPipeModelConfig` interface.
 */
function load(modelConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var config, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = detector_utils_1.validateModelConfig(modelConfig);
                    result = new BlazePoseMediaPipeDetector(config);
                    return [4 /*yield*/, result.initialize()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.load = load;
//# sourceMappingURL=detector.js.map
}, function(modId) { var map = {"../constants":1626919991108,"./detector_utils":1626919991109}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991108, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
// Don't change the order. The order needs to be consistent with the model
// keypoint result list.
exports.COCO_KEYPOINTS = [
    'nose', 'left_eye', 'right_eye', 'left_ear', 'right_ear', 'left_shoulder',
    'right_shoulder', 'left_elbow', 'right_elbow', 'left_wrist', 'right_wrist',
    'left_hip', 'right_hip', 'left_knee', 'right_knee', 'left_ankle',
    'right_ankle'
];
// Don't change the order. The order needs to be consistent with the model
// keypoint result list.
exports.BLAZEPOSE_KEYPOINTS = [
    'nose',
    'left_eye_inner',
    'left_eye',
    'left_eye_outer',
    'right_eye_inner',
    'right_eye',
    'right_eye_outer',
    'left_ear',
    'right_ear',
    'mouth_left',
    'mouth_right',
    'left_shoulder',
    'right_shoulder',
    'left_elbow',
    'right_elbow',
    'left_wrist',
    'right_wrist',
    'left_pinky',
    'right_pinky',
    'left_index',
    'right_index',
    'left_thumb',
    'right_thumb',
    'left_hip',
    'right_hip',
    'left_knee',
    'right_knee',
    'left_ankle',
    'right_ankle',
    'left_heel',
    'right_heel',
    'left_foot_index',
    'right_foot_index'
];
exports.BLAZEPOSE_KEYPOINTS_BY_SIDE = {
    left: [1, 2, 3, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31],
    right: [4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
    middle: [0]
};
exports.COCO_KEYPOINTS_BY_SIDE = {
    left: [1, 3, 5, 7, 9, 11, 13, 15],
    right: [2, 4, 6, 8, 10, 12, 14, 16],
    middle: [0]
};
exports.COCO_CONNECTED_KEYPOINTS_PAIRS = [
    [0, 1], [0, 2], [1, 3], [2, 4], [5, 6], [5, 7], [5, 11], [6, 8], [6, 12],
    [7, 9], [8, 10], [11, 12], [11, 13], [12, 14], [13, 15], [14, 16]
];
exports.BLAZEPOSE_CONNECTED_KEYPOINTS_PAIRS = [
    [0, 1], [0, 4], [1, 2], [2, 3], [3, 7], [4, 5],
    [5, 6], [6, 8], [9, 10], [11, 12], [11, 13], [11, 23],
    [12, 14], [14, 16], [12, 24], [13, 15], [15, 17], [16, 18],
    [16, 20], [15, 17], [15, 19], [15, 21], [16, 22], [17, 19],
    [18, 20], [23, 25], [23, 24], [24, 26], [25, 27], [26, 28],
    [27, 29], [28, 30], [27, 31], [28, 32], [29, 31], [30, 32]
];
//# sourceMappingURL=constants.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991109, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
function validateModelConfig(modelConfig) {
    if (modelConfig == null) {
        return __assign({}, constants_1.DEFAULT_BLAZEPOSE_MODEL_CONFIG);
    }
    var config = __assign({}, modelConfig);
    config.runtime = 'mediapipe';
    if (config.enableSmoothing == null) {
        config.enableSmoothing = constants_1.DEFAULT_BLAZEPOSE_MODEL_CONFIG.enableSmoothing;
    }
    if (config.modelType == null) {
        config.modelType = constants_1.DEFAULT_BLAZEPOSE_MODEL_CONFIG.modelType;
    }
    return config;
}
exports.validateModelConfig = validateModelConfig;
function validateEstimationConfig(estimationConfig) {
    if (estimationConfig == null) {
        return __assign({}, constants_1.DEFAULT_BLAZEPOSE_ESTIMATION_CONFIG);
    }
    var config = __assign({}, estimationConfig);
    if (config.maxPoses == null) {
        config.maxPoses = 1;
    }
    if (config.maxPoses <= 0) {
        throw new Error("Invalid maxPoses " + config.maxPoses + ". Should be > 0.");
    }
    if (config.maxPoses > 1) {
        throw new Error('Multi-pose detection is not implemented yet. Please set maxPoses ' +
            'to 1.');
    }
    if (config.flipHorizontal == null) {
        config.flipHorizontal = constants_1.DEFAULT_BLAZEPOSE_ESTIMATION_CONFIG.flipHorizontal;
    }
    return config;
}
exports.validateEstimationConfig = validateEstimationConfig;
//# sourceMappingURL=detector_utils.js.map
}, function(modId) { var map = {"./constants":1626919991110}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991110, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_BLAZEPOSE_MODEL_CONFIG = {
    runtime: 'mediapipe',
    enableSmoothing: true,
    modelType: 'full'
};
exports.DEFAULT_BLAZEPOSE_ESTIMATION_CONFIG = {
    maxPoses: 1,
    flipHorizontal: false
};
//# sourceMappingURL=constants.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991111, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tfconv = require("@tensorflow/tfjs-converter");
var tf = require("@tensorflow/tfjs-core");
var constants_1 = require("../calculators/constants");
var convert_image_to_tensor_1 = require("../calculators/convert_image_to_tensor");
var image_utils_1 = require("../calculators/image_utils");
var is_video_1 = require("../calculators/is_video");
var keypoints_smoothing_1 = require("../calculators/keypoints_smoothing");
var normalized_keypoints_to_keypoints_1 = require("../calculators/normalized_keypoints_to_keypoints");
var shift_image_value_1 = require("../calculators/shift_image_value");
var constants_2 = require("../constants");
var calculate_alignment_points_rects_1 = require("./calculators/calculate_alignment_points_rects");
var calculate_landmark_projection_1 = require("./calculators/calculate_landmark_projection");
var create_ssd_anchors_1 = require("./calculators/create_ssd_anchors");
var detector_inference_1 = require("./calculators/detector_inference");
var landmarks_to_detection_1 = require("./calculators/landmarks_to_detection");
var non_max_suppression_1 = require("./calculators/non_max_suppression");
var refine_landmarks_from_heatmap_1 = require("./calculators/refine_landmarks_from_heatmap");
var remove_detection_letterbox_1 = require("./calculators/remove_detection_letterbox");
var remove_landmark_letterbox_1 = require("./calculators/remove_landmark_letterbox");
var tensors_to_detections_1 = require("./calculators/tensors_to_detections");
var tensors_to_landmarks_1 = require("./calculators/tensors_to_landmarks");
var transform_rect_1 = require("./calculators/transform_rect");
var visibility_smoothing_1 = require("./calculators/visibility_smoothing");
var constants = require("./constants");
var detector_utils_1 = require("./detector_utils");
/**
 * BlazePose detector class.
 */
var BlazePoseTfjsDetector = /** @class */ (function () {
    function BlazePoseTfjsDetector(detectorModel, landmarkModel, enableSmoothing, modelType) {
        this.detectorModel = detectorModel;
        this.landmarkModel = landmarkModel;
        this.enableSmoothing = enableSmoothing;
        this.modelType = modelType;
        // Store global states.
        this.regionOfInterest = null;
        this.anchors =
            create_ssd_anchors_1.createSsdAnchors(constants.BLAZEPOSE_DETECTOR_ANCHOR_CONFIGURATION);
        var anchorW = tf.tensor1d(this.anchors.map(function (a) { return a.width; }));
        var anchorH = tf.tensor1d(this.anchors.map(function (a) { return a.height; }));
        var anchorX = tf.tensor1d(this.anchors.map(function (a) { return a.xCenter; }));
        var anchorY = tf.tensor1d(this.anchors.map(function (a) { return a.yCenter; }));
        this.anchorTensor = { x: anchorX, y: anchorY, w: anchorW, h: anchorH };
    }
    /**
     * Estimates poses for an image or video frame.
     *
     * It returns a single pose or multiple poses based on the maxPose parameter
     * from the `config`.
     *
     * @param image
     * ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement The input
     * image to feed through the network.
     *
     * @param estimationConfig Optional. See `BlazePoseTfjsEstimationConfig`
     *       documentation for detail.
     *
     * @param timestamp Optional. In milliseconds. This is useful when image is
     *     a tensor, which doesn't have timestamp info. Or to override timestamp
     *     in a video.
     *
     * @return An array of `Pose`s.
     */
    // TF.js implementation of the mediapipe pose detection pipeline.
    // ref graph:
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/pose_landmark/pose_landmark_cpu.pbtxt
    BlazePoseTfjsDetector.prototype.estimatePoses = function (image, estimationConfig, timestamp) {
        return __awaiter(this, void 0, void 0, function () {
            var config, imageSize, image3d, poseRect, detections, firstDetection, poseLandmarks, actualLandmarks, auxiliaryLandmarks, poseScore, _a, actualLandmarksFiltered, auxiliaryLandmarksFiltered, poseRectFromLandmarks, keypoints, pose;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        config = detector_utils_1.validateEstimationConfig(estimationConfig);
                        if (image == null) {
                            this.reset();
                            return [2 /*return*/, []];
                        }
                        this.maxPoses = config.maxPoses;
                        // User provided timestamp will override video's timestamp.
                        if (timestamp != null) {
                            this.timestamp = timestamp * constants_1.MILLISECOND_TO_MICRO_SECONDS;
                        }
                        else {
                            // For static images, timestamp should be null.
                            this.timestamp =
                                is_video_1.isVideo(image) ? image.currentTime * constants_1.SECOND_TO_MICRO_SECONDS : null;
                        }
                        imageSize = image_utils_1.getImageSize(image);
                        image3d = tf.tidy(function () { return tf.cast(image_utils_1.toImageTensor(image), 'float32'); });
                        poseRect = this.regionOfInterest;
                        if (!(poseRect == null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.detectPose(image3d)];
                    case 1:
                        detections = _b.sent();
                        if (detections.length === 0) {
                            this.reset();
                            image3d.dispose();
                            return [2 /*return*/, []];
                        }
                        firstDetection = detections[0];
                        // Calculates region of interest based on pose detection, so that can be
                        // used to detect landmarks.
                        poseRect = this.poseDetectionToRoi(firstDetection, imageSize);
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this.poseLandmarksByRoi(poseRect, image3d)];
                    case 3:
                        poseLandmarks = _b.sent();
                        image3d.dispose();
                        if (poseLandmarks == null) {
                            this.reset();
                            return [2 /*return*/, []];
                        }
                        actualLandmarks = poseLandmarks.actualLandmarks, auxiliaryLandmarks = poseLandmarks.auxiliaryLandmarks, poseScore = poseLandmarks.poseScore;
                        _a = this.poseLandmarkFiltering(actualLandmarks, auxiliaryLandmarks, imageSize), actualLandmarksFiltered = _a.actualLandmarksFiltered, auxiliaryLandmarksFiltered = _a.auxiliaryLandmarksFiltered;
                        poseRectFromLandmarks = this.poseLandmarksToRoi(auxiliaryLandmarksFiltered, imageSize);
                        // Cache roi for next image.
                        this.regionOfInterest = poseRectFromLandmarks;
                        keypoints = actualLandmarksFiltered != null ?
                            normalized_keypoints_to_keypoints_1.normalizedKeypointsToKeypoints(actualLandmarksFiltered, imageSize) :
                            null;
                        // Add keypoint name.
                        if (keypoints != null) {
                            keypoints.forEach(function (keypoint, i) {
                                keypoint.name = constants_2.BLAZEPOSE_KEYPOINTS[i];
                            });
                        }
                        pose = { score: poseScore, keypoints: keypoints };
                        return [2 /*return*/, [pose]];
                }
            });
        });
    };
    BlazePoseTfjsDetector.prototype.dispose = function () {
        this.detectorModel.dispose();
        this.landmarkModel.dispose();
        tf.dispose([
            this.anchorTensor.x, this.anchorTensor.y, this.anchorTensor.w,
            this.anchorTensor.h
        ]);
    };
    BlazePoseTfjsDetector.prototype.reset = function () {
        this.regionOfInterest = null;
        this.visibilitySmoothingFilterActual = null;
        this.visibilitySmoothingFilterAuxiliary = null;
        this.landmarksSmoothingFilterActual = null;
        this.landmarksSmoothingFilterAuxiliary = null;
    };
    // Detects poses.
    // Subgraph: PoseDetectionCpu.
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/pose_detection/pose_detection_cpu.pbtxt
    BlazePoseTfjsDetector.prototype.detectPose = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, imageTensor, padding, imageValueShifted, _b, boxes, scores, detections, selectedDetections, newDetections;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = convert_image_to_tensor_1.convertImageToTensor(image, constants.BLAZEPOSE_DETECTOR_IMAGE_TO_TENSOR_CONFIG), imageTensor = _a.imageTensor, padding = _a.padding;
                        imageValueShifted = shift_image_value_1.shiftImageValue(imageTensor, [-1, 1]);
                        _b = detector_inference_1.detectorInference(imageValueShifted, this.detectorModel), boxes = _b.boxes, scores = _b.scores;
                        return [4 /*yield*/, tensors_to_detections_1.tensorsToDetections([scores, boxes], this.anchorTensor, constants.BLAZEPOSE_TENSORS_TO_DETECTION_CONFIGURATION)];
                    case 1:
                        detections = _c.sent();
                        return [4 /*yield*/, non_max_suppression_1.nonMaxSuppression(detections, this.maxPoses, constants.BLAZEPOSE_DETECTOR_NON_MAX_SUPPRESSION_CONFIGURATION
                                .minSuppressionThreshold, constants.BLAZEPOSE_DETECTOR_NON_MAX_SUPPRESSION_CONFIGURATION
                                .minScoreThreshold)];
                    case 2:
                        selectedDetections = _c.sent();
                        newDetections = remove_detection_letterbox_1.removeDetectionLetterbox(selectedDetections, padding);
                        tf.dispose([imageTensor, imageValueShifted, scores, boxes]);
                        return [2 /*return*/, newDetections];
                }
            });
        });
    };
    // Calculates region of interest from a detection.
    // Subgraph: PoseDetectionToRoi.
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/pose_landmark/pose_detection_to_roi.pbtxt
    // If detection is not null, imageSize should not be null either.
    BlazePoseTfjsDetector.prototype.poseDetectionToRoi = function (detection, imageSize) {
        var startKeypointIndex;
        var endKeypointIndex;
        // Converts pose detection into a rectangle based on center and scale
        // alignment points.
        startKeypointIndex = 0;
        endKeypointIndex = 1;
        // PoseDetectionToRoi: AlignmentPointsRectsCalculator.
        var rawRoi = calculate_alignment_points_rects_1.calculateAlignmentPointsRects(detection, imageSize, {
            rotationVectorEndKeypointIndex: endKeypointIndex,
            rotationVectorStartKeypointIndex: startKeypointIndex,
            rotationVectorTargetAngleDegree: 90
        });
        // Expands pose rect with marging used during training.
        // PoseDetectionToRoi: RectTransformationCalculation.
        var roi = transform_rect_1.transformNormalizedRect(rawRoi, imageSize, constants.BLAZEPOSE_DETECTOR_RECT_TRANSFORMATION_CONFIG);
        return roi;
    };
    // Predict pose landmarks.
    // subgraph: PoseLandmarksByRoiCpu
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/pose_landmark/pose_landmark_by_roi_cpu.pbtxt
    // When poseRect is not null, image should not be null either.
    BlazePoseTfjsDetector.prototype.poseLandmarksByRoi = function (poseRect, image) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, imageTensor, padding, imageValueShifted, landmarkResult, landmarkTensor, poseFlagTensor, heatmapTensor, poseScore, landmarks, refinedLandmarks, adjustedLandmarks, landmarksProjected, actualLandmarks, auxiliaryLandmarks;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = convert_image_to_tensor_1.convertImageToTensor(image, constants.BLAZEPOSE_LANDMARK_IMAGE_TO_TENSOR_CONFIG, poseRect), imageTensor = _a.imageTensor, padding = _a.padding;
                        imageValueShifted = shift_image_value_1.shiftImageValue(imageTensor, [0, 1]);
                        landmarkResult = this.landmarkModel.predict(imageValueShifted);
                        switch (this.modelType) {
                            case 'lite':
                                landmarkTensor = landmarkResult[4];
                                poseFlagTensor = landmarkResult[0];
                                heatmapTensor = landmarkResult[3];
                                break;
                            case 'full':
                                landmarkTensor = landmarkResult[4];
                                poseFlagTensor = landmarkResult[3];
                                heatmapTensor = landmarkResult[2];
                                break;
                            case 'heavy':
                                landmarkTensor = landmarkResult[2];
                                poseFlagTensor = landmarkResult[4];
                                heatmapTensor = landmarkResult[1];
                                break;
                            default:
                                throw new Error('Model type must be one of lite, full or heavy,' +
                                    ("but got " + this.modelType));
                        }
                        return [4 /*yield*/, poseFlagTensor.data()];
                    case 1:
                        poseScore = (_b.sent())[0];
                        // Applies a threshold to the confidence score to determine whether a pose
                        // is present.
                        if (poseScore < constants.BLAZEPOSE_POSE_PRESENCE_SCORE) {
                            tf.dispose(landmarkResult);
                            tf.dispose([imageTensor, imageValueShifted]);
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, tensors_to_landmarks_1.tensorsToLandmarks(landmarkTensor, constants.BLAZEPOSE_TENSORS_TO_LANDMARKS_CONFIG)];
                    case 2:
                        landmarks = _b.sent();
                        return [4 /*yield*/, refine_landmarks_from_heatmap_1.refineLandmarksFromHeatmap(landmarks, heatmapTensor, constants.BLAZEPOSE_REFINE_LANDMARKS_FROM_HEATMAP_CONFIG)];
                    case 3:
                        refinedLandmarks = _b.sent();
                        adjustedLandmarks = remove_landmark_letterbox_1.removeLandmarkLetterbox(refinedLandmarks, padding);
                        landmarksProjected = calculate_landmark_projection_1.calculateLandmarkProjection(adjustedLandmarks, poseRect);
                        actualLandmarks = landmarksProjected.slice(0, constants.BLAZEPOSE_NUM_KEYPOINTS);
                        auxiliaryLandmarks = landmarksProjected.slice(constants.BLAZEPOSE_NUM_KEYPOINTS, constants.BLAZEPOSE_NUM_AUXILIARY_KEYPOINTS);
                        tf.dispose(landmarkResult);
                        tf.dispose([imageTensor, imageValueShifted]);
                        return [2 /*return*/, { actualLandmarks: actualLandmarks, auxiliaryLandmarks: auxiliaryLandmarks, poseScore: poseScore }];
                }
            });
        });
    };
    // Calculate region of interest (ROI) from landmarks.
    // Subgraph: PoseLandmarksToRoiCpu
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/pose_landmark/pose_landmarks_to_roi.pbtxt
    // When landmarks is not null, imageSize should not be null either.
    BlazePoseTfjsDetector.prototype.poseLandmarksToRoi = function (landmarks, imageSize) {
        // PoseLandmarksToRoi: LandmarksToDetectionCalculator.
        var detection = landmarks_to_detection_1.landmarksToDetection(landmarks);
        // Converts detection into a rectangle based on center and scale alignment
        // points.
        // PoseLandmarksToRoi: AlignmentPointsRectsCalculator.
        var rawRoi = calculate_alignment_points_rects_1.calculateAlignmentPointsRects(detection, imageSize, {
            rotationVectorStartKeypointIndex: 0,
            rotationVectorEndKeypointIndex: 1,
            rotationVectorTargetAngleDegree: 90
        });
        // Expands pose rect with marging used during training.
        // PoseLandmarksToRoi: RectTransformationCalculator.
        var roi = transform_rect_1.transformNormalizedRect(rawRoi, imageSize, constants.BLAZEPOSE_DETECTOR_RECT_TRANSFORMATION_CONFIG);
        return roi;
    };
    // Filter landmarks temporally to reduce jitter.
    // Subgraph: PoseLandmarkFiltering
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/pose_landmark/pose_landmark_filtering.pbtxt
    BlazePoseTfjsDetector.prototype.poseLandmarkFiltering = function (actualLandmarks, auxiliaryLandmarks, imageSize) {
        var actualLandmarksFiltered;
        var auxiliaryLandmarksFiltered;
        if (this.timestamp == null || !this.enableSmoothing) {
            actualLandmarksFiltered = actualLandmarks;
            auxiliaryLandmarksFiltered = auxiliaryLandmarks;
        }
        else {
            var auxDetection = landmarks_to_detection_1.landmarksToDetection(auxiliaryLandmarks);
            var objectScaleROI = calculate_alignment_points_rects_1.calculateAlignmentPointsRects(auxDetection, imageSize, {
                rotationVectorEndKeypointIndex: 0,
                rotationVectorStartKeypointIndex: 1,
                rotationVectorTargetAngleDegree: 90
            });
            // Smoothes pose landmark visibilities to reduce jitter.
            if (this.visibilitySmoothingFilterActual == null) {
                this.visibilitySmoothingFilterActual = new visibility_smoothing_1.LowPassVisibilityFilter(constants.BLAZEPOSE_VISIBILITY_SMOOTHING_CONFIG);
            }
            actualLandmarksFiltered =
                this.visibilitySmoothingFilterActual.apply(actualLandmarks);
            if (this.visibilitySmoothingFilterAuxiliary == null) {
                this.visibilitySmoothingFilterAuxiliary = new visibility_smoothing_1.LowPassVisibilityFilter(constants.BLAZEPOSE_VISIBILITY_SMOOTHING_CONFIG);
            }
            auxiliaryLandmarksFiltered =
                this.visibilitySmoothingFilterAuxiliary.apply(auxiliaryLandmarks);
            // Smoothes pose landmark coordinates to reduce jitter.
            if (this.landmarksSmoothingFilterActual == null) {
                this.landmarksSmoothingFilterActual = new keypoints_smoothing_1.KeypointsSmoothingFilter(constants.BLAZEPOSE_LANDMARKS_SMOOTHING_CONFIG_ACTUAL);
            }
            actualLandmarksFiltered = this.landmarksSmoothingFilterActual.apply(actualLandmarksFiltered, this.timestamp, imageSize, true /* normalized */, objectScaleROI);
            if (this.landmarksSmoothingFilterAuxiliary == null) {
                this.landmarksSmoothingFilterAuxiliary = new keypoints_smoothing_1.KeypointsSmoothingFilter(constants.BLAZEPOSE_LANDMARKS_SMOOTHING_CONFIG_AUXILIARY);
            }
            auxiliaryLandmarksFiltered = this.landmarksSmoothingFilterAuxiliary.apply(auxiliaryLandmarksFiltered, this.timestamp, imageSize, true /* normalized */, objectScaleROI);
        }
        return { actualLandmarksFiltered: actualLandmarksFiltered, auxiliaryLandmarksFiltered: auxiliaryLandmarksFiltered };
    };
    return BlazePoseTfjsDetector;
}());
/**
 * Loads the BlazePose model.
 *
 * @param modelConfig ModelConfig object that contains parameters for
 * the BlazePose loading process. Please find more details of each parameters
 * in the documentation of the `BlazePoseTfjsModelConfig` interface.
 */
function load(modelConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var config, detectorFromTFHub, landmarkFromTFHub, _a, detectorModel, landmarkModel;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = detector_utils_1.validateModelConfig(modelConfig);
                    detectorFromTFHub = (config.detectorModelUrl.indexOf('https://tfhub.dev') > -1);
                    landmarkFromTFHub = (config.landmarkModelUrl.indexOf('https://tfhub.dev') > -1);
                    return [4 /*yield*/, Promise.all([
                            tfconv.loadGraphModel(config.detectorModelUrl, { fromTFHub: detectorFromTFHub }),
                            tfconv.loadGraphModel(config.landmarkModelUrl, { fromTFHub: landmarkFromTFHub })
                        ])];
                case 1:
                    _a = _b.sent(), detectorModel = _a[0], landmarkModel = _a[1];
                    return [2 /*return*/, new BlazePoseTfjsDetector(detectorModel, landmarkModel, config.enableSmoothing, config.modelType)];
            }
        });
    });
}
exports.load = load;
//# sourceMappingURL=detector.js.map
}, function(modId) { var map = {"../calculators/constants":1626919991112,"../calculators/convert_image_to_tensor":1626919991113,"../calculators/image_utils":1626919991114,"../calculators/is_video":1626919991115,"../calculators/keypoints_smoothing":1626919991116,"../calculators/normalized_keypoints_to_keypoints":1626919991124,"../calculators/shift_image_value":1626919991125,"../constants":1626919991108,"./calculators/calculate_alignment_points_rects":1626919991126,"./calculators/calculate_landmark_projection":1626919991128,"./calculators/create_ssd_anchors":1626919991129,"./calculators/detector_inference":1626919991130,"./calculators/landmarks_to_detection":1626919991132,"./calculators/non_max_suppression":1626919991133,"./calculators/refine_landmarks_from_heatmap":1626919991134,"./calculators/remove_detection_letterbox":1626919991135,"./calculators/remove_landmark_letterbox":1626919991136,"./calculators/tensors_to_detections":1626919991137,"./calculators/tensors_to_landmarks":1626919991138,"./calculators/transform_rect":1626919991140,"./calculators/visibility_smoothing":1626919991141,"./constants":1626919991142,"./detector_utils":1626919991143}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991112, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
exports.MICRO_SECONDS_TO_SECOND = 1e-6;
exports.SECOND_TO_MICRO_SECONDS = 1e6;
exports.MILLISECOND_TO_MICRO_SECONDS = 1000;
//# sourceMappingURL=constants.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991113, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var tf = require("@tensorflow/tfjs-core");
var image_utils_1 = require("./image_utils");
/**
 * Convert an image or part of it to an image tensor.
 *
 * @param image An image, video frame or image tensor.
 * @param config
 *      inputResolution: The target height and width.
 *      keepAspectRatio?: Whether target tensor should keep aspect ratio.
 * @param normRect A normalized rectangle, representing the subarea to crop from
 *      the image. If normRect is provided, the returned image tensor represents
 *      the subarea.
 */
function convertImageToTensor(image, config, normRect) {
    var inputResolution = config.inputResolution, keepAspectRatio = config.keepAspectRatio;
    // Ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/tensor/image_to_tensor_calculator.cc
    var imageSize = image_utils_1.getImageSize(image);
    var roi = image_utils_1.getRoi(imageSize, normRect);
    var padding = image_utils_1.padRoi(roi, inputResolution, keepAspectRatio);
    var imageTensor = tf.tidy(function () {
        var $image = image_utils_1.toImageTensor(image);
        var transformMatrix = tf.tensor2d(image_utils_1.getProjectiveTransformMatrix(roi, imageSize, false, inputResolution), [1, 8]);
        var imageTransformed = tf.image.transform(
        // tslint:disable-next-line: no-unnecessary-type-assertion
        tf.expandDims(tf.cast($image, 'float32')), transformMatrix, 'bilinear', 'nearest', 0, [inputResolution.height, inputResolution.width]);
        return imageTransformed;
    });
    return { imageTensor: imageTensor, padding: padding };
}
exports.convertImageToTensor = convertImageToTensor;
//# sourceMappingURL=convert_image_to_tensor.js.map
}, function(modId) { var map = {"./image_utils":1626919991114}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991114, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var tf = require("@tensorflow/tfjs-core");
function getImageSize(input) {
    if (input instanceof tf.Tensor) {
        return { height: input.shape[0], width: input.shape[1] };
    }
    else {
        return { height: input.height, width: input.width };
    }
}
exports.getImageSize = getImageSize;
/**
 * Normalizes the provided angle to the range -pi to pi.
 * @param angle The angle in radians to be normalized.
 */
function normalizeRadians(angle) {
    return angle - 2 * Math.PI * Math.floor((angle + Math.PI) / (2 * Math.PI));
}
exports.normalizeRadians = normalizeRadians;
/**
 * Transform value ranges.
 * @param fromMin Min of original value range.
 * @param fromMax Max of original value range.
 * @param toMin New min of transformed value range.
 * @param toMax New max of transformed value range.
 */
function transformValueRange(fromMin, fromMax, toMin, toMax) {
    var fromRange = fromMax - fromMin;
    var toRange = toMax - toMin;
    if (fromRange === 0) {
        throw new Error("Original min and max are both " + fromMin + ", range cannot be 0.");
    }
    var scale = toRange / fromRange;
    var offset = toMin - fromMin * scale;
    return { scale: scale, offset: offset };
}
exports.transformValueRange = transformValueRange;
/**
 * Convert an image to an image tensor representation.
 *
 * The image tensor has a shape [1, height, width, colorChannel].
 *
 * @param input An image, video frame, or image tensor.
 */
function toImageTensor(input) {
    return input instanceof tf.Tensor ? input : tf.browser.fromPixels(input);
}
exports.toImageTensor = toImageTensor;
/**
 * Padding ratio of left, top, right, bottom, based on the output dimensions.
 *
 * The padding values are non-zero only when the "keep_aspect_ratio" is true.
 *
 * For instance, when the input image is 10x10 (width x height) and the
 * output dimensions is 20x40 and "keep_aspect_ratio" is true, we should scale
 * the input image to 20x20 and places it in the middle of the output image with
 * an equal padding of 10 pixels at the top and the bottom. The result is
 * therefore {left: 0, top: 0.25, right: 0, bottom: 0.25} (10/40 = 0.25f).
 * @param roi The original rectangle to pad.
 * @param targetSize The target width and height of the result rectangle.
 * @param keepAspectRatio Whether keep aspect ratio. Default to false.
 */
function padRoi(roi, targetSize, keepAspectRatio) {
    if (keepAspectRatio === void 0) { keepAspectRatio = false; }
    if (!keepAspectRatio) {
        return { top: 0, left: 0, right: 0, bottom: 0 };
    }
    var targetH = targetSize.height;
    var targetW = targetSize.width;
    validateSize(targetSize, 'targetSize');
    validateSize(roi, 'roi');
    var tensorAspectRatio = targetH / targetW;
    var roiAspectRatio = roi.height / roi.width;
    var newWidth;
    var newHeight;
    var horizontalPadding = 0;
    var verticalPadding = 0;
    if (tensorAspectRatio > roiAspectRatio) {
        // pad height;
        newWidth = roi.width;
        newHeight = roi.width * tensorAspectRatio;
        verticalPadding = (1 - roiAspectRatio / tensorAspectRatio) / 2;
    }
    else {
        // pad width.
        newWidth = roi.height / tensorAspectRatio;
        newHeight = roi.height;
        horizontalPadding = (1 - tensorAspectRatio / roiAspectRatio) / 2;
    }
    roi.width = newWidth;
    roi.height = newHeight;
    return {
        top: verticalPadding,
        left: horizontalPadding,
        right: horizontalPadding,
        bottom: verticalPadding
    };
}
exports.padRoi = padRoi;
/**
 * Get the rectangle information of an image, including xCenter, yCenter, width,
 * height and rotation.
 *
 * @param imageSize imageSize is used to calculate the rectangle.
 * @param normRect Optional. If normRect is not null, it will be used to get
 *     a subarea rectangle information in the image. `imageSize` is used to
 *     calculate the actual non-normalized coordinates.
 */
function getRoi(imageSize, normRect) {
    if (normRect) {
        return {
            xCenter: normRect.xCenter * imageSize.width,
            yCenter: normRect.yCenter * imageSize.height,
            width: normRect.width * imageSize.width,
            height: normRect.height * imageSize.height,
            rotation: normRect.rotation
        };
    }
    else {
        return {
            xCenter: 0.5 * imageSize.width,
            yCenter: 0.5 * imageSize.height,
            width: imageSize.width,
            height: imageSize.height,
            rotation: 0
        };
    }
}
exports.getRoi = getRoi;
/**
 * Generate the projective transformation matrix to be used for `tf.transform`.
 *
 * See more documentation in `tf.transform`.
 *
 * @param subRect The rectangle to generate the projective transformation matrix
 *     for.
 * @param imageSize The original image height and width.
 * @param flipHorizontally Whether flip the image horizontally.
 * @param inputResolution The target height and width.
 */
function getProjectiveTransformMatrix(subRect, imageSize, flipHorizontally, inputResolution) {
    validateSize(inputResolution, 'inputResolution');
    // Ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/tensor/image_to_tensor_utils.cc
    // The resulting matrix is multiplication of below matrices:
    // M = postScaleMatrix * translateMatrix * rotateMatrix * flipMatrix *
    //     scaleMatrix * initialTranslateMatrix
    //
    // For any point in the transformed image p, we can use the above matrix to
    // calculate the projected point in the original image p'. So that:
    // p' = p * M;
    // Note: The transform matrix below assumes image coordinates is normalized
    // to [0, 1] range.
    // postScaleMatrix: Matrix to scale x, y to [0, 1] range
    //   | g  0  0 |
    //   | 0  h  0 |
    //   | 0  0  1 |
    var g = 1 / imageSize.width;
    var h = 1 / imageSize.height;
    // translateMatrix: Matrix to move the center to the subRect center.
    //   | 1  0  e |
    //   | 0  1  f |
    //   | 0  0  1 |
    var e = subRect.xCenter;
    var f = subRect.yCenter;
    // rotateMatrix: Matrix to do rotate the image around the subRect center.
    //   | c -d  0 |
    //   | d  c  0 |
    //   | 0  0  1 |
    var c = Math.cos(subRect.rotation);
    var d = Math.sin(subRect.rotation);
    // flipMatrix: Matrix for optional horizontal flip around the subRect center.
    //   | fl 0  0 |
    //   | 0  1  0 |
    //   | 0  0  1 |
    var flip = flipHorizontally ? -1 : 1;
    // scaleMatrix: Matrix to scale x, y to subRect size.
    //   | a  0  0 |
    //   | 0  b  0 |
    //   | 0  0  1 |
    var a = subRect.width;
    var b = subRect.height;
    // initialTranslateMatrix: Matrix convert x, y to [-0.5, 0.5] range.
    //   | 1  0 -0.5 |
    //   | 0  1 -0.5 |
    //   | 0  0  1   |
    // M is a 3 by 3 matrix denoted by:
    // | a0  a1  a2 |
    // | b0  b1  b2 |
    // | 0   0   1  |
    // To use M with regular x, y coordinates, we need to normalize them first.
    // Because x' = a0 * x + a1 * y + a2, y' = b0 * x + b1 * y + b2,
    // we need to use factor (1/inputResolution.width) to normalize x for a0 and
    // b0, similarly we need to use factor (1/inputResolution.height) to normalize
    // y for a1 and b1.
    // Also at the end, we need to de-normalize x' and y' to regular coordinates.
    // So we need to use factor imageSize.width for a0, a1 and a2, similarly
    // we need to use factor imageSize.height for b0, b1 and b2.
    var a0 = (1 / inputResolution.width) * a * c * flip * g * imageSize.width;
    var a1 = (1 / inputResolution.height) * -b * d * g * imageSize.width;
    var a2 = (-0.5 * a * c * flip + 0.5 * b * d + e) * g * imageSize.width;
    var b0 = (1 / inputResolution.width) * a * d * flip * h * imageSize.height;
    var b1 = (1 / inputResolution.height) * b * c * h * imageSize.height;
    var b2 = (-0.5 * b * c - 0.5 * a * d * flip + f) * h * imageSize.height;
    return [a0, a1, a2, b0, b1, b2, 0, 0];
}
exports.getProjectiveTransformMatrix = getProjectiveTransformMatrix;
function validateSize(size, name) {
    tf.util.assert(size.width !== 0, function () { return name + " width cannot be 0."; });
    tf.util.assert(size.height !== 0, function () { return name + " height cannot be 0."; });
}
//# sourceMappingURL=image_utils.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991115, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isVideo(image) {
    return (image != null) && image.currentTime != null;
}
exports.isVideo = isVideo;
//# sourceMappingURL=is_video.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991116, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
var get_object_scale_1 = require("./get_object_scale");
var keypoints_one_euro_filter_1 = require("./keypoints_one_euro_filter");
var keypoints_to_normalized_keypoints_1 = require("./keypoints_to_normalized_keypoints");
var keypoints_velocity_filter_1 = require("./keypoints_velocity_filter");
var normalized_keypoints_to_keypoints_1 = require("./normalized_keypoints_to_keypoints");
/**
 * A Calculator to smooth keypoints over time.
 */
var KeypointsSmoothingFilter = /** @class */ (function () {
    function KeypointsSmoothingFilter(config) {
        if (config.velocityFilter != null) {
            this.keypointsFilter = new keypoints_velocity_filter_1.KeypointsVelocityFilter(config.velocityFilter);
        }
        else if (config.oneEuroFilter != null) {
            this.keypointsFilter = new keypoints_one_euro_filter_1.KeypointsOneEuroFilter(config.oneEuroFilter);
        }
        else {
            throw new Error('Either configure velocityFilter or oneEuroFilter, but got ' +
                (config + "."));
        }
    }
    /**
     * Apply one of the stateful `KeypointsFilter` to keypoints.
     *
     * Currently supports `OneEuroFilter` and `VelocityFilter`.
     * @param keypoints A list of 2D or 3D keypoints, can be normalized or
     *     non-normalized.
     * @param timestamp The timestamp of the video frame.
     * @param imageSize Optional. The imageSize is useful when keypoints are
     *     normalized.
     * @param normalized Optional. Whether the keypoints are normalized. Default
     *     to false.
     * @param objectScaleROI Optional. The auxiliary ROI to calculate object
     *     scale. If not set, objectScale defaults to 1.
     */
    KeypointsSmoothingFilter.prototype.apply = function (keypoints, timestamp, imageSize, normalized, objectScaleROI) {
        if (normalized === void 0) { normalized = false; }
        if (keypoints == null) {
            this.keypointsFilter.reset();
            return null;
        }
        var objectScale = objectScaleROI != null ? get_object_scale_1.getObjectScale(objectScaleROI, imageSize) : 1;
        var scaledKeypoints = normalized ?
            normalized_keypoints_to_keypoints_1.normalizedKeypointsToKeypoints(keypoints, imageSize) :
            keypoints;
        var scaledKeypointsFiltered = this.keypointsFilter.apply(scaledKeypoints, timestamp, objectScale);
        return normalized ?
            keypoints_to_normalized_keypoints_1.keypointsToNormalizedKeypoints(scaledKeypointsFiltered, imageSize) :
            scaledKeypointsFiltered;
    };
    return KeypointsSmoothingFilter;
}());
exports.KeypointsSmoothingFilter = KeypointsSmoothingFilter;
//# sourceMappingURL=keypoints_smoothing.js.map
}, function(modId) { var map = {"./get_object_scale":1626919991117,"./keypoints_one_euro_filter":1626919991118,"./keypoints_to_normalized_keypoints":1626919991121,"./keypoints_velocity_filter":1626919991122,"./normalized_keypoints_to_keypoints":1626919991124}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991117, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Estimate object scale to allow filter work similarly on nearer or futher
 * objects.
 * @param roi Normalized rectangle.
 * @param imageSize An object that contains width and height.
 * @returns A number representing the object scale.
 */
function getObjectScale(roi, imageSize) {
    var objectWidth = roi.width * imageSize.width;
    var objectHeight = roi.height * imageSize.height;
    return (objectWidth + objectHeight) / 2;
}
exports.getObjectScale = getObjectScale;
//# sourceMappingURL=get_object_scale.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991118, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var one_euro_filter_1 = require("./one_euro_filter");
/**
 * A stateful filter that smoothes keypoints values overtime.
 *
 * More specifically, it uses `OneEuroFilter` to smooth every x, y, z
 * coordinates over time, which as result gives us velocity of how these values
 * change over time. With higher velocity it weights new values higher.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmarks_smoothing_calculator.cc
var KeypointsOneEuroFilter = /** @class */ (function () {
    function KeypointsOneEuroFilter(config) {
        this.config = config;
    }
    KeypointsOneEuroFilter.prototype.apply = function (keypoints, microSeconds, objectScale) {
        var _this = this;
        if (keypoints == null) {
            this.reset();
            return null;
        }
        // Initialize filters once.
        this.initializeFiltersIfEmpty(keypoints);
        // Get value scale as inverse value of the object scale.
        // If value is too small smoothing will be disabled and keypoints will be
        // returned as is.
        var valueScale = 1;
        if (this.config.minAllowedObjectScale != null) {
            if (objectScale < this.config.minAllowedObjectScale) {
                return keypoints.slice();
            }
            valueScale = 1.0 / objectScale;
        }
        // Filter keypoints. Every axis of every keypoint is filtered separately.
        return keypoints.map(function (keypoint, i) {
            var outKeypoint = __assign({}, keypoint, { x: _this.xFilters[i].apply(keypoint.x, microSeconds, valueScale), y: _this.yFilters[i].apply(keypoint.y, microSeconds, valueScale) });
            if (keypoint.z != null) {
                outKeypoint.z =
                    _this.zFilters[i].apply(keypoint.z, microSeconds, valueScale);
            }
            return outKeypoint;
        });
    };
    KeypointsOneEuroFilter.prototype.reset = function () {
        this.xFilters = null;
        this.yFilters = null;
        this.zFilters = null;
    };
    // Initializes filters for the first time or after reset. If initialized the
    // check the size.
    KeypointsOneEuroFilter.prototype.initializeFiltersIfEmpty = function (keypoints) {
        var _this = this;
        if (this.xFilters == null || this.xFilters.length !== keypoints.length) {
            this.xFilters = keypoints.map(function (_) { return new one_euro_filter_1.OneEuroFilter(_this.config); });
            this.yFilters = keypoints.map(function (_) { return new one_euro_filter_1.OneEuroFilter(_this.config); });
            this.zFilters = keypoints.map(function (_) { return new one_euro_filter_1.OneEuroFilter(_this.config); });
        }
    };
    return KeypointsOneEuroFilter;
}());
exports.KeypointsOneEuroFilter = KeypointsOneEuroFilter;
//# sourceMappingURL=keypoints_one_euro_filter.js.map
}, function(modId) { var map = {"./one_euro_filter":1626919991119}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991119, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var constants_1 = require("./constants");
var low_pass_filter_1 = require("./low_pass_filter");
/**
 * OneEuroFilter.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/util/filtering/one_euro_filter.cc
// Also ref original paper:
// https://cristal.univ-lille.fr/~casiez/1euro/
var OneEuroFilter = /** @class */ (function () {
    /**
     * Constructor of `OneEuroFilter` class.
     * @param config See documentation of `OneEuroFilterConfig`.
     */
    function OneEuroFilter(config) {
        this.frequency = config.frequency;
        this.minCutOff = config.minCutOff;
        this.beta = config.beta;
        this.thresholdCutOff = config.thresholdCutOff;
        this.thresholdBeta = config.thresholdBeta;
        this.derivateCutOff = config.derivateCutOff;
        this.x = new low_pass_filter_1.LowPassFilter(this.getAlpha(this.minCutOff));
        this.dx = new low_pass_filter_1.LowPassFilter(this.getAlpha(this.derivateCutOff));
        this.lastTimestamp = 0;
    }
    /**
     * Applies filter to the value.
     * @param value valueToFilter.
     * @param microSeconds timestamp associated with the value (for instance,
     *     timestamp of the frame where you got value from).
     */
    OneEuroFilter.prototype.apply = function (value, microSeconds, valueScale) {
        if (value == null) {
            return value;
        }
        var $microSeconds = Math.trunc(microSeconds);
        if (this.lastTimestamp >= $microSeconds) {
            // Results are unpreditable in this case, so nothing to do but return
            // same value.
            return value;
        }
        // Update the sampling frequency based on timestamps.
        if (this.lastTimestamp !== 0 && $microSeconds !== 0) {
            this.frequency =
                1 / (($microSeconds - this.lastTimestamp) * constants_1.MICRO_SECONDS_TO_SECOND);
        }
        this.lastTimestamp = $microSeconds;
        // Estimate the current variation per second.
        var dValue = this.x.hasLastRawValue() ?
            (value - this.x.lastRawValue()) * valueScale * this.frequency :
            0;
        var edValue = this.dx.applyWithAlpha(dValue, this.getAlpha(this.derivateCutOff));
        var cutOff = this.minCutOff + this.beta * Math.abs(edValue);
        var threshold = this.thresholdCutOff != null ?
            this.thresholdCutOff + this.thresholdBeta * Math.abs(edValue) :
            null;
        // filter the given value.
        return this.x.applyWithAlpha(value, this.getAlpha(cutOff), threshold);
    };
    OneEuroFilter.prototype.getAlpha = function (cutoff) {
        // te = 1.0 / this.frequency
        // tau = 1.0 / (2 * Math.PI * cutoff)
        // result = 1 / (1.0 + (tau / te))
        return 1.0 / (1.0 + (this.frequency / (2 * Math.PI * cutoff)));
    };
    return OneEuroFilter;
}());
exports.OneEuroFilter = OneEuroFilter;
//# sourceMappingURL=one_euro_filter.js.map
}, function(modId) { var map = {"./constants":1626919991112,"./low_pass_filter":1626919991120}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991120, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * A stateful filter that smoothes values overtime.
 *
 * More specifically, it stores the previous value, and when there's a new
 * value, a coefficient 'alpha' is applied to the new value, and `1 - alpha` is
 * applied to the previous value. The smaller the alpha is, the smoother result
 * and the bigger lag.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/util/filtering/low_pass_filter.cc
var LowPassFilter = /** @class */ (function () {
    function LowPassFilter(alpha) {
        this.alpha = alpha;
        this.initialized = false;
    }
    LowPassFilter.prototype.apply = function (value, threshold) {
        var result;
        if (this.initialized) {
            if (threshold == null) {
                // Regular lowpass filter.
                // result = this.alpha * value + (1 - this.alpha) * this.storedValue;
                result = this.storedValue + this.alpha * (value - this.storedValue);
            }
            else {
                // We need to reformat the formula to be able to conveniently apply
                // another optional non-linear function to the
                // (value - this.storedValue) part.
                // Add additional non-linearity to cap extreme value.
                // More specifically, assume x = (value - this.storedValue), when x is
                // close zero, the derived x is close to x, when x is several magnitudes
                // larger, the drived x grows much slower then x. It behaves like
                // sign(x)log(abs(x)).
                result = this.storedValue +
                    this.alpha * threshold *
                        Math.asinh((value - this.storedValue) / threshold);
            }
        }
        else {
            result = value;
            this.initialized = true;
        }
        this.rawValue = value;
        this.storedValue = result;
        return result;
    };
    LowPassFilter.prototype.applyWithAlpha = function (value, alpha, threshold) {
        this.alpha = alpha;
        return this.apply(value, threshold);
    };
    LowPassFilter.prototype.hasLastRawValue = function () {
        return this.initialized;
    };
    LowPassFilter.prototype.lastRawValue = function () {
        return this.rawValue;
    };
    LowPassFilter.prototype.reset = function () {
        this.initialized = false;
    };
    return LowPassFilter;
}());
exports.LowPassFilter = LowPassFilter;
//# sourceMappingURL=low_pass_filter.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991121, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function keypointsToNormalizedKeypoints(keypoints, imageSize) {
    return keypoints.map(function (keypoint) {
        var normalizedKeypoint = __assign({}, keypoint, { x: keypoint.x / imageSize.width, y: keypoint.y / imageSize.height });
        if (keypoint.z != null) {
            // Scale z the same way as x (using image width).
            keypoint.z = keypoint.z / imageSize.width;
        }
        return normalizedKeypoint;
    });
}
exports.keypointsToNormalizedKeypoints = keypointsToNormalizedKeypoints;
//# sourceMappingURL=keypoints_to_normalized_keypoints.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991122, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var relative_velocity_filter_1 = require("./relative_velocity_filter");
/**
 * A stateful filter that smoothes landmark values overtime.
 *
 * More specifically, it uses `RelativeVelocityFilter` to smooth every x, y, z
 * coordinates over time, which as result gives us velocity of how these values
 * change over time. With higher velocity it weights new values higher.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmarks_smoothing_calculator.cc
var KeypointsVelocityFilter = /** @class */ (function () {
    function KeypointsVelocityFilter(config) {
        this.config = config;
    }
    KeypointsVelocityFilter.prototype.apply = function (keypoints, microSeconds, objectScale) {
        var _this = this;
        if (keypoints == null) {
            this.reset();
            return null;
        }
        // Get value scale as inverse value of the object scale.
        // If value is too small smoothing will be disabled and keypoints will be
        // returned as is.
        var valueScale = 1;
        if (!this.config.disableValueScaling) {
            if (objectScale < this.config.minAllowedObjectScale) {
                return keypoints.slice();
            }
            valueScale = 1 / objectScale;
        }
        // Initialize filters once.
        this.initializeFiltersIfEmpty(keypoints);
        // Filter keypoints. Every axis of every keypoint is filtered separately.
        return keypoints.map(function (keypoint, i) {
            var outKeypoint = __assign({}, keypoint, { x: _this.xFilters[i].apply(keypoint.x, microSeconds, valueScale), y: _this.yFilters[i].apply(keypoint.y, microSeconds, valueScale) });
            if (keypoint.z != null) {
                outKeypoint.z =
                    _this.zFilters[i].apply(keypoint.z, microSeconds, valueScale);
            }
            return outKeypoint;
        });
    };
    KeypointsVelocityFilter.prototype.reset = function () {
        this.xFilters = null;
        this.yFilters = null;
        this.zFilters = null;
    };
    // Initializes filters for the first time or after reset. If initialized the
    // check the size.
    KeypointsVelocityFilter.prototype.initializeFiltersIfEmpty = function (keypoints) {
        var _this = this;
        if (this.xFilters == null || this.xFilters.length !== keypoints.length) {
            this.xFilters =
                keypoints.map(function (_) { return new relative_velocity_filter_1.RelativeVelocityFilter(_this.config); });
            this.yFilters =
                keypoints.map(function (_) { return new relative_velocity_filter_1.RelativeVelocityFilter(_this.config); });
            this.zFilters =
                keypoints.map(function (_) { return new relative_velocity_filter_1.RelativeVelocityFilter(_this.config); });
        }
    };
    return KeypointsVelocityFilter;
}());
exports.KeypointsVelocityFilter = KeypointsVelocityFilter;
//# sourceMappingURL=keypoints_velocity_filter.js.map
}, function(modId) { var map = {"./relative_velocity_filter":1626919991123}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991123, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var constants_1 = require("./constants");
var low_pass_filter_1 = require("./low_pass_filter");
/**
 * This filter keeps track (on a window of specified size) of value changes
 * over time, which as result gives us velocity of how value changes over time.
 * With higher velocity it weights new values higher.
 *
 * Use `windowSize` and `velocityScale` to tweak this filter for your use case.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/util/filtering/relative_velocity_filter.cc
var RelativeVelocityFilter = /** @class */ (function () {
    /**
     * Constructor of `RelativeVelocityFilter` class.
     * @param config
     *        `windowSize`:  Higher windowSize adds to lag and to stability.
     *        `velocityScale`: Lower velocityScale adds to lag and to stability.
     */
    function RelativeVelocityFilter(config) {
        this.config = config;
        this.window = [];
        this.lowPassFilter = new low_pass_filter_1.LowPassFilter(1.0);
        this.lastValue = 0;
        this.lastValueScale = 1;
        this.lastTimestamp = -1;
    }
    /**
     * Applies filter to the value.
     * @param value valueToFilter.
     * @param microSeconds timestamp associated with the value (for instance,
     *     timestamp of the frame where you got value from).
     * @param valueScale value scale (for instance, if your value is a distance
     *     detected on a frame, it can look same on different devices but have
     *     quite different absolute values due to different resolution, you
     *     should come up with an appropriate parameter for your particular use
     *     case).
     */
    RelativeVelocityFilter.prototype.apply = function (value, microSeconds, valueScale) {
        if (value == null) {
            return value;
        }
        var $microSeconds = Math.trunc(microSeconds);
        if (this.lastTimestamp >= $microSeconds) {
            // Results are unpreditable in this case, so nothing to do but return
            // same value.
            return value;
        }
        var alpha;
        if (this.lastTimestamp === -1) {
            alpha = 1;
        }
        else {
            // Implement the DistanceEstimationMode.kLegacyTransition.
            // TODO(lina128): Change to kForceCurrentScale or at least add an option
            // that can be tweaked with parameter.
            var distance = value * valueScale - this.lastValue * this.lastValueScale;
            var duration = $microSeconds - this.lastTimestamp;
            var cumulativeDistance = distance;
            var cumulativeDuration = duration;
            // Define max cumulative duration assuming 30 frames per second is a good
            // frame rate, so assuming 30 values per second or 1 / 30 of a second is
            // a good duration per window element.
            var assumedMaxDuration = constants_1.SECOND_TO_MICRO_SECONDS / 30;
            var maxCumulativeDuration = (1 + this.window.length) * assumedMaxDuration;
            for (var _i = 0, _a = this.window; _i < _a.length; _i++) {
                var el = _a[_i];
                if (cumulativeDuration + el.duration > maxCumulativeDuration) {
                    // This helps in cases when durations are large and outdated
                    // window elements have bad impact on filtering results.
                    break;
                }
                cumulativeDistance += el.distance;
                cumulativeDuration += el.duration;
            }
            var velocity = cumulativeDistance / (cumulativeDuration * constants_1.MICRO_SECONDS_TO_SECOND);
            alpha = 1 - 1 / (1 + this.config.velocityScale * Math.abs(velocity));
            this.window.unshift({ distance: distance, duration: duration });
            if (this.window.length > this.config.windowSize) {
                this.window.pop();
            }
        }
        this.lastValue = value;
        this.lastValueScale = valueScale;
        this.lastTimestamp = $microSeconds;
        return this.lowPassFilter.applyWithAlpha(value, alpha);
    };
    return RelativeVelocityFilter;
}());
exports.RelativeVelocityFilter = RelativeVelocityFilter;
//# sourceMappingURL=relative_velocity_filter.js.map
}, function(modId) { var map = {"./constants":1626919991112,"./low_pass_filter":1626919991120}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991124, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function normalizedKeypointsToKeypoints(normalizedKeypoints, imageSize) {
    return normalizedKeypoints.map(function (normalizedKeypoint) {
        var keypoint = __assign({}, normalizedKeypoint, { x: normalizedKeypoint.x * imageSize.width, y: normalizedKeypoint.y * imageSize.height });
        if (normalizedKeypoint.z != null) {
            // Scale z the same way as x (using image width).
            keypoint.z = normalizedKeypoint.z * imageSize.width;
        }
        return keypoint;
    });
}
exports.normalizedKeypointsToKeypoints = normalizedKeypointsToKeypoints;
//# sourceMappingURL=normalized_keypoints_to_keypoints.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991125, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var tf = require("@tensorflow/tfjs-core");
var image_utils_1 = require("./image_utils");
function shiftImageValue(image, outputFloatRange) {
    // Calculate the scale and offset to shift from [0, 255] to [-1, 1].
    var valueRange = image_utils_1.transformValueRange(0, 255, outputFloatRange[0] /* min */, outputFloatRange[1] /* max */);
    // Shift value range.
    return tf.tidy(function () { return tf.add(tf.mul(image, valueRange.scale), valueRange.offset); });
}
exports.shiftImageValue = shiftImageValue;
//# sourceMappingURL=shift_image_value.js.map
}, function(modId) { var map = {"./image_utils":1626919991114}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991126, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
var detection_to_rect_1 = require("./detection_to_rect");
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/alignment_points_to_rects_calculator.cc
function calculateAlignmentPointsRects(detection, imageSize, config) {
    var startKeypoint = config.rotationVectorStartKeypointIndex;
    var endKeypoint = config.rotationVectorEndKeypointIndex;
    var locationData = detection.locationData;
    var xCenter = locationData.relativeKeypoints[startKeypoint].x * imageSize.width;
    var yCenter = locationData.relativeKeypoints[startKeypoint].y * imageSize.height;
    var xScale = locationData.relativeKeypoints[endKeypoint].x * imageSize.width;
    var yScale = locationData.relativeKeypoints[endKeypoint].y * imageSize.height;
    // Bounding box size as double distance from center to scale point.
    var boxSize = Math.sqrt((xScale - xCenter) * (xScale - xCenter) +
        (yScale - yCenter) * (yScale - yCenter)) *
        2;
    var rotation = detection_to_rect_1.computeRotation(detection, imageSize, config);
    // Set resulting bounding box.
    return {
        xCenter: xCenter / imageSize.width,
        yCenter: yCenter / imageSize.height,
        width: boxSize / imageSize.width,
        height: boxSize / imageSize.height,
        rotation: rotation
    };
}
exports.calculateAlignmentPointsRects = calculateAlignmentPointsRects;
//# sourceMappingURL=calculate_alignment_points_rects.js.map
}, function(modId) { var map = {"./detection_to_rect":1626919991127}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991127, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
var image_utils_1 = require("../../calculators/image_utils");
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/detections_to_rects_calculator.cc
function computeRotation(detection, imageSize, config) {
    var locationData = detection.locationData;
    var startKeypoint = config.rotationVectorStartKeypointIndex;
    var endKeypoint = config.rotationVectorEndKeypointIndex;
    var targetAngle;
    if (config.rotationVectorTargetAngle) {
        targetAngle = config.rotationVectorTargetAngle;
    }
    else {
        targetAngle = Math.PI * config.rotationVectorTargetAngleDegree / 180;
    }
    var x0 = locationData.relativeKeypoints[startKeypoint].x * imageSize.width;
    var y0 = locationData.relativeKeypoints[startKeypoint].y * imageSize.height;
    var x1 = locationData.relativeKeypoints[endKeypoint].x * imageSize.width;
    var y1 = locationData.relativeKeypoints[endKeypoint].y * imageSize.height;
    var rotation = image_utils_1.normalizeRadians(targetAngle - Math.atan2(-(y1 - y0), x1 - x0));
    return rotation;
}
exports.computeRotation = computeRotation;
//# sourceMappingURL=detection_to_rect.js.map
}, function(modId) { var map = {"../../calculators/image_utils":1626919991114}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991128, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Projects normalized landmarks in a rectangle to its original coordinates. The
 * rectangle must also be in normalized coordinates.
 * @param landmarks A normalized Landmark list representing landmarks in a
 *     normalized rectangle.
 * @param inputRect A normalized rectangle.
 * @param config Config object has one field ignoreRotation, default to false.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmark_projection_calculator.cc
function calculateLandmarkProjection(landmarks, inputRect, config) {
    if (config === void 0) { config = {
        ignoreRotation: false
    }; }
    var outputLandmarks = [];
    for (var _i = 0, landmarks_1 = landmarks; _i < landmarks_1.length; _i++) {
        var landmark = landmarks_1[_i];
        var x = landmark.x - 0.5;
        var y = landmark.y - 0.5;
        var angle = config.ignoreRotation ? 0 : inputRect.rotation;
        var newX = Math.cos(angle) * x - Math.sin(angle) * y;
        var newY = Math.sin(angle) * x + Math.cos(angle) * y;
        newX = newX * inputRect.width + inputRect.xCenter;
        newY = newY * inputRect.height + inputRect.yCenter;
        var newZ = landmark.z * inputRect.width; // Scale Z coordinate as x.
        var newLandmark = __assign({}, landmark);
        newLandmark.x = newX;
        newLandmark.y = newY;
        newLandmark.z = newZ;
        outputLandmarks.push(newLandmark);
    }
    return outputLandmarks;
}
exports.calculateLandmarkProjection = calculateLandmarkProjection;
//# sourceMappingURL=calculate_landmark_projection.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991129, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
// ref:
// https://github.com/google/mediapipe/blob/350fbb2100ad531bc110b93aaea23d96af5a5064/mediapipe/calculators/tflite/ssd_anchors_calculator.cc
function createSsdAnchors(config) {
    var anchors = [];
    var layerId = 0;
    while (layerId < config.numLayers) {
        var anchorHeight = [];
        var anchorWidth = [];
        var aspectRatios = [];
        var scales = [];
        // For same strides, we merge the anchors in the same order.
        var lastSameStrideLayer = layerId;
        while (lastSameStrideLayer < config.strides.length &&
            config.strides[lastSameStrideLayer] === config.strides[layerId]) {
            var scale = calculateScale(config.minScale, config.maxScale, lastSameStrideLayer, config.strides.length);
            if (lastSameStrideLayer === 0 && config.reduceBoxesInLowestLayer) {
                // For first layer, it can be specified to use predefined anchors.
                aspectRatios.push(1);
                aspectRatios.push(2);
                aspectRatios.push(0.5);
                scales.push(0.1);
                scales.push(scale);
                scales.push(scale);
            }
            else {
                for (var aspectRatioId = 0; aspectRatioId < config.aspectRatios.length; ++aspectRatioId) {
                    aspectRatios.push(config.aspectRatios[aspectRatioId]);
                    scales.push(scale);
                }
                if (config.interpolatedScaleAspectRatio > 0.0) {
                    var scaleNext = lastSameStrideLayer === config.strides.length - 1 ?
                        1.0 :
                        calculateScale(config.minScale, config.maxScale, lastSameStrideLayer + 1, config.strides.length);
                    scales.push(Math.sqrt(scale * scaleNext));
                    aspectRatios.push(config.interpolatedScaleAspectRatio);
                }
            }
            lastSameStrideLayer++;
        }
        for (var i = 0; i < aspectRatios.length; ++i) {
            var ratioSqrts = Math.sqrt(aspectRatios[i]);
            anchorHeight.push(scales[i] / ratioSqrts);
            anchorWidth.push(scales[i] * ratioSqrts);
        }
        var featureMapHeight = 0;
        var featureMapWidth = 0;
        if (config.featureMapHeight.length > 0) {
            featureMapHeight = config.featureMapHeight[layerId];
            featureMapWidth = config.featureMapWidth[layerId];
        }
        else {
            var stride = config.strides[layerId];
            featureMapHeight = Math.ceil(config.inputSizeHeight / stride);
            featureMapWidth = Math.ceil(config.inputSizeWidth / stride);
        }
        for (var y = 0; y < featureMapHeight; ++y) {
            for (var x = 0; x < featureMapWidth; ++x) {
                for (var anchorId = 0; anchorId < anchorHeight.length; ++anchorId) {
                    var xCenter = (x + config.anchorOffsetX) / featureMapWidth;
                    var yCenter = (y + config.anchorOffsetY) / featureMapHeight;
                    var newAnchor = { xCenter: xCenter, yCenter: yCenter, width: 0, height: 0 };
                    if (config.fixedAnchorSize) {
                        newAnchor.width = 1.0;
                        newAnchor.height = 1.0;
                    }
                    else {
                        newAnchor.width = anchorWidth[anchorId];
                        newAnchor.height = anchorHeight[anchorId];
                    }
                    anchors.push(newAnchor);
                }
            }
        }
        layerId = lastSameStrideLayer;
    }
    return anchors;
}
exports.createSsdAnchors = createSsdAnchors;
function calculateScale(minScale, maxScale, strideIndex, numStrides) {
    if (numStrides === 1) {
        return (minScale + maxScale) * 0.5;
    }
    else {
        return minScale + (maxScale - minScale) * strideIndex / (numStrides - 1);
    }
}
//# sourceMappingURL=create_ssd_anchors.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991130, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs-core");
var split_detection_result_1 = require("./split_detection_result");
function detectorInference(imageTensor, poseDetectorModel) {
    return tf.tidy(function () {
        var detectionResult = poseDetectorModel.predict(imageTensor);
        var _a = split_detection_result_1.splitDetectionResult(detectionResult), scores = _a[0], rawBoxes = _a[1];
        // Shape [896, 12]
        var rawBoxes2d = tf.squeeze(rawBoxes);
        // Shape [896]
        var scores1d = tf.squeeze(scores);
        return { boxes: rawBoxes2d, scores: scores1d };
    });
}
exports.detectorInference = detectorInference;
//# sourceMappingURL=detector_inference.js.map
}, function(modId) { var map = {"./split_detection_result":1626919991131}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991131, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var tf = require("@tensorflow/tfjs-core");
function splitDetectionResult(detectionResult) {
    return tf.tidy(function () {
        // Score is stored in the first element in each anchor data.
        var logits = tf.slice(detectionResult, [0, 0, 0], [1, -1, 1]);
        var scores = tf.sigmoid(logits);
        // Bounding box coords are stored in the next four elements for each anchor
        // point.
        var rawBoxes = tf.slice(detectionResult, [0, 0, 1], [1, -1, -1]);
        return [scores, rawBoxes];
    });
}
exports.splitDetectionResult = splitDetectionResult;
//# sourceMappingURL=split_detection_result.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991132, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts normalized Landmark to `Detection`. A relative bounding box will
 * be created containing all landmarks exactly.
 * @param landmarks List of normalized landmarks.
 *
 * @returns A `Detection`.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmarks_to_detection_calculator.cc
function landmarksToDetection(landmarks) {
    var detection = { locationData: { relativeKeypoints: [] } };
    var xMin = Number.MAX_SAFE_INTEGER;
    var xMax = Number.MIN_SAFE_INTEGER;
    var yMin = Number.MAX_SAFE_INTEGER;
    var yMax = Number.MIN_SAFE_INTEGER;
    for (var i = 0; i < landmarks.length; ++i) {
        var landmark = landmarks[i];
        xMin = Math.min(xMin, landmark.x);
        xMax = Math.max(xMax, landmark.x);
        yMin = Math.min(yMin, landmark.y);
        yMax = Math.max(yMax, landmark.y);
        detection.locationData.relativeKeypoints.push({ x: landmark.x, y: landmark.y });
    }
    detection.locationData.relativeBoundingBox =
        { xMin: xMin, yMin: yMin, xMax: xMax, yMax: yMax, width: (xMax - xMin), height: (yMax - yMin) };
    return detection;
}
exports.landmarksToDetection = landmarksToDetection;
//# sourceMappingURL=landmarks_to_detection.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991133, function(require, module, exports) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var tf = require("@tensorflow/tfjs-core");
function nonMaxSuppression(detections, maxPoses, iouThreshold, scoreThreshold) {
    return __awaiter(this, void 0, void 0, function () {
        var detectionsTensor, scoresTensor, selectedIdsTensor, selectedIds, selectedDetections;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    detectionsTensor = tf.tensor2d(detections.map(function (d) {
                        return [d.locationData.relativeBoundingBox.yMin,
                            d.locationData.relativeBoundingBox.xMin,
                            d.locationData.relativeBoundingBox.yMax,
                            d.locationData.relativeBoundingBox.xMax];
                    }));
                    scoresTensor = tf.tensor1d(detections.map(function (d) { return d.score[0]; }));
                    return [4 /*yield*/, tf.image.nonMaxSuppressionAsync(detectionsTensor, scoresTensor, maxPoses, iouThreshold, scoreThreshold)];
                case 1:
                    selectedIdsTensor = _a.sent();
                    return [4 /*yield*/, selectedIdsTensor.array()];
                case 2:
                    selectedIds = _a.sent();
                    selectedDetections = detections.filter(function (_, i) { return (selectedIds.indexOf(i) > -1); });
                    tf.dispose([detectionsTensor, scoresTensor, selectedIdsTensor]);
                    return [2 /*return*/, selectedDetections];
            }
        });
    });
}
exports.nonMaxSuppression = nonMaxSuppression;
//# sourceMappingURL=non_max_suppression.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991134, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var tf = require("@tensorflow/tfjs-core");
/**
 * A calculator that refines landmarks using corresponding heatmap area.
 *
 * High level algorithm
 * For each landmark, we replace original value with a value calculated from the
 * area in heatmap close to original landmark position (the area is defined by
 * config.kernelSize). To calculate new coordinate from heatmap we calculate an
 * weighted average inside the kernel. We update the landmark if heatmap is
 * confident in it's prediction i.e. max(heatmap) in kernel is at least bigger
 * than config.minConfidenceToRefine.
 * @param landmarks List of lardmarks to refine.
 * @param heatmapTensor The heatmap for the landmarks with shape
 *     [height, width, channel]. The channel dimension has to be the same as
 *     the number of landmarks.
 * @param config The config for refineLandmarksFromHeap,
 *     see `RefineLandmarksFromHeatmapConfig` for detail.
 *
 * @returns Normalized landmarks.
 */
function refineLandmarksFromHeatmap(landmarks, heatmapTensor, config) {
    return __awaiter(this, void 0, void 0, function () {
        var $heatmapTensor, _a, hmHeight, hmWidth, hmChannels, outLandmarks, heatmapBuf, i, landmark, outLandmark, centerCol, centerRow, offset, beginCol, endCol, beginRow, endRow, sum, weightedCol, weightedRow, maxValue, row, col, confidence;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    $heatmapTensor = tf.squeeze(heatmapTensor, [0]);
                    _a = $heatmapTensor.shape, hmHeight = _a[0], hmWidth = _a[1], hmChannels = _a[2];
                    if (landmarks.length !== hmChannels) {
                        throw new Error('Expected heatmap to have same number of channels ' +
                            'as the number of landmarks. But got landmarks length: ' +
                            (landmarks.length + ", heatmap length: " + hmChannels));
                    }
                    outLandmarks = [];
                    return [4 /*yield*/, $heatmapTensor.buffer()];
                case 1:
                    heatmapBuf = _b.sent();
                    for (i = 0; i < landmarks.length; i++) {
                        landmark = landmarks[i];
                        outLandmark = __assign({}, landmark);
                        outLandmarks.push(outLandmark);
                        centerCol = Math.trunc(outLandmark.x * hmWidth);
                        centerRow = Math.trunc(outLandmark.y * hmHeight);
                        // Point is outside of the image let's keep it intact.
                        if (centerCol < 0 || centerCol >= hmWidth || centerRow < 0 ||
                            centerCol >= hmHeight) {
                            continue;
                        }
                        offset = Math.trunc((config.kernelSize - 1) / 2);
                        beginCol = Math.max(0, centerCol - offset);
                        endCol = Math.min(hmWidth, centerCol + offset + 1);
                        beginRow = Math.max(0, centerRow - offset);
                        endRow = Math.min(hmHeight, centerRow + offset + 1);
                        sum = 0;
                        weightedCol = 0;
                        weightedRow = 0;
                        maxValue = 0;
                        // Main loop. Go over kernel and calculate weighted sum of coordinates,
                        // sum of weights and max weights.
                        for (row = beginRow; row < endRow; ++row) {
                            for (col = beginCol; col < endCol; ++col) {
                                confidence = heatmapBuf.get(row, col, i);
                                sum += confidence;
                                maxValue = Math.max(maxValue, confidence);
                                weightedCol += col * confidence;
                                weightedRow += row * confidence;
                            }
                        }
                        if (maxValue >= config.minConfidenceToRefine && sum > 0) {
                            outLandmark.x = weightedCol / hmWidth / sum;
                            outLandmark.y = weightedRow / hmHeight / sum;
                        }
                    }
                    $heatmapTensor.dispose();
                    return [2 /*return*/, outLandmarks];
            }
        });
    });
}
exports.refineLandmarksFromHeatmap = refineLandmarksFromHeatmap;
//# sourceMappingURL=refine_landmarks_from_heatmap.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991135, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Adjusts detection locations on the letterboxed image to the corresponding
 * locations on the same image with the letterbox removed (the input image to
 * the graph before image transformation).
 *
 * @param detections A list of detection boxes on an letterboxed image.
 * @param letterboxPadding A `padding` object representing the letterbox padding
 *     from the 4 sides: left, top, right, bottom, of the letterboxed image,
 *     normalized by the letterboxed image dimensions.
 * @returns detections: A list of detection boxes representing detections with
 *     their locations adjusted to the letterbox-removed (non-padded) image.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/detection_letterbox_removal_calculator.cc
function removeDetectionLetterbox(detections, letterboxPadding) {
    if (detections === void 0) { detections = []; }
    var left = letterboxPadding.left;
    var top = letterboxPadding.top;
    var leftAndRight = letterboxPadding.left + letterboxPadding.right;
    var topAndBottom = letterboxPadding.top + letterboxPadding.bottom;
    for (var i = 0; i < detections.length; i++) {
        var detection = detections[i];
        var relativeBoundingBox = detection.locationData.relativeBoundingBox;
        var xMin = (relativeBoundingBox.xMin - left) / (1 - leftAndRight);
        var yMin = (relativeBoundingBox.yMin - top) / (1 - topAndBottom);
        var width = relativeBoundingBox.width / (1 - leftAndRight);
        var height = relativeBoundingBox.height / (1 - topAndBottom);
        relativeBoundingBox.xMin = xMin;
        relativeBoundingBox.yMin = yMin;
        relativeBoundingBox.width = width;
        relativeBoundingBox.height = height;
        for (var i_1 = 0; i_1 < detection.locationData.relativeKeypoints.length; ++i_1) {
            var keypoint = detection.locationData.relativeKeypoints[i_1];
            var newX = (keypoint.x - left) / (1 - leftAndRight);
            var newY = (keypoint.y - top) / (1 - topAndBottom);
            keypoint.x = newX;
            keypoint.y = newY;
        }
    }
    return detections;
}
exports.removeDetectionLetterbox = removeDetectionLetterbox;
//# sourceMappingURL=remove_detection_letterbox.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991136, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Adjusts landmark locations on a letterboxed image to the corresponding
 * locations on the same image with the letterbox removed.
 * @param rawLandmark A NormalizedLandmarkList representing landmarks on an
 * letterboxed image.
 * @param padding A `padding` representing the letterbox padding from the 4
 *     sides, left, top, right, bottom, of the letterboxed image, normalized by
 *     the letterboxed image dimensions.
 * @returns Normalized landmarks.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmark_letterbox_removal_calculator.cc
function removeLandmarkLetterbox(rawLandmark, padding) {
    var left = padding.left;
    var top = padding.top;
    var leftAndRight = padding.left + padding.right;
    var topAndBottom = padding.top + padding.bottom;
    var outLandmarks = rawLandmark.map(function (landmark) {
        return __assign({}, landmark, { x: (landmark.x - left) / (1 - leftAndRight), y: (landmark.y - top) / (1 - topAndBottom), z: landmark.z / (1 - leftAndRight) // Scale Z coordinate as X.
         });
    });
    return outLandmarks;
}
exports.removeLandmarkLetterbox = removeLandmarkLetterbox;
//# sourceMappingURL=remove_landmark_letterbox.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991137, function(require, module, exports) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var tf = require("@tensorflow/tfjs-core");
/**
 * Convert result Tensors from object detection models into Detection boxes.
 *
 * @param detectionTensors List of Tensors of type Float32. The list of tensors
 *     can have 2 or 3 tensors. First tensor is the predicted raw
 *     boxes/keypoints. The size of the values must be
 *     (num_boxes * num_predicted_values). Second tensor is the score tensor.
 *     The size of the valuse must be (num_boxes * num_classes). It's optional
 *     to pass in a third tensor for anchors (e.g. for SSD models) depend on the
 *     outputs of the detection model. The size of anchor tensor must be
 *     (num_boxes * 4).
 * @param anchor A tensor for anchors. The size of anchor tensor must be
 *     (num_boxes * 4).
 * @param config
 */
function tensorsToDetections(detectionTensors, anchor, config) {
    return __awaiter(this, void 0, void 0, function () {
        var rawScoreTensor, rawBoxTensor, boxes, normalizedScore, outputDetections;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rawScoreTensor = detectionTensors[0];
                    rawBoxTensor = detectionTensors[1];
                    boxes = decodeBoxes(rawBoxTensor, anchor, config);
                    normalizedScore = tf.tidy(function () {
                        var normalizedScore = rawScoreTensor;
                        if (config.sigmoidScore) {
                            if (config.scoreClippingThresh != null) {
                                normalizedScore = tf.clipByValue(rawScoreTensor, -config.scoreClippingThresh, config.scoreClippingThresh);
                            }
                            normalizedScore = tf.sigmoid(normalizedScore);
                            return normalizedScore;
                        }
                        return normalizedScore;
                    });
                    return [4 /*yield*/, convertToDetections(boxes, normalizedScore, config)];
                case 1:
                    outputDetections = _a.sent();
                    tf.dispose([boxes, normalizedScore]);
                    return [2 /*return*/, outputDetections];
            }
        });
    });
}
exports.tensorsToDetections = tensorsToDetections;
function convertToDetections(detectionBoxes, detectionScore, config) {
    return __awaiter(this, void 0, void 0, function () {
        var outputDetections, detectionBoxesData, detectionScoresData, i, boxOffset, detection, bbox, locationData, totalIdx, kpId, keypointIndex, keypoint;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    outputDetections = [];
                    return [4 /*yield*/, detectionBoxes.data()];
                case 1:
                    detectionBoxesData = _a.sent();
                    return [4 /*yield*/, detectionScore.data()];
                case 2:
                    detectionScoresData = _a.sent();
                    for (i = 0; i < config.numBoxes; ++i) {
                        if (config.minScoreThresh != null &&
                            detectionScoresData[i] < config.minScoreThresh) {
                            continue;
                        }
                        boxOffset = i * config.numCoords;
                        detection = convertToDetection(detectionBoxesData[boxOffset + 0] /* boxYMin */, detectionBoxesData[boxOffset + 1] /* boxXMin */, detectionBoxesData[boxOffset + 2] /* boxYMax */, detectionBoxesData[boxOffset + 3] /* boxXMax */, detectionScoresData[i], config.flipVertically, i);
                        bbox = detection.locationData.relativeBoundingBox;
                        if (bbox.width < 0 || bbox.height < 0) {
                            // Decoded detection boxes could have negative values for width/height
                            // due to model prediction. Filter out those boxes since some
                            // downstream calculators may assume non-negative values.
                            continue;
                        }
                        // Add keypoints.
                        if (config.numKeypoints > 0) {
                            locationData = detection.locationData;
                            locationData.relativeKeypoints = [];
                            totalIdx = config.numKeypoints * config.numValuesPerKeypoint;
                            for (kpId = 0; kpId < totalIdx; kpId += config.numValuesPerKeypoint) {
                                keypointIndex = boxOffset + config.keypointCoordOffset + kpId;
                                keypoint = {
                                    x: detectionBoxesData[keypointIndex + 0],
                                    y: config.flipVertically ? 1 - detectionBoxesData[keypointIndex + 1] :
                                        detectionBoxesData[keypointIndex + 1]
                                };
                                locationData.relativeKeypoints.push(keypoint);
                            }
                        }
                        outputDetections.push(detection);
                    }
                    return [2 /*return*/, outputDetections];
            }
        });
    });
}
exports.convertToDetections = convertToDetections;
function convertToDetection(boxYMin, boxXMin, boxYMax, boxXMax, score, flipVertically, i) {
    return {
        score: [score],
        ind: i,
        locationData: {
            relativeBoundingBox: {
                xMin: boxXMin,
                yMin: flipVertically ? 1 - boxYMax : boxYMin,
                xMax: boxXMax,
                yMax: flipVertically ? 1 - boxYMin : boxYMax,
                width: boxXMax - boxXMin,
                height: boxYMax - boxYMin
            }
        }
    };
}
//[xCenter, yCenter, w, h, kp1, kp2, kp3, kp4]
//[yMin, xMin, yMax, xMax, kpX, kpY, kpX, kpY]
function decodeBoxes(rawBoxes, anchor, config) {
    return tf.tidy(function () {
        var yCenter;
        var xCenter;
        var h;
        var w;
        if (config.reverseOutputOrder) {
            // Shape [numOfBoxes, 1].
            xCenter = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 0], [-1, 1]));
            yCenter = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 1], [-1, 1]));
            w = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 2], [-1, 1]));
            h = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 3], [-1, 1]));
        }
        else {
            yCenter = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 0], [-1, 1]));
            xCenter = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 1], [-1, 1]));
            h = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 2], [-1, 1]));
            w = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 3], [-1, 1]));
        }
        xCenter =
            tf.add(tf.mul(tf.div(xCenter, config.xScale), anchor.w), anchor.x);
        yCenter =
            tf.add(tf.mul(tf.div(yCenter, config.yScale), anchor.h), anchor.y);
        if (config.applyExponentialOnBoxSize) {
            h = tf.mul(tf.exp(tf.div(h, config.hScale)), anchor.h);
            w = tf.mul(tf.exp(tf.div(w, config.wScale)), anchor.w);
        }
        else {
            h = tf.mul(tf.div(h, config.hScale), anchor.h);
            w = tf.mul(tf.div(w, config.wScale), anchor.h);
        }
        var yMin = tf.sub(yCenter, tf.div(h, 2));
        var xMin = tf.sub(xCenter, tf.div(w, 2));
        var yMax = tf.add(yCenter, tf.div(h, 2));
        var xMax = tf.add(xCenter, tf.div(w, 2));
        // Shape [numOfBoxes, 4].
        var boxes = tf.concat([
            tf.reshape(yMin, [config.numBoxes, 1]),
            tf.reshape(xMin, [config.numBoxes, 1]),
            tf.reshape(yMax, [config.numBoxes, 1]),
            tf.reshape(xMax, [config.numBoxes, 1])
        ], 1);
        if (config.numKeypoints) {
            for (var k = 0; k < config.numKeypoints; ++k) {
                var keypointOffset = config.keypointCoordOffset + k * config.numValuesPerKeypoint;
                var keypointX = void 0;
                var keypointY = void 0;
                if (config.reverseOutputOrder) {
                    keypointX =
                        tf.squeeze(tf.slice(rawBoxes, [0, keypointOffset], [-1, 1]));
                    keypointY =
                        tf.squeeze(tf.slice(rawBoxes, [0, keypointOffset + 1], [-1, 1]));
                }
                else {
                    keypointY =
                        tf.squeeze(tf.slice(rawBoxes, [0, keypointOffset], [-1, 1]));
                    keypointX =
                        tf.squeeze(tf.slice(rawBoxes, [0, keypointOffset + 1], [-1, 1]));
                }
                var keypointXNormalized = tf.add(tf.mul(tf.div(keypointX, config.xScale), anchor.w), anchor.x);
                var keypointYNormalized = tf.add(tf.mul(tf.div(keypointY, config.yScale), anchor.h), anchor.y);
                boxes = tf.concat([
                    boxes, tf.reshape(keypointXNormalized, [config.numBoxes, 1]),
                    tf.reshape(keypointYNormalized, [config.numBoxes, 1])
                ], 1);
            }
        }
        // Shape [numOfBoxes, 4] || [numOfBoxes, 12].
        return boxes;
    });
}
//# sourceMappingURL=tensors_to_detections.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991138, function(require, module, exports) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sigmoid_1 = require("../../calculators/sigmoid");
/**
 * A calculator for converting Tensors from regression models into landmarks.
 * Note that if the landmarks in the tensor has more than 5 dimensions, only the
 * first 5 dimensions will be converted to [x,y,z, visibility, presence]. The
 * latter two fields may also stay unset if such attributes are not supported in
 * the model.
 * @param landmarkTensor List of Tensors of type float32. Only the first tensor
 * will be used. The size of the values must be (num_dimension x num_landmarks).
 * @param config
 * @param flipHorizontally Optional. Whether to flip landmarks horizontally or
 * not. Overrides corresponding side packet and/or field in the calculator
 * options.
 * @param flipVertically Optional. Whether to flip landmarks vertically or not.
 * Overrides corresponding side packet and/or field in the calculator options.
 *
 * @returns Normalized landmarks.
 */
function tensorsToLandmarks(landmarkTensor, config, flipHorizontally, flipVertically) {
    if (flipHorizontally === void 0) { flipHorizontally = false; }
    if (flipVertically === void 0) { flipVertically = false; }
    return __awaiter(this, void 0, void 0, function () {
        var numValues, numDimensions, rawLandmarks, outputLandmarks, ld, offset, landmark, i, landmark;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    numValues = landmarkTensor.size;
                    numDimensions = numValues / config.numLandmarks;
                    return [4 /*yield*/, landmarkTensor.data()];
                case 1:
                    rawLandmarks = _a.sent();
                    outputLandmarks = [];
                    for (ld = 0; ld < config.numLandmarks; ++ld) {
                        offset = ld * numDimensions;
                        landmark = { x: 0, y: 0 };
                        if (flipHorizontally) {
                            landmark.x = config.inputImageWidth - rawLandmarks[offset];
                        }
                        else {
                            landmark.x = rawLandmarks[offset];
                        }
                        if (numDimensions > 1) {
                            if (flipVertically) {
                                landmark.y = config.inputImageHeight - rawLandmarks[offset + 1];
                            }
                            else {
                                landmark.y = rawLandmarks[offset + 1];
                            }
                        }
                        if (numDimensions > 2) {
                            landmark.z = rawLandmarks[offset + 2];
                        }
                        if (numDimensions > 3) {
                            landmark.score = sigmoid_1.sigmoid(rawLandmarks[offset + 3]);
                        }
                        // presence is in rawLandmarks[offset + 4], we don't expose it.
                        outputLandmarks.push(landmark);
                    }
                    for (i = 0; i < outputLandmarks.length; ++i) {
                        landmark = outputLandmarks[i];
                        landmark.x = landmark.x / config.inputImageWidth;
                        landmark.y = landmark.y / config.inputImageHeight;
                        // Scale Z coordinate as X + allow additional uniform normalization.
                        landmark.z = landmark.z / config.inputImageWidth / (config.normalizeZ || 1);
                    }
                    return [2 /*return*/, outputLandmarks];
            }
        });
    });
}
exports.tensorsToLandmarks = tensorsToLandmarks;
//# sourceMappingURL=tensors_to_landmarks.js.map
}, function(modId) { var map = {"../../calculators/sigmoid":1626919991139}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991139, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function sigmoid(value) {
    return 1 / (1 + Math.exp(-value));
}
exports.sigmoid = sigmoid;
//# sourceMappingURL=sigmoid.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991140, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
var image_utils_1 = require("../../calculators/image_utils");
/**
 * Performs geometric transformation to the input normalized rectangle,
 * correpsonding to input normalized rectangle respectively.
 * @param rect The normalized rectangle.
 * @param imageSize The original imageSize.
 * @param config See documentation in `RectTransformationConfig`.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/rect_transformation_calculator.cc
function transformNormalizedRect(rect, imageSize, config) {
    var width = rect.width;
    var height = rect.height;
    var rotation = rect.rotation;
    if (config.rotation != null || config.rotationDegree != null) {
        rotation = computeNewRotation(rotation, config);
    }
    if (rotation === 0) {
        rect.xCenter = rect.xCenter + width * config.shiftX;
        rect.yCenter = rect.yCenter + height * config.shiftY;
    }
    else {
        var xShift = (imageSize.width * width * config.shiftX * Math.cos(rotation) -
            imageSize.height * height * config.shiftY * Math.sin(rotation)) /
            imageSize.width;
        var yShift = (imageSize.width * width * config.shiftX * Math.sin(rotation) +
            imageSize.height * height * config.shiftY * Math.cos(rotation)) /
            imageSize.height;
        rect.xCenter = rect.xCenter + xShift;
        rect.yCenter = rect.yCenter + yShift;
    }
    if (config.squareLong) {
        var longSide = Math.max(width * imageSize.width, height * imageSize.height);
        width = longSide / imageSize.width;
        height = longSide / imageSize.height;
    }
    else if (config.squareShort) {
        var shortSide = Math.min(width * imageSize.width, height * imageSize.height);
        width = shortSide / imageSize.width;
        height = shortSide / imageSize.height;
    }
    rect.width = width * config.scaleX;
    rect.height = height * config.scaleY;
    return rect;
}
exports.transformNormalizedRect = transformNormalizedRect;
function computeNewRotation(rotation, config) {
    if (config.rotation != null) {
        rotation += config.rotation;
    }
    else if (config.rotationDegree != null) {
        rotation += Math.PI * config.rotationDegree / 180;
    }
    return image_utils_1.normalizeRadians(rotation);
}
exports.computeNewRotation = computeNewRotation;
//# sourceMappingURL=transform_rect.js.map
}, function(modId) { var map = {"../../calculators/image_utils":1626919991114}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991141, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var low_pass_filter_1 = require("../../calculators/low_pass_filter");
/**
 * Smoothing visibility using a `LowPassFilter` for each landmark.
 */
var LowPassVisibilityFilter = /** @class */ (function () {
    function LowPassVisibilityFilter(config) {
        this.alpha = config.alpha;
    }
    LowPassVisibilityFilter.prototype.apply = function (landmarks) {
        var _this = this;
        if (landmarks == null) {
            // Reset filters.
            this.visibilityFilters = null;
            return null;
        }
        if (this.visibilityFilters == null ||
            (this.visibilityFilters.length !== landmarks.length)) {
            // Initialize new filters.
            this.visibilityFilters =
                landmarks.map(function (_) { return new low_pass_filter_1.LowPassFilter(_this.alpha); });
        }
        var outLandmarks = [];
        // Filter visibilities.
        for (var i = 0; i < landmarks.length; ++i) {
            var landmark = landmarks[i];
            var outLandmark = __assign({}, landmark);
            outLandmark.score = this.visibilityFilters[i].apply(landmark.score);
            outLandmarks.push(outLandmark);
        }
        return outLandmarks;
    };
    return LowPassVisibilityFilter;
}());
exports.LowPassVisibilityFilter = LowPassVisibilityFilter;
//# sourceMappingURL=visibility_smoothing.js.map
}, function(modId) { var map = {"../../calculators/low_pass_filter":1626919991120}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991142, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_BLAZEPOSE_DETECTOR_MODEL_URL = 'https://tfhub.dev/mediapipe/tfjs-model/blazeposedetector/1/default/1';
exports.DEFAULT_BLAZEPOSE_LANDMARK_MODEL_URL_FULL = 'https://tfhub.dev/mediapipe/tfjs-model/blazeposelandmark_full/2/default/2';
exports.DEFAULT_BLAZEPOSE_LANDMARK_MODEL_URL_LITE = 'https://tfhub.dev/mediapipe/tfjs-model/blazeposelandmark_lite/2/default/2';
exports.DEFAULT_BLAZEPOSE_LANDMARK_MODEL_URL_HEAVY = 'https://tfhub.dev/mediapipe/tfjs-model/blazeposelandmark_heavy/2/default/2';
exports.BLAZEPOSE_DETECTOR_ANCHOR_CONFIGURATION = {
    reduceBoxesInLowestlayer: false,
    interpolatedScaleAspectRatio: 1.0,
    featureMapHeight: [],
    featureMapWidth: [],
    numLayers: 5,
    minScale: 0.1484375,
    maxScale: 0.75,
    inputSizeHeight: 224,
    inputSizeWidth: 224,
    anchorOffsetX: 0.5,
    anchorOffsetY: 0.5,
    strides: [8, 16, 32, 32, 32],
    aspectRatios: [1.0],
    fixedAnchorSize: true
};
exports.DEFAULT_BLAZEPOSE_MODEL_CONFIG = {
    runtime: 'tfjs',
    modelType: 'full',
    enableSmoothing: true,
    detectorModelUrl: exports.DEFAULT_BLAZEPOSE_DETECTOR_MODEL_URL,
    landmarkModelUrl: exports.DEFAULT_BLAZEPOSE_LANDMARK_MODEL_URL_FULL
};
exports.DEFAULT_BLAZEPOSE_ESTIMATION_CONFIG = {
    maxPoses: 1,
    flipHorizontal: false
};
exports.BLAZEPOSE_TENSORS_TO_DETECTION_CONFIGURATION = {
    applyExponentialOnBoxSize: false,
    flipVertically: false,
    ignoreClasses: [],
    numClasses: 1,
    numBoxes: 2254,
    numCoords: 12,
    boxCoordOffset: 0,
    keypointCoordOffset: 4,
    numKeypoints: 4,
    numValuesPerKeypoint: 2,
    sigmoidScore: true,
    scoreClippingThresh: 100.0,
    reverseOutputOrder: true,
    xScale: 224.0,
    yScale: 224.0,
    hScale: 224.0,
    wScale: 224.0,
    minScoreThresh: 0.5
};
exports.BLAZEPOSE_DETECTOR_NON_MAX_SUPPRESSION_CONFIGURATION = {
    minScoreThreshold: -1.0,
    minSuppressionThreshold: 0.3
};
exports.BLAZEPOSE_DETECTOR_RECT_TRANSFORMATION_CONFIG = {
    shiftX: 0,
    shiftY: 0,
    scaleX: 1.25,
    scaleY: 1.25,
    squareLong: true
};
exports.BLAZEPOSE_DETECTOR_IMAGE_TO_TENSOR_CONFIG = {
    inputResolution: { width: 224, height: 224 },
    keepAspectRatio: true
};
exports.BLAZEPOSE_LANDMARK_IMAGE_TO_TENSOR_CONFIG = {
    inputResolution: { width: 256, height: 256 },
    keepAspectRatio: true
};
exports.BLAZEPOSE_POSE_PRESENCE_SCORE = 0.5;
exports.BLAZEPOSE_TENSORS_TO_LANDMARKS_CONFIG = {
    numLandmarks: 39,
    inputImageWidth: 256,
    inputImageHeight: 256
};
exports.BLAZEPOSE_REFINE_LANDMARKS_FROM_HEATMAP_CONFIG = {
    kernelSize: 7,
    minConfidenceToRefine: 0.5
};
exports.BLAZEPOSE_NUM_KEYPOINTS = 33;
exports.BLAZEPOSE_NUM_AUXILIARY_KEYPOINTS = 35;
exports.BLAZEPOSE_VISIBILITY_SMOOTHING_CONFIG = {
    alpha: 0.1
};
exports.BLAZEPOSE_LANDMARKS_SMOOTHING_CONFIG_ACTUAL = {
    oneEuroFilter: {
        frequency: 30,
        minCutOff: 0.05,
        // filter when landmark is static.
        beta: 80,
        // alpha in landmark EMA filter when landmark is moving fast.
        derivateCutOff: 1.0,
        // landmark velocity EMA filter.,
        minAllowedObjectScale: 1e-6
    }
};
// Auxiliary landmarks are smoothed heavier than main landmarks to make ROI
// crop for pose landmarks prediction very stable when object is not moving but
// responsive enough in case of sudden movements.
exports.BLAZEPOSE_LANDMARKS_SMOOTHING_CONFIG_AUXILIARY = {
    oneEuroFilter: {
        frequency: 30,
        minCutOff: 0.01,
        // EMA filter when landmark is static.
        beta: 10.0,
        // ~0.68 alpha in landmark EMA filter when landmark is moving
        // fast.
        derivateCutOff: 1.0,
        // landmark velocity EMA filter.
        minAllowedObjectScale: 1e-6
    }
};
//# sourceMappingURL=constants.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991143, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
function validateModelConfig(modelConfig) {
    var config = modelConfig == null ?
        __assign({}, constants_1.DEFAULT_BLAZEPOSE_MODEL_CONFIG) : __assign({}, modelConfig);
    if (config.enableSmoothing == null) {
        config.enableSmoothing = constants_1.DEFAULT_BLAZEPOSE_MODEL_CONFIG.enableSmoothing;
    }
    if (config.modelType == null) {
        config.modelType = constants_1.DEFAULT_BLAZEPOSE_MODEL_CONFIG.modelType;
    }
    if (config.detectorModelUrl == null) {
        config.detectorModelUrl = constants_1.DEFAULT_BLAZEPOSE_MODEL_CONFIG.detectorModelUrl;
    }
    if (config.landmarkModelUrl == null) {
        switch (config.modelType) {
            case 'lite':
                config.landmarkModelUrl = constants_1.DEFAULT_BLAZEPOSE_LANDMARK_MODEL_URL_LITE;
                break;
            case 'heavy':
                config.landmarkModelUrl = constants_1.DEFAULT_BLAZEPOSE_LANDMARK_MODEL_URL_HEAVY;
                break;
            case 'full':
            default:
                config.landmarkModelUrl = constants_1.DEFAULT_BLAZEPOSE_LANDMARK_MODEL_URL_FULL;
                break;
        }
    }
    return config;
}
exports.validateModelConfig = validateModelConfig;
function validateEstimationConfig(estimationConfig) {
    var config;
    if (estimationConfig == null) {
        config = constants_1.DEFAULT_BLAZEPOSE_ESTIMATION_CONFIG;
    }
    else {
        config = __assign({}, estimationConfig);
    }
    if (config.maxPoses == null) {
        config.maxPoses = 1;
    }
    if (config.maxPoses <= 0) {
        throw new Error("Invalid maxPoses " + config.maxPoses + ". Should be > 0.");
    }
    if (config.maxPoses > 1) {
        throw new Error('Multi-pose detection is not implemented yet. Please set maxPoses ' +
            'to 1.');
    }
    return config;
}
exports.validateEstimationConfig = validateEstimationConfig;
//# sourceMappingURL=detector_utils.js.map
}, function(modId) { var map = {"./constants":1626919991142}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991144, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tfc = require("@tensorflow/tfjs-converter");
var tf = require("@tensorflow/tfjs-core");
var constants_1 = require("../calculators/constants");
var image_utils_1 = require("../calculators/image_utils");
var is_video_1 = require("../calculators/is_video");
var keypoints_one_euro_filter_1 = require("../calculators/keypoints_one_euro_filter");
var low_pass_filter_1 = require("../calculators/low_pass_filter");
var constants_2 = require("../constants");
var types_1 = require("../types");
var util_1 = require("../util");
var constants_3 = require("./constants");
var detector_utils_1 = require("./detector_utils");
/**
 * MoveNet detector class.
 */
var MoveNetDetector = /** @class */ (function () {
    function MoveNetDetector(moveNetModel, config) {
        this.moveNetModel = moveNetModel;
        this.modelInputResolution = { height: 0, width: 0 };
        this.keypointIndexByName = util_1.getKeypointIndexByName(types_1.SupportedModels.MoveNet);
        // Global states.
        this.keypointsFilter = new keypoints_one_euro_filter_1.KeypointsOneEuroFilter(constants_3.KEYPOINT_FILTER_CONFIG);
        this.cropRegionFilterYMin = new low_pass_filter_1.LowPassFilter(constants_3.CROP_FILTER_ALPHA);
        this.cropRegionFilterXMin = new low_pass_filter_1.LowPassFilter(constants_3.CROP_FILTER_ALPHA);
        this.cropRegionFilterYMax = new low_pass_filter_1.LowPassFilter(constants_3.CROP_FILTER_ALPHA);
        this.cropRegionFilterXMax = new low_pass_filter_1.LowPassFilter(constants_3.CROP_FILTER_ALPHA);
        if (config.modelType === constants_3.SINGLEPOSE_LIGHTNING) {
            this.modelInputResolution.width = constants_3.MOVENET_SINGLEPOSE_LIGHTNING_RESOLUTION;
            this.modelInputResolution.height =
                constants_3.MOVENET_SINGLEPOSE_LIGHTNING_RESOLUTION;
        }
        else if (config.modelType === constants_3.SINGLEPOSE_THUNDER) {
            this.modelInputResolution.width = constants_3.MOVENET_SINGLEPOSE_THUNDER_RESOLUTION;
            this.modelInputResolution.height = constants_3.MOVENET_SINGLEPOSE_THUNDER_RESOLUTION;
        }
        this.enableSmoothing = config.enableSmoothing;
    }
    /**
     * Runs inference on an image using a model that is assumed to be a person
     * keypoint model that outputs 17 keypoints.
     * @param inputImage 4D tensor containing the input image. Should be of size
     *     [1, modelHeight, modelWidth, 3].
     * @param executeSync Whether to execute the model synchronously.
     * @return An InferenceResult with keypoints and scores, or null if the
     *     inference call could not be executed (for example when the model was
     *     not initialized yet) or if it produced an unexpected tensor size.
     */
    MoveNetDetector.prototype.detectKeypoints = function (inputImage, executeSync) {
        if (executeSync === void 0) { executeSync = true; }
        return __awaiter(this, void 0, void 0, function () {
            var numKeypoints, outputTensor, inferenceResult, keypoints, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.moveNetModel) {
                            return [2 /*return*/, null];
                        }
                        numKeypoints = 17;
                        if (!executeSync) return [3 /*break*/, 1];
                        outputTensor = this.moveNetModel.execute(inputImage);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.moveNetModel.executeAsync(inputImage)];
                    case 2:
                        outputTensor =
                            (_a.sent());
                        _a.label = 3;
                    case 3:
                        // We expect an output array of shape [1, 1, 17, 3] (batch, person,
                        // keypoint, (y, x, score)).
                        if (!outputTensor || outputTensor.shape.length !== 4 ||
                            outputTensor.shape[0] !== 1 || outputTensor.shape[1] !== 1 ||
                            outputTensor.shape[2] !== numKeypoints || outputTensor.shape[3] !== 3) {
                            outputTensor.dispose();
                            return [2 /*return*/, null];
                        }
                        if (!(tf.getBackend() !== 'webgpu')) return [3 /*break*/, 4];
                        inferenceResult = outputTensor.dataSync();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, outputTensor.data()];
                    case 5:
                        inferenceResult = _a.sent();
                        _a.label = 6;
                    case 6:
                        outputTensor.dispose();
                        keypoints = [];
                        for (i = 0; i < numKeypoints; ++i) {
                            keypoints[i] = {
                                y: inferenceResult[i * 3],
                                x: inferenceResult[i * 3 + 1],
                                score: inferenceResult[i * 3 + 2]
                            };
                        }
                        return [2 /*return*/, keypoints];
                }
            });
        });
    };
    /**
     * Estimates poses for an image or video frame.
     *
     * This does standard ImageNet pre-processing before inferring through the
     * model. The image should pixels should have values [0-255]. It returns a
     * single pose.
     *
     * @param image ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement
     * The input image to feed through the network.
     *
     * @param config Optional. A configuration object with the following
     * properties:
     *  `maxPoses`: Optional. Has to be set to 1.
     *
     * @param timestamp Optional. In milliseconds. This is useful when image is
     *     a tensor, which doesn't have timestamp info. Or to override timestamp
     *     in a video.
     *
     * @return An array of `Pose`s.
     */
    MoveNetDetector.prototype.estimatePoses = function (image, estimationConfig, timestamp) {
        if (estimationConfig === void 0) { estimationConfig = constants_3.MOVENET_SINGLE_POSE_ESTIMATION_CONFIG; }
        return __awaiter(this, void 0, void 0, function () {
            var imageTensor3D, imageSize, imageTensor4D, croppedImage, keypoints, i, newCropRegion, numValidKeypoints, poseScore, i, pose;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        estimationConfig = detector_utils_1.validateEstimationConfig(estimationConfig);
                        if (image == null) {
                            this.reset();
                            return [2 /*return*/, []];
                        }
                        if (timestamp == null) {
                            if (is_video_1.isVideo(image)) {
                                timestamp = image.currentTime * constants_1.SECOND_TO_MICRO_SECONDS;
                            }
                        }
                        else {
                            timestamp = timestamp * constants_1.MILLISECOND_TO_MICRO_SECONDS;
                        }
                        imageTensor3D = image_utils_1.toImageTensor(image);
                        imageSize = image_utils_1.getImageSize(imageTensor3D);
                        imageTensor4D = tf.expandDims(imageTensor3D, 0);
                        // Make sure we don't dispose the input image if it's already a tensor.
                        if (!(image instanceof tf.Tensor)) {
                            imageTensor3D.dispose();
                        }
                        if (!this.cropRegion) {
                            this.cropRegion = this.initCropRegion(imageSize.width, imageSize.height);
                        }
                        croppedImage = tf.tidy(function () {
                            // Crop region is a [batch, 4] size tensor.
                            var cropRegionTensor = tf.tensor2d([[
                                    _this.cropRegion.yMin, _this.cropRegion.xMin, _this.cropRegion.yMax,
                                    _this.cropRegion.xMax
                                ]]);
                            // The batch index that the crop should operate on. A [batch] size
                            // tensor.
                            var boxInd = tf.zeros([1], 'int32');
                            // Target size of each crop.
                            var cropSize = [_this.modelInputResolution.height, _this.modelInputResolution.width];
                            return tf.cast(tf.image.cropAndResize(imageTensor4D, cropRegionTensor, boxInd, cropSize, 'bilinear', 0), 'int32');
                        });
                        imageTensor4D.dispose();
                        return [4 /*yield*/, this.detectKeypoints(croppedImage)];
                    case 1:
                        keypoints = _a.sent();
                        croppedImage.dispose();
                        if (keypoints == null) {
                            this.reset();
                            return [2 /*return*/, []];
                        }
                        // Convert keypoints from crop coordinates to image coordinates.
                        for (i = 0; i < keypoints.length; ++i) {
                            keypoints[i].y =
                                this.cropRegion.yMin + keypoints[i].y * this.cropRegion.height;
                            keypoints[i].x =
                                this.cropRegion.xMin + keypoints[i].x * this.cropRegion.width;
                        }
                        // Apply the sequential filter before estimating the cropping area to make
                        // it more stable.
                        if (timestamp != null && this.enableSmoothing) {
                            keypoints =
                                this.keypointsFilter.apply(keypoints, timestamp, 1 /* objectScale */);
                        }
                        newCropRegion = this.determineCropRegion(keypoints, imageSize.height, imageSize.width);
                        this.cropRegion = this.filterCropRegion(newCropRegion);
                        numValidKeypoints = 0.0;
                        poseScore = 0.0;
                        for (i = 0; i < keypoints.length; ++i) {
                            keypoints[i].name = constants_2.COCO_KEYPOINTS[i];
                            keypoints[i].y *= imageSize.height;
                            keypoints[i].x *= imageSize.width;
                            if (keypoints[i].score > constants_3.MIN_CROP_KEYPOINT_SCORE) {
                                ++numValidKeypoints;
                                poseScore += keypoints[i].score;
                            }
                        }
                        if (numValidKeypoints > 0) {
                            poseScore /= numValidKeypoints;
                        }
                        else {
                            // No pose detected, so reset all filters.
                            this.resetFilters();
                        }
                        pose = { score: poseScore, keypoints: keypoints };
                        return [2 /*return*/, [pose]];
                }
            });
        });
    };
    MoveNetDetector.prototype.filterCropRegion = function (newCropRegion) {
        if (!newCropRegion) {
            this.cropRegionFilterYMin.reset();
            this.cropRegionFilterXMin.reset();
            this.cropRegionFilterYMax.reset();
            this.cropRegionFilterXMax.reset();
            return null;
        }
        else {
            var filteredYMin = this.cropRegionFilterYMin.apply(newCropRegion.yMin);
            var filteredXMin = this.cropRegionFilterXMin.apply(newCropRegion.xMin);
            var filteredYMax = this.cropRegionFilterYMax.apply(newCropRegion.yMax);
            var filteredXMax = this.cropRegionFilterXMax.apply(newCropRegion.xMax);
            return {
                yMin: filteredYMin,
                xMin: filteredXMin,
                yMax: filteredYMax,
                xMax: filteredXMax,
                height: filteredYMax - filteredYMin,
                width: filteredXMax - filteredXMin
            };
        }
    };
    MoveNetDetector.prototype.dispose = function () {
        this.moveNetModel.dispose();
    };
    MoveNetDetector.prototype.reset = function () {
        this.cropRegion = null;
        this.resetFilters();
    };
    MoveNetDetector.prototype.resetFilters = function () {
        this.keypointsFilter.reset();
        this.cropRegionFilterYMin.reset();
        this.cropRegionFilterXMin.reset();
        this.cropRegionFilterYMax.reset();
        this.cropRegionFilterXMax.reset();
    };
    MoveNetDetector.prototype.torsoVisible = function (keypoints) {
        return ((keypoints[this.keypointIndexByName['left_hip']].score >
            constants_3.MIN_CROP_KEYPOINT_SCORE ||
            keypoints[this.keypointIndexByName['right_hip']].score >
                constants_3.MIN_CROP_KEYPOINT_SCORE) &&
            (keypoints[this.keypointIndexByName['left_shoulder']].score >
                constants_3.MIN_CROP_KEYPOINT_SCORE ||
                keypoints[this.keypointIndexByName['right_shoulder']].score >
                    constants_3.MIN_CROP_KEYPOINT_SCORE));
    };
    /**
     * Calculates the maximum distance from each keypoints to the center location.
     * The function returns the maximum distances from the two sets of keypoints:
     * full 17 keypoints and 4 torso keypoints. The returned information will be
     * used to determine the crop size. See determineCropRegion for more detail.
     *
     * @param targetKeypoints Maps from joint names to coordinates.
     */
    MoveNetDetector.prototype.determineTorsoAndBodyRange = function (keypoints, targetKeypoints, centerY, centerX) {
        var torsoJoints = ['left_shoulder', 'right_shoulder', 'left_hip', 'right_hip'];
        var maxTorsoYrange = 0.0;
        var maxTorsoXrange = 0.0;
        for (var i = 0; i < torsoJoints.length; i++) {
            var distY = Math.abs(centerY - targetKeypoints[torsoJoints[i]][0]);
            var distX = Math.abs(centerX - targetKeypoints[torsoJoints[i]][1]);
            if (distY > maxTorsoYrange) {
                maxTorsoYrange = distY;
            }
            if (distX > maxTorsoXrange) {
                maxTorsoXrange = distX;
            }
        }
        var maxBodyYrange = 0.0;
        var maxBodyXrange = 0.0;
        for (var _i = 0, _a = Object.keys(targetKeypoints); _i < _a.length; _i++) {
            var key = _a[_i];
            if (keypoints[this.keypointIndexByName[key]].score <
                constants_3.MIN_CROP_KEYPOINT_SCORE) {
                continue;
            }
            var distY = Math.abs(centerY - targetKeypoints[key][0]);
            var distX = Math.abs(centerX - targetKeypoints[key][1]);
            if (distY > maxBodyYrange) {
                maxBodyYrange = distY;
            }
            if (distX > maxBodyXrange) {
                maxBodyXrange = distX;
            }
        }
        return [maxTorsoYrange, maxTorsoXrange, maxBodyYrange, maxBodyXrange];
    };
    /**
     * Determines the region to crop the image for the model to run inference on.
     * The algorithm uses the detected joints from the previous frame to estimate
     * the square region that encloses the full body of the target person and
     * centers at the midpoint of two hip joints. The crop size is determined by
     * the distances between each joints and the center point.
     * When the model is not confident with the four torso joint predictions, the
     * function returns a default crop which is the full image padded to square.
     */
    MoveNetDetector.prototype.determineCropRegion = function (keypoints, imageHeight, imageWidth) {
        var targetKeypoints = {};
        for (var _i = 0, COCO_KEYPOINTS_1 = constants_2.COCO_KEYPOINTS; _i < COCO_KEYPOINTS_1.length; _i++) {
            var key = COCO_KEYPOINTS_1[_i];
            targetKeypoints[key] = [
                keypoints[this.keypointIndexByName[key]].y * imageHeight,
                keypoints[this.keypointIndexByName[key]].x * imageWidth
            ];
        }
        if (this.torsoVisible(keypoints)) {
            var centerY = (targetKeypoints['left_hip'][0] + targetKeypoints['right_hip'][0]) /
                2;
            var centerX = (targetKeypoints['left_hip'][1] + targetKeypoints['right_hip'][1]) /
                2;
            var _a = this.determineTorsoAndBodyRange(keypoints, targetKeypoints, centerY, centerX), maxTorsoYrange = _a[0], maxTorsoXrange = _a[1], maxBodyYrange = _a[2], maxBodyXrange = _a[3];
            var cropLengthHalf = Math.max(maxTorsoXrange * 1.9, maxTorsoYrange * 1.9, maxBodyYrange * 1.2, maxBodyXrange * 1.2);
            cropLengthHalf = Math.min(cropLengthHalf, Math.max(centerX, imageWidth - centerX, centerY, imageHeight - centerY));
            var cropCorner = [centerY - cropLengthHalf, centerX - cropLengthHalf];
            if (cropLengthHalf > Math.max(imageWidth, imageHeight) / 2) {
                return this.initCropRegion(imageHeight, imageWidth);
            }
            else {
                var cropLength = cropLengthHalf * 2;
                return {
                    yMin: cropCorner[0] / imageHeight,
                    xMin: cropCorner[1] / imageWidth,
                    yMax: (cropCorner[0] + cropLength) / imageHeight,
                    xMax: (cropCorner[1] + cropLength) / imageWidth,
                    height: (cropCorner[0] + cropLength) / imageHeight -
                        cropCorner[0] / imageHeight,
                    width: (cropCorner[1] + cropLength) / imageWidth -
                        cropCorner[1] / imageWidth
                };
            }
        }
        else {
            return this.initCropRegion(imageHeight, imageWidth);
        }
    };
    /**
     * Provides initial crop region.
     *
     * The function provides the initial crop region when the algorithm cannot
     * reliably determine the crop region from the previous frame. There are two
     * scenarios:
     *   1) The very first frame: the function returns the best quess by cropping
     *      a square in the middle of the image.
     *   2) Not enough reliable keypoints detected from the previous frame: the
     *      function pads the full image from both sides to make it a square
     *      image.
     */
    MoveNetDetector.prototype.initCropRegion = function (imageHeight, imageWidth) {
        var boxHeight, boxWidth, yMin, xMin;
        if (!this.cropRegion) {
            // If it is the first frame, perform a best guess by making the square
            // crop at the image center to better utilize the image pixels and
            // create higher chance to enter the cropping loop.
            if (imageWidth > imageHeight) {
                boxHeight = 1.0;
                boxWidth = imageHeight / imageWidth;
                yMin = 0.0;
                xMin = (imageWidth / 2 - imageHeight / 2) / imageWidth;
            }
            else {
                boxHeight = imageWidth / imageHeight;
                boxWidth = 1.0;
                yMin = (imageHeight / 2 - imageWidth / 2) / imageHeight;
                xMin = 0.0;
            }
        }
        else {
            // No cropRegion was available from a previous estimatePoses() call, so
            // run the model on the full image with padding on both sides.
            if (imageWidth > imageHeight) {
                boxHeight = imageWidth / imageHeight;
                boxWidth = 1.0;
                yMin = (imageHeight / 2 - imageWidth / 2) / imageHeight;
                xMin = 0.0;
            }
            else {
                boxHeight = 1.0;
                boxWidth = imageHeight / imageWidth;
                yMin = 0.0;
                xMin = (imageWidth / 2 - imageHeight / 2) / imageWidth;
            }
        }
        return {
            yMin: yMin,
            xMin: xMin,
            yMax: yMin + boxHeight,
            xMax: xMin + boxWidth,
            height: boxHeight,
            width: boxWidth
        };
    };
    return MoveNetDetector;
}());
/**
 * Loads the MoveNet model instance from a checkpoint. The model to be loaded
 * is configurable using the config dictionary `ModelConfig`. Please find more
 * details in the documentation of the `ModelConfig`.
 *
 * @param config `ModelConfig` dictionary that contains parameters for
 * the MoveNet loading process. Please find more details of each parameter
 * in the documentation of the `ModelConfig` interface.
 */
function load(modelConfig) {
    if (modelConfig === void 0) { modelConfig = constants_3.MOVENET_CONFIG; }
    return __awaiter(this, void 0, void 0, function () {
        var config, model, modelUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = detector_utils_1.validateModelConfig(modelConfig);
                    if (!config.modelUrl) return [3 /*break*/, 2];
                    return [4 /*yield*/, tfc.loadGraphModel(config.modelUrl)];
                case 1:
                    model = _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    modelUrl = void 0;
                    if (config.modelType === constants_3.SINGLEPOSE_LIGHTNING) {
                        modelUrl = constants_3.MOVENET_SINGLEPOSE_LIGHTNING_URL;
                    }
                    else if (config.modelType === constants_3.SINGLEPOSE_THUNDER) {
                        modelUrl = constants_3.MOVENET_SINGLEPOSE_THUNDER_URL;
                    }
                    return [4 /*yield*/, tfc.loadGraphModel(modelUrl, { fromTFHub: true })];
                case 3:
                    model = _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/, new MoveNetDetector(model, config)];
            }
        });
    });
}
exports.load = load;
//# sourceMappingURL=detector.js.map
}, function(modId) { var map = {"../calculators/constants":1626919991112,"../calculators/image_utils":1626919991114,"../calculators/is_video":1626919991115,"../calculators/keypoints_one_euro_filter":1626919991118,"../calculators/low_pass_filter":1626919991120,"../constants":1626919991108,"../types":1626919991145,"../util":1626919991146,"./constants":1626919991147,"./detector_utils":1626919991148}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991145, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var SupportedModels;
(function (SupportedModels) {
    SupportedModels["MoveNet"] = "MoveNet";
    SupportedModels["BlazePose"] = "BlazePose";
    SupportedModels["PoseNet"] = "PoseNet";
})(SupportedModels = exports.SupportedModels || (exports.SupportedModels = {}));
//# sourceMappingURL=types.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991146, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var constants = require("./constants");
var types_1 = require("./types");
function getKeypointIndexBySide(model) {
    switch (model) {
        case types_1.SupportedModels.BlazePose:
            return constants.BLAZEPOSE_KEYPOINTS_BY_SIDE;
        case types_1.SupportedModels.PoseNet:
        case types_1.SupportedModels.MoveNet:
            return constants.COCO_KEYPOINTS_BY_SIDE;
        default:
            throw new Error("Model " + model + " is not supported.");
    }
}
exports.getKeypointIndexBySide = getKeypointIndexBySide;
function getAdjacentPairs(model) {
    switch (model) {
        case types_1.SupportedModels.BlazePose:
            return constants.BLAZEPOSE_CONNECTED_KEYPOINTS_PAIRS;
        case types_1.SupportedModels.PoseNet:
        case types_1.SupportedModels.MoveNet:
            return constants.COCO_CONNECTED_KEYPOINTS_PAIRS;
        default:
            throw new Error("Model " + model + " is not supported.");
    }
}
exports.getAdjacentPairs = getAdjacentPairs;
function getKeypointIndexByName(model) {
    switch (model) {
        case types_1.SupportedModels.BlazePose:
            return constants.BLAZEPOSE_KEYPOINTS.reduce(function (map, name, i) {
                map[name] = i;
                return map;
            }, {});
        case types_1.SupportedModels.PoseNet:
        case types_1.SupportedModels.MoveNet:
            return constants.COCO_KEYPOINTS.reduce(function (map, name, i) {
                map[name] = i;
                return map;
            }, {});
        default:
            throw new Error("Model " + model + " is not supported.");
    }
}
exports.getKeypointIndexByName = getKeypointIndexByName;
//# sourceMappingURL=util.js.map
}, function(modId) { var map = {"./constants":1626919991108,"./types":1626919991145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991147, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SINGLEPOSE_LIGHTNING = 'SinglePose.Lightning';
exports.SINGLEPOSE_THUNDER = 'SinglePose.Thunder';
exports.VALID_MODELS = [exports.SINGLEPOSE_LIGHTNING, exports.SINGLEPOSE_THUNDER];
exports.MOVENET_SINGLEPOSE_LIGHTNING_URL = 'https://tfhub.dev/google/tfjs-model/movenet/singlepose/lightning/4';
exports.MOVENET_SINGLEPOSE_THUNDER_URL = 'https://tfhub.dev/google/tfjs-model/movenet/singlepose/thunder/4';
exports.MOVENET_SINGLEPOSE_LIGHTNING_RESOLUTION = 192;
exports.MOVENET_SINGLEPOSE_THUNDER_RESOLUTION = 256;
// The default configuration for loading MoveNet.
exports.MOVENET_CONFIG = {
    modelType: exports.SINGLEPOSE_LIGHTNING,
    enableSmoothing: true
};
exports.MOVENET_SINGLE_POSE_ESTIMATION_CONFIG = {
    maxPoses: 1
};
exports.KEYPOINT_FILTER_CONFIG = {
    frequency: 30,
    minCutOff: 6.36,
    beta: 636.61,
    derivateCutOff: 4.77,
    thresholdCutOff: 0.5,
    thresholdBeta: 5.0
};
exports.CROP_FILTER_ALPHA = 0.9;
exports.MIN_CROP_KEYPOINT_SCORE = 0.2;
//# sourceMappingURL=constants.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991148, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
function validateModelConfig(modelConfig) {
    var config = modelConfig == null ? constants_1.MOVENET_CONFIG : __assign({}, modelConfig);
    if (!modelConfig.modelType) {
        modelConfig.modelType = 'SinglePose.Lightning';
    }
    else if (constants_1.VALID_MODELS.indexOf(config.modelType) < 0) {
        throw new Error("Invalid architecture " + config.modelType + ". " +
            ("Should be one of " + constants_1.VALID_MODELS));
    }
    if (config.enableSmoothing == null) {
        config.enableSmoothing = true;
    }
    return config;
}
exports.validateModelConfig = validateModelConfig;
function validateEstimationConfig(estimationConfig) {
    var config = estimationConfig == null ?
        constants_1.MOVENET_SINGLE_POSE_ESTIMATION_CONFIG : __assign({}, estimationConfig);
    if (!config.maxPoses) {
        config.maxPoses = 1;
    }
    if (config.maxPoses <= 0 || config.maxPoses > 1) {
        throw new Error("Invalid maxPoses " + config.maxPoses + ". Should be 1.");
    }
    return config;
}
exports.validateEstimationConfig = validateEstimationConfig;
//# sourceMappingURL=detector_utils.js.map
}, function(modId) { var map = {"./constants":1626919991147}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991149, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tfconv = require("@tensorflow/tfjs-converter");
var tf = require("@tensorflow/tfjs-core");
var convert_image_to_tensor_1 = require("../calculators/convert_image_to_tensor");
var image_utils_1 = require("../calculators/image_utils");
var shift_image_value_1 = require("../calculators/shift_image_value");
var decode_multiple_poses_1 = require("./calculators/decode_multiple_poses");
var decode_single_pose_1 = require("./calculators/decode_single_pose");
var flip_poses_1 = require("./calculators/flip_poses");
var scale_poses_1 = require("./calculators/scale_poses");
var constants_1 = require("./constants");
var detector_utils_1 = require("./detector_utils");
var load_utils_1 = require("./load_utils");
/**
 * PoseNet detector class.
 */
var PosenetDetector = /** @class */ (function () {
    function PosenetDetector(posenetModel, config) {
        this.posenetModel = posenetModel;
        // validate params.
        var inputShape = this.posenetModel.inputs[0].shape;
        tf.util.assert((inputShape[1] === -1) && (inputShape[2] === -1), function () { return "Input shape [" + inputShape[1] + ", " + inputShape[2] + "] " +
            "must both be equal to or -1"; });
        var validInputResolution = load_utils_1.getValidInputResolutionDimensions(config.inputResolution, config.outputStride);
        detector_utils_1.assertValidOutputStride(config.outputStride);
        detector_utils_1.assertValidResolution(validInputResolution, config.outputStride);
        this.inputResolution = validInputResolution;
        this.outputStride = config.outputStride;
        this.architecture = config.architecture;
    }
    /**
     * Estimates poses for an image or video frame.
     *
     * This does standard ImageNet pre-processing before inferring through the
     * model. The image should pixels should have values [0-255]. It returns a
     * single pose or multiple poses based on the maxPose parameter from the
     * `config`.
     *
     * @param image
     * ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement The input
     * image to feed through the network.
     *
     * @param config
     *       maxPoses: Optional. Max number of poses to estimate.
     *       When maxPoses = 1, a single pose is detected, it is usually much more
     *       efficient than maxPoses > 1. When maxPoses > 1, multiple poses are
     *       detected.
     *
     *       flipHorizontal: Optional. Default to false. When image data comes
     *       from camera, the result has to flip horizontally.
     *
     * @return An array of `Pose`s.
     */
    PosenetDetector.prototype.estimatePoses = function (image, estimationConfig) {
        if (estimationConfig === void 0) { estimationConfig = constants_1.SINGLE_PERSON_ESTIMATION_CONFIG; }
        return __awaiter(this, void 0, void 0, function () {
            var config, _a, imageTensor, padding, imageValueShifted, results, offsets, heatmap, displacementFwd, displacementBwd, heatmapScores, poses, pose, imageSize, scaledPoses;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        config = detector_utils_1.validateEstimationConfig(estimationConfig);
                        if (image == null) {
                            return [2 /*return*/, []];
                        }
                        this.maxPoses = config.maxPoses;
                        _a = convert_image_to_tensor_1.convertImageToTensor(image, { inputResolution: this.inputResolution, keepAspectRatio: true }), imageTensor = _a.imageTensor, padding = _a.padding;
                        imageValueShifted = this.architecture === 'ResNet50' ?
                            tf.add(imageTensor, constants_1.RESNET_MEAN) :
                            shift_image_value_1.shiftImageValue(imageTensor, [-1, 1]);
                        results = this.posenetModel.predict(imageValueShifted);
                        if (this.architecture === 'ResNet50') {
                            offsets = tf.squeeze(results[2], [0]);
                            heatmap = tf.squeeze(results[3], [0]);
                            displacementFwd = tf.squeeze(results[0], [0]);
                            displacementBwd = tf.squeeze(results[1], [0]);
                        }
                        else {
                            offsets = tf.squeeze(results[0], [0]);
                            heatmap = tf.squeeze(results[1], [0]);
                            displacementFwd = tf.squeeze(results[2], [0]);
                            displacementBwd = tf.squeeze(results[3], [0]);
                        }
                        heatmapScores = tf.sigmoid(heatmap);
                        if (!(this.maxPoses === 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, decode_single_pose_1.decodeSinglePose(heatmapScores, offsets, this.outputStride)];
                    case 1:
                        pose = _b.sent();
                        poses = [pose];
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, decode_multiple_poses_1.decodeMultiplePoses(heatmapScores, offsets, displacementFwd, displacementBwd, this.outputStride, this.maxPoses, config.scoreThreshold, config.nmsRadius)];
                    case 3:
                        poses = _b.sent();
                        _b.label = 4;
                    case 4:
                        imageSize = image_utils_1.getImageSize(image);
                        scaledPoses = scale_poses_1.scalePoses(poses, imageSize, this.inputResolution, padding);
                        if (config.flipHorizontal) {
                            scaledPoses = flip_poses_1.flipPosesHorizontal(scaledPoses, imageSize);
                        }
                        imageTensor.dispose();
                        imageValueShifted.dispose();
                        tf.dispose(results);
                        offsets.dispose();
                        heatmap.dispose();
                        displacementFwd.dispose();
                        displacementBwd.dispose();
                        heatmapScores.dispose();
                        return [2 /*return*/, scaledPoses];
                }
            });
        });
    };
    PosenetDetector.prototype.dispose = function () {
        this.posenetModel.dispose();
    };
    PosenetDetector.prototype.reset = function () {
        // No-op. There's no global state.
    };
    return PosenetDetector;
}());
/**
 * Loads the PoseNet model instance from a checkpoint, with the ResNet
 * or MobileNet architecture. The model to be loaded is configurable using the
 * config dictionary ModelConfig. Please find more details in the
 * documentation of the ModelConfig.
 *
 * @param config ModelConfig dictionary that contains parameters for
 * the PoseNet loading process. Please find more details of each parameters
 * in the documentation of the ModelConfig interface. The predefined
 * `MOBILENET_V1_CONFIG` and `RESNET_CONFIG` can also be used as references
 * for defining your customized config.
 */
function load(modelConfig) {
    if (modelConfig === void 0) { modelConfig = constants_1.MOBILENET_V1_CONFIG; }
    return __awaiter(this, void 0, void 0, function () {
        var config, defaultUrl_1, model_1, defaultUrl, model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = detector_utils_1.validateModelConfig(modelConfig);
                    if (!(config.architecture === 'ResNet50')) return [3 /*break*/, 2];
                    defaultUrl_1 = load_utils_1.resNet50Checkpoint(config.outputStride, config.quantBytes);
                    return [4 /*yield*/, tfconv.loadGraphModel(config.modelUrl || defaultUrl_1)];
                case 1:
                    model_1 = _a.sent();
                    return [2 /*return*/, new PosenetDetector(model_1, config)];
                case 2:
                    defaultUrl = load_utils_1.mobileNetCheckpoint(config.outputStride, config.multiplier, config.quantBytes);
                    return [4 /*yield*/, tfconv.loadGraphModel(config.modelUrl || defaultUrl)];
                case 3:
                    model = _a.sent();
                    return [2 /*return*/, new PosenetDetector(model, config)];
            }
        });
    });
}
exports.load = load;
//# sourceMappingURL=detector.js.map
}, function(modId) { var map = {"../calculators/convert_image_to_tensor":1626919991113,"../calculators/image_utils":1626919991114,"../calculators/shift_image_value":1626919991125,"./calculators/decode_multiple_poses":1626919991150,"./calculators/decode_single_pose":1626919991155,"./calculators/flip_poses":1626919991157,"./calculators/scale_poses":1626919991158,"./constants":1626919991151,"./detector_utils":1626919991159,"./load_utils":1626919991160}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991150, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var build_part_with_score_queue_1 = require("./build_part_with_score_queue");
var decode_multiple_poses_util_1 = require("./decode_multiple_poses_util");
/**
 * Detects multiple poses and finds their parts from part scores and
 * displacement vectors. It returns up to `maxDetections` object instance
 * detections in decreasing root score order. It works as follows: We first
 * create a priority queue with local part score maxima above
 * `scoreThreshold`, considering all parts at the same time. Then we
 * iteratively pull the top  element of the queue (in decreasing score order)
 * and treat it as a root candidate for a new object instance. To avoid
 * duplicate detections, we reject the root candidate if it is within a disk
 * of `nmsRadius` pixels from the corresponding part of a previously detected
 * instance, which is a form of part-based non-maximum suppression (NMS). If
 * the root candidate passes the NMS check, we start a new object instance
 * detection, treating the corresponding part as root and finding the
 * positions of the remaining parts by following the displacement vectors
 * along the tree-structured part graph. We assign to the newly detected
 * instance a score equal to the sum of scores of its parts which have not
 * been claimed by a previous instance (i.e., those at least `nmsRadius`
 * pixels away from the corresponding part of all previously detected
 * instances), divided by the total number of parts `numParts`.
 *
 * @param heatmapScores 3-D tensor with shape `[height, width, numParts]`.
 * The value of heatmapScores[y, x, k]` is the score of placing the `k`-th
 * object part at position `(y, x)`.
 *
 * @param offsets 3-D tensor with shape `[height, width, numParts * 2]`.
 * The value of [offsets[y, x, k], offsets[y, x, k + numParts]]` is the
 * short range offset vector of the `k`-th  object part at heatmap
 * position `(y, x)`.
 *
 * @param displacementsFwd 3-D tensor of shape
 * `[height, width, 2 * num_edges]`, where `num_edges = num_parts - 1` is the
 * number of edges (parent-child pairs) in the tree. It contains the forward
 * displacements between consecutive part from the root towards the leaves.
 *
 * @param displacementsBwd 3-D tensor of shape
 * `[height, width, 2 * num_edges]`, where `num_edges = num_parts - 1` is the
 * number of edges (parent-child pairs) in the tree. It contains the backward
 * displacements between consecutive part from the root towards the leaves.
 *
 * @param outputStride The output stride that was used when feed-forwarding
 * through the PoseNet model.  Must be 32, 16, or 8.
 *
 * @param maxPoseDetections Maximum number of returned instance detections per
 * image.
 *
 * @param scoreThreshold Only return instance detections that have root part
 * score greater or equal to this value. Defaults to 0.5.
 *
 * @param nmsRadius Non-maximum suppression part distance. It needs to be
 * strictly positive. Two parts suppress each other if they are less than
 * `nmsRadius` pixels away. Defaults to 20.
 *
 * @return An array of poses and their scores, each containing keypoints and
 * the corresponding keypoint scores.
 */
function decodeMultiplePoses(heatmapScores, offsets, displacementFwd, displacementBwd, outputStride, maxPoseDetections, scoreThreshold, nmsRadius) {
    if (scoreThreshold === void 0) { scoreThreshold = 0.5; }
    if (nmsRadius === void 0) { nmsRadius = 20; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, scoresBuffer, offsetsBuffer, displacementsFwdBuffer, displacementsBwdBuffer, poses, queue, squaredNmsRadius, root, rootImageCoords, keypoints, score;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, decode_multiple_poses_util_1.toTensorBuffers3D([heatmapScores, offsets, displacementFwd, displacementBwd])];
                case 1:
                    _a = _b.sent(), scoresBuffer = _a[0], offsetsBuffer = _a[1], displacementsFwdBuffer = _a[2], displacementsBwdBuffer = _a[3];
                    poses = [];
                    queue = build_part_with_score_queue_1.buildPartWithScoreQueue(scoreThreshold, constants_1.K_LOCAL_MAXIMUM_RADIUS, scoresBuffer);
                    squaredNmsRadius = nmsRadius * nmsRadius;
                    // Generate at most maxDetections object instances per image in
                    // decreasing root part score order.
                    while (poses.length < maxPoseDetections && !queue.empty()) {
                        root = queue.dequeue();
                        rootImageCoords = decode_multiple_poses_util_1.getImageCoords(root.part, outputStride, offsetsBuffer);
                        if (decode_multiple_poses_util_1.withinNmsRadiusOfCorrespondingPoint(poses, squaredNmsRadius, rootImageCoords, root.part.id)) {
                            continue;
                        }
                        keypoints = decode_multiple_poses_util_1.decodePose(root, scoresBuffer, offsetsBuffer, outputStride, displacementsFwdBuffer, displacementsBwdBuffer);
                        score = decode_multiple_poses_util_1.getInstanceScore(poses, squaredNmsRadius, keypoints);
                        poses.push({ keypoints: keypoints, score: score });
                    }
                    return [2 /*return*/, poses];
            }
        });
    });
}
exports.decodeMultiplePoses = decodeMultiplePoses;
//# sourceMappingURL=decode_multiple_poses.js.map
}, function(modId) { var map = {"../constants":1626919991151,"./build_part_with_score_queue":1626919991152,"./decode_multiple_poses_util":1626919991154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991151, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
// The default configuration for loading MobileNetV1 based PoseNet.
//
// (And for references, the default configuration for loading ResNet
// based PoseNet is also included).
//
// ```
// const RESNET_CONFIG = {
//   architecture: 'ResNet50',
//   outputStride: 32,
//   quantBytes: 2,
// } as ModelConfig;
// ```
exports.MOBILENET_V1_CONFIG = {
    architecture: 'MobileNetV1',
    outputStride: 16,
    multiplier: 0.75,
    inputResolution: { height: 257, width: 257 }
};
exports.VALID_ARCHITECTURE = ['MobileNetV1', 'ResNet50'];
exports.VALID_STRIDE = {
    'MobileNetV1': [8, 16],
    'ResNet50': [16]
};
exports.VALID_OUTPUT_STRIDES = [8, 16, 32];
exports.VALID_MULTIPLIER = {
    'MobileNetV1': [0.50, 0.75, 1.0],
    'ResNet50': [1.0]
};
exports.VALID_QUANT_BYTES = [1, 2, 4];
exports.SINGLE_PERSON_ESTIMATION_CONFIG = {
    maxPoses: 1,
    flipHorizontal: false
};
exports.MULTI_PERSON_ESTIMATION_CONFIG = {
    maxPoses: 5,
    flipHorizontal: false,
    scoreThreshold: 0.5,
    nmsRadius: 20
};
exports.RESNET_MEAN = [-123.15, -115.90, -103.06];
// A point (y, x) is considered as root part candidate if its score is a
// maximum in a window |y - y'| <= kLocalMaximumRadius, |x - x'| <=
// kLocalMaximumRadius.
exports.K_LOCAL_MAXIMUM_RADIUS = 1;
exports.NUM_KEYPOINTS = 17;
/*
 * Define the skeleton. This defines the parent->child relationships of our
 * tree. Arbitrarily this defines the nose as the root of the tree, however
 * since we will infer the displacement for both parent->child and
 * child->parent, we can define the tree root as any node.
 */
exports.POSE_CHAIN = [
    ['nose', 'left_eye'], ['left_eye', 'left_ear'], ['nose', 'right_eye'],
    ['right_eye', 'right_ear'], ['nose', 'left_shoulder'],
    ['left_shoulder', 'left_elbow'], ['left_elbow', 'left_wrist'],
    ['left_shoulder', 'left_hip'], ['left_hip', 'left_knee'],
    ['left_knee', 'left_ankle'], ['nose', 'right_shoulder'],
    ['right_shoulder', 'right_elbow'], ['right_elbow', 'right_wrist'],
    ['right_shoulder', 'right_hip'], ['right_hip', 'right_knee'],
    ['right_knee', 'right_ankle']
];
//# sourceMappingURL=constants.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991152, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var max_heap_1 = require("./max_heap");
function scoreIsMaximumInLocalWindow(keypointId, score, heatmapY, heatmapX, localMaximumRadius, scores) {
    var _a = scores.shape, height = _a[0], width = _a[1];
    var localMaximum = true;
    var yStart = Math.max(heatmapY - localMaximumRadius, 0);
    var yEnd = Math.min(heatmapY + localMaximumRadius + 1, height);
    for (var yCurrent = yStart; yCurrent < yEnd; ++yCurrent) {
        var xStart = Math.max(heatmapX - localMaximumRadius, 0);
        var xEnd = Math.min(heatmapX + localMaximumRadius + 1, width);
        for (var xCurrent = xStart; xCurrent < xEnd; ++xCurrent) {
            if (scores.get(yCurrent, xCurrent, keypointId) > score) {
                localMaximum = false;
                break;
            }
        }
        if (!localMaximum) {
            break;
        }
    }
    return localMaximum;
}
/**
 * Builds a priority queue with part candidate positions for a specific image in
 * the batch. For this we find all local maxima in the score maps with score
 * values above a threshold. We create a single priority queue across all parts.
 */
function buildPartWithScoreQueue(scoreThreshold, localMaximumRadius, scores) {
    var _a = scores.shape, height = _a[0], width = _a[1], numKeypoints = _a[2];
    var queue = new max_heap_1.MaxHeap(height * width * numKeypoints, function (_a) {
        var score = _a.score;
        return score;
    });
    for (var heatmapY = 0; heatmapY < height; ++heatmapY) {
        for (var heatmapX = 0; heatmapX < width; ++heatmapX) {
            for (var keypointId = 0; keypointId < numKeypoints; ++keypointId) {
                var score = scores.get(heatmapY, heatmapX, keypointId);
                // Only consider parts with score greater or equal to threshold as
                // root candidates.
                if (score < scoreThreshold) {
                    continue;
                }
                // Only consider keypoints whose score is maximum in a local window.
                if (scoreIsMaximumInLocalWindow(keypointId, score, heatmapY, heatmapX, localMaximumRadius, scores)) {
                    queue.enqueue({ score: score, part: { heatmapY: heatmapY, heatmapX: heatmapX, id: keypointId } });
                }
            }
        }
    }
    return queue;
}
exports.buildPartWithScoreQueue = buildPartWithScoreQueue;
//# sourceMappingURL=build_part_with_score_queue.js.map
}, function(modId) { var map = {"./max_heap":1626919991153}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991153, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
// algorithm based on Coursera Lecture from Algorithms, Part 1:
// https://www.coursera.org/learn/algorithms-part1/lecture/ZjoSM/heapsort
function half(k) {
    return Math.floor(k / 2);
}
var MaxHeap = /** @class */ (function () {
    function MaxHeap(maxSize, getElementValue) {
        this.priorityQueue = new Array(maxSize);
        this.numberOfElements = -1;
        this.getElementValue = getElementValue;
    }
    MaxHeap.prototype.enqueue = function (x) {
        this.priorityQueue[++this.numberOfElements] = x;
        this.swim(this.numberOfElements);
    };
    MaxHeap.prototype.dequeue = function () {
        var max = this.priorityQueue[0];
        this.exchange(0, this.numberOfElements--);
        this.sink(0);
        this.priorityQueue[this.numberOfElements + 1] = null;
        return max;
    };
    MaxHeap.prototype.empty = function () {
        return this.numberOfElements === -1;
    };
    MaxHeap.prototype.size = function () {
        return this.numberOfElements + 1;
    };
    MaxHeap.prototype.all = function () {
        return this.priorityQueue.slice(0, this.numberOfElements + 1);
    };
    MaxHeap.prototype.max = function () {
        return this.priorityQueue[0];
    };
    MaxHeap.prototype.swim = function (k) {
        while (k > 0 && this.less(half(k), k)) {
            this.exchange(k, half(k));
            k = half(k);
        }
    };
    MaxHeap.prototype.sink = function (k) {
        while (2 * k <= this.numberOfElements) {
            var j = 2 * k;
            if (j < this.numberOfElements && this.less(j, j + 1)) {
                j++;
            }
            if (!this.less(k, j)) {
                break;
            }
            this.exchange(k, j);
            k = j;
        }
    };
    MaxHeap.prototype.getValueAt = function (i) {
        return this.getElementValue(this.priorityQueue[i]);
    };
    MaxHeap.prototype.less = function (i, j) {
        return this.getValueAt(i) < this.getValueAt(j);
    };
    MaxHeap.prototype.exchange = function (i, j) {
        var t = this.priorityQueue[i];
        this.priorityQueue[i] = this.priorityQueue[j];
        this.priorityQueue[j] = t;
    };
    return MaxHeap;
}());
exports.MaxHeap = MaxHeap;
//# sourceMappingURL=max_heap.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991154, function(require, module, exports) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../constants");
var constants_2 = require("../constants");
function toTensorBuffers3D(tensors) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Promise.all(tensors.map(function (tensor) { return tensor.buffer(); }))];
        });
    });
}
exports.toTensorBuffers3D = toTensorBuffers3D;
function getOffsetPoint(y, x, keypoint, offsets) {
    return {
        y: offsets.get(y, x, keypoint),
        x: offsets.get(y, x, keypoint + constants_2.NUM_KEYPOINTS)
    };
}
exports.getOffsetPoint = getOffsetPoint;
function getImageCoords(part, outputStride, offsets) {
    var heatmapY = part.heatmapY, heatmapX = part.heatmapX, keypoint = part.id;
    var _a = getOffsetPoint(heatmapY, heatmapX, keypoint, offsets), y = _a.y, x = _a.x;
    return {
        x: part.heatmapX * outputStride + x,
        y: part.heatmapY * outputStride + y
    };
}
exports.getImageCoords = getImageCoords;
function squaredDistance(y1, x1, y2, x2) {
    var dy = y2 - y1;
    var dx = x2 - x1;
    return dy * dy + dx * dx;
}
exports.squaredDistance = squaredDistance;
function withinNmsRadiusOfCorrespondingPoint(poses, squaredNmsRadius, _a, keypointId) {
    var x = _a.x, y = _a.y;
    return poses.some(function (_a) {
        var keypoints = _a.keypoints;
        return squaredDistance(y, x, keypoints[keypointId].y, keypoints[keypointId].x) <=
            squaredNmsRadius;
    });
}
exports.withinNmsRadiusOfCorrespondingPoint = withinNmsRadiusOfCorrespondingPoint;
var partIds = 
// tslint:disable-next-line: no-unnecessary-type-assertion
constants_1.COCO_KEYPOINTS.reduce(function (result, jointName, i) {
    result[jointName] = i;
    return result;
}, {});
var parentChildrenTuples = constants_2.POSE_CHAIN.map(function (_a) {
    var parentJoinName = _a[0], childJoinName = _a[1];
    return ([partIds[parentJoinName], partIds[childJoinName]]);
});
var parentToChildEdges = parentChildrenTuples.map(function (_a) {
    var childJointId = _a[1];
    return childJointId;
});
var childToParentEdges = parentChildrenTuples.map(function (_a) {
    var parentJointId = _a[0];
    return parentJointId;
});
function clamp(a, min, max) {
    if (a < min) {
        return min;
    }
    if (a > max) {
        return max;
    }
    return a;
}
function getStridedIndexNearPoint(point, outputStride, height, width) {
    return {
        y: clamp(Math.round(point.y / outputStride), 0, height - 1),
        x: clamp(Math.round(point.x / outputStride), 0, width - 1)
    };
}
function getDisplacement(edgeId, point, displacements) {
    var numEdges = displacements.shape[2] / 2;
    return {
        y: displacements.get(point.y, point.x, edgeId),
        x: displacements.get(point.y, point.x, numEdges + edgeId)
    };
}
function addVectors(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
}
exports.addVectors = addVectors;
/**
 * We get a new keypoint along the `edgeId` for the pose instance, assuming
 * that the position of the `idSource` part is already known. For this, we
 * follow the displacement vector from the source to target part (stored in
 * the `i`-t channel of the displacement tensor). The displaced keypoint
 * vector is refined using the offset vector by `offsetRefineStep` times.
 */
function traverseToTargetKeypoint(edgeId, sourceKeypoint, targetKeypointId, scoresBuffer, offsets, outputStride, displacements, offsetRefineStep) {
    if (offsetRefineStep === void 0) { offsetRefineStep = 2; }
    var _a = scoresBuffer.shape, height = _a[0], width = _a[1];
    var point = { y: sourceKeypoint.y, x: sourceKeypoint.x };
    // Nearest neighbor interpolation for the source->target displacements.
    var sourceKeypointIndices = getStridedIndexNearPoint(point, outputStride, height, width);
    var displacement = getDisplacement(edgeId, sourceKeypointIndices, displacements);
    var displacedPoint = addVectors(point, displacement);
    var targetKeypoint = displacedPoint;
    for (var i = 0; i < offsetRefineStep; i++) {
        var targetKeypointIndices = getStridedIndexNearPoint(targetKeypoint, outputStride, height, width);
        var offsetPoint = getOffsetPoint(targetKeypointIndices.y, targetKeypointIndices.x, targetKeypointId, offsets);
        targetKeypoint = addVectors({
            x: targetKeypointIndices.x * outputStride,
            y: targetKeypointIndices.y * outputStride
        }, { x: offsetPoint.x, y: offsetPoint.y });
    }
    var targetKeyPointIndices = getStridedIndexNearPoint(targetKeypoint, outputStride, height, width);
    var score = scoresBuffer.get(targetKeyPointIndices.y, targetKeyPointIndices.x, targetKeypointId);
    return {
        y: targetKeypoint.y,
        x: targetKeypoint.x,
        name: constants_1.COCO_KEYPOINTS[targetKeypointId],
        score: score
    };
}
/**
 * Follows the displacement fields to decode the full pose of the object
 * instance given the position of a part that acts as root.
 *
 * @return An array of decoded keypoints and their scores for a single pose
 */
function decodePose(root, scores, offsets, outputStride, displacementsFwd, displacementsBwd) {
    var numParts = scores.shape[2];
    var numEdges = parentToChildEdges.length;
    var instanceKeypoints = new Array(numParts);
    // Start a new detection instance at the position of the root.
    var rootPart = root.part, rootScore = root.score;
    var rootPoint = getImageCoords(rootPart, outputStride, offsets);
    instanceKeypoints[rootPart.id] = {
        score: rootScore,
        name: constants_1.COCO_KEYPOINTS[rootPart.id],
        y: rootPoint.y,
        x: rootPoint.x
    };
    // Decode the part positions upwards in the tree, following the backward
    // displacements.
    for (var edge = numEdges - 1; edge >= 0; --edge) {
        var sourceKeypointId = parentToChildEdges[edge];
        var targetKeypointId = childToParentEdges[edge];
        if (instanceKeypoints[sourceKeypointId] &&
            !instanceKeypoints[targetKeypointId]) {
            instanceKeypoints[targetKeypointId] = traverseToTargetKeypoint(edge, instanceKeypoints[sourceKeypointId], targetKeypointId, scores, offsets, outputStride, displacementsBwd);
        }
    }
    // Decode the part positions downwards in the tree, following the forward
    // displacements.
    for (var edge = 0; edge < numEdges; ++edge) {
        var sourceKeypointId = childToParentEdges[edge];
        var targetKeypointId = parentToChildEdges[edge];
        if (instanceKeypoints[sourceKeypointId] &&
            !instanceKeypoints[targetKeypointId]) {
            instanceKeypoints[targetKeypointId] = traverseToTargetKeypoint(edge, instanceKeypoints[sourceKeypointId], targetKeypointId, scores, offsets, outputStride, displacementsFwd);
        }
    }
    return instanceKeypoints;
}
exports.decodePose = decodePose;
/* Score the newly proposed object instance without taking into account
 * the scores of the parts that overlap with any previously detected
 * instance.
 */
function getInstanceScore(existingPoses, squaredNmsRadius, instanceKeypoints) {
    var notOverlappedKeypointScores = instanceKeypoints.reduce(function (result, _a, keypointId) {
        var y = _a.y, x = _a.x, score = _a.score;
        if (!withinNmsRadiusOfCorrespondingPoint(existingPoses, squaredNmsRadius, { y: y, x: x }, keypointId)) {
            result += score;
        }
        return result;
    }, 0.0);
    return notOverlappedKeypointScores /= instanceKeypoints.length;
}
exports.getInstanceScore = getInstanceScore;
//# sourceMappingURL=decode_multiple_poses_util.js.map
}, function(modId) { var map = {"../../constants":1626919991108,"../constants":1626919991151}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991155, function(require, module, exports) {

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../constants");
var decode_single_pose_util_1 = require("./decode_single_pose_util");
/**
 * Detects a single pose and finds its parts from part scores and offset
 * vectors. It returns a single pose detection. It works as follows:
 * argmax2d is done on the scores to get the y and x index in the heatmap
 * with the highest score for each part, which is essentially where the
 * part is most likely to exist. This produces a tensor of size 17x2, with
 * each row being the y and x index in the heatmap for each keypoint.
 * The offset vector for each part is retrieved by getting the
 * y and x from the offsets corresponding to the y and x index in the
 * heatmap for that part. This produces a tensor of size 17x2, with each
 * row being the offset vector for the corresponding keypoint.
 * To get the keypoint, each part’s heatmap y and x are multiplied
 * by the output stride then added to their corresponding offset vector,
 * which is in the same scale as the original image.
 *
 * @param heatmapScores 3-D tensor with shape `[height, width, numParts]`.
 * The value of heatmapScores[y, x, k]` is the score of placing the `k`-th
 * object part at position `(y, x)`.
 *
 * @param offsets 3-D tensor with shape `[height, width, numParts * 2]`.
 * The value of [offsets[y, x, k], offsets[y, x, k + numParts]]` is the
 * short range offset vector of the `k`-th  object part at heatmap
 * position `(y, x)`.
 *
 * @param outputStride The output stride that was used when feed-forwarding
 * through the PoseNet model.  Must be 32, 16, or 8.
 *
 * @return A promise that resolves with single pose with a confidence score,
 * which contains an array of keypoints indexed by part id, each with a score
 * and position.
 */
function decodeSinglePose(heatmapScores, offsets, outputStride) {
    return __awaiter(this, void 0, void 0, function () {
        var totalScore, heatmapValues, allTensorBuffers, scoresBuffer, offsetsBuffer, heatmapValuesBuffer, offsetPoints, offsetPointsBuffer, keypointConfidence, keypoints;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    totalScore = 0.0;
                    heatmapValues = decode_single_pose_util_1.argmax2d(heatmapScores);
                    return [4 /*yield*/, Promise.all([heatmapScores.buffer(), offsets.buffer(), heatmapValues.buffer()])];
                case 1:
                    allTensorBuffers = _a.sent();
                    scoresBuffer = allTensorBuffers[0];
                    offsetsBuffer = allTensorBuffers[1];
                    heatmapValuesBuffer = allTensorBuffers[2];
                    offsetPoints = decode_single_pose_util_1.getOffsetPoints(heatmapValuesBuffer, outputStride, offsetsBuffer);
                    return [4 /*yield*/, offsetPoints.buffer()];
                case 2:
                    offsetPointsBuffer = _a.sent();
                    keypointConfidence = Array.from(decode_single_pose_util_1.getPointsConfidence(scoresBuffer, heatmapValuesBuffer));
                    keypoints = keypointConfidence.map(function (score, keypointId) {
                        totalScore += score;
                        return {
                            y: offsetPointsBuffer.get(keypointId, 0),
                            x: offsetPointsBuffer.get(keypointId, 1),
                            score: score,
                            name: constants_1.COCO_KEYPOINTS[keypointId]
                        };
                    });
                    heatmapValues.dispose();
                    offsetPoints.dispose();
                    return [2 /*return*/, { keypoints: keypoints, score: totalScore / keypoints.length }];
            }
        });
    });
}
exports.decodeSinglePose = decodeSinglePose;
//# sourceMappingURL=decode_single_pose.js.map
}, function(modId) { var map = {"../../constants":1626919991108,"./decode_single_pose_util":1626919991156}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991156, function(require, module, exports) {

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs-core");
var constants_1 = require("../../constants");
function mod(a, b) {
    return tf.tidy(function () {
        var floored = tf.div(a, tf.scalar(b, 'int32'));
        return tf.sub(a, tf.mul(floored, tf.scalar(b, 'int32')));
    });
}
function argmax2d(inputs) {
    var _a = inputs.shape, height = _a[0], width = _a[1], depth = _a[2];
    return tf.tidy(function () {
        var reshaped = tf.reshape(inputs, [height * width, depth]);
        var coords = tf.argMax(reshaped, 0);
        var yCoords = tf.expandDims(tf.div(coords, tf.scalar(width, 'int32')), 1);
        var xCoords = tf.expandDims(mod(coords, width), 1);
        return tf.concat([yCoords, xCoords], 1);
    });
}
exports.argmax2d = argmax2d;
function getPointsConfidence(heatmapScores, heatMapCoords) {
    var numKeypoints = heatMapCoords.shape[0];
    var result = new Float32Array(numKeypoints);
    for (var keypoint = 0; keypoint < numKeypoints; keypoint++) {
        var y = heatMapCoords.get(keypoint, 0);
        var x = heatMapCoords.get(keypoint, 1);
        result[keypoint] = heatmapScores.get(y, x, keypoint);
    }
    return result;
}
exports.getPointsConfidence = getPointsConfidence;
function getOffsetPoints(heatMapCoordsBuffer, outputStride, offsetsBuffer) {
    return tf.tidy(function () {
        var offsetVectors = getOffsetVectors(heatMapCoordsBuffer, offsetsBuffer);
        return tf.add(tf.cast(tf.mul(heatMapCoordsBuffer.toTensor(), tf.scalar(outputStride, 'int32')), 'float32'), offsetVectors);
    });
}
exports.getOffsetPoints = getOffsetPoints;
function getOffsetVectors(heatMapCoordsBuffer, offsetsBuffer) {
    var result = [];
    for (var keypoint = 0; keypoint < constants_1.COCO_KEYPOINTS.length; keypoint++) {
        var heatmapY = heatMapCoordsBuffer.get(keypoint, 0).valueOf();
        var heatmapX = heatMapCoordsBuffer.get(keypoint, 1).valueOf();
        var _a = getOffsetPoint(heatmapY, heatmapX, keypoint, offsetsBuffer), x = _a.x, y = _a.y;
        result.push(y);
        result.push(x);
    }
    return tf.tensor2d(result, [constants_1.COCO_KEYPOINTS.length, 2]);
}
exports.getOffsetVectors = getOffsetVectors;
function getOffsetPoint(y, x, keypoint, offsetsBuffer) {
    return {
        y: offsetsBuffer.get(y, x, keypoint),
        x: offsetsBuffer.get(y, x, keypoint + constants_1.COCO_KEYPOINTS.length)
    };
}
//# sourceMappingURL=decode_single_pose_util.js.map
}, function(modId) { var map = {"../../constants":1626919991108}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991157, function(require, module, exports) {

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
function flipPosesHorizontal(poses, imageSize) {
    for (var _i = 0, poses_1 = poses; _i < poses_1.length; _i++) {
        var pose = poses_1[_i];
        for (var _a = 0, _b = pose.keypoints; _a < _b.length; _a++) {
            var kp = _b[_a];
            kp.x = imageSize.width - 1 - kp.x;
        }
    }
    return poses;
}
exports.flipPosesHorizontal = flipPosesHorizontal;
//# sourceMappingURL=flip_poses.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991158, function(require, module, exports) {

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
function scalePoses(poses, imageSize, inputResolution, padding) {
    var height = imageSize.height, width = imageSize.width;
    var scaleY = height / (inputResolution.height * (1 - padding.top - padding.bottom));
    var scaleX = width / (inputResolution.width * (1 - padding.left - padding.right));
    var offsetY = -padding.top * inputResolution.height;
    var offsetX = -padding.left * inputResolution.width;
    if (scaleX === 1 && scaleY === 1 && offsetY === 0 && offsetX === 0) {
        return poses;
    }
    for (var _i = 0, poses_1 = poses; _i < poses_1.length; _i++) {
        var pose = poses_1[_i];
        for (var _a = 0, _b = pose.keypoints; _a < _b.length; _a++) {
            var kp = _b[_a];
            kp.x = (kp.x + offsetX) * scaleX;
            kp.y = (kp.y + offsetY) * scaleY;
        }
    }
    return poses;
}
exports.scalePoses = scalePoses;
//# sourceMappingURL=scale_poses.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991159, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs-core");
var constants_1 = require("./constants");
function validateModelConfig(modelConfig) {
    var config = modelConfig || constants_1.MOBILENET_V1_CONFIG;
    if (config.architecture == null) {
        config.architecture = 'MobileNetV1';
    }
    if (constants_1.VALID_ARCHITECTURE.indexOf(config.architecture) < 0) {
        throw new Error("Invalid architecture " + config.architecture + ". " +
            ("Should be one of " + constants_1.VALID_ARCHITECTURE));
    }
    if (config.inputResolution == null) {
        config.inputResolution = { height: 257, width: 257 };
    }
    if (config.outputStride == null) {
        config.outputStride = 16;
    }
    if (constants_1.VALID_STRIDE[config.architecture].indexOf(config.outputStride) < 0) {
        throw new Error("Invalid outputStride " + config.outputStride + ". " +
            ("Should be one of " + constants_1.VALID_STRIDE[config.architecture] + " ") +
            ("for architecture " + config.architecture + "."));
    }
    if (config.multiplier == null) {
        config.multiplier = 1.0;
    }
    if (constants_1.VALID_MULTIPLIER[config.architecture].indexOf(config.multiplier) < 0) {
        throw new Error("Invalid multiplier " + config.multiplier + ". " +
            ("Should be one of " + constants_1.VALID_MULTIPLIER[config.architecture] + " ") +
            ("for architecture " + config.architecture + "."));
    }
    if (config.quantBytes == null) {
        config.quantBytes = 4;
    }
    if (constants_1.VALID_QUANT_BYTES.indexOf(config.quantBytes) < 0) {
        throw new Error("Invalid quantBytes " + config.quantBytes + ". " +
            ("Should be one of " + constants_1.VALID_QUANT_BYTES + " ") +
            ("for architecture " + config.architecture + "."));
    }
    if (config.architecture === 'MobileNetV1' && config.outputStride === 32 &&
        config.multiplier !== 1) {
        throw new Error("When using an output stride of 32, " +
            "you must select 1 as the multiplier.");
    }
    return config;
}
exports.validateModelConfig = validateModelConfig;
function assertValidOutputStride(outputStride) {
    tf.util.assert(constants_1.VALID_OUTPUT_STRIDES.indexOf(outputStride) >= 0, function () { return "outputStride of " + outputStride + " is invalid. " +
        "It must be either 8 or 16."; });
}
exports.assertValidOutputStride = assertValidOutputStride;
function isValidInputResolution(resolution, outputStride) {
    return (resolution - 1) % outputStride === 0;
}
function assertValidResolution(resolution, outputStride) {
    tf.util.assert(isValidInputResolution(resolution.height, outputStride), function () { return "height of " + resolution.height + " is invalid for output stride " +
        (outputStride + "."); });
    tf.util.assert(isValidInputResolution(resolution.width, outputStride), function () { return "width of " + resolution.width + " is invalid for output stride " +
        (outputStride + "."); });
}
exports.assertValidResolution = assertValidResolution;
function validateEstimationConfig(estimationConfig) {
    var config = estimationConfig;
    if (config.maxPoses == null) {
        config.maxPoses = 1;
    }
    if (config.maxPoses <= 0) {
        throw new Error("Invalid maxPoses " + config.maxPoses + ". Should be > 0.");
    }
    if (config.maxPoses > 1) {
        // Multi-poses estimation, needs additional check for multi-poses
        // parameters.
        config = __assign({}, constants_1.MULTI_PERSON_ESTIMATION_CONFIG, config);
        if (config.scoreThreshold < 0.0 || config.scoreThreshold > 1.0) {
            throw new Error("Invalid scoreThreshold " + config.scoreThreshold + ". " +
                "Should be in range [0.0, 1.0]");
        }
        if (config.nmsRadius <= 0) {
            throw new Error("Invalid nmsRadius " + config.nmsRadius + ".");
        }
    }
    return config;
}
exports.validateEstimationConfig = validateEstimationConfig;
//# sourceMappingURL=detector_utils.js.map
}, function(modId) { var map = {"./constants":1626919991151}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1626919991160, function(require, module, exports) {

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
var MOBILENET_BASE_URL = 'https://storage.googleapis.com/tfjs-models/savedmodel/posenet/mobilenet/';
var RESNET50_BASE_URL = 'https://storage.googleapis.com/tfjs-models/savedmodel/posenet/resnet50/';
// The PoseNet 2.0 ResNet50 models use the latest TensorFlow.js 1.0 model
// format.
function resNet50Checkpoint(stride, quantBytes) {
    var graphJson = "model-stride" + stride + ".json";
    // quantBytes=4 corresponding to the non-quantized full-precision checkpoints.
    if (quantBytes === 4) {
        return RESNET50_BASE_URL + "float/" + graphJson;
    }
    else {
        return RESNET50_BASE_URL + ("quant" + quantBytes + "/") + graphJson;
    }
}
exports.resNet50Checkpoint = resNet50Checkpoint;
// The PoseNet 2.0 MobileNetV1 models use the latest TensorFlow.js 1.0 model
// format.
function mobileNetCheckpoint(stride, multiplier, quantBytes) {
    var toStr = { 1.0: '100', 0.75: '075', 0.50: '050' };
    var graphJson = "model-stride" + stride + ".json";
    // quantBytes=4 corresponding to the non-quantized full-precision checkpoints.
    if (quantBytes === 4) {
        return MOBILENET_BASE_URL + ("float/" + toStr[multiplier] + "/") + graphJson;
    }
    else {
        return MOBILENET_BASE_URL + ("quant" + quantBytes + "/" + toStr[multiplier] + "/") +
            graphJson;
    }
}
exports.mobileNetCheckpoint = mobileNetCheckpoint;
function getValidInputResolutionDimensions(inputResolution, outputStride) {
    return {
        height: toValidInputResolution(inputResolution.height, outputStride),
        width: toValidInputResolution(inputResolution.width, outputStride)
    };
}
exports.getValidInputResolutionDimensions = getValidInputResolutionDimensions;
function toValidInputResolution(inputResolution, outputStride) {
    if (isValidInputResolution(inputResolution, outputStride)) {
        return inputResolution;
    }
    return Math.floor(inputResolution / outputStride) * outputStride + 1;
}
exports.toValidInputResolution = toValidInputResolution;
function isValidInputResolution(resolution, outputStride) {
    return (resolution - 1) % outputStride === 0;
}
//# sourceMappingURL=load_utils.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1626919991105);
})()
//miniprogram-npm-outsideDeps=["@mediapipe/pose","@tensorflow/tfjs-converter","@tensorflow/tfjs-core"]
//# sourceMappingURL=index.js.map