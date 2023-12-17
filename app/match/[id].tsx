// Dynamic route!
// e.g. /match/1, /match/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL>

import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Paragraph, Text, Title } from "react-native-paper";

import { emptyImageUrl } from "~/lib/firebase";
import { COLORS } from "~/lib/theme";
import { Inventory, MatchContent, Notification, User } from "~/lib/types";
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
