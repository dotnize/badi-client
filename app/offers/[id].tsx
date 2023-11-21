// Dynamic route!
// e.g. /offers/1, /offers/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

/**
 * Pwede ni gamiton for both Sent and Received pending offers.
 * Sabotan ra nya natong logic para unsaon pagkita if sent or received.
 *
 * For now, paghimo lang sa gurog fake data or variables? nya ternary operator
 */

export default function PendingOffer() {
  const { id } = useLocalSearchParams();
  // If naa natay backend, pwede nato gamiton ang id ig fetch.

  return (
    <View>
      <Text>PendingOffer, id: {id}</Text>
    </View>
  );
}
