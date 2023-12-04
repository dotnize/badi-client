import { TouchableOpacity, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

import { emptyImageUrl } from "~/lib/firebase";

export default function ItemsCard({
  name,
  imageUrl,
  onPress,
}: {
  name: string;
  imageUrl?: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        elevation={2}
        style={{
          margin: 8,
          backgroundColor: "white",
        }}
      >
        <Card.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Avatar.Image size={72} source={{ uri: imageUrl || emptyImageUrl }} />
            <View style={{ gap: 5 }}>
              <Text variant="titleSmall">{name}</Text>
              {/* <Text variant="labelSmall">In stock: {remaining} </Text> */}
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}
