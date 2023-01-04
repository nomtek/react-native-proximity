import { NativeModules, Platform } from "react-native";

const nativeModule = NativeModules.RNProximity;

let addListener = null;
let removeListener = null;

if (Platform.OS === "ios") {
  (addListener = function () {
    NativeModules.RNProximity.proximityEnabled(true);
  }),
    (removeListener = function () {
      NativeModules.RNProximity.proximityEnabled(false);
    });
} else if (Platform.OS == "android") {
  addListener = () => {
    nativeModule.addListener();
  };
  removeListener = () => {
    nativeModule.removeListener();
  };
}

export { addListener, removeListener };
