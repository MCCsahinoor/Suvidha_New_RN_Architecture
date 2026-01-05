import { useEffect, useState } from "react";
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { LOCAL_STORAGE_SET } from "../helper/LocalStorageHelper";
import { LOCAL_STORAGE_KEY } from "./localStorageKeys";


export const DeviceInformation = () => {
    Promise.all([
        // DEVICE ID (UUID)
        DeviceInfo.getUniqueId(),
        // DEVICE NAME
        DeviceInfo.getDeviceName(),
        // Device Manufacturer.
        DeviceInfo.getManufacturer()
    ])
        .then((res) => {
            // // DEVICE MODEL
            const model = DeviceInfo.getModel();
            // // Platform
            const platformOS = Platform.OS;
            // // Platform Version
            const platformVersion = Platform.Version;
            // // Brand
            const brand = DeviceInfo.getBrand();
            // // Build Number
            const buildNumber = DeviceInfo.getBuildNumber();
            // // Version Number
            const version = DeviceInfo.getVersion();


            const DevicesData = {
                version: version,
                buildNumber: buildNumber,
                brand: brand,
                platformVersion: platformVersion,
                platformOS: platformOS,
                model: model,
                uuid: res[0],
                deviceName: res[1],
                manufacturer: res[2]
            };
            // console.log(DevicesData) 
            LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.DEVICEINFO, DevicesData)
        })
}
