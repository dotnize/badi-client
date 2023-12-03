// URL: /notifications

import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";

interface NotificationCardProps {
  id: number;
  type: string;
  content: {
    // Adjust the structure based on your JSON structure for content
    // Example: Adjust this based on your JSON structure: title: string; message: string;
  };
  timestamp: string; // Assuming timestamp is a string, adjust accordingly
  is_read: boolean;
  is_deleted: boolean;
  user_id: number;
  userName: string; // Adding userName to represent the user's name
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
      <View style={styles.textContainer}></View>
      <IconButton icon="close" onPress={() => onRemove(id)} />
    </Card.Content>
  </Card>
);

export default function Notifications() {
  // const [notifications, setNotifications] = useState();
  // const removeNotification = (id: number) => {
  //   const updatedNotifications = notifications.filter((notification) => notification.id !== id);
  //   setNotifications(updatedNotifications);
  // };
  // const clearAllNotifications = () => {
  //   setNotifications([]);
  // };
  // return (
  //   <View style={styles.container}>
  //     <View style={styles.headerContainer}>
  //       <Title style={styles.header}>Notifications</Title>
  //       <Button onPress={clearAllNotifications}>Clear All</Button>
  //     </View>
  //     {notifications.map((notification) => (
  //       <NotificationCard
  //         key={notification.id}
  //         id={notification.id}
  //         title={notification.title}
  //         content={notification.content}
  //         onRemove={removeNotification}
  //       />
  //     ))}
  //   </View>
  // );
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
