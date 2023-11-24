// Nested in a dynamic route!
// e.g. /trades/1/update, /trades/8/update, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button, Text, TextInput } from "react-native-paper";

export default function PostTradeProgress() {
  const { id } = useLocalSearchParams();
  // If naa natay backend, pwede nato gamiton ang id ig fetch.
  const [details, setDetails] = useState("");
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    if (quantity !== -1 && quantity < 100) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      console.log(quantity);
    } else {
      setQuantity(100);
    }
  };

  const decrementQuantity = () => {
    if (quantity !== 0 && quantity > -1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      console.log(quantity);
    } else {
      setQuantity(0);
    }
  };
  const items = [
    { label: "Kanding", value: "1" },
    { label: "Kabayo", value: "2" },
    { label: "Itik", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

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
          <Text>Photos</Text>
          <Image
            source={require("~/assets/adaptive-icon.png")}
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
            <Button mode="contained" style={{ height: 40 }} onPress={incrementQuantity}>
              +
            </Button>
            <Text variant="titleMedium">{quantity}</Text>
            <Button mode="contained" style={{ height: 40 }} onPress={decrementQuantity}>
              -
            </Button>
          </View>
        </View>
      </View>

      <View style={{ width: "100%" }}>
        <Button mode="contained">Post Transaction Progress</Button>
      </View>
    </View>
  );
}
