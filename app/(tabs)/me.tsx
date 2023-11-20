// hello guyss

import "react-native-gesture-handler";

import { AntDesign, Feather } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Card,
  IconButton,
  Modal,
  PaperProvider,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { COLORS } from "~/lib/theme";

export default function myProfile() {
  const Stack = createStackNavigator();

  const [profilePic, setProfilePic] = React.useState<string | null>(
    "https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/400620751_122117989682085260_870845570978591772_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=n0dELboLFD0AX8l9Tyk&_nc_ht=scontent.fmnl4-2.fna&oh=00_AfB-7lWn6a3qcT2rrZlMjXIr-fkxOyZ6yz_4GiFKrea4uA&oe=65588F78"
  );
  const updateProfilePic = (newProfilePic: string | null) => {
    setProfilePic(newProfilePic);
  };

  const [backgroundPic, setBackgroundPic] = React.useState<string | null>(
    "https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/400620751_122117989682085260_870845570978591772_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=n0dELboLFD0AX8l9Tyk&_nc_ht=scontent.fmnl4-2.fna&oh=00_AfB-7lWn6a3qcT2rrZlMjXIr-fkxOyZ6yz_4GiFKrea4uA&oe=65588F78"
  );
  const updateBackgroundPic = (newBackgroundPic: string | null) => {
    setBackgroundPic(newBackgroundPic);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}
      >
        {(props: any) => (
          <ProfileContent
            {...props}
            profilePic={profilePic}
            updateProfilePic={updateProfilePic}
            backgroundPic={backgroundPic}
            updateBackgroundPic={updateBackgroundPic}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Profile Photo">
        {(props: any) => <PicturePreview {...props} photo={profilePic} />}
      </Stack.Screen>
      <Stack.Screen name="Cover Photo">
        {(props: any) => <PicturePreview {...props} photo={backgroundPic} />}
      </Stack.Screen>
      <Stack.Screen name="Ratings & Reviews">
        {(props: any) => <RatingsReviews {...props} photo={backgroundPic} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const RatingsReviews = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={INVENTORY}
        renderItem={({ item }) => <CardComponent content={item.content} />}
        keyExtractor={(item) => item.id.toString()}
        style={{ height: 1000 }}
      />
    </View>
  );
};
const PicturePreview = ({ navigation, photo }: any) => {
  console.log(photo);
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Image
        style={styles.photoPreview}
        source={{
          uri: photo ? photo : "Error",
        }}
      />
    </View>
  );
};

function ProfileContent({
  navigation,
  profilePic,
  updateProfilePic,
  backgroundPic,
  updateBackgroundPic,
}: any) {
  const Tab = createMaterialTopTabNavigator();

  const [name, setName] = React.useState("Liden U. Hoe");
  const [nameInput, setNameInput] = React.useState(name);
  const [visible, setVisible] = React.useState(false);
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setSnackBarVisible(true);
  };

  const onDismissSnackBar = () => setSnackBarVisible(false);

  // Function to pick an image from
  //the device's media library
  const pickImage = async (urlPic: string) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      Alert.alert("Permission Denied", `Sorry, we need cameraroll permission to upload images.`);
    } else {
      // Launch the image library and get
      // the selected image
      const result = await ImagePicker.launchImageLibraryAsync();

      if (result?.assets?.[0]?.uri) {
        // If an image is selected (not cancelled),
        // update the file state variable
        if (urlPic === "profile") {
          // setProfilePic(result?.assets?.[0]?.uri);
          updateProfilePic(result?.assets?.[0]?.uri);
        } else if (urlPic === "background") {
          // setBackgroundPic(result?.assets?.[0]?.uri);
          updateBackgroundPic(result?.assets?.[0]?.uri);
        }
      }
    }
  };

  const [scrollEnabled, setScrollEnabled] = React.useState(true);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    const scrollThreshold = 370;

    if (currentOffsetY >= scrollThreshold) {
      setScrollEnabled(false);
      // If the user tries to scroll beyond the threshold, prevent further scrolling
      scrollViewRef.current?.scrollTo({ x: 0, y: 370, animated: false });
    }
    console.log(currentOffsetY);
    // setScrollEnabled(currentOffsetY < scrollThreshold);
    // setScrollEnabled(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <PaperProvider>
        <Portal>
          <Modal
            style={styles.editProfileModal}
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContainerStyle}
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
                marginBottom: 10,
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
                textColor={COLORS.primary}
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
                textColor={COLORS.primary}
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
          <Snackbar visible={snackBarVisible} duration={2000} onDismiss={onDismissSnackBar}>
            Profile Saved! Liden U. HoeeS
          </Snackbar>
        </Portal>

        <ScrollView
          style={{ flex: 1 }}
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={5}
        >
          {/* <View style={{ alignSelf: "center", padding: 15 }}>
          <Text variant="titleLarge" style={{ color: "black" }}>
            Profile
          </Text>
        </View> */}

          <IconButton onPress={() => navigation.goBack()} icon="arrow-left" />
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

          <Button
            icon="pencil"
            mode="outlined"
            style={styles.editProfileButton}
            contentStyle={{ flexDirection: "row-reverse" }}
            textColor={COLORS.primary}
            onPress={showModal}
          >
            Edit Profile
          </Button>
          <View style={styles.profileLabels}>
            <Text variant="headlineMedium" style={{ color: "black" }}>
              Liden U. Hoe
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("Ratings & Reviews")}>
              <Text
                variant="titleLarge"
                style={{
                  color: "black",
                  // textDecorationLine: "underline",
                  // textDecorationColor: COLORS.primary,
                }}
              >
                &#9733; &#9733; &#9733; (69) &nbsp;
                <AntDesign name="infocirlceo" size={20} color="black" />
              </Text>
            </TouchableOpacity>
          </View>

          <Tab.Navigator
            screenOptions={{
              // tabBarActiveTintColor: "#e91e63",
              tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
              tabBarLabelStyle: { fontSize: 12 },
              tabBarStyle: { backgroundColor: "none" },
            }}
          >
            <Tab.Screen name="Inventory" component={InventoryScreen} />
            <Tab.Screen name="Wishes" component={WishesScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
          </Tab.Navigator>
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
  },
  photoPreview: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  backgroundPic: {
    resizeMode: "contain",
    backgroundColor: "#f0f0f0",
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
    top: 180, // Adjust top position as needed
    left: 25, // Adjust left position as needed

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
