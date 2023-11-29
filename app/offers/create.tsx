// URL: /offers/create

import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
import OfferItem from "~/components/cards/offer/offer-item";
import ItemsCard from "~/components/cards/offer/select-item";

// Magamit man guro ni for both New Offer and Edit Counter Offer?

function AddItemModal() {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle: ViewStyle = {
    backgroundColor: "white",
    padding: 24,
    alignSelf: "center",
    justifyContent: "center",
    width: "90%",
    height: "90%",
  };
  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
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
              onPress={hideModal}
            />
          </View>
          <ScrollView style={{ padding: 8, marginTop: 8, marginBottom: 8 }}>
            <ItemsCard />
            <ItemsCard />
            <ItemsCard />
            <ItemsCard />
            <ItemsCard />
            <ItemsCard />
            <ItemsCard />
            <ItemsCard />
          </ScrollView>
          <Button onPress={hideModal} mode="contained" dark={true}>
            Add items
          </Button>
        </Modal>
      </Portal>
      <Button
        style={{
          alignSelf: "flex-end",
          padding: 8,
        }}
        onPress={showModal}
        icon={"plus"}
      >
        Add more
      </Button>
    </>
  );
}

export default function CreateOffer() {
  return (
    <View style={{ flex: 1, alignItems: "center", padding: 8, justifyContent: "space-around" }}>
      <Text variant="titleMedium">!usernames! Offer</Text>

      <Text style={{ alignSelf: "flex-start", padding: 8 }}>You receive</Text>

      <ScrollView style={{ width: "100%", padding: 8, gap: 8, flex: 1 }}>
        <OfferItem />
        <OfferItem />
        <OfferItem />
        <OfferItem />
      </ScrollView>
      <View
        style={{
          alignSelf: "flex-end",
        }}
      >
        <AddItemModal />
      </View>
      <Text style={{ alignSelf: "flex-start", padding: 8 }}>You will send</Text>
      <ScrollView style={{ width: "100%", padding: 8, gap: 8, flex: 1 }}>
        <OfferItem />
        <OfferItem />
        <OfferItem />
        <OfferItem />
      </ScrollView>
      <View style={{ alignSelf: "flex-end" }}>
        <AddItemModal />
      </View>
      <View style={{ width: "100%", gap: 8, padding: 8 }}>
        <Button mode="contained">Offer Trade</Button>
      </View>
    </View>
  );
}

// katong "+ Add more" nga button para select sa items, pwede ra guro modal?
