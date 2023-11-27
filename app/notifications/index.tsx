// URL: /notifications

import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Paragraph, Title } from "react-native-paper";

const notifications = [
  { id: 1, title: "Liden", content: "has sent you an offer!" },
  { id: 2, title: "Leonel", content: "Looking for a secondhand airplane." },
];

interface NotificationCardProps {
  title: string;
  content: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ title, content }) => (
  <Card style={styles.card}>
    <Card.Content style={styles.cardContent}>
      <Avatar.Icon size={48} icon="account-circle" />
      <View style={styles.textContainer}>
        <Title>{title}</Title>
        <Paragraph>{content}</Paragraph>
      </View>
    </Card.Content>
  </Card>
);

export default function Notifications() {
  return (
    <View style={styles.container}>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          title={notification.title}
          content={notification.content}
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
  card: {
    marginVertical: 8,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 16,
  },
});
