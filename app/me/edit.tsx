// URL: /me/edit

import * as ImagePicker from "expo-image-picker";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { COLORS } from "~/lib/theme";

type SearchParams = {
  name: string;
  pfpPic: string;
  coverPic: string;
  location: string;
};

export default function EditProfile() {
  // use fetch to get the currentUser

  // VARIABLES
  // const params = useLocalSearchParams() as SearchParams;

  const fName = "Liden U.",
    lName = "Hoe",
    loc = "Cebu";

  // STATES
  const [firstName, setFirstName] = useState(fName);
  const [lastName, setLastName] = useState(lName);
  const [location, setLocation] = useState(loc);
  const [pfpPicChange, setPfpPicChange] = useState<string>();
  const [coverPicChange, setCoverPicChange] = useState<string>();

  // HANDLERS
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
    <View style={{ flex: 1, padding: 20, gap: 15 }}>
      <TextInput
        selectTextOnFocus
        textColor="#555"
        label="First Name"
        mode="outlined"
        style={styles.editNameInput}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        selectTextOnFocus
        textColor="#555"
        label="Last Name"
        mode="outlined"
        style={styles.editNameInput}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        selectTextOnFocus
        textColor="#555"
        label="Location"
        mode="outlined"
        style={styles.editNameInput}
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
      <View style={styles.editProfileLabels}>
        <Text variant="titleMedium">Profile Picture</Text>
        <Button
          mode="contained"
          style={styles.editProfilePicButton}
          textColor={COLORS.primary}
          onPress={() => pickImage("profile")}
        >
          Edit
        </Button>
      </View>

      <Image style={styles.editProfilePic} source={{ uri: pfpPicChange }} />

      <View style={styles.editProfileLabels}>
        <Text variant="titleMedium">Background Picture</Text>
        <Button
          mode="contained"
          style={styles.editProfilePicButton}
          textColor={COLORS.primary}
          onPress={() => pickImage("background")}
        >
          Edit
        </Button>
      </View>

      <Image style={styles.backgroundPic} source={{ uri: coverPicChange }} />

      <View style={{ marginTop: "auto", gap: 5 }}>
        <Link asChild href="/me">
          <Button style={styles.saveChangesButton} mode="contained">
            Save Profile Changes
          </Button>
        </Link>

        <Link asChild href="/me">
          <Button style={styles.saveChangesButton} buttonColor={COLORS.secondary} mode="contained">
            Cancel
          </Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundPic: {
    resizeMode: "contain",
    alignSelf: "center",
    backgroundColor: "#e0e0e0",
    height: 200,
    width: "100%",
  },

  editProfileLabels: {
    marginHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  editProfilePicButton: {
    alignSelf: "flex-end",
    backgroundColor: "rgb(234,239,224)",
  },

  editNameInput: {
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
  },
  saveChangesButton: {
    width: "100%",
  },
});
