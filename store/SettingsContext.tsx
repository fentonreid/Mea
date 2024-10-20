import { createContext, useEffect, useState } from "react";
import { SettingsContextModel } from "@/models/SettingsContext";
import { ThemeOptions } from "@/models/ThemeOptions";
import * as Notifications from "expo-notifications";
import { MMKVStorageKeys } from "@/models/MMKVStorageKeys";
import { COLOURS } from "@/constants/Colours";
import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const SettingsContext = createContext<SettingsContextModel>({
  notificationEnabled: true,
  vibrationsEnabled: true,
  colourTheme: "light",
  getStartedEnabled: true,
  colours: {
    background: "",
    darkerBackground: "",
    text: "",
    primary: "",
    secondary: "",
    accent: "",
    primaryButton: "",
    accentButton: "",
    buttonText: "",
    mainHeading: "",
    light: "",
    tabSelected: "",
    tabUnselected: "",
    darkPrimary: "",
    darkAccent: "",
    lightPrimary: "",
  },

  toggleNotifications: (_) => {},
  toggleVibrations: (_) => {},
  toggleColourTheme: (_) => {},
  toggleGetStartedEnabled: (_) => {},

  resetUserPreferences: () => {},
});

const SettingsContextProvider = ({ children }: any) => {
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(true);
  const [vibrationsEnabled, setVibrationsEnabled] = useState<boolean>(true);
  const [lightThemeEnabled, setLightThemeEnabled] =
    useState<ThemeOptions>("light");
  const [getStartedEnabled, setGetStartedEnabled] = useState<boolean>(true);

  const colours = COLOURS[lightThemeEnabled];

  // Fetch initial values from Async Storage, keep defaults if not present
  useEffect(() => {
    try {
      // Set Get Started
      setGetStartedEnabled(
        storage.contains(MMKVStorageKeys.GETSTARTED)
          ? storage.getBoolean(MMKVStorageKeys.GETSTARTED)!
          : true
      );

      // Set Notifications
      setNotificationsEnabled(
        storage.contains(MMKVStorageKeys.NOTIFICATIONS)
          ? storage.getBoolean(MMKVStorageKeys.NOTIFICATIONS)!
          : true
      );

      // Set Vibrations
      setVibrationsEnabled(
        storage.contains(MMKVStorageKeys.VIBRATIONS)
          ? storage.getBoolean(MMKVStorageKeys.VIBRATIONS)!
          : true
      );

      // Set Light Theme
      const storedLightTheme = storage.contains(MMKVStorageKeys.COLOURTHEME)
        ? storage.getString(MMKVStorageKeys.COLOURTHEME)
        : "light";
      if (storedLightTheme && (storedLightTheme as ThemeOptions) !== null)
        setLightThemeEnabled(storedLightTheme as ThemeOptions);
    } catch (error) {
      console.log("Error getting initial values from MMKV: " + error);
    }
  }, []);

  const toggleNotifications = async (newState: boolean) => {
    // Cancel all pending notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    storage.set(MMKVStorageKeys.NOTIFICATIONS, newState);

    setNotificationsEnabled(newState);
  };

  const toggleVibrations = (newState: boolean) => {
    storage.set(MMKVStorageKeys.VIBRATIONS, newState);
    setVibrationsEnabled(newState);
  };

  const toggleColourTheme = (newState: ThemeOptions) => {
    storage.set(MMKVStorageKeys.COLOURTHEME, newState);
    setLightThemeEnabled(newState);
  };

  const toggledGetStartedEnabled = (newState: boolean) => {
    storage.set(MMKVStorageKeys.GETSTARTED, newState);
    setGetStartedEnabled(newState);
  };

  const resetUserPreferences = async () => {
    // Delete all keys
    storage.clearAll();

    setGetStartedEnabled(true);
    setNotificationsEnabled(true);
    setVibrationsEnabled(true);
    setLightThemeEnabled("light");
  };

  const values: SettingsContextModel = {
    notificationEnabled: notificationsEnabled,
    vibrationsEnabled: vibrationsEnabled,
    colourTheme: lightThemeEnabled,
    getStartedEnabled: getStartedEnabled,
    colours: colours,

    toggleNotifications: toggleNotifications,
    toggleVibrations: toggleVibrations,
    toggleColourTheme: toggleColourTheme,
    toggleGetStartedEnabled: toggledGetStartedEnabled,

    resetUserPreferences: resetUserPreferences,
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
