// Dynamic route!
// e.g. /messages/1, /messages/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Convo() {
  const { id } = useLocalSearchParams();
  // If naa natay backend, pwede nato gamiton ang id ig fetch.

  return (
    <View>
      <Text>Convo, id: {id}</Text>
    </View>
  );
}
