import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  Appbar,
  MD3LightTheme,
  MD3Theme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";

import { SessionContext } from "~/context/SessionContext";
import { COLORS } from "~/lib/theme";
import { User } from "~/lib/types";

// Defining routes: <<--- START HERE!
// https://docs.expo.dev/routing/create-pages/

// Linking/navigating:
// https://docs.expo.dev/routing/navigating-pages/

// Layouts:
// https://docs.expo.dev/routing/layouts/

const theme: MD3Theme = {
  ...MD3LightTheme,
  colors: COLORS,
};

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
  materialLight: theme,
});

// temporarily disabled due to HMR issues
// export const unstable_settings = {
//   initialRouteName: "(tabs)",
// };

//const user = undefined; // TEMPORARY

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const { height, width } = useWindowDimensions();

  const isLandscape = width > height * 1.2;

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      <PaperProvider theme={theme}>
        {/* {!user && <Redirect href="/welcome" />} */}
        <ThemeProvider value={LightTheme}>
          <Stack
            screenOptions={{
              contentStyle: {
                maxWidth: isLandscape ? 640 : "auto",
                width: "100%",
                alignSelf: "center",
              },
              header: ({ options }) => (
                // TODO: just use a reusable appbar component to be imported by all stack components
                <Appbar.Header>
                  <Appbar.BackAction
                    onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
                  />
                  <Appbar.Content title={options.title} />
                </Appbar.Header>
              ),
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                contentStyle: { maxWidth: "auto" },
              }}
            />
            <Stack.Screen
              name="welcome"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </ThemeProvider>
      </PaperProvider>
    </SessionContext.Provider>
  );
}
