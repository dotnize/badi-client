import { Redirect } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function index() {
  return (
    <View>
        <Redirect href="welcome/login" />
      <Text>intro page</Text>
    </View>
  );
}
