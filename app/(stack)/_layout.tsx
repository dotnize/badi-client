import { Slot, useRouter } from "expo-router";
import { View } from "react-native";
import { Appbar } from "react-native-paper";

export default function StackLayout() {
  const router = useRouter();
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => (router.canGoBack() ? router.back() : router.push("/"))}
        />
      </Appbar.Header>

      <Slot />
    </View>
  );
}
