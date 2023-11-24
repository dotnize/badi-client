// Index page of a dynamic route!
// e.g. /user/1, /user/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function OtherUserProfile() {
  const { id } = useLocalSearchParams();
  // If naa natay backend, pwede nato gamiton ang id ig fetch.

  return (
    <View>
      <Text>OtherUserProfile, id: {id}</Text>
    </View>
  );
}

// Each card diri kay linked ra guro to "listings" route, pero unya nana nato problemahon.
