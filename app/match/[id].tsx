// Dynamic route!
// e.g. /match/1, /match/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL>

import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, FAB, Paragraph, Text, Title } from "react-native-paper";

import { useSession } from "~/hooks/useSession";
import { emptyImageUrl } from "~/lib/firebase";
import { COLORS } from "~/lib/theme";
import { Inventory, MatchContent, Notification, TradeInventory, User } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

function MatchCard({ inventory }: { inventory: Inventory }) {
  return (
    <Card style={styles.card}>
      <Card.Cover
        source={{ uri: inventory.imageUrls[0] || emptyImageUrl }}
        style={styles.cardImage}
      />
      <Card.Content style={styles.cardContent}>
        <Title style={styles.cardTitle} numberOfLines={1}>
          {inventory.name}
        </Title>
        <Paragraph style={styles.cardParagraph} numberOfLines={3}>
          {inventory.description}
        </Paragraph>
      </Card.Content>
    </Card>
  );
}

export default function MatchFound() {
  const { id } = useLocalSearchParams();
  const [notification, setNotification] = useState<Notification>();
  const [matchContent, setMatchContent] = useState<MatchContent>();
  const { user } = useSession();
  const router = useRouter();

  async function fetchNotification() {
    const { data, error } = await apiFetch<Notification>(`/notification/${id}`);
    if (error || !data) {
      console.error(error || "No data returned from server");
    } else {
      setNotification(data);
    }
  }

  async function fetchMatchContent() {
    const content = notification?.content as MatchContent;
    const toSend = apiFetch<Inventory>(`/inventory/${content.toSendIds[0]}}`);
    const toReceive = apiFetch<Inventory>(`/inventory/${content.toReceiveIds[0]}}`);
    const matchedUser = apiFetch<User>(`/user/${content.matchedUserId}}`);

    const [toSendData, toReceiveData, matchedUserData] = await Promise.all([
      toSend,
      toReceive,
      matchedUser,
    ]);

    setMatchContent({
      ...content,
      toSend: toSendData.data ? [toSendData.data] : [],
      toReceive: toReceiveData.data ? [toReceiveData.data] : [],
      matchedUser: matchedUserData.data || undefined,
    });
  }

  async function deleteNotif() {
    await apiFetch(`/notification/${notification?.id}`, { method: "DELETE" });
  }

  async function sendOffer() {
    const tradeInventories: Partial<TradeInventory>[] = [
      ...(matchContent?.toSend?.map((inv) => {
        return {
          senderId: user?.id,
          receiverId: matchContent?.matchedUserId,
          inventoryId: inv.id,
          totalQuantity: 1,
        };
      }) || []),
      ...(matchContent?.toReceive?.map((inv) => {
        return {
          senderId: inv.userId,
          receiverId: user?.id,
          inventoryId: inv.id,
          totalQuantity: 1,
        };
      }) || []),
    ];

    const offer = {
      tradeInventories,
      user1Id: user?.id,
      user2Id: matchContent?.matchedUserId,
    };
    const { error } = await apiFetch("/tradegroup", {
      method: "POST",
      body: JSON.stringify(offer),
    });
    if (!error) {
      await deleteNotif();
      router.replace("/activity");
    }
  }

  useEffect(() => {
    fetchNotification();
  }, [id]);

  useEffect(() => {
    if (!notification) return;
    fetchMatchContent();
  }, [notification]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Suggested Match found</Text>
        <Text>
          with {matchContent?.matchedUser?.firstName} {matchContent?.matchedUser?.lastName}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontWeight: "600" }}>You will send:</Text>
          <ScrollView
            style={{ flex: 1, padding: 8 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {matchContent?.toSend?.map((inv, index) => <MatchCard key={index} inventory={inv} />)}
          </ScrollView>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontWeight: "600" }}>You will receive:</Text>
          <ScrollView
            style={{ flex: 1, padding: 8 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {matchContent?.toReceive?.map((inv, index) => (
              <MatchCard key={index} inventory={inv} />
            ))}
          </ScrollView>
        </View>
      </View>
      <FAB
        onPress={sendOffer}
        icon="send"
        label="Send Offer"
        style={{ position: "absolute", bottom: 48, right: 48 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: COLORS.surface,
    paddingBottom: 12,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: -4,
  },
  cardParagraph: {
    fontSize: 12,
    paddingTop: 4,
    height: 40,
  },
  scrollViewContent: {
    gap: 8,
  },
  card: {
    marginVertical: 8,
  },
  cardImage: {
    resizeMode: "cover",
    height: 200,
  },
  cardContent: {
    marginTop: 8,
  },
});
