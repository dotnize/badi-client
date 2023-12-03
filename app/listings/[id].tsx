// Dynamic route!
// e.g. /listings/1, /listings/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { COLORS } from "~/lib/theme";
import { Inventory, Wish } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

const defaultPic =
  "https://imgs.search.brave.com/e9qAY7aH-OPEeojPKa4PxP4ig1wSJ1C6ly0Wqyn0nO0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/MjkwODc5Njk1MTIt/MWU4NWFhYjI2ODNk/P2F1dG89Zm9ybWF0/JmZpdD1jcm9wJnE9/ODAmdz0xMDAwJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRWOGZH/OWlhbVZqZEhOOFpX/NThNSHg4TUh4OGZE/QT0";

export default function ListingDetails() {
  const { id, url } = useLocalSearchParams();
  const router = useRouter();

  const [imageError, setImageError] = useState(false);

  const [item, setItem] = useState<Inventory | Wish>();
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemKeywords, setItemKeyWords] = useState([]);
  const [itemImageUrls, setItemImageUrls] = useState([]);
  const [location, setLocation] = useState("");

  const handleEditItem = async () => {
    router.push({ pathname: `/listings/edit/${id}`, params: { url: url } });
  };

  const handleDeleteItem = async () => {
    const { data, error } = await apiFetch(`/{${url}/${id}`, { method: "DELETE" });

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }

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
      if (url == "inventory") {
        setLocation(data.location);
      } else {
        setLocation(data.user.location);
      }

      console.log("po", location);
    }
  }

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <View style={{ flex: 1, gap: 10 }}>
      <View style={{ flexDirection: "row", height: 200 }}>
        {/* <Pressable style={{ flex: 1, height: 200 }} onPress={() => onPreviewPhoto(defaultPic)}> */}
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
        {/* </Pressable> */}
      </View>
      <View style={{ flex: 1, padding: 15 }}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <View>
            <Text variant="headlineSmall">{itemName}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text variant="titleSmall" style={{ color: "grey" }}>
                {item?.user?.firstName}
              </Text>
              <Text variant="titleSmall" style={{ color: "grey" }}>
                &#9733; &#9733; &#9733; &#9733;
              </Text>
              <Text variant="titleSmall" style={{ paddingHorizontal: 10, color: "grey" }}>
                |
              </Text>
              <Text variant="titleSmall" style={{ color: "grey" }}>
                {location}
              </Text>
              <Text variant="titleSmall" style={{ paddingHorizontal: 10, color: "grey" }}>
                |
              </Text>
              <Text variant="titleSmall" style={{ color: "grey" }}>
                {itemType}
              </Text>
            </View>
          </View>
        </View>
        <Text>{itemDesc}</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          {Array.from({ length: itemKeywords.length }, (_, index) => (
            <Text key={index} variant="titleSmall" style={{ color: "grey" }}>
              #{itemKeywords[index]}
            </Text>
          ))}
        </View>

        <View style={{ marginTop: "auto", padding: 10, gap: 5 }}>
          <Button style={styles.saveChangesButton} mode="contained" onPress={handleEditItem}>
            Edit Item
          </Button>

          <Button
            style={styles.saveChangesButton}
            buttonColor={COLORS.secondary}
            mode="contained"
            onPress={() => handleDeleteItem}
          >
            Delete Item
          </Button>
        </View>
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
