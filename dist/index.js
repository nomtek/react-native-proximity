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
    (exports.addListener = addListener = function (callback) {
        react_native_1.NativeModules.RNProximity.proximityEnabled(true);
        return react_native_1.DeviceEventEmitter.addListener("proximityStateDidChange", callback);
    }),
        (exports.removeListener = removeListener = function (listener) {
            react_native_1.NativeModules.RNProximity.proximityEnabled(false);
            react_native_1.DeviceEventEmitter.removeAllListeners("proximityStateDidChange", listener);
        });
}
else if (react_native_1.Platform.OS == "android") {
    exports.addListener = addListener = (callback) => {
        nativeModule.addListener();
        react_native_1.DeviceEventEmitter.addListener(nativeModule.EVENT_ON_SENSOR_CHANGE, (e) => callback(e));
    };
    exports.removeListener = removeListener = (listener) => {
        nativeModule.removeListener();
        react_native_1.DeviceEventEmitter.removeAllListeners(nativeModule.EVENT_ON_SENSOR_CHANGE, listener);
    };
}
