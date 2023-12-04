// Dynamic route!
// e.g. /listings/1, /listings/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { Avatar, Button, Chip, Text } from "react-native-paper";

import { useSession } from "~/hooks/useSession";
import { COLORS } from "~/lib/theme";
import { Inventory } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

export default function ListingDetails() {
  const { id } = useLocalSearchParams();
  const { user } = useSession();

  const [inventory, setInventory] = useState<Inventory | null>(null);

  async function fetchInventory() {
    const { data, error } = await apiFetch<Inventory>(`/inventory/${id}`);

    if (error) {
      console.log(error);
    } else {
      console.log(data);
      setInventory(data || null);
    }
  }

  useEffect(() => {
    fetchInventory();
  }, [id]);

  return (
    <View style={{ flex: 1, height: "100%", padding: 8, gap: 8 }}>
      <ScrollView style={{ flex: 1, height: "100%", paddingBottom: 256 }}>
        <Text variant="titleLarge" style={{ alignSelf: "center" }}>
          Listing Details
        </Text>

        <View style={{ flex: 1, alignItems: "center", gap: 8 }}>
          <Image
            source={{ uri: inventory?.imageUrls[0] }}
            style={{ width: "100%", height: 300, alignSelf: "center" }}
          />
          <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
            {inventory?.name}
          </Text>
          <Text variant="bodyLarge" style={{ alignSelf: "flex-start", marginTop: 5 }}>
            {inventory?.description}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            Keywords:{" "}
          </Text>
          {inventory?.keywords.map((keyword, index) => (
            <Chip key={index} style={{ margin: 2 }}>
              #{keyword}
            </Chip>
          ))}
        </View>
        <View>
          <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
            Preferred Offer: {<Text variant="titleLarge">{inventory?.preferredOffer}</Text>}
          </Text>
        </View>
      </ScrollView>

      <View
        style={{
          alignItems: "center",
          gap: 10,
          position: "absolute",
          backgroundColor: COLORS.surfaceVariant,
          opacity: 0.9,
          padding: 16,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          bottom: 0,
          left: 0,
          right: 0,
          marginRight: 32,
          marginLeft: 32,
        }}
      >
        <Link href={`/user/${inventory?.userId}`}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Avatar.Image
              size={62}
              source={{ uri: inventory?.user?.avatarUrl || "default_avatar_url" }}
            />
            <View>
              <Text style={{ fontWeight: "bold" }} variant="titleLarge">
                {inventory?.user?.firstName}
              </Text>
              <Text style={{ fontWeight: "bold" }} variant="titleLarge">
                {inventory?.user?.averageRating}
              </Text>
            </View>
          </View>
        </Link>

        <View style={{ width: "100%", gap: 8 }}>
          <Button mode="contained">
            {inventory?.user?.id === user?.id ? "Edit Offer" : "Create Offer"}
          </Button>
          <Button mode="elevated">Message</Button>
        </View>
      </View>
    </View>
  );
}
