import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { COLORS } from "~/lib/theme";
const defaultPic = require("~/assets/liden.png");

export default function RatingItem({ total }: { total: number }) {
  return (
    <Card style={{ height: "auto", margin: 8, paddingVertical: 10 }}>
      <Card.Content>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <Image style={styles.userPhoto} source={defaultPic} />
          <View style={{ flex: 1 }}>
            <Text variant="titleMedium">Liden U. Hoe</Text>
            <Text variant="titleSmall">11/20/25</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {Array.from({ length: total }, (_, index) => (
              <Text key={index} variant="titleLarge" style={{ color: COLORS.primary }}>
                &#9733;
              </Text>
            ))}
          </View>
        </View>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Text>
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
