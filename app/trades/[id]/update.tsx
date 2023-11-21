// Nested in a dynamic route!
// e.g. /trades/1/update, /trades/8/update, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function PostTradeProgress() {
  const { id } = useLocalSearchParams();
  // If naa natay backend, pwede nato gamiton ang id ig fetch.

  return (
    <View>
      <Text>PostTradeProgress for trade id: {id}</Text>
    </View>
  );
}
