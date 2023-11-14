import { View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";

export default function activity() {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flex: 1, alignItems: "center", padding: 8 }}>
          <Text variant="titleLarge">Trade Activities</Text>
        </View>
        <IconButton size={20} icon="bell" />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 8,
          borderColor: "red",
          borderWidth: 1,
        }}
      >
        <Text>Active</Text>
        <Text>Pending</Text>
      </View>

      <View style={{ gap: 8, padding: 8, flex: 1 }}>
        <Card style={{ height: 200 }}>
          <Card.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
          </Card.Content>
        </Card>
        <Card style={{ height: 200 }}>
          <Card.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}
