// Nested in a dynamic route!
// e.g. /trades/1/update, /trades/8/update, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button, Text, TextInput } from "react-native-paper";
import { useSession } from "~/hooks/useSession";
import { emptyImageUrl } from "~/lib/firebase";
import { TradeInventory } from "~/lib/types";
import { apiFetch, pickImageGetURL } from "~/lib/utils";

export default function PostTradeProgress() {
  const { id } = useLocalSearchParams();
  const { user } = useSession();

  const [tradeInventory, setTradeInventory] = useState<TradeInventory[]>([]);
  const [items, setItems] = useState<{ label: string | undefined; value: string }[]>([]);
  const [details, setDetails] = useState("");
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [incrementQuantity, setIncrementQuantity] = useState(0);
  const [imageUrl, setImageUrl] = useState<string>("");

  // If naa natay backend, pwede nato gamiton ang id ig fetch.

  async function getTradeInventory() {
    const { data, error } = await apiFetch<TradeInventory[]>(`/tradeinventory/group/${id}`);
    if (error) {
      console.log(error);
    } else {
      if (data) {
        const filteredData = data.filter(
          (trade) => trade.senderId === user?.id && !trade.isCompleted
        );
        setTradeInventory(filteredData);
      }
    }
  }

  useEffect(() => {
    if (user?.id) {
      getTradeInventory();
    }
  }, [user?.id]);

  useEffect(() => {
    const formattedItems = tradeInventory.map((trade, index) => ({
      label: trade.inventory?.name,
      value: String(trade.id),
    }));
    setItems(formattedItems);
  }, [tradeInventory]);

  async function updateTradeInventory() {
    const { data, error } = await apiFetch<TradeInventory>(`/tradeinventory/${value}`, {
      method: "PUT",
      body: JSON.stringify({
        incrementQuantity,
      }),
    });
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      router.back();
      router.replace(`/trades/${id}`);
    }
  }

  const increment = () => {
    if (incrementQuantity !== -1 && incrementQuantity < Number.MAX_SAFE_INTEGER) {
      setIncrementQuantity((prevQuantity) => prevQuantity + 1);
      console.log(incrementQuantity);
    } else {
      setIncrementQuantity(Number.MAX_SAFE_INTEGER);
    }
  };

  const decrement = () => {
    if (incrementQuantity !== 0 && incrementQuantity > -1) {
      setIncrementQuantity((prevQuantity) => prevQuantity - 1);
      console.log(incrementQuantity);
    } else {
      setIncrementQuantity(0);
    }
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={{
            position: "absolute",
            backgroundColor: "white",
            left: 22,
            top: 8,
            zIndex: 999,
            paddingHorizontal: 6,
            fontSize: 14,
            color: isFocus ? "lightgreen" : "black",
          }}
        >
          Items
        </Text>
      );
    }
    return null;
  };

  async function selectImage() {
    const uploadedURL = await pickImageGetURL();
    if (uploadedURL) setImageUrl(uploadedURL);
  }

  return (
    <View style={{ flex: 1, padding: 8, gap: 8 }}>
      <View style={{ width: "100%", flex: 1, gap: 12 }}>
        <Text style={{ alignSelf: "center" }} variant="titleMedium">
          Update Progress
        </Text>
        <View style={{ width: "100%" }}>
          <Text>Select item from trade</Text>
          <View style={{ padding: 14 }}>
            {renderLabel()}
            <Dropdown
              style={{
                height: 50,
                borderWidth: 0.5,
                borderRadius: 8,
                paddingHorizontal: 8,
                borderColor: isFocus ? "lightgreen" : "gray",
              }}
              search
              maxHeight={250}
              data={items}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select an item" : "..."}
              searchPlaceholder="Search..."
              selectedTextStyle={{ fontSize: 14 }}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        </View>

        <View style={{ width: "100%" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>Photos</Text>
            <Button mode="contained" onPress={selectImage}>
              Add image
            </Button>
          </View>
          <Image
            source={{ uri: imageUrl || emptyImageUrl }}
            style={{ width: 256, height: 256, alignSelf: "center" }}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Text>Details (optional)</Text>
          <TextInput
            style={{ flex: 1 }}
            mode="outlined"
            label="Details"
            value={details}
            onChangeText={(text) => {
              setDetails(text);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 8,
            width: "100%",
          }}
        >
          <Text>Quantity</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Button mode="contained" style={{ height: 40 }} onPress={increment}>
              +
            </Button>
            <Text variant="titleMedium">{incrementQuantity}</Text>
            <Button mode="contained" style={{ height: 40 }} onPress={decrement}>
              -
            </Button>
          </View>
        </View>
      </View>

      <View style={{ width: "100%" }}>
        <Button mode="contained" onPress={updateTradeInventory}>
          Post Transaction Progress
        </Button>
      </View>
    </View>
  );
}
