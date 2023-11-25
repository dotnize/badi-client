// hello guyss

import { AntDesign } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { Button, Card, DefaultTheme, IconButton, PaperProvider, Text } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import { COLORS } from "~/lib/theme";

// const defaultPic =
//   "https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/400620751_122117989682085260_870845570978591772_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=n0dELboLFD0AX8l9Tyk&_nc_ht=scontent.fmnl4-2.fna&oh=00_AfB-7lWn6a3qcT2rrZlMjXIr-fkxOyZ6yz_4GiFKrea4uA&oe=65588F78";

const defaultPic = require("~/assets/liden.png");

const theme = {
  ...DefaultTheme,
  colors: COLORS,
};

// TODO: use Expo Router's stack navigator, instead of a third party library.
// TODO: use new routes in the (stack) directory.

const defaultPfpPic =
  "https://pbs.twimg.com/profile_images/1402484552195481600/i0GBotgY_400x400.jpg";
const defaultCoverPic =
  "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg";

export default function MyProfile() {
  const [profilePic, setProfilePic] = useState<string>(defaultPfpPic);

  const updateProfilePic = (newProfilePic: string) => {
    setProfilePic(newProfilePic);
  };

  const [backgroundPic, setBackgroundPic] = useState<string>(defaultCoverPic);

  const updateBackgroundPic = (newBackgroundPic: string) => {
    setBackgroundPic(newBackgroundPic);
  };

  return (
    <ProfileContent
      profilePic={profilePic}
      updateProfilePic={updateProfilePic}
      backgroundPic={backgroundPic}
      updateBackgroundPic={updateBackgroundPic}
    />
  );
}

function ProfileContent({
  navigation,
  profilePic,
  updateProfilePic,
  backgroundPic,
  updateBackgroundPic,
}: any) {
  const router = useRouter();

  // STATES
  const [name, setName] = useState("Liden U. Hoe");
  const [nameInput, setNameInput] = useState(name);
  const scrollViewRef = useRef<ScrollView>(null);

  // HANDLERS
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    const scrollThreshold = 390;

    if (currentOffsetY >= scrollThreshold) {
      // setScrollEnabled(false);
      // If the user tries to scroll beyond the threshold, prevent further scrolling
      scrollViewRef.current?.scrollTo({ x: 0, y: scrollThreshold, animated: false });
    }
  };

  // function previewPhoto(photo: any) {
  //   router.push({ pathname: `/photo-preview`, params: { photo: photo } });
  // }

  return (
    <View style={styles.container}>
      <PaperProvider theme={theme}>
        <ScrollView
          style={{ flex: 1 }}
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={5}
        >
          <IconButton icon="arrow-left" iconColor="black" />

          <Link
            href={{
              pathname: "/photo-preview",
              params: { photo: defaultCoverPic },
            }}
            asChild
          >
            <Image style={styles.backgroundPic} source={{ uri: defaultCoverPic }} />
          </Link>

          <Link
            asChild
            href={{
              pathname: "/photo-preview",
              params: { photo: profilePic },
            }}
            style={styles.profilePicButton}
          >
            <Image style={styles.profilePic} source={profilePic} />
          </Link>

          <Link asChild href={{ pathname: "/me/edit" }}>
            <Button
              icon="pencil"
              mode="outlined"
              style={styles.editProfileButton}
              contentStyle={{ flexDirection: "row-reverse" }}
              textColor={COLORS.primary}
            >
              Edit Profile
            </Button>
          </Link>
          <View style={styles.profileLabels}>
            <Text variant="headlineMedium" style={{ color: "black" }}>
              Liden U. Hoe
            </Text>

            <Link
              href={{
                pathname: "/me/ratings",
              }}
            >
              <Text
                variant="titleLarge"
                style={{
                  color: "black",
                }}
              >
                &#9733; &#9733; &#9733; (69) &nbsp;
                <AntDesign name="infocirlceo" size={20} color="black" />
              </Text>
            </Link>
          </View>

          <TabsProvider defaultIndex={0}>
            <Tabs style={{ backgroundColor: "transparent" }}>
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

// TAB CONTENTS

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
  photoPreview: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  backgroundPic: {
    resizeMode: "cover",
    alignSelf: "center",
    backgroundColor: "#e0e0e0",
    height: 200,
    width: "100%",
  },
  profilePic: {
    resizeMode: "cover",
    borderRadius: 100,
    height: 150,
    width: 150,
    // borderWidth: 6,
    // borderColor: "white",
  },
  profilePicButton: {
    position: "absolute",
    // top: 120, if header not shown
    top: 170,
    left: 25,
    borderWidth: 5,
    borderColor: "rgb(234,239,224)",
  },
  profileLabels: {
    marginHorizontal: 25,

    marginBottom: 10,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  editProfileLabels: {
    marginHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileName: {
    fontWeight: "bold",
    fontFamily: "arial",
    fontSize: 30,
    color: "black",
  },
  profileRatingLabel: {
    fontWeight: "bold",
    fontFamily: "arial",
    fontSize: 20,
    color: "black",
  },
  editProfileButton: {
    alignSelf: "flex-end",
    margin: 20,
    fontWeight: 700,
  },
  editProfilePicButton: {
    alignSelf: "flex-end",
    backgroundColor: "rgb(234,239,224)",
  },
  editProfileModal: {
    margin: 20,
    gap: 10,
  },
  modalContainerStyle: {
    backgroundColor: "white",
    padding: 20,
    maxHeight: "80%",
    overflow: "scroll",
    justifyContent: "flex-start",
  },
  editNameInput: {
    marginVertical: 20,
    backgroundColor: "white",
    fontSize: 20,
  },
  editProfilePic: {
    resizeMode: "cover",
    borderRadius: 100,
    height: 150,
    width: 150,
    alignSelf: "center",
    backgroundColor: "#f0f0f0",
    borderWidth: 6,
    borderColor: "white",
  },
  saveChangesButton: {
    borderRadius: 0,
    width: "100%",
    alignSelf: "center",
    fontWeight: "bold",
  },

  logo: {
    width: 66,
    height: 58,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

// CARD CONTENT SAMPLE DATA
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
