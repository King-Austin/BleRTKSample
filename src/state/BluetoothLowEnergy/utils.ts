import { PermissionsAndroid, Platform } from "react-native";

import * as ExpoDevice from "expo-device";

const requestAndroid31Permissions = async () => {
  const permissions = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  ]);

  return (
    permissions["android.permission.BLUETOOTH_SCAN"] === "granted" &&
    permissions["android.permission.BLUETOOTH_CONNECT"] === "granted" &&
    permissions["android.permission.ACCESS_FINE_LOCATION"] === "granted"
  );
};

export const requestPermissions = async () => {
  if (Platform.OS === "android") {
    if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Bluetooth Low Energy requires Location",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const isAndroid31PermissionsGranted = await requestAndroid31Permissions();

      return isAndroid31PermissionsGranted;
    }
  } else {
    return true;
  }
};
