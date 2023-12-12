import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { defaultAvatarUrl } from "~/lib/firebase";
import { COLORS } from "~/lib/theme";
import { Rating } from "~/lib/types";

export default function RatingCard({ item }: { item: Rating }) {
  const dateFromString = new Date(item.timestamp);
  return (
    <Card style={{ height: "auto", paddingVertical: 10 }}>
      <Card.Content>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <Image
            style={styles.userPhoto}
            source={{ uri: item.fromUser?.avatarUrl || defaultAvatarUrl }}
          />
          <View style={{ flex: 1 }}>
            <Text variant="titleMedium">
              {item.fromUser?.firstName} {item.fromUser?.lastName}
            </Text>
            <Text variant="titleSmall">{dateFromString.toDateString()}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {Array.from({ length: Math.min(item.amount, 5) }, (_, index) => (
              <Text key={index} variant="titleLarge" style={{ color: COLORS.primary }}>
                &#9733;
              </Text>
            ))}
          </View>
        </View>
        <Text>{item.description}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  userPhoto: {
    resizeMode: "cover",
    borderRadius: 100,
    height: 40,
    width: 40,
  },
});
