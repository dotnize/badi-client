// hello guyss

import { AntDesign, Entypo } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { Button, Card, DefaultTheme, Modal, Portal, Snackbar, Text } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import ConfirmModal from "~/components/confirm-modal";
import PhotoPreview from "~/components/photo-preview";
import { COLORS } from "~/lib/theme";
import { Inventory, Wish } from "~/lib/types";
import { apiFetch } from "~/lib/utils";
import InventoryItem from "./cards/home/inventory-item-card";
import WishItem from "./cards/home/wish-item-card";
const theme = {
  ...DefaultTheme,
  colors: COLORS,
};

const defaultPic = require("~/assets/liden.png");
const defaultPfpPic =
  "https://img.freepik.com/premium-vector/flat-instagram-icons-notifications_619991-50.jpg";
const defaultCoverPic = "https://i.stack.imgur.com/lubGc.jpg";
export default function ProfileContent({ user, isLoggedUser, wishes, inventory }: any) {
  const router = useRouter();

  // STATES
  const [currentPhoto, setCurrentPhoto] = useState<string>(defaultPfpPic);
  const [isPhotoPreviewVisibile, setIsPhotoPreviewVisible] = useState<boolean>(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState<boolean>(false);
  const [isProfileSettingsCardVisible, setIsProfileSettingsCardVisible] = useState(false);
  const [isSnackBarVisible, setIsSnackBarVisible] = useState<boolean>(false);

  // HANDLERS
  const saveProfileChanges = () => setIsSnackBarVisible(true);
  const onDismissSnackBar = () => setIsSnackBarVisible(false);

  const toggleProfileSettingsCard = () => setIsProfileSettingsCardVisible(true);
  const showConfirmModal = () => {
    setIsProfileSettingsCardVisible(false);
    setIsConfirmModalVisible(true);
  };

  const onPreviewPhoto = (photo: string) => {
    setCurrentPhoto(photo);
    setIsPhotoPreviewVisible(true);
  };

  const handleOnDeleteAccount = async () => {
    const { data, error } = await apiFetch(`/user/1`, { method: "DELETE" });

    if (error) {
      console.log(error);
    } else {
      console.log(data);
      router.push("/welcome");
    }
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
      backgroundColor: "white",
      // borderWidth: 6,
      // borderColor: "white",
    },
    profilePicButton: {
      position: "absolute",
      top: 120, // if header not shown
      // top: 170,
      left: 25,
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
        handleOnConfirmDelete={handleOnDeleteAccount}
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
                // params: {
                //   name: name,
                //   pfpPic: defaultPfpPic,
                //   coverPic: defaultCoverPic,
                // },
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
          <Text variant="headlineMedium">
            {user.firstName} {user.lastName}
          </Text>
          <Link href={{ pathname: "/me/ratings" }}>
            <Text variant="titleMedium">
              Ratings ({user.averageRating || 0}){" "}
              <AntDesign name="infocirlceo" size={18} style={{ verticalAlign: "middle" }} />
            </Text>
          </Link>
        </View>

        {!isLoggedUser && (
          <Button style={{ margin: 10 }} mode="contained">
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
              <InventoryScreen inventory={inventory} />
            </TabScreen>
            <TabScreen label="Wishes">
              <WishesScreen wishes={wishes} />
            </TabScreen>
            <TabScreen label="History">
              <HistoryScreen />
            </TabScreen>
          </Tabs>
        </TabsProvider>
      </ScrollView>
    </View>
  );
}

// TAB CONTENTS

function InventoryScreen({ inventory }: { inventory: Inventory[] }) {
  const [currentInventory, setCurrentInventory] = useState(inventory);
  const deleteItemById = async (id: number) => {
    const newInventory = currentInventory.filter(
      (currentInventory: Inventory) => currentInventory.id !== id
    );
    setCurrentInventory(newInventory);

    const { data, error } = await apiFetch(`/inventory/${id}`, { method: "DELETE" });

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  return (
    <>
      {currentInventory ? (
        <>
          <FlatList
            data={currentInventory}
            renderItem={({ item }) => (
              <InventoryItem
                editable={true}
                inventory={item}
                onDelete={() => deleteItemById(item.id)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            style={{ height: 1000, paddingVertical: 10 }}
          />
        </>
      ) : (
        <>
          <NoContent message="No inventories" />
        </>
      )}
    </>
  );
}

function HistoryScreen() {
  return (
    <NoContent message="No History." />
    // <FlatList
    //   data={INVENTORY}
    //   renderItem={({ item }) => <HistoryItem editable={true} />}
    //   keyExtractor={(item) => item.id.toString()}
    //   style={{ height: 1000, paddingVertical: 10 }}
    // />
  );
}

function WishesScreen({ wishes }: { wishes: Wish[] }) {
  const [currentWishes, setCurrentWishes] = useState(wishes);
  const deleteItemById = async (id: number) => {
    const newWishes = currentWishes.filter((currentWishes: Wish) => currentWishes.id !== id);
    setCurrentWishes(newWishes);

    const { data, error } = await apiFetch(`/wish/${id}`, { method: "DELETE" });

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  return (
    <>
      {currentWishes ? (
        <>
          <FlatList
            data={currentWishes}
            renderItem={({ item }) => (
              <WishItem wish={item} editable={true} onDelete={() => deleteItemById(item.id)} />
            )}
            keyExtractor={(item) => item.id.toString()}
            style={{ height: 1000, paddingVertical: 10 }}
          />
        </>
      ) : (
        <>
          <NoContent message="No wishes" />
        </>
      )}
    </>
  );
}

function NoContent({ message }: { message: string }) {
  return (
    <View style={{ height: 400, justifyContent: "center", alignItems: "center" }}>
      <Text>{message}</Text>
    </View>
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
