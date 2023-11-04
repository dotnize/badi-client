import { Link, Slot } from "expo-router";
import { Text, View } from "react-native";
import { Button, PaperProvider } from "react-native-paper";

// Temporary ra ang style props diri,
// mobalhin guro tas StyleSheet kay basin mas limpyo
// https://reactnative.dev/docs/stylesheet

// Defining routes:
// https://docs.expo.dev/routing/create-pages/

// Linking/navigating:
// https://docs.expo.dev/routing/navigating-pages/

// Layouts:
// https://docs.expo.dev/routing/layouts/

// ^ All OPTIONAL to read, iexplain ra nako tanan ig meet

export default function RootLayout() {
  return (
    <PaperProvider>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 64 }}>
          Root layout! _layout.tsx file in the app folder root.
        </Text>

        <View style={{ borderWidth: 4, borderColor: "black", padding: 4 }}>
          {/* Slot is like {children}, but renders the current page file/component */}
          <Slot />{" "}
        </View>

        <Text style={{ marginTop: 64 }}>
          Router links area, temporary rani kay mogamit tag proper Tab navigation unya
        </Text>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Link asChild href="/">
            <Button mode="contained">Browse (index)</Button>
          </Link>

          <Link asChild href="/messages">
            <Button mode="elevated">Messages</Button>
          </Link>
          <Link asChild href="/activity">
            <Button mode="contained-tonal">Activity</Button>
          </Link>
        </View>
      </View>
    </PaperProvider>
  );
}
