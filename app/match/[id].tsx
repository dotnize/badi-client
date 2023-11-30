import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Paragraph, Text, Title } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import { COLORS } from "~/lib/theme";

export default function MatchFound() {
  const { id } = useLocalSearchParams();

  return (
    <TabsProvider>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Suggested Matches</Text>
        </View>
        <Tabs>
          <TabScreen label="To send">
            <ScrollView
              style={{ flex: 1, padding: 8 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
              <CardComponent
                title="Listing #1"
                username="jameel123"
                content="Very good kanding, used only once. Shiny and lightweight kanding.
                        Very good kanding, used only once. Shiny and lightweight kanding."
                imageSource={require("assets/Kambing.png")} // Replace with actual image source
              />
              <CardComponent
                title="Card 2"
                username="User 2"
                content="Content for Card 2"
                imageSource={require("assets/Kambing.png")} // Replace with actual image source
              />
              <CardComponent
                title="Card 1"
                username="User 1"
                content="Content for Card 1"
                imageSource={require("assets/Kambing.png")} // Replace with actual image source
              />
              <CardComponent
                title="Card 2"
                username="User 2"
                content="Content for Card 2"
                imageSource={require("assets/Kambing.png")} // Replace with actual image source
              />
              <CardComponent
                title="Card 1"
                username="User 1"
                content="Content for Card 1"
                imageSource={require("assets/Kambing.png")} // Replace with actual image source
              />
              <CardComponent
                title="Card 2"
                username="User 2"
                content="Content for Card 2"
                imageSource={require("assets/Kambing.png")} // Replace with actual image source
              />
              {/* Add more CardComponents for suggested matches in Tab 1 */}
            </ScrollView>
          </TabScreen>
          <TabScreen label="To receive">
            <ScrollView
              style={{ flex: 1, padding: 8 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
              <CardComponent
                title="Listing #1"
                username="jameel123"
                content="Very good kanding, used only once. Shiny and lightweight kanding.
                        Very good kanding, used only once. Shiny and lightweight kanding."
                imageSource={require("assets/Kambing.png")} // Replace with actual image source
              />
              {/* Add more CardComponents for suggested matches in Tab 2 */}
            </ScrollView>
          </TabScreen>
        </Tabs>
      </View>
    </TabsProvider>
  );
}

// Create a separate CardComponent for reusability
const CardComponent = ({ title, username, content, imageSource }) => (
  <Card style={styles.card}>
    <Card.Cover source={imageSource} style={styles.cardImage} />
    <Card.Content style={styles.cardContent}>
      <Title style={styles.cardTitle}>{title}</Title>
      <Text numberOfLines={1} style={{ color: "grey" }}>
        {username} &#9733;&#9733;&#9733;&#9733; 4.7 (51)
      </Text>
      <Paragraph numberOfLines={3}>{content}</Paragraph>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: COLORS.surface,
    paddingBottom: 16,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold", // Apply bold style
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  card: {
    flexBasis: "48%",
    marginVertical: 8,
    height: 280, // Set a fixed height for the card
  },
  cardImage: {
    resizeMode: "cover",
    height: "50%", // Adjust the height of the card image within the fixed height
  },
  cardContent: {
    marginTop: 8,
  },
});
