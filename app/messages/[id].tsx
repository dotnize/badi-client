// Dynamic route!
// e.g. /messages/1, /messages/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, IconButton, Text, TextInput } from "react-native-paper";
import { useSession } from "~/hooks/useSession";
import { defaultAvatarUrl } from "~/lib/firebase";
import { ChatMessage, ChatRoom, Inventory } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

export default function Convo() {
  const { id, inventoryId } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useSession();
  // If naa natay backend, pwede nato gamiton ang id ig fetch.

  console.log(id); // 2
  console.log(inventoryId); // 8

  const [chatroom, setChatroom] = useState<ChatRoom | undefined>(undefined);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inventory, setInventory] = useState<Inventory | undefined>(undefined);

  useEffect(() => {
    fetchChatRoom();
    fetchMessages();

    if (inventoryId) {
      fetchInventory();
    }
  }, [id, inventoryId]);

  async function fetchChatRoom() {
    // Fetch chat room details based on the id
    const { data, error } = await apiFetch<ChatRoom>(`/chatroom/${id}`);
    if (data) {
      setChatroom(data);
    } else {
      console.log(error);
    }
  }

  async function fetchMessages() {
    // Fetch messages based on the chatroom id
    const { data, error } = await apiFetch<ChatMessage[]>(`/chatmessage/room/${id}`);
    if (data) {
      setMessages(data);
    } else {
      console.log(error);
    }
  }

  async function fetchInventory() {
    // Fetch inventory details based on the inventoryId
    const { data, error } = await apiFetch<Inventory>(`/inventory/${inventoryId}`);
    if (data) {
      setInventory(data);
    } else {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
          style={styles.backButton}
        />

        <View style={styles.userInfo}>
          {chatroom?.member1 && chatroom?.member2 ? (
            <>
              {/* Display details for member1 */}
              {/* <Avatar.Image
                size={35}
                source={{ uri: chatroom.member1.avatarUrl || defaultAvatarUrl }}
              />
              <Text style={styles.boldText}>
                {user?.id === chatroom.member1Id
                  ? "You"
                  : `${chatroom.member1.firstName || "Unknown"} ${
                      chatroom.member1.lastName || "User"
                    }`}
              </Text> */}

              {/* Display details for member2 */}
              <Avatar.Image
                size={35}
                source={{ uri: chatroom.member2.avatarUrl || defaultAvatarUrl }}
              />
              <Text style={styles.boldText}>
                {user?.id === chatroom.member2Id
                  ? "member2 details"
                  : `${chatroom.member2.firstName || "Unknown"} ${
                      chatroom.member2.lastName || "User"
                    }`}
              </Text>
            </>
          ) : (
            <Text style={styles.boldText}>No Member</Text>
          )}
        </View>

        <View style={styles.infoButtonContainer}>
          <IconButton icon="information" onPress={() => null} style={styles.infoButton} />
        </View>
      </View>

      <View style={styles.chatbox}>
        {inventory && (
          <Card style={styles.card} onPress={() => null}>
            <View style={styles.cardContent}>
              <Card.Cover style={styles.cardCover} source={{ uri: inventory.imageUrls[0] || "" }} />
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{inventory.name}</Text>
                <Text style={styles.itemDescription}>{inventory.description}</Text>
              </View>
            </View>
            <IconButton icon="arrow-right" onPress={() => null} style={styles.arrowIcon} />
          </Card>
        )}

        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageStyle,
              {
                alignSelf: message.senderId === chatroom?.member1Id ? "flex-end" : "flex-start",
                backgroundColor: message.senderId === chatroom?.member1Id ? "#4CAF50" : "#fff",
              },
            ]}
          >
            <Text
              style={{
                color: message.senderId === chatroom?.member1Id ? "#fff" : "#000",
                fontSize: 18,
              }}
            >
              {message.content}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.inputContainer}>
        <TextInput mode="outlined" style={styles.input} placeholder="Type your message..." />
        <Button mode="outlined" onPress={() => null}>
          Send
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  header: {
    borderWidth: 2,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 16,
    height: 70,
  },
  backButton: {
    position: "absolute",
    marginLeft: 0,
  },
  userInfo: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 50,
  },
  infoButtonContainer: {
    position: "absolute",
    right: 10,
  },

  infoButton: {
    marginRight: 0,
  },
  boldText: {
    fontWeight: "bold",
    marginLeft: 8,
  },
  card: {
    marginBottom: 16,
    height: 100, // Specify the desired height
    backgroundColor: "#fff",
  },

  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardCover: {
    width: 100, // Adjust the width of the picture
    height: 100, // Use "100%" to take the full height of the card
  },

  textContainer: {
    flex: 1,
    marginLeft: 16,
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  itemDescription: {
    marginTop: 8,
    color: "#888",
  },

  arrowIcon: {
    position: "absolute",
    right: 10, // Adjust the right position as needed
    bottom: 28, // Adjust the bottom position as needed
  },
  chatbox: {
    flex: 1,
    marginBottom: 16,
    padding: 8,
  },
  message: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  input: {
    flex: 1,
    margin: 5, // Adjust the margin as needed
    fontSize: 16, // Adjust the font size as needed
    width: 100,
    // Adjust the width as needed
  },
  messageStyle: {
    marginBottom: 8,
    padding: 10,
    borderRadius: 5,
    maxWidth: "100%", // Full width
    boxSizing: "border-box",
  },
});
