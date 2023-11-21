import { Stack, useRouter } from "expo-router";
import { Appbar, MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";

import { COLORS } from "~/lib/theme";

// Defining routes: <<--- START HERE!
// https://docs.expo.dev/routing/create-pages/

// Linking/navigating:
// https://docs.expo.dev/routing/navigating-pages/

// Layouts:
// https://docs.expo.dev/routing/layouts/

const theme = {
  ...DefaultTheme,
  colors: COLORS,
};

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
      <Stack
        screenOptions={{
          header: () => (
            <Appbar.Header>
              <Appbar.BackAction
                onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
              />
            </Appbar.Header>
          ),
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
