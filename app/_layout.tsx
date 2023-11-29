import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import {
  Appbar,
  MD3LightTheme,
  MD3Theme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";

import { COLORS } from "~/lib/theme";

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
  const router = useRouter();

  return (
    <PaperProvider theme={theme}>
      {/* {!user && <Redirect href="/welcome" />} */}
      <ThemeProvider value={LightTheme}>
        <Stack
          screenOptions={{
            contentStyle: {
              maxWidth: 640,
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
              contentStyle: {
                maxWidth: 640,
                width: "100%",
                alignSelf: "center",
              },
            }}
          />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
