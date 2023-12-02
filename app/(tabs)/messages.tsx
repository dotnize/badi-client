import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { IconButton, List, Searchbar } from "react-native-paper";

import { useSession } from "~/hooks/useSession";
import { ChatRoom } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

interface ConvoListItemProps {
  id: number;
  avatarUrl?: string | null;
  username?: string;
  preview?: string;
}

function ConvoListItem({ id, avatarUrl, username, preview }: ConvoListItemProps) {
  // TODO: use the "id" prop above to Link/navigate to the chatroom like /messages/:id
  return (
    <List.Item
      title={<Text style={{ fontWeight: "600" }}>{username}</Text>}
      description={preview}
      left={() => <List.Icon icon={avatarUrl as string} />} // TODO: replace with avatar component para image ang mashow?
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
    const res = await apiFetch<ChatRoom[]>(`/chatroom/${user.id}`);
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
          <Link href={`/messages/${convo.id}`}>
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
              preview={convo.lastMessagePreview?.content}
            />
          </Link>
        ))}
      </View>
    </View>
  );
}
