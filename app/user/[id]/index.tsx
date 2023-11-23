import React, { useState } from "react";
import { AntDesign} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Add this import
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Card, DefaultTheme, IconButton, PaperProvider, Text } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

import { COLORS } from "~/lib/theme";
const theme = {
  ...DefaultTheme,
  colors: COLORS,
};

export default function OtherUserProfile() {
  const [profilePic, setProfilePic] = useState<string | null>(
    "https://t0.gstatic.com/images?q=tbn:ANd9GcQomC9wJwLhzdkcDos6zEqUj080l1BaiRI8W0UEwMjAeM1JzUuu3pIiEfSf_kLmruofTmnOww"
  );

  const [backgroundPic, setBackgroundPic] = useState<string | null>(
    "https://cdn.vox-cdn.com/thumbor/uYAxcaeKNiBF-NK5nw19MDequ1c=/0x0:2000x800/1200x675/filters:focal(840x240:1160x560)/cdn.vox-cdn.com/uploads/chorus_image/image/72585995/5265_SeriesHeaders_OP_2000x800_wm.0.jpg"
  );

  const navigation = useNavigation(); // Get the navigation object

  return (
    <ProfileContent
      profilePic={profilePic}
      backgroundPic={backgroundPic}
      navigation={navigation} // Pass the navigation object
    />
  );
}

function ProfileContent({ profilePic, backgroundPic, navigation }: any) {
  return (
    <View style={styles.container}>
      <PaperProvider theme={theme}>
        <ScrollView style={{ flex: 1 }} scrollEventThrottle={5}>
          <TouchableOpacity onPress={() => navigation.navigate("Cover Photo")}>
            <Image
              style={styles.backgroundPic}
              source={{
                uri: backgroundPic,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profilePicButton}
            onPress={() => navigation.navigate("Profile Photo")}
          >
            <Image
              style={styles.profilePic}
              source={{
                uri: profilePic,
              }}
            />
          </TouchableOpacity>

          {/* Message Button */}
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("Message")} // Navigate to the appropriate screen
            style={styles.messageButton}
          >
            Message
          </Button>

          <View style={styles.profileLabels}>
            <Text variant="headlineMedium" style={{ color: "black" }}>
              Jameel D. Great
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("Ratings & Reviews")}>
              <Text
                variant="titleLarge"
                style={{
                  color: "black",
                }}
              >
                &#9733; &#9733; &#9733; (69) &nbsp;
                <AntDesign name="infocirlceo" size={20} color="black" />
              </Text>
            </TouchableOpacity>
          </View>

          <TabsProvider defaultIndex={0}>
            <Tabs>
              <TabScreen label="Inventory">
                <InventoryScreen />
              </TabScreen>
              <TabScreen label="Wishes">
                <WishesScreen />
              </TabScreen>
              <TabScreen label="History">
                <HistoryScreen />
              </TabScreen>
            </Tabs>
          </TabsProvider>
        </ScrollView>
      </PaperProvider>
    </View>
  );
}

function InventoryScreen() {
  return (
    <FlatList
      data={INVENTORY}
      renderItem={({ item }) => <CardComponent content={item.content} />}
      keyExtractor={(item) => item.id.toString()}
      style={{ height: 1000, paddingVertical: 10 }}
    />
  );
}

function WishesScreen() {
  return (
    <FlatList
      data={INVENTORY}
      renderItem={({ item }) => <CardComponent content={item.content} />}
      keyExtractor={(item) => item.id.toString()}
      style={{ height: 1000, paddingVertical: 10 }}
    />
  );
}

function HistoryScreen() {
  return (
    <FlatList
      data={INVENTORY}
      renderItem={({ item }) => <CardComponent content={item.content} />}
      keyExtractor={(item) => item.id.toString()}
      style={{ height: 1000, paddingVertical: 10 }}
    />
  );
}

type CardProps = { content: string };
function CardComponent(props: CardProps) {
  return (
    <Card style={{ height: 200, backgroundColor: "rgb(243, 246, 235)", margin: 8 }}>
      <Card.Content>
        <Text style={{ color: "black" }}>{props.content}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF9F1",
  },
  backgroundPic: {
    resizeMode: "contain",
    backgroundColor: "#e0e0e0",
    height: 200,
  },
  profilePic: {
    resizeMode: "cover",
    borderRadius: 100,
    height: 150,
    width: 150,
    borderWidth: 6,
    borderColor: "white",
  },
  profilePicButton: {
    position: "absolute",
    top: 130,
    left: 25,
    borderRadius: 100,
    height: 150,
    width: 150,
  },
  profileLabels: {
    marginHorizontal: 25,
    marginTop: 30,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  messageButton: {
    alignSelf: "flex-end",
    marginTop: 20,
    marginRight: 25,
    fontWeight: 700,
  },
});

const INVENTORY = [
  {
    id: 1,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 6,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
