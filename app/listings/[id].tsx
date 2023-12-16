// Dynamic route!
// e.g. /listings/1, /listings/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { Avatar, Button, Chip, Text } from "react-native-paper";

import { useSession } from "~/hooks/useSession";
import { defaultAvatarUrl, emptyImageUrl } from "~/lib/firebase";
import { COLORS } from "~/lib/theme";
import { ChatRoom, Inventory, Wish } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

export default function ListingDetails() {
  const { id, type } = useLocalSearchParams();
  const { user } = useSession();
  const [item, setItem] = useState<Inventory | Wish | null>(null);

  async function fetchInventory() {
    const { data, error } = await apiFetch<Inventory | Wish>(`/${type}/${id}`);

    if (error) {
      console.log(error);
    } else {
      console.log(data);
      setItem(data || null);
    }
  }

  useEffect(() => {
    fetchInventory();
  }, [id]);

  async function findChatroom() {
    const { data, error } = await apiFetch<ChatRoom>(`/chatroom`, {
      method: "POST",
      body: JSON.stringify({ member1Id: user?.id, member2Id: item?.userId }),
    });

    if (error || !data) {
      console.log(error || "Something went wrong while fetching chatroom");
    } else {
      router.push(`/messages/${data?.id}`);
    }
  }

  return (
    <View style={{ flex: 1, height: "100%", padding: 8, gap: 8 }}>
      <ScrollView style={{ flex: 1, height: "100%", paddingBottom: 256 }}>
        <Text variant="titleLarge" style={{ alignSelf: "center" }}>
          Listing Details
        </Text>

        <View style={{ flex: 1, alignItems: "center", gap: 8 }}>
          <Image
            source={{ uri: item?.imageUrls[0] || emptyImageUrl }}
            style={{ width: "100%", height: 300, alignSelf: "center" }}
          />
          <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
            {item?.name}
          </Text>
          <Text variant="bodyLarge" style={{ alignSelf: "flex-start", marginTop: 5 }}>
            {item?.description}
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
          {item?.keywords.map((keyword, index) => (
            <Chip key={index} style={{ margin: 2 }}>
              #{keyword}
            </Chip>
          ))}
        </View>
        {item && "preferredOffer" in item && (
          <View>
            <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
              Preferred Offer: <Text variant="titleLarge">{item?.preferredOffer || ""}</Text>
            </Text>
          </View>
        )}
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
        <Link href={`/user/${item?.userId}`}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Avatar.Image size={62} source={{ uri: item?.user?.avatarUrl || defaultAvatarUrl }} />
            <View>
              <Text style={{ fontWeight: "bold" }} variant="titleLarge">
                {item?.user?.firstName}
              </Text>
              <Text style={{ fontWeight: "bold" }} variant="titleLarge">
                {item?.user?.averageRating}
              </Text>
            </View>
          </View>
        </Link>

        <View style={{ width: "100%", gap: 8 }}>
          <Link
            asChild
            href={{
              pathname:
                item?.userId === user?.id ? `/listings/edit/${id}` : `/offers/create?id=${id}`,
              params: { type },
            }}
          >
            <Button mode="contained">
              {item?.userId === user?.id ? `Edit ${type}` : "Create Offer"}
            </Button>
          </Link>
          {item?.userId !== user?.id && (
            <Button onPress={findChatroom} mode="elevated">
              Message
            </Button>
          )}
        </View>
      </View>
    </View>
  );
}
