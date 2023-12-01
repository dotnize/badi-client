// hello guyss

import { AntDesign, Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { Button, Card, DefaultTheme, Modal, Portal, Snackbar, Text } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import TradeItem from "~/components/cards/home/trade-item";
import ConfirmModal from "~/components/confirm-modal";
import PhotoPreview from "~/components/photo-preview";
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

export default function ProfileContent({ user, isLoggedUser, wishes }: any) {
  // VARIABLES
  // const name = user.name etc.

  // STATES
  const [name, setName] = useState("Liden U. Hoe");
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentPhoto, setCurrentPhoto] = useState<string>(defaultPfpPic);
  const [isPhotoPreviewVisibile, setIsPhotoPreviewVisible] = useState<boolean>(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState<boolean>(false);
  const [isProfileSettingsCardVisible, setIsProfileSettingsCardVisible] = useState(false);
  const [isSnackBarVisible, setIsSnackBarVisible] = useState<boolean>(false);

  // HANDLERS
  const saveProfileChanges = () => {
    setIsSnackBarVisible(true);
  };
  const onDismissSnackBar = () => {
    setIsSnackBarVisible(false);
  };

  const toggleProfileSettingsCard = () => setIsProfileSettingsCardVisible(true);
  const showConfirmModal = () => {
    setIsProfileSettingsCardVisible(false);
    setIsConfirmModalVisible(true);
  };

  const onPreviewPhoto = (photo: string) => {
    setCurrentPhoto(photo);
    setIsPhotoPreviewVisible(true);
  };

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
      // borderWidth: 5,
      // borderColor: COLORS.surface,
    },
    profileTexts: {
      marginHorizontal: 25,
      marginTop: isLoggedUser ? 0 : 80,
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

  return (
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

        <Modal
          onDismiss={() => setIsProfileSettingsCardVisible(false)}
          visible={isProfileSettingsCardVisible}
          theme={{
            colors: {
              backdrop: "transparent",
              surface: "white",
            },
          }}
          contentContainerStyle={{
            position: "absolute",
            alignSelf: "flex-end",
            padding: 5,
            borderRadius: 5,
            top: 265,
            right: 20,
            zIndex: 999,
            backgroundColor: COLORS.surface,
          }}
        >
          <Button
            style={{ backgroundColor: COLORS.surface }}
            textColor="black"
            icon="account-remove"
            mode="contained"
            onPress={showConfirmModal}
          >
            Delete Account
          </Button>
        </Modal>
      </Portal>

      {/* MODALS */}
      <ConfirmModal
        title={`Your account will be deleted.${"\n"}Are you sure?`}
        state={isConfirmModalVisible}
        setState={setIsConfirmModalVisible}
      />

      <PhotoPreview
        photo={currentPhoto}
        state={isPhotoPreviewVisibile}
        setState={setIsPhotoPreviewVisible}
      />

      {/*  MODALS END*/}

      <ScrollView style={{ flex: 1 }}>
        <Pressable onPress={() => onPreviewPhoto(defaultCoverPic)}>
          <Image style={styles.backgroundPic} source={{ uri: defaultCoverPic }} />
        </Pressable>

        <Pressable style={styles.profilePicButton} onPress={() => onPreviewPhoto(defaultPfpPic)}>
          <Image style={styles.profilePic} source={{ uri: defaultPfpPic }} />
        </Pressable>

        {isLoggedUser && (
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
        )}

        <View style={styles.profileTexts}>
          <Text variant="headlineMedium">Liden U. Hoe</Text>
          <Link href={{ pathname: "/me/ratings" }}>
            <Text variant="titleMedium">
              &#9733; &#9733; &#9733; (69) &nbsp;
              <AntDesign name="infocirlceo" size={18} style={{ verticalAlign: "middle" }} />
            </Text>
          </Link>
        </View>

        {!isLoggedUser && (
          <Button style={{ marginHorizontal: 10 }} mode="contained">
            Message
          </Button>

          //   <Link
          //       asChild
          //       href={{
          //         pathname: "/me/edit",
          //         params: {
          //           name: name,
          //           pfpPic: defaultPfpPic,
          //           coverPic: defaultCoverPic,
          //         },
          //       }}
          //     >
          //       <Button
          //         icon="pencil"
          //         mode="outlined"
          //         contentStyle={{ flexDirection: "row-reverse" }}
          //         textColor={COLORS.primary}
          //       >
          //         Edit Profile
          //       </Button>
          //     </Link>
        )}

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
  );

  function WishesScreen() {
    return (
      <FlatList
        data={wishes}
        renderItem={({ item }) => <TradeItem />}
        keyExtractor={(item) => item.id.toString()}
        style={{ height: 1000, paddingVertical: 10 }}
      />
    );
  }
}

// TAB CONTENTS

function InventoryScreen() {
  return (
    <FlatList
      data={INVENTORY}
      renderItem={({ item }) => <TradeItem editable={true} />}
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
