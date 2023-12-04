// URL: /offers/create

import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { Avatar, Button, Card, IconButton, Modal, Portal, Text } from "react-native-paper";

import ItemsCard from "~/components/cards/offer/select-item";
import { useSession } from "~/hooks/useSession";
import { emptyImageUrl } from "~/lib/firebase";
import { Inventory, TradeInventory } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

// Magamit man guro ni for both New Offer and Edit Counter Offer?
const containerStyle: ViewStyle = {
  backgroundColor: "white",
  padding: 24,
  alignSelf: "center",
  justifyContent: "center",
  width: "90%",
  height: "90%",
};

export default function CreateOffer() {
  const { user } = useSession();
  const { id, offerId } = useLocalSearchParams();
  // TODO: offerId for edit counter offer

  const [myInventories, setMyInventories] = useState<Inventory[]>([]);
  const [theirInventories, setTheirInventories] = useState<Inventory[]>([]);

  const [mySelectedItems, setMySelectedItems] = useState<Partial<TradeInventory>[]>([]);
  const [theirSelectedItems, setTheirSelectedItems] = useState<Partial<TradeInventory>[]>([]);

  const [modalTheirItemsVisible, setModalTheirItemsVisible] = useState(false);
  const [modalMyItemsVisible, setModalMyItemsVisible] = useState(false);

  async function submitOffer() {
    if (!mySelectedItems.length || !theirSelectedItems.length) return;

    console.log("IDs");
    console.log(mySelectedItems[0].inventoryId);
    console.log(theirSelectedItems[0].inventoryId);

    const { data, error } = await apiFetch(`/tradegroup`, {
      method: "POST",
      body: JSON.stringify({
        tradeInventories: [...mySelectedItems, ...theirSelectedItems],
        user1Id: user?.id,
        user2Id: theirSelectedItems[0].inventory?.userId,
      }),
    });
    if (error || !data) {
      console.log(error || "No data");
    } else {
      console.log(data);
      // eslint-disable-next-line no-unused-expressions
      router.canGoBack() ? router.back() : router.replace("/");
    }
  }

  useEffect(() => {
    fetchMyInventories();
    fetchTheirInventories();
  }, [user]);

  async function fetchMyInventories() {
    const { data, error } = await apiFetch<Inventory[]>(`/inventory/user/${user?.id}`);

    if (error || !data) {
      console.log(error || "No data");
    } else {
      setMyInventories(data);
    }
  }

  async function fetchTheirInventories() {
    if (id) {
      const { data, error } = await apiFetch<Inventory>(`/inventory/${id}`);

      if (error || !data) {
        console.log(error || "No data");
      } else {
        setTheirSelectedItems([
          {
            inventory: data,
            inventoryId: data.id,
            totalQuantity: 1,
            senderId: data.userId,
            receiverId: user?.id,
          },
        ]);
        const otherUserId = data.userId;

        // fetch all of their inventories
        const newRes = await apiFetch<Inventory[]>(`/inventory/user/${otherUserId}`);

        if (newRes.error || !newRes.data) {
          console.log(newRes.error || "No data");
        } else {
          setTheirInventories(newRes.data);
        }
      }
    }
  }
  return (
    <View style={{ flex: 1, alignItems: "center", padding: 8, justifyContent: "space-around" }}>
      <Text variant="titleMedium">
        Trade offer to {theirSelectedItems[0]?.inventory?.user?.firstName}
      </Text>

      <Text style={{ alignSelf: "flex-start", padding: 8 }}>You receive</Text>

      <ScrollView style={{ width: "100%", padding: 8, gap: 8, flex: 1 }}>
        {/* TODO: use FlatList */}
        {theirSelectedItems.map((item, i) => (
          <Card key={i} elevation={2} style={{ margin: 8 }}>
            <Card.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <Avatar.Image
                  size={72}
                  source={{ uri: item.inventory?.imageUrls[0] || emptyImageUrl }}
                />
                <View style={{ gap: 5 }}>
                  <Text variant="titleSmall">{item.inventory?.name}</Text>
                  <Text variant="labelSmall">from {item.inventory?.user?.firstName}</Text>
                </View>
              </View>
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <IconButton
                  icon="minus"
                  onPress={() => {
                    const all = [...theirSelectedItems];
                    (all[i].totalQuantity as number)--;
                    if (all[i].totalQuantity === 0) all.splice(i, 1);
                    setTheirSelectedItems(all);
                  }}
                />
                <Text variant="titleLarge">{item.totalQuantity}</Text>
                <IconButton
                  icon="plus"
                  onPress={() => {
                    const all = [...theirSelectedItems];
                    (all[i].totalQuantity as number)++;
                    setTheirSelectedItems(all);
                  }}
                />
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <View
        style={{
          alignSelf: "flex-end",
        }}
      >
        <Portal>
          <Modal
            visible={modalTheirItemsVisible}
            onDismiss={() => setModalTheirItemsVisible(false)}
            contentContainerStyle={containerStyle}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text variant="titleMedium">Add Items</Text>
                <Text variant="labelSmall">Select item to add</Text>
              </View>
              <Feather
                style={{ alignSelf: "flex-end" }}
                name="x"
                size={24}
                color="black"
                onPress={() => setModalTheirItemsVisible(false)}
              />
            </View>
            <ScrollView style={{ padding: 8, marginTop: 8, marginBottom: 8 }}>
              {/* TODO: use FLatList */}
              {theirInventories.map((inv, i) => (
                <ItemsCard
                  onPress={() => {
                    const old = [...theirSelectedItems];
                    old.push({
                      inventory: inv,
                      inventoryId: inv.id,
                      totalQuantity: 1,
                      senderId: inv.userId,
                      receiverId: user?.id,
                    });
                    setTheirSelectedItems(old);
                    setModalTheirItemsVisible(false);
                  }}
                  key={i}
                  name={inv.name}
                  imageUrl={inv.imageUrls[0]}
                />
              ))}
            </ScrollView>
          </Modal>
        </Portal>
        <Button
          style={{
            alignSelf: "flex-end",
            padding: 8,
          }}
          onPress={() => setModalTheirItemsVisible(true)}
          icon="plus"
        >
          Add more
        </Button>
      </View>
      <Text style={{ alignSelf: "flex-start", padding: 8 }}>You will send</Text>
      <ScrollView style={{ width: "100%", padding: 8, gap: 8, flex: 1 }}>
        {/* TODO: use FlatList */}
        {mySelectedItems.map((item, i) => (
          <Card key={i} elevation={2} style={{ margin: 8 }}>
            <Card.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <Avatar.Image
                  size={72}
                  source={{ uri: item.inventory?.imageUrls[0] || emptyImageUrl }}
                />
                <View style={{ gap: 5 }}>
                  <Text variant="titleSmall">{item.inventory?.name}</Text>
                  <Text variant="labelSmall">from {user?.firstName}</Text>
                </View>
              </View>
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <IconButton
                  icon="minus"
                  onPress={() => {
                    const all = [...mySelectedItems];
                    (all[i].totalQuantity as number)--;
                    if (all[i].totalQuantity === 0) all.splice(i, 1);
                    setMySelectedItems(all);
                  }}
                />
                <Text variant="titleLarge">{item.totalQuantity}</Text>
                <IconButton
                  icon="plus"
                  onPress={() => {
                    const all = [...mySelectedItems];
                    (all[i].totalQuantity as number)++;
                    setMySelectedItems(all);
                  }}
                />
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <View
        style={{
          alignSelf: "flex-end",
        }}
      >
        <Portal>
          <Modal
            visible={modalMyItemsVisible}
            onDismiss={() => setModalMyItemsVisible(false)}
            contentContainerStyle={containerStyle}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text variant="titleMedium">Add Items</Text>
                <Text variant="labelSmall">Select item to add</Text>
              </View>
              <Feather
                style={{ alignSelf: "flex-end" }}
                name="x"
                size={24}
                color="black"
                onPress={() => setModalMyItemsVisible(false)}
              />
            </View>
            <ScrollView style={{ padding: 8, marginTop: 8, marginBottom: 8 }}>
              {/* TODO: use FLatList */}
              {myInventories.map((inv, i) => (
                <ItemsCard
                  onPress={() => {
                    const old = [...mySelectedItems];
                    old.push({
                      inventory: inv,
                      inventoryId: inv.id,
                      totalQuantity: 1,
                      senderId: inv.userId,
                      receiverId: theirInventories[0].userId,
                    });
                    setMySelectedItems(old);
                    setModalMyItemsVisible(false);
                  }}
                  key={i}
                  name={inv.name}
                  imageUrl={inv.imageUrls[0]}
                />
              ))}
            </ScrollView>
          </Modal>
        </Portal>
        <Button
          style={{
            alignSelf: "flex-end",
            padding: 8,
          }}
          onPress={() => setModalMyItemsVisible(true)}
          icon="plus"
        >
          Add more
        </Button>
      </View>
      <View style={{ width: "100%", gap: 8, padding: 8 }}>
        <Button mode="contained" onPress={submitOffer}>
          Offer Trade
        </Button>
      </View>
    </View>
  );
}

// katong "+ Add more" nga button para select sa items, pwede ra guro modal?
