// Dynamic route!
// e.g. /listings/1, /listings/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function ListingDetails() {
  const { id } = useLocalSearchParams();
  // If naa natay backend, pwede nato gamiton ang id ig fetch.

  return (
    <View>
      <Text>ListingDetails, id: {id}</Text>
    </View>
  );
}
