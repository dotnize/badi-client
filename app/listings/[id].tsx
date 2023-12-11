// Dynamic route!
// e.g. /listings/1, /listings/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { Link, router, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { Avatar, Button, Chip, Text } from "react-native-paper";
import ConfirmModal from "~/components/confirm-modal";

import { useSession } from "~/hooks/useSession";
import { defaultAvatarUrl, emptyImageUrl } from "~/lib/firebase";
import { COLORS } from "~/lib/theme";
import { ChatRoom, Inventory, Wish } from "~/lib/types";
import { apiFetch } from "~/lib/utils";


export default function ListingDetails() {
  const { id, type} = useLocalSearchParams();
  const { user } = useSession();
  const route = useRouter()

  const [inventory, setInventory] = useState<Inventory | Wish | null>(null);

  async function fetchInventory() {
    const { data, error } = await apiFetch<Inventory | Wish >(`/${type}/${id}`);

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

  async function findChatroom() {
    const { data, error } = await apiFetch<ChatRoom>(`/chatroom`, {
      method: "POST",
      body: JSON.stringify({ member1Id: user?.id, member2Id: inventory?.userId }),
    });

    if (error || !data) {
      console.log(error || "Something went wrong while fetching chatroom");
    } else {
      router.push(`/messages/${data?.id}`);
    }
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function deleteListing(){
    const { data, error } = await apiFetch<Inventory | Wish>(`/${type}/${id}`, {
      method: "DELETE",
    });

    if (error || !data) {
      console.log(error || `Something went wrong while deleting ${type}`);
    } else {
      console.log(`Successful ${type} delete`, data)
    }

    route.push('/me')
  }

  return (
    <View style={{ flex: 1, height: "100%", padding: 8, gap: 8 }}>

      <ConfirmModal
        title={`Are you sure you want to delete this ${type}?`}
        state={showDeleteModal}
        setState={setShowDeleteModal}
        onConfirmFunction={deleteListing}
      />

      
      <ScrollView style={{ flex: 1, height: "100%", paddingBottom: 256 }}>
        <Text variant="titleLarge" style={{ alignSelf: "center" }}>
          Listing Details
        </Text>

        <View style={{ flex: 1, alignItems: "center", gap: 8 }}>
          <Image
            source={{ uri: inventory?.imageUrls[0] || emptyImageUrl }}
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
        { inventory && 'preferredOffer' in inventory && (
          <View>
            <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
              Preferred Offer: <Text variant="titleLarge">{inventory?.preferredOffer || ''}</Text>
            </Text>
          </View>
          )
        }
        
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
              source={{ uri: inventory?.user?.avatarUrl || defaultAvatarUrl }}
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
          <Link
            asChild
            href={
              inventory?.userId === user?.id ? `/listings/edit/${id}` : `/offers/create?id=${id}`
            }
          >
            <Button mode="contained">
              {inventory?.userId === user?.id ? `Edit ${type}` : "Create Offer"}
            </Button>
          </Link>
          {inventory?.userId === user?.id && (
            <Button onPress={()=>setShowDeleteModal(true)} mode="elevated" textColor="white" buttonColor={COLORS.error}>
              Delete Listing
            </Button>
          )}
          {inventory?.userId !== user?.id && (
            <Button onPress={findChatroom} mode="elevated">
              Message
            </Button>
          )}
        </View>
      </View>
    </View>
  );
}
