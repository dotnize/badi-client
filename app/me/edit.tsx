// URL: /me/edit

import * as ImagePicker from "expo-image-picker";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import { COLORS } from "~/lib/theme";
import { User } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

export default function EditProfile() {
  // STATES
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [firstName, setFirstName] = useState("Liden");
  const [lastName, setLastName] = useState("Ho");
  const [email, setEmail] = useState("@");
  const [gender, setGender] = useState("U");
  const [location, setLocation] = useState("Zamboanga");
  const [pfpPicChange, setPfpPicChange] = useState<string>(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDvUqRsi2tkOdP3rOslRdVdS9XCza83ln_msPV55j5o7_b-PwPPx0fpsHvQvV-LJRRMAA&usqp=CAU"
  );
  const [coverPicChange, setCoverPicChange] = useState<string>(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJp8856xwrrrI_KGrJtVJUWA43UxnDFBeQpYS8AflSFrLEBa3BaHtPfH8G3BDX36IW_ZE&usqp=CAU"
  );

  async function updateCurrentUser() {
    const updateValues = {
      firstName: firstName,
      lastName: lastName,
      location: location,
      gender: gender,
      email: email,
      phoneNumber: 12345,
      avatarUrl: "sample bleh",
    };

    const { data, error } = await apiFetch(`/user/1`, {
      method: "PUT", // or "PUT"
      body: JSON.stringify(updateValues),
    });

    if (error) {
      console.log("sadge");
      setCurrentUser(null);
    } else {
      console.log("User Edit", typeof data, data);
      setCurrentUser(data);
    }
  }

  async function fetchCurrentUser() {
    const { data, error } = await apiFetch(`/user/1`);

    if (error) {
      console.log(error);
    } else {
      console.log(data);
      setCurrentUser(data);
    }
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
      setLocation(currentUser.location);
      setGender(currentUser.gender);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleOnSaveChanges = () => {
    updateCurrentUser();
  };
  // Function to pick an image from the device's media library
  const pickImage = async (urlPic: string) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (error || !data) {
      console.log(error || "Something went wrong while updating user profile");
    } else {
      setUser(data);
      // eslint-disable-next-line no-unused-expressions
      router.replace("/me");
    }
  };

  async function deleteAccount() {
    if (!user) return;

    const { data, error } = await apiFetch<User>(`/user/${user.id}`, {
      method: "DELETE",
    });

    if (error || !data) {
      console.log(error || "Something went wrong while deleting user profile");
    } else {
      apiFetch("/auth/logout", { method: "POST" });
      setUser(null);
    }
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, gap: 15 }}>
      {currentUser && ( // to sync the data fetch and render timing
        <>
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
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            selectTextOnFocus
            textColor="#555"
            label="Location"
            mode="outlined"
            style={styles.editNameInput}
            value={gender}
            onChangeText={(text) => setGender(text)}
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

          <View style={{ paddingBottom: 20, gap: 5 }}>
            <Link asChild href="/me">
              <Button
                style={styles.saveChangesButton}
                mode="contained"
                onPress={handleOnSaveChanges}
              >
                Save Profile Changes
              </Button>
            </Link>

            <Link asChild href="/me">
              <Button
                style={styles.saveChangesButton}
                buttonColor={COLORS.secondary}
                mode="contained"
              >
                Cancel
              </Button>
            </Link>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
