import { Slot, useRouter } from "expo-router";
import { View } from "react-native";
import { Appbar } from "react-native-paper";

export default function StackLayout() {
  const router = useRouter();
  return (
    <View>
      {router.canGoBack() && (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => router.back()} />
        </Appbar.Header>
      )}

      <Slot />
    </View>
  );
}
