// Dynamic route!
// e.g. /messages/1, /messages/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  IconButton,
  Text,
  TextInput,
} from "react-native-paper";
import { io } from "socket.io-client";

import { useSession } from "~/hooks/useSession";
import { API_URL } from "~/lib/config";
import { defaultAvatarUrl, emptyImageUrl } from "~/lib/firebase";
import { ChatMessage, ChatRoom, Inventory } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

const socket = io(API_URL, {
  withCredentials: true,
  autoConnect: false,
  transports: ["websocket"],
});

export default function Convo() {
  const { id, inventoryId } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useSession();

  const [chatroom, setChatroom] = useState<ChatRoom | undefined>(undefined);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inventory, setInventory] = useState<Inventory | undefined>(undefined);

  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true); // disable send button if loading

  useEffect(() => {
    fetchChatRoom();

    if (inventoryId) {
      fetchInventory();
    }
  }, [id, inventoryId]);

  // socket.io for chatmessages
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to socket.io server");
      socket.emit("joinRoom", id);

      socket.on("disconnect", () => {
        console.log("Disconnected from socket.io server");
      });

      socket.on("chat", (message: ChatMessage) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("latestMessages", (latestMessages: ChatMessage[]) => {
        setMessages(latestMessages);
        setLoading(false);
      });
    });

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, [id]);

  function sendChat() {
    if (!messageInput) return;

    setLoading(true);

    socket.emit("chat", messageInput);

    setMessageInput("");
    setTimeout(() => {
      setLoading(false);
    }, 1200); // 1.2 second cooldown to avoid issues & spam
  }

  async function fetchChatRoom() {
    // Fetch chat room details based on the id
    const { data, error } = await apiFetch<ChatRoom>(`/chatroom/${id}`);
    if (data) {
      setChatroom(data);
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
              <Avatar.Image
                size={35}
                source={{
                  uri:
                    user?.id === chatroom.member1Id
                      ? chatroom.member2.avatarUrl || defaultAvatarUrl
                      : chatroom.member1.avatarUrl || defaultAvatarUrl,
                }}
              />
              <Text style={styles.boldText}>
                {user?.id === chatroom.member1Id
                  ? `${chatroom.member2.firstName || "Unknown"} ${
                      chatroom.member2.lastName || "User"
                    }`
                  : `${chatroom.member1.firstName || "Unknown"} ${
                      chatroom.member1.lastName || "User"
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
              <Card.Cover
                style={styles.cardCover}
                source={{ uri: inventory.imageUrls[0] || emptyImageUrl }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{inventory.name}</Text>
                <Text style={styles.itemDescription}>{inventory.description}</Text>
              </View>
            </View>
            <IconButton icon="arrow-right" onPress={() => null} style={styles.arrowIcon} />
          </Card>
        )}

        {loading ? (
          <ActivityIndicator animating />
        ) : (
          messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageStyle,
                {
                  alignSelf: user?.id === message.senderId ? "flex-end" : "flex-start",
                  backgroundColor: user?.id === message.senderId ? "#4CAF50" : "#fff",
                },
              ]}
            >
              <Text
                style={{
                  color: user?.id === message.senderId ? "#fff" : "#000",
                  fontSize: 18,
                }}
              >
                {message.content}
              </Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          style={styles.input}
          placeholder="Type your message..."
          value={messageInput}
          onChangeText={(input) => setMessageInput(input)}
        />
        <Button disabled={loading} mode="outlined" onPress={sendChat}>
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
