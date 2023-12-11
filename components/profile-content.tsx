import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { Button, Text } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

import ListingCard from "~/components/cards/listing-card";
import PhotoPreviewModal from "~/components/photo-preview";
import { useSession } from "~/hooks/useSession";
import { defaultAvatarUrl, emptyImageUrl } from "~/lib/firebase";
import { COLORS } from "~/lib/theme";
import type { ChatRoom, Inventory, User, Wish } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

export default function ProfileContent({ userId }: { userId: number }) {
  const session = useSession();
  const isLoggedUser = userId === session.user?.id;

  const [user, setUser] = useState<User | undefined>(undefined);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);

  async function findChatroom() {
    const { data, error } = await apiFetch<ChatRoom>(`/chatroom`, {
      method: "POST",
      body: JSON.stringify({ member1Id: session.user?.id, member2Id: userId }),
    });

    if (error || !data) {
      console.log(error || "Something went wrong while fetching chatroom");
    } else {
      router.push(`/messages/${data?.id}`);
    }
  }

  async function fetchOtherUser() {
    const { data, error } = await apiFetch<User>(`/user/${userId}`);
    if (error || !data) {
      console.log(error || "No user found");
    } else if (data) {
      setUser(data);
    }
  }

  async function fetchInventory() {
    const { data, error } = await apiFetch<Inventory[]>(`/inventory/user/${userId}`);
    if (error || !data) {
      console.log(error || "No inventory found");
    } else if (data) {
      setInventory(data);
    }
  }

  async function fetchWishes() {
    const { data, error } = await apiFetch<Wish[]>(`/wish/user/${userId}`);
    if (error || !data) {
      console.log(error || "No wishes found");
    } else if (data) {
      setWishes(data);
    }
  }

  useEffect(() => {
    if (session.user !== undefined) {
      if (!isLoggedUser) {
        fetchOtherUser();
        console.log("fetching other user");
      } else {
        setUser(session.user as User);
      }
      fetchInventory();
      fetchWishes();
    }
  }, [session.user]);

  const [photoPreview, setPhotoPreview] = useState(false);
  const [photo, setPhoto] = useState("");

  const handlePhotoPreview = (photo: string) => {
    setPhoto(photo);
    setPhotoPreview(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <PhotoPreviewModal photo={photo} state={photoPreview} setState={setPhotoPreview} />

      <ScrollView style={{ flex: 1 }}>
        <Pressable onPress={() => handlePhotoPreview(emptyImageUrl)}>
          <Image style={styles.backgroundPic} source={{ uri: emptyImageUrl }} />
        </Pressable>

        <Pressable
          style={styles.profilePicContainer}
          onPress={() => handlePhotoPreview(defaultAvatarUrl)}
        >
          <Image style={styles.profilePic} source={{ uri: user?.avatarUrl || defaultAvatarUrl }} />
        </Pressable>

        {isLoggedUser && (
          <View style={styles.editProfileButtons}>
            <Link asChild href="/me/edit">
              <Button
                icon="pencil"
                mode="outlined"
                contentStyle={{ flexDirection: "row-reverse" }}
                textColor={COLORS.primary}
              >
                Edit Profile
              </Button>
            </Link>
          </View>
        )}

        <View
          style={{
            marginHorizontal: 25,
            marginTop: isLoggedUser ? 0 : 80,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text variant="headlineMedium">
            {user?.firstName} {user?.lastName}
          </Text>
          <Link href={isLoggedUser ? `/me/ratings` : `/user/${userId}/ratings`}>
            <Text variant="titleMedium">
              Ratings ({user?.averageRating || 0}) &nbsp;
              <AntDesign name="infocirlceo" size={18} style={{ verticalAlign: "middle" }} />
            </Text>
          </Link>
        </View>

        {!isLoggedUser && (
          <Button
            onPress={findChatroom}
            style={{ marginHorizontal: 10, marginBottom: 12 }}
            mode="contained"
          >
            Message
          </Button>
        )}

        <TabsProvider defaultIndex={0}>
          <Tabs style={{ backgroundColor: "transparent" }}>
            <TabScreen label="Inventory">
              {inventory.length > 0 ? (
                <FlatList
                  contentContainerStyle={{ gap: 10, padding: 8 }}
                  data={inventory}
                  renderItem={({ item }) => <ListingCard listing={item} />}
                  keyExtractor={(item) => item.id.toString()}
                />
              ) : (
                <View style={{ height: 400, justifyContent: "center", alignItems: "center" }}>
                  <Text>No Inventory.</Text>
                </View>
              )}
            </TabScreen>
            <TabScreen label="Wishes">
              {wishes.length > 0 ? (
                <FlatList
                  contentContainerStyle={{ gap: 10, padding: 8 }}
                  data={wishes}
                  renderItem={({ item }) => <ListingCard listing={item} />}
                  keyExtractor={(item) => item.id.toString()}
                />
              ) : (
                <View style={{ height: 400, justifyContent: "center", alignItems: "center" }}>
                  <Text>No Wishes.</Text>
                </View>
              )}
            </TabScreen>
            <TabScreen label="History">
              <View style={{ height: 400, justifyContent: "center", alignItems: "center" }}>
                <Text>No History.</Text>
              </View>
            </TabScreen>
          </Tabs>
        </TabsProvider>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profilePic: {
    resizeMode: "cover",
    borderRadius: 100,
    height: 150,
    width: 150,
    borderWidth: 4,
    borderColor: COLORS.surface,
    backgroundColor: COLORS.surface,
  },
  profilePicContainer: {
    position: "absolute",
    top: 110,
    left: 25,
  },
  backgroundPic: {
    resizeMode: "cover",
    alignSelf: "center",
    backgroundColor: "#e0e0e0",
    height: 200,
    width: "100%",
  },
  editProfileButtons: {
    alignSelf: "flex-end",
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
