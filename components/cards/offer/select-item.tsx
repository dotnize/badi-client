import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

export default function ItemsCard() {
  const [remaining, setRemaining] = useState(0);
  const [selected, setSelected] = useState(false);

  const toggleSelected = () => {
    setSelected((prevSelected) => !prevSelected);
  };
  return (
    <TouchableOpacity onPress={toggleSelected}>
      <Card
        elevation={2}
        style={{
          margin: 8,
          backgroundColor: selected ? "lightblue" : "white", // Change the background color based on the selected state
        }}
      >
        <Card.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Avatar.Image size={72} source={require("~/assets/adaptive-icon.png")} />
            <View style={{ gap: 5 }}>
              <Text variant="titleSmall">Kanding</Text>
              <Text variant="labelSmall">In stock: {remaining} </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}
