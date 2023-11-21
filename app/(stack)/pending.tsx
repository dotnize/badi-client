import { useState } from "react";
import { View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
function YourOffer() {
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
        <View style={{ alignItems: "center", flexDirection: "row", marginRight: 18 }}>
          {/* <IconButton icon="minus" /> */}
          <Text variant="titleLarge">{remaning}</Text>
          {/* <IconButton icon="plus" /> */}
        </View>
      </Card.Content>
    </Card>
  );
}
export default function Pending() {
  return (
    <View style={{ flex: 1, alignItems: "center", padding: 8, justifyContent: "space-around" }}>
      <Text variant="titleMedium">!usernames! Offer</Text>
      <View style={{ width: "100%", padding: 8, gap: 8, flex: 1 }}>
        <Text>You receive</Text>
        <YourOffer />
      </View>
      <View style={{ width: "100%", padding: 8, gap: 8, flex: 1 }}>
        <Text>You will send</Text>
        <YourOffer />
      </View>
      <View style={{ width: "100%", gap: 8 }}>
        <Button mode="contained">Edit Counter Offer</Button>
        <Button mode="contained">Accept</Button>
        <Button mode="contained">Reject</Button>
      </View>
    </View>
  );
}
