// Dynamic route!
// e.g. /offers/1, /offers/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text } from "react-native-paper";
import OfferItem from "~/components/cards/offer/offer-item";

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
    <View style={{ flex: 1, alignItems: "center", padding: 8, justifyContent: "space-around" }}>
      <Text>PendingOffer, id: {id}</Text>
      <Text variant="titleMedium">!usernames! Offer</Text>
      <Text style={{ alignSelf: "flex-start", padding: 8 }}>You receive</Text>

      <ScrollView style={{ width: "100%", padding: 8, gap: 8, flex: 1 }}>
        <OfferItem />
        <OfferItem />
        <OfferItem />
        <OfferItem />
      </ScrollView>
      <Text style={{ alignSelf: "flex-start", padding: 8 }}>You will send</Text>
      <ScrollView style={{ width: "100%", padding: 8, gap: 8, flex: 1 }}>
        <OfferItem />
        <OfferItem />
        <OfferItem />
        <OfferItem />
      </ScrollView>
      <View style={{ width: "100%", gap: 8, padding: 8 }}>
        <Button mode="contained">Edit Counter Offer</Button>
        <Button mode="contained">Accept</Button>
        <Button mode="contained">Reject</Button>
      </View>
    </View>
  );
}
