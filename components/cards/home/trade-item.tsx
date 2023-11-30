import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import PhotoPreview from "~/components/photo-preview";
import ConfirmModal from "../../confirm-modal";

const itemPhoto = require("~/assets/Kambing.png");

export default function TradeItem({ editable, wish }: { editable?: any; wish?: any }) {
  // VARIABLES

  // STATES
  const [modalState, setModalState] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<string>(itemPhoto);
  const [isPhotoPreviewVisibile, setIsPhotoPreviewVisible] = useState<boolean>(false);

  const handleOnEditItem = () => {};
  const handleOnDeleteItem = () => {
    setModalState(true);
  };

  const onPreviewPhoto = (photo: string) => {
    setCurrentPhoto(photo);
    setIsPhotoPreviewVisible(true);
  };

  return (
    <Card style={{ height: "auto", margin: 8, paddingBottom: 10 }}>
      {editable && (
        <View
          style={{
            position: "absolute",
            top: 5,
            right: 10,
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            zIndex: 999,
          }}
        >
          {/* <FontAwesome5 name="pen" size={19} color="white" onPress={handleOnEditItem} />
          <Feather name="x" size={24} color="white" onPress={handleOnDeleteItem} /> */}

          <MaterialCommunityIcons
            name="pencil-circle"
            size={24}
            color="white"
            onPress={handleOnEditItem}
          />
          <MaterialIcons name="cancel" size={24} color="white" onPress={handleOnDeleteItem} />
        </View>
      )}

      {/* MODALS */}
      <ConfirmModal
        title={`Item will be deleted.${"\n"}Are you sure?`}
        state={modalState}
        setState={setModalState}
      />
      <PhotoPreview
        photo={currentPhoto}
        state={isPhotoPreviewVisibile}
        setState={setIsPhotoPreviewVisible}
      />

      {/* MODALS END */}

      <Pressable style={{ height: 200 }} onPress={() => onPreviewPhoto(itemPhoto)}>
        <Image
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            resizeMode: "cover",
            borderRadius: 10,
            marginBottom: 10,
          }}
          source={itemPhoto}
        />
      </Pressable>
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <View>
            <Text variant="headlineSmall">High Quality Kambing</Text>
            <View style={{ flexDirection: "row" }}>
              <Text variant="titleSmall" style={{ color: "grey" }}>
                Liden{" "}
              </Text>
              <Text variant="titleSmall" style={{ color: "grey" }}>
                &#9733; &#9733; &#9733; &#9733;
              </Text>
              <Text variant="titleSmall" style={{ paddingHorizontal: 10, color: "grey" }}>
                |
              </Text>
              <Text variant="titleSmall" style={{ color: "grey" }}>
                Labangon, Cebu
              </Text>
            </View>
          </View>
          <Text style={{ marginLeft: "auto", paddingTop: 5 }}>11/27/35</Text>
        </View>
        <Text>
          {"description" ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  profilePic: {
    resizeMode: "cover",
    borderRadius: 100,
    height: 40,
    width: 40,
  },
});
