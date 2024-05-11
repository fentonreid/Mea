import { COLOURS } from "@/constants/Colours";
import SettingsContextProvider, { SettingsContext } from "@/store/SettingsContext";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import * as Notifications from "expo-notifications";
import "@/src/i18n/config.ts";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    Poppins_Bold: require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    Poppins_SemiBold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),

    Vollkorn: require("../assets/fonts/Vollkorn/Vollkorn-Medium.ttf"),
    Vollkorn_Bold: require("../assets/fonts/Vollkorn/Vollkorn-Bold.ttf"),
    Vollkorn_ExtraBold: require("../assets/fonts/Vollkorn/Vollkorn-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const InnerRootLayoutNav = () => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  // Custom styling override light and dark defaults for select properties: https://reactnavigation.org/docs/themes/
  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: colours["background"],
      card: colours["background"],
      text: colours["mainHeading"],
      // border: string,
      // notification: string
    },
  };

  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colours["background"],
      card: colours["background"],
      text: colours["mainHeading"],
      // border: string,
      // notification: string
    },
  };

  return (
    <ThemeProvider value={colourTheme === "dark" ? MyDarkTheme : MyLightTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
};

const RootLayoutNav = () => {
  return (
    <SettingsContextProvider>
      <InnerRootLayoutNav />
    </SettingsContextProvider>
  );
};
