import SettingsContextProvider, {
  SettingsContext,
} from "@/store/SettingsContext";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import LoadFontProvider from "@/providers/LoadFontsProviders";
import { PowerSyncProvider } from "@/powersync/PowerSyncProvider";
import { useContext, useEffect, useState } from "react";
import { useSystem } from "@/powersync/PowerSync";
import { Session } from "@supabase/supabase-js";
import { Stack, useRouter } from "expo-router";
import FontStyles from "@/constants/FontStyles";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Keep the splashscreen showing until disabled after fonts are loaded
SplashScreen.preventAutoHideAsync();

// Setup notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const { supabaseConnector } = useSystem();
const system = useSystem();
const router = useRouter();

const [session, setSession] = useState<Session | null>(null);
const [initialised, setInitialised] = useState<boolean>(false);
const { getStartedEnabled, colours, colourTheme } = useContext(SettingsContext);

useEffect(() => {
  system.init();
}, []);

useEffect(() => {
  // Listen for changes to authentication state
  const { data } = supabaseConnector.client.auth.onAuthStateChange(
    async (event, session) => {
      console.log("supabase.auth.onAuthStateChange", event, session);
      setSession(session);
      setInitialised(true);
    }
  );
  return () => {
    data.subscription.unsubscribe();
  };
}, []);

useEffect(() => {
  if (!initialised) return;

  if (getStartedEnabled) router.replace("/(getstarted)/1_welcome");

  // Check if they are logged in
  if (session) {
    // Redirect authenticated users to the list page
    router.replace("/(tabs)/mealroutine");
  } else if (!session) {
    // Redirect unauthenticated users to the login page
    router.replace("/");
  }
}, [session, initialised]);

const RootProvider = () => {
  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: colours["background"],
      card: colours["background"],
      text: colours["mainHeading"],
    },
  };

  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colours["background"],
      card: colours["background"],
      text: colours["mainHeading"],
    },
  };

  return (
    <>
      <SettingsContextProvider>
        <LoadFontProvider>
          <PowerSyncProvider>
            <>
              <ThemeProvider
                value={colourTheme === "dark" ? MyDarkTheme : MyLightTheme}
              >
                <StatusBar style={colourTheme === "dark" ? "light" : "dark"} />
                <GestureHandlerRootView>
                  <Stack
                    screenOptions={{
                      headerTitleStyle: {
                        ...FontStyles.mainHeading,
                        color: colours["mainHeading"],
                      },
                      headerTitleAlign: "center",
                      headerShadowVisible: false,
                    }}
                  >
                    <Stack.Screen
                      name="index"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(getstarted)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                  </Stack>
                </GestureHandlerRootView>
              </ThemeProvider>
            </>
          </PowerSyncProvider>
        </LoadFontProvider>
      </SettingsContextProvider>
    </>
  );
};

export default RootProvider;
