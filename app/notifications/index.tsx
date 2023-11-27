// URL: /notifications

import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";

const notifications = [
  { id: 1, title: "Liden", content: "Has sent you an offer!" },
  { id: 2, title: "Leonel", content: "This is the content of notification 2." },
  // Add more notifications as needed
];

const NotificationCard = ({ title, content }) => (
  <Card style={styles.card}>
    <Card.Content>
      <Title>{title}</Title>
      <Paragraph>{content}</Paragraph>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    marginVertical: 8,
  },
});
