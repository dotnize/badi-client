// URL: /me/edit

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { COLORS } from "~/lib/theme";

export default function EditProfile() {
  // STATES
  const [pfpPicChange, setPfpPicChange] = useState<string>();
  const [coverPicChange, setCoverPicChange] = useState<string>();
  const defaultPfpPic = require("~/assets/liden.png");
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);

  // HANDLERS
  const saveProfileChanges = () => {
    setIsSnackBarVisible(true);
  };
  const onDismissSnackBar = () => setIsSnackBarVisible(false);

  // Function to pick an image from the device's media library
  const pickImage = async (urlPic: string) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", `Sorry, we need cameraroll permission to upload images.`);
    } else {
      // Launch the image library and get the selected image
      const result = await ImagePicker.launchImageLibraryAsync();

      if (result?.assets?.[0]?.uri) {
        // If an image is selected (not cancelled), update the file state variable
        if (urlPic === "profile") {
          setPfpPicChange(result?.assets?.[0]?.uri);
        } else if (urlPic === "background") {
          setCoverPicChange(result?.assets?.[0]?.uri);
        }
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, gap: 5 }}>
      <TextInput
        selectTextOnFocus
        textColor="#555"
        label="Name"
        mode="outlined"
        style={[styles.editNameInput, { marginVertical: 20 }]}
        value={"Liden"}
        // onChangeText={(text) => setNameInput(text)}
      />
      <View style={styles.editProfileLabels}>
        <Text variant="titleMedium" style={{ color: "black" }}>
          Profile Picture
        </Text>
        <Button
          mode="contained"
          style={styles.editProfilePicButton}
          textColor={COLORS.primary}
          onPress={() => pickImage("profile")}
        >
          Edit
        </Button>
      </View>

      <Image style={[styles.editProfilePic, { marginBottom: 10 }]} source={defaultPfpPic} />

      <View style={styles.editProfileLabels}>
        <Text variant="titleMedium" style={{ color: "black" }}>
          Background Picture
        </Text>
        <Button
          mode="contained"
          style={styles.editProfilePicButton}
          textColor={COLORS.primary}
          onPress={() => pickImage("background")}
        >
          Edit
        </Button>
      </View>

      <Image style={[styles.backgroundPic, { marginVertical: 10 }]} source={defaultPfpPic} />

      <Button
        // icon="content-save-edit"
        style={[styles.saveChangesButton, { marginTop: "auto" }]}
        mode="contained"
        contentStyle={{ flexDirection: "row-reverse" }}
        onPress={saveProfileChanges}
      >
        Save Profile Changes
      </Button>
      <Button
        style={[styles.saveChangesButton]}
        buttonColor={COLORS.secondary}
        mode="contained"
        // onPress={hideModal}
      >
        Cancel
      </Button>

      <Snackbar
        style={{ backgroundColor: "#F2F2F2" }}
        visible={isSnackBarVisible}
        duration={2000}
        onDismiss={onDismissSnackBar}
      >
        Profile Saved!
      </Snackbar>
    </View>
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
    resizeMode: "contain",
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
    borderWidth: 6,
    borderColor: "white",
  },
  profilePicButton: {
    position: "absolute",
    top: 180,
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
    // borderWidth: 6,
    // borderColor: "white",
  },
  saveChangesButton: {
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
