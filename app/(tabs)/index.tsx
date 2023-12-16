import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, IconButton, Searchbar } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

import ListingCard from "~/components/cards/listing-card";
import { Inventory, Wish } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

export default function Index() {
  const { category, services, items, query } = useLocalSearchParams();

  const [searchValue, setSearchValue] = useState((query as string) || "");
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
          mode="bar"
          placeholder="Search..."
          value={searchValue}
          onChangeText={setSearchValue}
          style={{ flex: 1 }}
          right={() => (
            <Link href="/search" asChild>
              <IconButton icon="filter" />
            </Link>
          )}
        />
      </View>
      <TabsProvider defaultIndex={0}>
        <Tabs>
          <TabScreen label="Inventories">
            <FlatList
              contentContainerStyle={{ gap: 10, padding: 8 }}
              data={inventories
                .filter((inventory) =>
                  (category as string) ? inventory.keywords.includes(category as string) : true
                )
                .filter((inventory) =>
                  searchValue
                    ? inventory.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                      inventory.keywords.includes(searchValue.toLowerCase())
                    : true
                )
                .filter((inventory) =>
                  (services as string) && !items ? inventory.type === "service" : true
                )
                .filter((inventory) =>
                  (items as string) && !services ? inventory.type === "item" : true
                )}
              ListEmptyComponent={() => <ActivityIndicator animating />}
              renderItem={({ item }) => <ListingCard listing={item} type="inventory" />}
              keyExtractor={(item) => item.id.toString()}
            />
          </TabScreen>
          <TabScreen label="Wishes">
            <FlatList
              contentContainerStyle={{ gap: 10, padding: 8 }}
              data={wishes}
              ListEmptyComponent={() => <ActivityIndicator animating />}
              renderItem={({ item }) => <ListingCard listing={item} type="wish" />}
              keyExtractor={(item) => item.id.toString()}
            />
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
}
