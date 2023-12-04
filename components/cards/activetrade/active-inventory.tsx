import { View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

interface ActiveUserItemProps {
  itemName: string;
  remaining: string;
  receiver: string;
  imageUrls: string;
}

export default function ActiveUserItem({
  imageUrls,
  itemName,
  remaining,
  receiver,
}: ActiveUserItemProps) {
  return (
    <Card elevation={2} style={{ margin: 8 }}>
      <Card.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Avatar.Image size={72} source={{ uri: imageUrls }} />
          <View style={{ gap: 5 }}>
            <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
              {itemName}
            </Text>
            <Text variant="labelSmall">{receiver}</Text>
          </View>
        </View>
        <View style={{ alignItems: "center", marginRight: 7, justifyContent: "center" }}>
          <Text variant="titleSmall">Remaining: </Text>
          <Text style={{ alignSelf: "flex-end", marginRight: 7 }} variant="titleLarge">
            {remaining}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}
