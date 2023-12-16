import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, IconButton, Paragraph, Title } from "react-native-paper";

import { useSession } from "~/hooks/useSession";
import { Notification } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

function NotifCard({ notification }: { notification: Notification }) {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        {/* <Avatar.Image size={80} source={{ uri: content.image }} /> */}
        <View style={styles.textContainer}>
          <Title style={styles.itemTitle}>{notification.title}</Title>
          <Paragraph>{notification.timestamp.toDateString()}</Paragraph>
        </View>
        <IconButton icon="close" onPress={() => {}} />
      </Card.Content>
    </Card>
  );
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useSession();

  const removeNotification = async (id: number) => {
    try {
      // Make a DELETE request to the server to delete the notification
      await apiFetch(`/notification/${id}`, { method: "DELETE" });

      // Update the local state to remove the notification
      const updatedNotifications = notifications.filter((notification) => notification.id !== id);
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error(error);
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const { data, error } = await apiFetch<Notification[]>(`/notification/user/${user?.id}`);

        if (error) {
          console.error(error);
        } else {
          setNotifications(data || []);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Title style={styles.header}>Notifications</Title>
        <Button onPress={clearAllNotifications}>Clear All</Button>
      </View>
      {notifications.map((notif, index) => (
        <NotifCard key={index} notification={notif} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    marginVertical: 8,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  textUser: {
    marginTop: -6,
  },
  itemTitle: {
    fontWeight: "500",
  },
});
