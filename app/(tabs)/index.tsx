import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, IconButton, Searchbar } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

import ListingCard from "~/components/cards/listing-card";
import { Inventory, Wish } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

export default function Index() {
  const { category, service, item, wish } = useLocalSearchParams();
  // TODO: handle filtering
  console.log(category, service, item, wish);

  const [searchValue, setSearchValue] = useState("");
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);

  async function fetchInventories() {
    const { data, error } = await apiFetch<Inventory[]>("/inventory");

    if (error) {
      console.log(error);
    } else {
      setInventories(data || []);
    }
  }

  async function fetchWishes() {
    const { data, error } = await apiFetch<Wish[]>("/wish");

    if (error) {
      console.log(error);
    } else {
      setWishes(data || []);
    }
  }

  useEffect(() => {
    fetchInventories();
    fetchWishes();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <Searchbar
          placeholder="Search..."
          value={searchValue}
          onChangeText={(query) => setSearchValue(query)}
          style={{ flex: 1 }}
        />
        <IconButton size={20} icon="bell" />
      </View>
      <TabsProvider defaultIndex={0}>
        <Tabs>
          <TabScreen label="Items">
            <FlatList
              contentContainerStyle={{ gap: 10, padding: 8 }}
              data={inventories.filter((inv) => inv.type === "item")}
              ListEmptyComponent={() => <ActivityIndicator animating />}
              renderItem={({ item }) => <ListingCard listing={item} />}
              keyExtractor={(item) => item.id.toString()}
            />
          </TabScreen>

          <TabScreen label="Services">
            <FlatList
              contentContainerStyle={{ gap: 10, padding: 8 }}
              data={inventories.filter((inv) => inv.type === "service")}
              ListEmptyComponent={() => <ActivityIndicator animating />}
              renderItem={({ item }) => <ListingCard listing={item} />}
              keyExtractor={(item) => item.id.toString()}
            />
          </TabScreen>
          <TabScreen label="Wishes">
            <FlatList
              contentContainerStyle={{ gap: 10, padding: 8 }}
              data={wishes}
              ListEmptyComponent={() => <ActivityIndicator animating />}
              renderItem={({ item }) => <ListingCard listing={item} />}
              keyExtractor={(item) => item.id.toString()}
            />
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
}
