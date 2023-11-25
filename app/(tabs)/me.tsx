// hello guyss

import { AntDesign, Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { Button, Card, DefaultTheme, Portal, Snackbar, Text } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import ConfirmModal from "~/components/confirm-modal";
import { COLORS } from "~/lib/theme";

const defaultPic = require("~/assets/liden.png");

const theme = {
  ...DefaultTheme,
  colors: COLORS,
};

const defaultPfpPic =
  "https://pbs.twimg.com/profile_images/1402484552195481600/i0GBotgY_400x400.jpg";
const defaultCoverPic =
  "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg";

export default function MyProfile() {
  const [profilePic, setProfilePic] = useState<string>(defaultPic);

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

function ProfileContent({ profilePic }: any) {
  // STATES
  const [name, setName] = useState("Liden U. Hoe");
  const scrollViewRef = useRef<ScrollView>(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState<boolean>(false);
  const [isProfileSettingsCardVisible, setIsProfileSettingsCardVisible] = useState<"none" | "flex">(
    "none"
  );
  const [isSnackBarVisible, setIsSnackBarVisible] = useState<boolean>(false);

  // HANDLERS
  const saveProfileChanges = () => {
    setIsSnackBarVisible(true);
  };
  const onDismissSnackBar = () => {
    setIsSnackBarVisible(false);
  };

  const toggleProfileSettingsCard = () =>
    setIsProfileSettingsCardVisible(isProfileSettingsCardVisible == "flex" ? "none" : "flex");
  const showConfirmModal = () => {
    setIsProfileSettingsCardVisible("none");
    setIsConfirmModalVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setIsProfileSettingsCardVisible("none")}>
      <View style={styles.container}>
        <Portal>
          <Snackbar
            theme={theme}
            style={{ marginBottom: 100 }}
            visible={isSnackBarVisible}
            duration={2000}
            onDismiss={onDismissSnackBar}
            onIconPress={onDismissSnackBar}
          >
            Profile Saved!
          </Snackbar>
        </Portal>

        <ConfirmModal
          title={`Your account will be deleted.${"\n"}Are you sure?`}
          state={isConfirmModalVisible}
          setState={setIsConfirmModalVisible}
        />

        <ScrollView style={{ flex: 1 }}>
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

          <View style={styles.editProfileButtons}>
            <Link
              asChild
              href={{
                pathname: "/me/edit",
                params: {
                  name: name,
                  pfpPic: defaultPfpPic,
                  coverPic: defaultCoverPic,
                },
              }}
            >
              <Button
                icon="pencil"
                mode="outlined"
                contentStyle={{ flexDirection: "row-reverse" }}
                textColor={COLORS.primary}
              >
                Edit Profile
              </Button>
            </Link>

            <Entypo
              style={{ verticalAlign: "middle" }}
              name="dots-three-vertical"
              size={18}
              color="black"
              onPress={toggleProfileSettingsCard}
            />
          </View>

          <Card
            style={{
              display: isProfileSettingsCardVisible,
              position: "absolute",
              alignSelf: "flex-end",
              top: 265,
              right: 20,
              zIndex: 999,
              backgroundColor: COLORS.surface,
            }}
          >
            <Card.Content style={{ padding: 10 }}>
              <Button
                style={{ backgroundColor: COLORS.surface }}
                textColor="black"
                icon="account-remove"
                mode="contained"
                onPress={showConfirmModal}
              >
                Delete Account
              </Button>
            </Card.Content>
          </Card>

          <View style={styles.profileTexts}>
            <Text variant="headlineMedium">Liden U. Hoe</Text>
            <Link href={{ pathname: "/me/ratings" }}>
              <Text variant="titleMedium">
                &#9733; &#9733; &#9733; (69) &nbsp;
                <AntDesign name="infocirlceo" size={18} style={{ verticalAlign: "middle" }} />
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
      </View>
    </TouchableWithoutFeedback>
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
    top: 120, // if header not shown
    // top: 170,
    left: 25,
    borderWidth: 5,
    borderColor: COLORS.surface,
  },
  profileTexts: {
    marginHorizontal: 25,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  editProfileButtons: {
    alignSelf: "flex-end",
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
    paddingHorizontal: 20,
    paddingVertical: 40,
    maxHeight: "80%",
    overflow: "scroll",
    gap: 30,
    borderRadius: 10,
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
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
