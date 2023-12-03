import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { useTabIndex } from "react-native-paper-tabs";
import PhotoPreview from "~/components/photo-preview";

const itemPhoto = require("~/assets/Kambing.png");

export default function HistoryItem({ editable = false }: { editable?: any }) {
  const tabIndex = useTabIndex();
  const tempId = 1 + Math.floor(Math.random() * 100); // TODO: replace with legit id
  const whatTab = tabIndex === 0 ? `/trades/${tempId}` : `/offers/${tempId}`;

  // STATES
  const [modalState, setModalState] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<string>(itemPhoto);
  const apple =
    "https://imgs.search.brave.com/PPT7-9-VZfK62z3KLwnDVV7uDqWLEqE3D7lnmjF6EVk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDU4/NjE3NzE3L3Bob3Rv/L2FwcGxlLWluYy1s/b2dvLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1sVTd5SWZQ/OUM0RlRzbmRlQWxu/em5raFowUjhsc1Ni/ODZtd3V0U2M2UmU0/PQ";
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
    <Link href={whatTab}>
      <View style={{ flex: 1, width: "100%" }}>
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
              <MaterialIcons name="cancel" size={24} color="BLACK" onPress={handleOnDeleteItem} />
            </View>
          )}
          {/* MODALS */}

          <PhotoPreview
            photo={currentPhoto}
            state={isPhotoPreviewVisibile}
            setState={setIsPhotoPreviewVisible}
          />

          {/* MODALS END */}

          <View
            style={{
              flexDirection: "row",
              flex: 1,
              marginBottom: 10,
              backgroundColor: "grey",
            }}
          >
            <Pressable style={{ flex: 1, height: 200 }} onPress={() => onPreviewPhoto(itemPhoto)}>
              <Image
                style={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  resizeMode: "cover",
                }}
                source={itemPhoto}
              />
            </Pressable>
            <Pressable style={{ flex: 1, height: 200 }} onPress={() => onPreviewPhoto(apple)}>
              <Image
                style={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  resizeMode: "cover",
                }}
                source={{ uri: apple }}
              />
            </Pressable>
          </View>

          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginBottom: 20,
                flex: 1,
              }}
            >
              <View>
                <Text variant="headlineSmall">Liden x Nize</Text>
              </View>
              <Text style={{ marginLeft: "auto", paddingTop: 5 }}>
                COMPLETED$
                <br />
                11/27/35
              </Text>
            </View>
            <Text>An apple for a goat</Text>
          </Card.Content>
        </Card>
      </View>
    </Link>
  );
}
