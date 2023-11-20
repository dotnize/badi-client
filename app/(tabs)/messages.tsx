import { useState } from "react";
import { Text, View } from "react-native";
import { IconButton, List, Searchbar } from "react-native-paper";

interface Message {
  key: number;
  avatar: string; // Update the type based on your actual data structure
  username: string;
  preview: string;
}

function MessageListItem({ avatar, username, preview }: Message) {
  return (
    <List.Item
      title={<Text style={{ fontWeight: "600" }}>{username}</Text>}
      description={preview}
      left={() => <List.Icon icon={avatar} />}
    />
  );
}

export default function Messages() {
  const [searchValue, setSearchValue] = useState("");

  const messages: Message[] = [
    { key: 1, avatar: "account", username: "Liden U. Hoe", preview: "BAWAWAWAWAW" },
    { key: 2, avatar: "account", username: "Jameel D. Great", preview: "I love marcy <3." },
    // Add more messages as needed
  ];

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <Searchbar
          placeholder="Search..."
          value={searchValue}
          onChangeText={(query) => setSearchValue(query)}
          style={{ flex: 1 }}
        />
        <IconButton size={20} icon="bell" />
      </View>
      <View style={{marginLeft: 18}}>
        {messages.map((message) => (
          <MessageListItem
            key={message.key}
            avatar={message.avatar}
            username={message.username}
            preview={message.preview}
          />
        ))}
      </View>
    </View>
  );
}
