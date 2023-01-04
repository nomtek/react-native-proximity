"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeListener = exports.addListener = void 0;
const react_native_1 = require("react-native");
const nativeModule = react_native_1.NativeModules.RNProximity;
let addListener = null;
exports.addListener = addListener;
let removeListener = null;
exports.removeListener = removeListener;
if (react_native_1.Platform.OS === "ios") {
    (exports.addListener = addListener = function () {
        react_native_1.NativeModules.RNProximity.proximityEnabled(true);
    }),
        (exports.removeListener = removeListener = function () {
            react_native_1.NativeModules.RNProximity.proximityEnabled(false);
        });
}
else if (react_native_1.Platform.OS == "android") {
    exports.addListener = addListener = () => {
        nativeModule.addListener();
    };
    exports.removeListener = removeListener = () => {
        nativeModule.removeListener();
    };
}
