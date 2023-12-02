import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { IconButton, List, Searchbar } from "react-native-paper";

import { useSession } from "~/hooks/useSession";
import { defaultAvatarUrl } from "~/lib/firebase";
import { ChatRoom } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

interface ConvoListItemProps {
  id: number;
  avatarUrl?: string | null;
  username?: string;
  preview?: string;
}

function ConvoListItem({ avatarUrl, username, preview }: ConvoListItemProps) {
  return (
    <List.Item
      title={<Text style={{ fontWeight: "600" }}>{username}</Text>}
      description={preview}
      left={() => <List.Image variant="image" source={{ uri: avatarUrl || defaultAvatarUrl }} />}
    />
  );
}

export default function Messages() {
  const [searchValue, setSearchValue] = useState("");

  // current logged-in user
  const { user } = useSession();

  const [conversations, setConversations] = useState<ChatRoom[]>([]);

  async function fetchConversations() {
    if (!user) return; // dont fetch if not logged-in

    // fetch chatrooms of logged-in user id
    const res = await apiFetch<ChatRoom[]>(`/chatroom/user/${user.id}`);
    if (!res.data || res.error) {
      console.log("No conversations found");
    } else {
      setConversations(res.data);
    }
  }

  useEffect(() => {
    fetchConversations();
  }, []);

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
      <View style={{ marginLeft: 18 }}>
        {conversations.map((convo) => (
          <Link key={convo.id} href={`/messages/${convo.id}`}>
            <ConvoListItem
              id={convo.id}
              avatarUrl={
                convo.member1Id === user?.id ? convo.member2?.avatarUrl : convo.member1?.avatarUrl
              }
              username={
                convo.member1Id === user?.id
                  ? `${convo.member2?.firstName} ${convo.member2?.lastName}`
                  : `${convo.member1?.firstName} ${convo.member1?.lastName}`
              }
              preview={convo.lastMessagePreview?.[0].content}
            />
          </Link>
        ))}
      </View>
    </View>
  );
}
