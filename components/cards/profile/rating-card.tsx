import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
<<<<<<< HEAD:components/cards/rating/rating-item.tsx
import { COLORS } from "~/lib/theme";
import { Rating } from "~/lib/types";
const defaultPic = require("~/assets/liden.png");

export default function RatingItem({ rating }: { rating: Rating }) {
  const { amount, description, fromUser, timestamp } = rating;

=======

import { defaultAvatarUrl } from "~/lib/firebase";
import { COLORS } from "~/lib/theme";
import { Rating } from "~/lib/types";

export default function RatingCard({ item }: { item: Rating }) {
>>>>>>> main:components/cards/profile/rating-card.tsx
  return (
    <Card style={{ height: "auto", paddingVertical: 10 }}>
      <Card.Content>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <Image
            style={styles.userPhoto}
            source={{ uri: item.fromUser?.avatarUrl || defaultAvatarUrl }}
          />
          <View style={{ flex: 1 }}>
<<<<<<< HEAD:components/cards/rating/rating-item.tsx
            <Text variant="titleMedium">{fromUser?.firstName}</Text>
            <Text variant="titleSmall">{timestamp.toString()}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {Array.from({ length: Math.min(5, amount) }, (_, index) => (
=======
            <Text variant="titleMedium">
              {item.fromUser?.firstName} {item.fromUser?.lastName}
            </Text>
            <Text variant="titleSmall">{item.timestamp.toDateString()}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {Array.from({ length: item.amount }, (_, index) => (
>>>>>>> main:components/cards/profile/rating-card.tsx
              <Text key={index} variant="titleLarge" style={{ color: COLORS.primary }}>
                &#9733;
              </Text>
            ))}
          </View>
        </View>
<<<<<<< HEAD:components/cards/rating/rating-item.tsx
        <Text>{description}</Text>
=======
        <Text>{item.description}</Text>
>>>>>>> main:components/cards/profile/rating-card.tsx
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
