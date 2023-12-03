// URL: /search

import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Chip, IconButton, RadioButton, Searchbar } from "react-native-paper";

export default function Search() {
  const [itemsChip, setItemsChip] = useState<string | null>(null);
  const [servicesChip, setServicesChip] = useState<string | null>(null);
  const [wishesChip, setWishesChip] = useState<string | null>(null);
  const [selectedRadioButton, setSelectedRadioButton] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const radioButtonsData = new Map<number, string>([
    [0, "Apparels"],
    [1, "Accessories"],
    [2, "Bags"],
    [3, "Books"],
    [4, "Hobbies"],
  ]);
  const radioButtonsData2 = new Map<number, string>([
    [5, "Appliances"],
    [6, "Gadgets"],
    [7, "Vehicles"],
    [8, "Shoes"],
    [9, "Sports"],
  ]);

  const filterButton = () => {
    const queryParams = new URLSearchParams();
    if (searchQuery) {
      queryParams.set("query", searchQuery);
    }
    if (itemsChip) {
      queryParams.set("items", "true");
    }
    if (servicesChip) {
      queryParams.set("services", "true");
    }
    if (wishesChip) {
      queryParams.set("wishes", "true");
    }
    if (selectedRadioButton) {
      const category =
        radioButtonsData.get(parseInt(selectedRadioButton)) ||
        radioButtonsData2.get(parseInt(selectedRadioButton));
      console.log(category);
      if (category) {
        queryParams.set("category", category.toLowerCase());
      }
    }

    const queryString = queryParams.toString();
    const url = queryString ? `/?${queryString}` : "/";

    router.push(url);
  };

  return (
    <View style={{ flex: 1, height: "100%", padding: 8, gap: 8 }}>
      <Searchbar
        placeholder="Search"
        mode="bar"
        right={() => <IconButton icon="filter" onPress={filterButton} />}
        onChangeText={(query) => {
          setSearchQuery(query);
          console.log(searchQuery);
        }}
        value={searchQuery}
      />
      <View style={{ flexDirection: "row", width: "100%", gap: 12, marginLeft: 8 }}>
        <Chip
          onPress={() => {
            if (itemsChip === "Items") {
              setItemsChip(null);
            } else {
              setItemsChip("Items");
            }
          }}
          selected={itemsChip === "Items"}
        >
          Items
        </Chip>
        <Chip
          onPress={() => {
            if (servicesChip === "Services") {
              setServicesChip(null);
            } else {
              setServicesChip("Services");
            }
          }}
          selected={servicesChip === "Services"}
        >
          Services
        </Chip>
        <Chip
          onPress={() => {
            if (wishesChip === "Wishes") {
              setWishesChip(null);
            } else {
              setWishesChip("Wishes");
            }
          }}
          selected={wishesChip === "Wishes"}
        >
          Wishes
        </Chip>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          {Array.from(radioButtonsData).map(([key, value]) => (
            <RadioButton.Item
              key={key}
              label={value}
              value={key.toString()}
              status={selectedRadioButton === key.toString() ? "checked" : "unchecked"}
              onPress={() => setSelectedRadioButton(key.toString())}
            />
          ))}
        </View>

        <View style={{ flex: 1 }}>
          {Array.from(radioButtonsData2).map(([key, value]) => (
            <RadioButton.Item
              key={key}
              label={value}
              value={key.toString()}
              status={selectedRadioButton === key.toString() ? "checked" : "unchecked"}
              onPress={() => setSelectedRadioButton(key.toString())}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
