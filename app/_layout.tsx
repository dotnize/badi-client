import { Stack } from "expo-router";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";

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
  return (
    <PaperProvider theme={theme}>
      {/* {!user && <Redirect href="/welcome" />} */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(stack)" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
