import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { COLORS } from "~/lib/theme";
import { Rating } from "~/lib/types";
const defaultPic = require("~/assets/liden.png");

export default function RatingItem({ rating }: { rating: Rating }) {
  const { amount, description, fromUser, timestamp } = rating;

  return (
    <Card style={{ height: "auto", margin: 8, paddingVertical: 10 }}>
      <Card.Content>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <Image style={styles.userPhoto} source={defaultPic} />
          <View style={{ flex: 1 }}>
            <Text variant="titleMedium">{fromUser?.firstName}</Text>
            <Text variant="titleSmall">{timestamp.toString()}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {Array.from({ length: Math.min(5, amount) }, (_, index) => (
              <Text key={index} variant="titleLarge" style={{ color: COLORS.primary }}>
                &#9733;
              </Text>
            ))}
          </View>
        </View>
        <Text>{description}</Text>
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
