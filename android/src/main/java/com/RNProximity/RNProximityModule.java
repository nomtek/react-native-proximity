
package com.RNProximity;
import android.os.PowerManager;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import static android.content.Context.POWER_SERVICE;

public class RNProximityModule extends ReactContextBaseJavaModule {

  private static final String TAG = "RNProximityModule";
  private final ReactApplicationContext reactContext;

  private final PowerManager.WakeLock wakeLock;

  public RNProximityModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    PowerManager powerManager = (PowerManager) reactContext.getSystemService(POWER_SERVICE);
    wakeLock = powerManager.newWakeLock(PowerManager.PROXIMITY_SCREEN_OFF_WAKE_LOCK, TAG + ":wakelocktag");
  }

  public void sendEvent(String eventName, @Nullable WritableMap params) {
    if (this.reactContext.hasActiveCatalystInstance()) {
      this.reactContext
              .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
              .emit(eventName, params);
    } else {
      Log.i(TAG, "Waiting for CatalystInstance");
    }
  }

  @ReactMethod
  public void addListener() {
    if(!wakeLock.isHeld()) {
      wakeLock.acquire(10*60*1000L /*10 minutes*/);
    }
  }

  @ReactMethod
  public void removeListener() {
    if(wakeLock.isHeld()) {
      wakeLock.release();
    }
  }

  @Override
  public String getName() {
    return "RNProximity";
  }
}
