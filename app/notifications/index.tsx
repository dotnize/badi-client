// URL: /notifications

import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, IconButton, Paragraph, Title } from "react-native-paper";
import { apiFetch } from "~/lib/utils";

interface Notification {
  id: number;
  type: string;
  content: {
    title: string;
    description: string;
    // ... other properties based on your JSON structure
  };
  timestamp: string;
  is_read: boolean;
  is_deleted: boolean;
  user_id: number;
  userName: string;
}

interface NotificationCardProps extends Notification {
  onRemove: (id: number) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  id,
  type,
  content,
  timestamp,
  is_read,
  is_deleted,
  user_id,
  userName,
  onRemove,
}) => (
  <Card style={styles.card}>
    <Card.Content style={styles.cardContent}>
      <Avatar.Icon size={48} icon="account-circle" />
      <View style={styles.textContainer}>
        <Title>{userName}</Title>
        <Paragraph>{content.title}</Paragraph>
        <Paragraph>{content.description}</Paragraph>
        <Paragraph>{timestamp}</Paragraph>
      </View>
      <IconButton icon="close" onPress={() => onRemove(id)} />
    </Card.Content>
  </Card>
);

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = (id: number) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => {
    // Fetch notifications when the component mounts
    async function fetchNotifications() {
      try {
        const { data, error } = await apiFetch<Notification[]>("/notification/user/1");
        console.log(data); // Log the response to inspect its structure

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
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <View style={styles.container}>
      {/* (unchanged) */}
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} {...notification} onRemove={removeNotification} />
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
});
