// Dynamic route!
// e.g. /messages/1, /messages/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Text, Avatar, IconButton, TextInput, Button, Card } from "react-native-paper";

interface User {
  name: string;
  avatar: string;
}

interface Message {
  id: number;
  text: string;
  sender: string;
}

interface Conversation {
  user: User;
  itemTitle: string;
  itemDescription: string;
  messages: Message[];
}

export default function Convo({ navigation }: any) {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  // If naa natay backend, pwede nato gamiton ang id ig fetch.

  const [conversation, setConversation] = useState<Conversation>({
    user: {
      name: "Liden U. Hoe",
      avatar: "https://pbs.twimg.com/profile_images/1509961758022139904/fXryqX_6_400x400.jpg", // Replace with a valid URL
    },
    itemTitle: "Kanding",
    itemDescription: "Kanding nga high quality.",
    messages: [],
  });

  // Dummy data for chat messages
  useEffect(() => {
    setConversation((prevConversation) => ({
      ...prevConversation,
      messages: [
        { id: 1, text: "Hi bro, tagpila ning kanding", sender: "Liden U. Hoe" },
        { id: 2, text: "Oy bro, tara meet up para sabotan tarung.", sender: "You" },
      ],
    }));
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
          style={styles.backButton}
        />
        <View style={styles.userInfo}>
          <Avatar.Image size={35} source={{ uri: conversation.user.avatar }} />
          <Text style={styles.boldText}>{conversation.user.name}</Text>
        </View>
        <View style={styles.infoButtonContainer}>
          <IconButton icon="information" onPress={() => null} style={styles.infoButton} />
        </View>
      </View>

      <View style={styles.chatbox}>
        <Card style={styles.card} onPress={() => null}>
          <View style={styles.cardContent}>
            <Card.Cover
              style={styles.cardCover}
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Brown-goat-award.jpg/800px-Brown-goat-award.jpg",
              }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{conversation.itemTitle}</Text>
              <Text style={styles.itemDescription}>{conversation.itemDescription}</Text>
            </View>
          </View>
          <IconButton icon="arrow-right" onPress={() => null} style={styles.arrowIcon} />
        </Card>
        {conversation.messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageStyle,
              {
                alignSelf: message.sender === 'You' ? 'flex-end' : 'flex-start',
                backgroundColor: message.sender === 'You' ? '#4CAF50' : '#fff', // Green for sent, white for received
              },
            ]}
          >
            <Text style={{ color: message.sender === 'You' ? '#fff' : '#000', fontSize: 18 /* Adjust the font size as needed */ }}>
              {message.text}
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
