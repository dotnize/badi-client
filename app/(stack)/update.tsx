import { useState } from "react";
import { Image, View } from "react-native";
import { List, Text } from "react-native-paper";

const ItemList = () => {
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section>
      <List.Accordion
        title="sample title"
        expanded={expanded}
        onPress={handlePress}
        style={{ height: 50 }}
      >
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
  );
};

export default function Update() {
  return (
    <View style={{ flex: 1, alignItems: "center", padding: 8, gap: 8, height: "100%" }}>
      <Text variant="titleMedium">Update Progress</Text>

      <View style={{ width: "100%", gap: 8, marginTop: 12 }}>
        <Text>Select item from trade</Text>
        <View style={{ borderWidth: 1, borderColor: "black", borderRadius: 14 }}>
          <ItemList />
        </View>
      </View>

      <View style={{ width: "100%" }}>
        <Text>Photos</Text>
        <Image
          source={require("~/assets/adaptive-icon.png")}
          style={{ width: 256, height: 256, alignSelf: "center" }}
        />
      </View>
      <View style={{ width: "100%" }}>
        <Text>Details (optional)</Text>
      </View>
    </View>
  );
}
