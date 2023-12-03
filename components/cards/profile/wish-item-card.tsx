import { AntDesign, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import PhotoPreview from "~/components/photo-preview";
import ConfirmModal from "../../confirm-modal";

const itemPhoto = require("~/assets/Kambing.png");

export default function WishItem({ editable, wish, onDelete }: any) {
  // VARIABLES
  const route = useRouter();
  const { id, description, name, keywords, type, imageUrls, user } = wish;

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

  const deleteWish = async () => {
    onDelete(); // remove the card explicitly
  };

  function viewItem(id: number) {
    route.push({ pathname: `/listings/${id}`, params: { url: "wish" } });
  }

  return (
    <Card style={{ height: "auto", margin: 8 }}>
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
          <Link asChild href={{ pathname: `/listings/edit/${id}`, params: { url: "wish" } }}>
            <MaterialCommunityIcons name="pencil-circle" size={24} color="black" />
          </Link>
          <MaterialIcons name="cancel" size={24} color="black" onPress={handleOnDeleteItem} />
        </View>
      )}

      {/* MODALS */}
      <ConfirmModal
        title={`Your Wish will be deleted.${"\n"}Are you sure?`}
        state={modalState}
        setState={setModalState}
        handleOnConfirmDelete={deleteWish}
      />
      <PhotoPreview
        photo={currentPhoto}
        state={isPhotoPreviewVisibile}
        setState={setIsPhotoPreviewVisible}
      />

      {/* MODALS END */}

      <Pressable style={{ height: 200 }} onPress={() => onPreviewPhoto(imageUrls[0])}>
        <Image
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            resizeMode: "cover",
            borderRadius: 10,
            marginBottom: 10,
          }}
          source={{ uri: imageUrls[0] }}
        />
      </Pressable>

      <Pressable onPress={() => viewItem(id)}>
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
            }}
          >
            <View>
              <Text variant="headlineSmall">{name}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text variant="titleSmall" style={{ color: "grey" }}>
                  {user.firstName}{" "}
                </Text>
                <Text
                  variant="titleSmall"
                  style={{
                    color: "grey",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  5(&#9733;) <AntDesign name="checkcircle" size={14} color="grey" />
                </Text>
                <Text variant="titleSmall" style={{ paddingHorizontal: 10, color: "grey" }}>
                  |
                </Text>
                <Text variant="titleSmall" style={{ color: "grey" }}>
                  {type}
                </Text>
              </View>
            </View>
            <Text style={{ marginLeft: "auto", paddingTop: 5 }}>11/27/35</Text>
          </View>

          <Text variant="titleMedium" style={{ marginVertical: 20 }}>
            {description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {Array.from({ length: keywords.length }, (_, index) => (
              <Text key={index} variant="titleSmall" style={{ color: "grey" }}>
                #{keywords[index]}
              </Text>
            ))}
          </View>
        </Card.Content>
      </Pressable>
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
