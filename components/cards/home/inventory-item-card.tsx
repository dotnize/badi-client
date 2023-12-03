import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import PhotoPreview from "~/components/photo-preview";
import ConfirmModal from "../../confirm-modal";

const itemPhoto = require("~/assets/Kambing.png");

export default function InventoryItem({ editable, inventory, onDelete }: any) {
  // VARIABLES
  const route = useRouter();

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

  const deleteInventory = async () => {
    onDelete(); // remove the card explicitly
  };

  function viewItem(id: number) {
    route.push({ pathname: `/listings/${inventory.id}`, params: { url: "inventory" } });
  }

  return (
    <Card style={{ height: "auto", margin: 8, paddingBottom: 10 }}>
      {inventory && (
        <>
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

              <Link
                asChild
                href={{ pathname: `/listings/edit/${inventory.id}`, params: { url: "inventory" } }}
              >
                <MaterialCommunityIcons name="pencil-circle" size={24} color="black" />
              </Link>
              <MaterialIcons name="cancel" size={24} color="black" onPress={handleOnDeleteItem} />
            </View>
          )}

          {/* MODALS */}
          <ConfirmModal
            title={`Item will be deleted.${"\n"}Are you sure?`}
            state={modalState}
            setState={setModalState}
            handleOnConfirmDelete={deleteInventory}
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
              source={inventory.imageUrls[0] ? { uri: inventory.imageUrls[0] } : itemPhoto}
            />
          </Pressable>
          <Pressable onPress={() => viewItem(inventory.id)}>
            <Card.Content>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <View>
                  <Text variant="headlineSmall">{inventory.name}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text variant="titleSmall" style={{ color: "grey" }}>
                      {inventory.user.firstName}
                    </Text>
                    <Text variant="titleSmall" style={{ color: "grey" }}>
                      &#9733; &#9733; &#9733; &#9733;
                    </Text>
                    <Text variant="titleSmall" style={{ paddingHorizontal: 10, color: "grey" }}>
                      |
                    </Text>
                    <Text variant="titleSmall" style={{ color: "grey" }}>
                      {inventory.location}
                    </Text>
                    <Text variant="titleSmall" style={{ paddingHorizontal: 10, color: "grey" }}>
                      |
                    </Text>
                    <Text variant="titleSmall" style={{ color: "grey" }}>
                      {inventory.type}
                    </Text>
                  </View>
                </View>
              </View>
              <Text>{inventory.description}</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {Array.from({ length: inventory.keywords.length }, (_, index) => (
                  <Text key={index} variant="titleSmall" style={{ color: "grey" }}>
                    #{inventory.keywords[index]}
                  </Text>
                ))}
              </View>
            </Card.Content>
          </Pressable>
        </>
      )}
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
