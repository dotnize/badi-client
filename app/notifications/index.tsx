import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, IconButton, Paragraph, Title } from "react-native-paper";
import { apiFetch } from "~/lib/utils";

interface Notification {
  id: number;
  type: string;
  content: {
    user: string;
    title: string;
    description: string;
  };
  timestamp: string;
  is_deleted: boolean;
  user_id: number;
}

interface NotificationCardProps extends Notification {
  onRemove: (id: number) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  id,
  content,
  timestamp,
  onRemove,
}) => (
  <Card style={styles.card}>
    <Card.Content style={styles.cardContent}>
      <Avatar.Icon size={48} icon="account-circle" />
      <View style={styles.textContainer}>
        <Title style={styles.itemTitle}>{content.title}</Title>
        <Paragraph style={styles.textUser}>Posted by: {content.user}</Paragraph>
        <Paragraph>{content.description}</Paragraph>
        <Paragraph>{timestamp}</Paragraph>
      </View>
      <IconButton icon="close" onPress={() => onRemove(id)} />
    </Card.Content>
  </Card>
);

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // function for tinuoray na delete
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

  //for soft delete *i give up*
  // const removeNotification = async (id: number) => {
  //   try {
  //     await apiFetch(`/notification/${id}`, {
  //       method: "PUT",
  //       body: JSON.stringify({ is_deleted: true }),
  //     });

  //     const updatedNotifications = notifications.map((notification) =>
  //       notification.id === id ? { ...notification, is_deleted: true } : notification
  //     );
  //     setNotifications(updatedNotifications);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const { data, error } = await apiFetch<Notification[]>("/notification/user/1");

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

  // Filter out notifications with is_deleted set to true
  const filteredNotifications = notifications.filter((notification) => !notification.is_deleted);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Title style={styles.header}>Notifications</Title>
        <Button onPress={clearAllNotifications}>Clear All</Button>
      </View>
      {filteredNotifications.map((notification) => (
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
  textUser: {
    marginTop: -6,
  },
  itemTitle: {
    fontWeight: "500",
  },
});
