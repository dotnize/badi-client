import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Button, Text, TextInput, Title } from "react-native-paper";

import { useSession } from "~/hooks/useSession";
import { COLORS } from "~/lib/theme";
import { Notification, TradeGroup } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

export default function GiveRating() {
  const [amount, setAmount] = useState(4);
  const [description, setDescription] = useState("");
  const { id } = useLocalSearchParams();
  const [notification, setNotification] = useState<Notification>();
  const [tradeGroup, setTradeGroup] = useState<TradeGroup>();

  const { user } = useSession();
  const otherUser = tradeGroup?.user1Id === user?.id ? tradeGroup?.user2 : tradeGroup?.user1;

  async function fetchTradeGroup(tgid: number) {
    const { data } = await apiFetch<TradeGroup>(`/tradegroup/${tgid}`);
    if (data) {
      setTradeGroup(data);
    }
  }

  async function fetchNotif() {
    const { data } = await apiFetch<Notification>(`/notification/${id}`);
    if (data) {
      setNotification(data);
      fetchTradeGroup((data.content as any).tradeGroupId);
    }
  }

  async function deleteNotif() {
    await apiFetch(`/notification/${id}`, { method: "DELETE" });
  }

  async function submitRating() {
    const { error } = await apiFetch("/rating", {
      method: "POST",
      body: JSON.stringify({
        toUserId: otherUser?.id,
        amount,
        description: description || undefined,
      }),
    });
    if (!error) {
      await deleteNotif();
      router.replace("/");
    }
  }

  useEffect(() => {
    fetchNotif();
  }, []);

  return (
    <View style={{ alignItems: "center", gap: 8 }}>
      <Title>Trade successful!</Title>
      <Image
        source={require("assets/give_rating.png")}
        style={{ height: 420, marginVertical: -56 }}
        resizeMode="contain"
      />
      <Text variant="titleMedium" style={{ marginBottom: -16 }}>
        Rating for {otherUser?.firstName}: {amount}
      </Text>
      <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        {Array.from({ length: 5 }, (_, index) => {
          if (index < amount) {
            return (
              <Text
                key={index}
                variant="displaySmall"
                style={{ color: COLORS.primary }}
                onPress={() => setAmount(index + 1)}
              >
                &#9733;
              </Text>
            );
          } else {
            return (
              <Text
                key={index}
                variant="displaySmall"
                style={{ opacity: 0.5 }}
                onPress={() => setAmount(index + 1)}
              >
                &#9733;
              </Text>
            );
          }
        })}
      </View>
      <TextInput
        multiline
        placeholder="Describe your experience."
        mode="outlined"
        label="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button mode="contained" onPress={submitRating}>
        Submit
      </Button>
    </View>
  );
}
