import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { Button, Text } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

import ListingCard from "~/components/cards/listing-card";
import PhotoPreview from "~/components/photo-preview";
import { useSession } from "~/hooks/useSession";
import { defaultAvatarUrl } from "~/lib/firebase";
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

  return (
    <View style={{ flex: 1 }}>
      {/* MODALS */}
      <PhotoPreview
        photo={user?.avatarUrl || defaultAvatarUrl}
        state={photoPreview}
        setState={setPhotoPreview}
      />
      {/*  MODALS END*/}

      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: 128 }} />

        <Pressable style={styles.profilePicButton} onPress={() => setPhotoPreview(true)}>
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
              &#9733; {user?.averageRating} &nbsp;
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
              <FlatList
                contentContainerStyle={{ gap: 10, padding: 8 }}
                data={inventory}
                renderItem={({ item }) => <ListingCard listing={item} />}
                keyExtractor={(item) => item.id.toString()}
              />
            </TabScreen>
            <TabScreen label="Wishes">
              <FlatList
                contentContainerStyle={{ gap: 10, padding: 8 }}
                data={wishes}
                renderItem={({ item }) => <ListingCard listing={item} />}
                keyExtractor={(item) => item.id.toString()}
              />
            </TabScreen>
            <TabScreen label="History">
              <Text>todo</Text>
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
    // borderWidth: 6,
    // borderColor: "white",
  },
  profilePicButton: {
    position: "absolute",
    top: 48, // if header not shown
    // top: 170,
    left: 25,
    // borderWidth: 5,
    // borderColor: COLORS.surface,
  },
  editProfileButtons: {
    alignSelf: "flex-end",
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
