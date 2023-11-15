import { Feather } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Button, Modal, PaperProvider, Portal, Text, TextInput } from "react-native-paper";

export default function myProfile() {
  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      borderWidth: 8,
      borderColor: "pink",
      flex: 1,
    },
    backgroundPic: {
      resizeMode: "contain",
      backgroundColor: "#f0f0f0",
      height: 150,
    },
    profilePic: {
      position: "absolute",
      top: 70, // Adjust top position as needed
      left: 25, // Adjust left position as needed
      resizeMode: "cover",
      borderRadius: 100,
      height: 150,
      width: 150,
      borderWidth: 6,
      borderColor: "white",
    },
    profileLabels: {
      marginHorizontal: 25,
      marginVertical: 40,
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
      marginTop: 20,
      marginRight: 25,
    },
    editProfilePicButton: {
      alignSelf: "flex-end",
    },
    editProfileModal: {
      margin: 20,
      display: "flex",
      gap: 10,
    },
    editNameInput: {
      marginVertical: 20,
      backgroundColor: "none",
      fontSize: 20,
      color: "black",
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
  });

  const Tab = createMaterialTopTabNavigator();

  function WishesScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home!</Text>
      </View>
    );
  }

  function InventoryScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home!</Text>
      </View>
    );
  }

  function HistoryScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
      </View>
    );
  }

  const [name, setName] = React.useState("Liden U. Hoe");
  const [nameInput, setNameInput] = React.useState(name);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  // Stores the selected image URI
  const [profilePic, setProfilePic] = React.useState<string | null>(null);
  const [backgroundPic, setBackgroundPic] = React.useState<string | null>(null);

  // Stores any error message
  const [error, setError] = React.useState(null);

  // Function to pick an image from
  //the device's media library
  const pickImage = async (urlPic: string) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera  
                 roll permission to upload images.`
      );
    } else {
      // Launch the image library and get
      // the selected image
      const result = await ImagePicker.launchImageLibraryAsync();

      if (result?.assets?.[0]?.uri) {
        // If an image is selected (not cancelled),
        // update the file state variable
        if (urlPic === "profile") {
          setProfilePic(result?.assets?.[0]?.uri);
        } else if (urlPic === "background") {
          setBackgroundPic(result?.assets?.[0]?.uri);
        }
        // Clear any previous errors
        setError(null);
      }
    }
  };
  return (
    <View style={styles.container}>
      <PaperProvider>
        <Portal>
          <Modal
            style={styles.editProfileModal}
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Feather
              style={{ alignSelf: "flex-end" }}
              name="x"
              size={24}
              color="black"
              onPress={hideModal}
            />
            <Text
              style={{
                color: "black",
                alignSelf: "center",
                paddingVertical: 15,
                marginVertical: 10,
                borderBottomWidth: 2,
              }}
              variant="headlineMedium"
            >
              Edit Profile
            </Text>
            <TextInput
              selectTextOnFocus
              textColor="#555"
              label="Name"
              mode="outlined"
              style={[styles.editNameInput, { marginVertical: 20 }]}
              value={nameInput}
              onChangeText={(text) => setNameInput(text)}
            />
            <View style={styles.editProfileLabels}>
              <Text variant="titleMedium" style={{ color: "black" }}>
                Profile Picture
              </Text>
              <Button
                mode="contained"
                style={styles.editProfilePicButton}
                textColor="black"
                onPress={() => pickImage("profile")}
              >
                Edit
              </Button>
            </View>

            <Image
              style={[styles.editProfilePic, { marginBottom: 10 }]}
              source={{
                uri: profilePic
                  ? profilePic
                  : "https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/400620751_122117989682085260_870845570978591772_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=n0dELboLFD0AX8l9Tyk&_nc_ht=scontent.fmnl4-2.fna&oh=00_AfB-7lWn6a3qcT2rrZlMjXIr-fkxOyZ6yz_4GiFKrea4uA&oe=65588F78",
              }}
            />

            <View style={styles.editProfileLabels}>
              <Text variant="titleMedium" style={{ color: "black" }}>
                Background Picture
              </Text>
              <Button
                mode="contained"
                style={styles.editProfilePicButton}
                textColor="black"
                onPress={() => pickImage("background")}
              >
                Edit
              </Button>
            </View>
            <Image
              style={[styles.backgroundPic, { marginVertical: 10 }]}
              source={{
                uri: backgroundPic
                  ? backgroundPic
                  : "https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/400620751_122117989682085260_870845570978591772_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=n0dELboLFD0AX8l9Tyk&_nc_ht=scontent.fmnl4-2.fna&oh=00_AfB-7lWn6a3qcT2rrZlMjXIr-fkxOyZ6yz_4GiFKrea4uA&oe=65588F78",
              }}
            />

            <Button
              icon="content-save-edit"
              style={[styles.saveChangesButton, { marginVertical: 10 }]}
              mode="contained"
              contentStyle={{ flexDirection: "row-reverse" }}
              onPress={hideModal}
            >
              Press me
            </Button>
            <Button
              style={[styles.saveChangesButton, { backgroundColor: "#f0f0f0" }]}
              mode="contained"
              onPress={hideModal}
            >
              Cancel
            </Button>
          </Modal>
        </Portal>

        <Image
          style={styles.backgroundPic}
          source={{
            uri: "https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/400620751_122117989682085260_870845570978591772_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=n0dELboLFD0AX8l9Tyk&_nc_ht=scontent.fmnl4-2.fna&oh=00_AfB-7lWn6a3qcT2rrZlMjXIr-fkxOyZ6yz_4GiFKrea4uA&oe=65588F78",
          }}
        />
        <Image
          style={styles.profilePic}
          source={{
            uri: "https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/400620751_122117989682085260_870845570978591772_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=n0dELboLFD0AX8l9Tyk&_nc_ht=scontent.fmnl4-2.fna&oh=00_AfB-7lWn6a3qcT2rrZlMjXIr-fkxOyZ6yz_4GiFKrea4uA&oe=65588F78",
          }}
        />
        <Button
          icon="pencil"
          mode="outlined"
          style={styles.editProfileButton}
          contentStyle={{ flexDirection: "row-reverse" }}
          textColor="black"
          onPress={showModal}
        >
          Edit Profile
        </Button>
        <View style={styles.profileLabels}>
          <Text variant="headlineMedium" style={{ color: "black" }}>
            Liden U. Hoe
          </Text>
          <Text variant="headlineSmall" style={{ color: "black" }}>
            &#9733; &#9733; &#9733; (69)
          </Text>
        </View>

        <Tab.Navigator
          screenOptions={{
            // tabBarActiveTintColor: "#e91e63",
            tabBarIndicatorStyle: { backgroundColor: "black" },
            tabBarLabelStyle: { fontSize: 12 },
            tabBarStyle: {},
          }}
        >
          <Tab.Screen name="Inventory" component={InventoryScreen} />
          <Tab.Screen name="Wishes" component={WishesScreen} />
          <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
      </PaperProvider>
    </View>
  );
}
