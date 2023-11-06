import { Stack } from "expo-router";
import { Appearance } from "react-native";
import { PaperProvider } from "react-native-paper";

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

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Force light theme
Appearance.setColorScheme("light");

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
