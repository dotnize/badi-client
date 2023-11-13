import { Stack } from "expo-router";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";

import { COLORS } from "~/lib/theme";

// Temporary ra ang style props diri,
// mobalhin guro tas StyleSheet kay basin mas limpyo
// https://reactnative.dev/docs/stylesheet

// Defining routes: <<--- START HERE!
// https://docs.expo.dev/routing/create-pages/

// Linking/navigating:
// https://docs.expo.dev/routing/navigating-pages/

// Layouts:
// https://docs.expo.dev/routing/layouts/

// ^ All OPTIONAL to read, iexplain ra nako tanan ig meet

const theme = {
  ...DefaultTheme,
  colors: COLORS,
};

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
