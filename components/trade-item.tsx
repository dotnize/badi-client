import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import ConfirmModal from "./confirm-modal";
const itemPhoto = require("~/assets/Kambing.png");

export default function TradeItem({ editable = false }: { editable?: boolean }) {
  const [modalState, setModalState] = useState(false);

  console.log(itemPhoto, typeof itemPhoto.toString(), "lop");

  const handleOnEditItem = () => {};
  const handleOnDeleteItem = () => {
    setModalState(true);
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

      <ConfirmModal
        title={`Item will be deleted.${"\n"}Are you sure?`}
        state={modalState}
        setState={setModalState}
      />

      <Link href={{ pathname: "/photo-preview", params: { photo: itemPhoto.toString() } }}>
        <Image
          style={{
            flex: 1,
            height: 200,
            width: "100%",
            resizeMode: "cover",
            borderRadius: 10,
            marginBottom: 10,
          }}
          source={itemPhoto}
        />
      </Link>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
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
