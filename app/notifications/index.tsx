// URL: /notifications

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, IconButton, Paragraph, Title } from "react-native-paper";

const initialNotifications = [
  { id: 1, title: "Liden", content: "has sent you an offer!" },
  { id: 2, title: "Leonel", content: "Looking for a secondhand airplane." },
];

interface NotificationCardProps {
  id: number;
  title: string;
  content: string;
  onRemove: (id: number) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ id, title, content, onRemove }) => (
  <Card style={styles.card}>
    <Card.Content style={styles.cardContent}>
      <Avatar.Icon size={48} icon="account-circle" />
      <View style={styles.textContainer}>
        <Title>{title}</Title>
        <Paragraph>{content}</Paragraph>
      </View>
      <IconButton icon="close" onPress={() => onRemove(id)} />
    </Card.Content>
  </Card>
);

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const removeNotification = (id: number) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Title style={styles.header}>Notifications</Title>
        <Button onPress={clearAllNotifications}>Clear All</Button>
      </View>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          id={notification.id}
          title={notification.title}
          content={notification.content}
          onRemove={removeNotification}
        />
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
