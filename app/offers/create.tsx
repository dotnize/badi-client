// URL: /offers/create

import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";

// Magamit man guro ni for both New Offer and Edit Counter Offer?
function OfferCard() {
  const [remaning, setRemaining] = useState(0);
  return (
    <Card elevation={2} style={{ margin: 8 }}>
      <Card.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Avatar.Image size={72} source={require("~/assets/adaptive-icon.png")} />
          <View style={{ gap: 5 }}>
            <Text variant="titleSmall">Kanding</Text>
            <Text variant="labelSmall">from nize</Text>
          </View>
        </View>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <IconButton icon="minus" />
          <Text variant="titleLarge">{remaning}</Text>
          <IconButton icon="plus" />
        </View>
      </Card.Content>
    </Card>
  );
}
export default function CreateOffer() {
  return (
    <View style={{ flex: 1, alignItems: "center", padding: 8, justifyContent: "space-around" }}>
      <Text variant="titleMedium">!usernames! Offer</Text>
      <Text style={{ alignSelf: "flex-start", padding: 8 }}>You receive</Text>

      <ScrollView style={{ width: "100%", padding: 8, gap: 8, flex: 1 }}>
        <OfferCard />
        <OfferCard />
        <OfferCard />
        <OfferCard />
      </ScrollView>
      <Button style={{ alignSelf: "flex-end", padding: 8 }}>Add more</Button>
      <Text style={{ alignSelf: "flex-start", padding: 8 }}>You will send</Text>
      <ScrollView style={{ width: "100%", padding: 8, gap: 8, flex: 1 }}>
        <OfferCard />
        <OfferCard />
        <OfferCard />
        <OfferCard />
      </ScrollView>
      <Button style={{ alignSelf: "flex-end", padding: 8 }}>Add more</Button>

      <View style={{ width: "100%", gap: 8, padding: 8 }}>
        <Button mode="contained">Offer Trade</Button>
      </View>
    </View>
  );
}

// katong "+ Add more" nga button para select sa items, pwede ra guro modal?
