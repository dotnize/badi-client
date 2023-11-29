import { useState } from "react";
import { View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

export default function ActiveUserItem() {
  const [remaning, setRemaining] = useState(10000);
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
        <View style={{ alignItems: "center", marginRight: 7, justifyContent: "center" }}>
          <Text variant="titleSmall">Remaining: </Text>
          <Text style={{ alignSelf: "flex-end", marginRight: 7 }} variant="titleLarge">
            {remaning}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}
