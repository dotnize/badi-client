// URL: /me/edit

import { Link, router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import { useSession } from "~/hooks/useSession";
import { defaultAvatarUrl } from "~/lib/firebase";
import { COLORS } from "~/lib/theme";
import { User } from "~/lib/types";
import { apiFetch, pickImageGetURL } from "~/lib/utils";

export default function EditProfile() {
  const { user, setUser } = useSession();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || null);
  const [avatarUrl, setAvatarUrl] = useState<string>(user?.avatarUrl || "");

  async function selectImage() {
    const uploadedURL = await pickImageGetURL();
    if (uploadedURL) setAvatarUrl(uploadedURL);
  }

  async function saveChanges() {
    if (!user || !firstName || !lastName || !location) return;

    const newUser: User = { ...user, firstName, lastName, location, phoneNumber, avatarUrl };

    const { data, error } = await apiFetch<User>(`/user/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(newUser),
    });

    if (error || !data) {
      console.log(error || "Something went wrong while updating user profile");
    } else {
      setUser(data);
      // eslint-disable-next-line no-unused-expressions
      router.canGoBack() ? router.back() : router.push("/me");
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, gap: 15 }}>
      <TextInput
        selectTextOnFocus
        textColor="#555"
        label="First Name"
        mode="outlined"
        style={styles.editNameInput}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        selectTextOnFocus
        textColor="#555"
        label="Last Name"
        mode="outlined"
        style={styles.editNameInput}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        selectTextOnFocus
        textColor="#555"
        label="Location"
        mode="outlined"
        style={styles.editNameInput}
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        selectTextOnFocus
        textColor="#555"
        label="Phone number"
        mode="outlined"
        style={styles.editNameInput}
        value={phoneNumber || ""}
        onChangeText={setPhoneNumber}
      />
      <View style={styles.editProfileLabels}>
        <Text variant="titleMedium">Profile Picture</Text>
        <Button
          mode="contained"
          style={styles.editProfilePicButton}
          textColor={COLORS.primary}
          onPress={selectImage}
        >
          Edit
        </Button>
      </View>

      <Image style={styles.editProfilePic} source={{ uri: avatarUrl || defaultAvatarUrl }} />

      <View style={{ marginTop: "auto", gap: 5 }}>
        <Button onPress={saveChanges} style={styles.saveChangesButton} mode="contained">
          Save Profile Changess
        </Button>

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
