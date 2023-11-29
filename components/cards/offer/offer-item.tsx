import { useState } from "react";
import { View } from "react-native";
import { Avatar, Card, IconButton, Text } from "react-native-paper";

export default function PendingOfferItem() {
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
