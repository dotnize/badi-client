// Dynamic route!
// e.g. /offers/1, /offers/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import OfferItem from "~/components/cards/offer/offer-item";
import ConfirmModal from "~/components/confirm-modal";
import { useSession } from "~/hooks/useSession";
import { TradeGroup, TradeInventory, User } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

/**
 * Pwede ni gamiton for both Sent and Received pending offers.
 * Sabotan ra nya natong logic para unsaon pagkita if sent or received.
 *
 * For now, paghimo lang sa gurog fake data or variables? nya ternary operator
 */

export default function PendingOffer() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { user: currentUser } = useSession();
  const [trade, setTrade] = useState<TradeInventory[] | null>();
  const [users, setUsers] = useState<User[]>([]);

  async function getUser(id: number) {
    const { data, error } = await apiFetch<User>(`/user/${id}`);
    if (error) {
      console.log(error);
    } else {
      setUsers((prevUsers) => (data ? [...prevUsers, data] : []));
      console.log(data);
    }
  }

  async function getTradeInventory() {
    const { data, error } = await apiFetch<TradeInventory[]>(`/tradeinventory/group/${id}`);

    if (error) {
      console.log(error);
    } else {
      setTrade(data);
      console.log(data);
    }
  }

  useEffect(() => {
    if (trade) {
      getUser(trade[0]?.senderId);
      getUser(trade[0]?.receiverId);
    }
  }, [trade]);

  useEffect(() => {
    getTradeInventory();
  }, []);

  const handleCounterOffer = () => {
    router.push({
      pathname: `/offers/create?id=${trade?.[0].inventory?.id}`,
      params: { url: "inventory" },
    });
  };

  const handleUpdateTrade = async (status: string) => {
    const { data, error } = await apiFetch<TradeGroup>(`/tradegroup/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: status }),
    });
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }

    router.push("/activity");
  };

  const handleDeleteTrade = async () => {
    const { data, error } = await apiFetch<TradeGroup>(`/tradegroup/${id}`, {
      method: "DELETE",
    });

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }

    router.push("/activity");
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 8, justifyContent: "space-around" }}>
      {/* MODALS */}

      <ConfirmModal
        title={`Trade Offer will be deleted.${"\n"}Are you sure?`}
        state={showConfirmModal}
        setState={setShowConfirmModal}
        handleOnConfirmDelete={handleDeleteTrade}
      />

      {/* END MODALS */}

      <Text>Pending Offer</Text>
      {trade?.[0]?.senderId === currentUser?.id ? (
        <Text variant="titleMedium">Your Offer To {users[0]?.firstName}</Text>
      ) : (
        <Text variant="titleMedium">{users[1]?.firstName}'s Offer To You</Text>
      )}
      <Text style={{ alignSelf: "flex-start", padding: 8 }}>You will receive:</Text>

      <ScrollView style={{ width: "100%", padding: 8, gap: 8, flex: 1 }}>
        {trade?.[0]?.senderId === currentUser?.id ? (
          <OfferItem item={trade ? trade[1].inventory : undefined} />
        ) : (
          <OfferItem item={trade ? trade[0]?.inventory : undefined} />
        )}
      </ScrollView>
      <Text style={{ alignSelf: "flex-start", padding: 8 }}>You will send:</Text>
      <ScrollView style={{ width: "100%", padding: 8, gap: 8, flex: 1 }}>
        {trade?.[0]?.senderId === currentUser?.id ? (
          <OfferItem item={trade ? trade[0].inventory : undefined} />
        ) : (
          <OfferItem item={trade ? trade[1]?.inventory : undefined} />
        )}
      </ScrollView>
      <View style={{ width: "100%", gap: 8, padding: 8 }}>
        {trade?.[0]?.senderId === currentUser?.id ? (
          <Button mode="contained" onPress={() => setShowConfirmModal(true)}>
            Cancel Trade Offer
          </Button>
        ) : (
          <>
            <Button mode="contained" onPress={handleCounterOffer}>
              Edit Counter Offer
            </Button>

            <Button mode="contained" onPress={() => handleUpdateTrade("active")}>
              Accept
            </Button>

            <Button mode="contained" onPress={() => setShowConfirmModal(true)}>
              Reject
            </Button>
          </>
        )}
      </View>
    </View>
  );
}
