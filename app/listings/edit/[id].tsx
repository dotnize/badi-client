import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { COLORS } from "~/lib/theme";
import { Inventory, Wish } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

const defaultPic =
  "https://imgs.search.brave.com/e9qAY7aH-OPEeojPKa4PxP4ig1wSJ1C6ly0Wqyn0nO0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/MjkwODc5Njk1MTIt/MWU4NWFhYjI2ODNk/P2F1dG89Zm9ybWF0/JmZpdD1jcm9wJnE9/ODAmdz0xMDAwJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRWOGZH/OWlhbVZqZEhOOFpX/NThNSHg4TUh4OGZE/QT0";

export default function EditListing() {
  const { id, url } = useLocalSearchParams();

  const [item, setItem] = useState<Inventory | Wish>();
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemKeywords, setItemKeyWords] = useState([]);
  const [itemImageUrls, setItemImageUrls] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState<string>(defaultPic);
  const [isPhotoPreviewVisibile, setIsPhotoPreviewVisible] = useState<boolean>(false);

  const [imageError, setImageError] = useState(false);

  const onPreviewPhoto = (photo: string) => {
    setCurrentPhoto(photo);
    setIsPhotoPreviewVisible(true);
  };

  const handleOnSaveChanges = () => {
    updateItem();
    router.back();
  };

  async function fetchItem() {
    const { data, error } = await apiFetch(`/${url}/${id}`);

    if (error) {
      console.log(error);
    } else {
      console.log(data);
      setItem(data);
      setItemName(data.name);
      setItemType(data.type);
      setItemDesc(data.description);
      setItemKeyWords(data.keywords);
      setItemImageUrls(data.imageUrls);
    }
  }

  async function updateItem() {
    const updateValues = {
      name: itemName,
      type: itemType,
      location: "sample",
      preferredOffer: "sample",
      keywords: itemKeywords,
      description: itemDesc,
      imageUrls: itemImageUrls,
    };

    const { data, error } = await apiFetch(`/${url}/${id}`, {
      method: "PUT", // or "PUT"
      body: JSON.stringify(updateValues),
    });

    if (error) {
      console.log("sadge");
    } else {
      console.log("Edited Item", typeof data, data);
    }
  }

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <View style={{ flex: 1, gap: 10 }}>
      <View style={{ flexDirection: "row", height: 200 }}>
        <Pressable style={{ flex: 1, height: 200 }} onPress={() => onPreviewPhoto(defaultPic)}>
          <Image
            style={{
              flex: 1,
              height: "100%",
              width: "100%",
              resizeMode: "cover",
            }}
            source={{ uri: imageError ? defaultPic : itemImageUrls[0] }}
            onError={() => {
              setImageError(true);
            }}
          />
        </Pressable>
      </View>
      <TextInput
        selectTextOnFocus
        textColor="#555"
        label="Item Name"
        mode="outlined"
        style={styles.editNameInput}
        value={itemName}
        onChangeText={(text) => setItemName(text)}
      />
      <TextInput
        selectTextOnFocus
        textColor="#555"
        label="Item Type"
        mode="outlined"
        style={styles.editNameInput}
        value={itemType}
        onChangeText={(text) => setItemType(text)}
      />
      <TextInput
        selectTextOnFocus
        textColor="#555"
        label="Item Description"
        mode="outlined"
        style={styles.editNameInput}
        value={itemDesc}
        onChangeText={(text) => setItemDesc(text)}
      />

      <View style={{ marginTop: "auto", padding: 10, gap: 5 }}>
        <Button style={styles.saveChangesButton} mode="contained" onPress={handleOnSaveChanges}>
          Save Item Changes
        </Button>

        <Button
          style={styles.saveChangesButton}
          buttonColor={COLORS.secondary}
          mode="contained"
          onPress={() => router.back()}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  editNameInput: {
    backgroundColor: "white",
    fontSize: 16,
    marginHorizontal: 10,
  },
  saveChangesButton: {
    width: "100%",
  },
});
