import { View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { emptyImageUrl } from "~/lib/firebase";
import { Inventory } from "~/lib/types";

export default function PendingOfferItem({
  item,
  quantity,
}: {
  item: Inventory | undefined;
  quantity: number;
}) {
  return (
    <Card elevation={2} style={{ margin: 8 }}>
      <Card.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <Avatar.Image size={72} source={{ uri: item?.imageUrls[0] || emptyImageUrl }} />
          <Text variant="titleSmall">{item?.name}</Text>
        </View>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Text variant="titleLarge">{quantity}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

//  <View style={{ gap: 5 }}>
//    <Text variant="titleSmall">{item?.name}</Text>
//    <Text variant="labelSmall">from nize</Text>
//  </View>;
