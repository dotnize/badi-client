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
  const { id, isHistory } = useLocalSearchParams();
  const isNowHistory = isHistory && parseInt(isHistory?.toString(), 10) == 1 ? true : false;

  const { user } = useSession();

  const [otherUser, setOtherUser] = useState<User | null>();
  const [tradeInventories, setTradeInventories] = useState<TradeInventory[] | null>();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalTitle, setConfirmModalTitle] = useState(
    `Trade Offer will be deleted.${"\n"}Are you sure?`
  );
  const [onConfirmFunction, setOnConfirmFunction] = useState<any>();

  const handleCounterOffer = () => {
    router.push(`/offers/create?offerId=${tradeInventories?.[0].tradeGroupId}`);
  };

  const handleTrade = (status: string) => {
    setConfirmModalTitle(
      `Trade Offer will be ${status == "active" ? "accepted" : status}.${"\n"}Are you sure?`
    );
    setOnConfirmFunction(() => () => handleUpdateTrade(status));
    setShowConfirmModal(true);
  };

  async function handleUpdateTrade(status: string) {
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
  }

  async function onDelete() {
    setConfirmModalTitle(`This will be deleted from history.${"\n"}Are you sure?`);
    setOnConfirmFunction(() => () => handleDeleteFromHistory());
    setShowConfirmModal(true);
  }

  async function handleDeleteFromHistory() {
    const { data, error } = await apiFetch<TradeGroup>(`/tradegroup/${id}`, {
      method: "DELETE",
    });

    if (error || !data) {
      console.log(error || "Something went wrong while deleting tradegroup");
    } else {
      console.log("Deleting tradegroup successful", data);
      router.push("/activity");
    }
  }

  async function getTradeInventories() {
    const { data, error } = await apiFetch<TradeInventory[]>(`/tradeinventory/group/${id}`);

    if (error) {
      console.log(error);
    } else {
      setTradeInventories(data);
      console.log("Trade Inventory:", data);
    }
  }

  async function getOtherUser() {
    if (tradeInventories) {
      const { data, error } = await apiFetch<User>(
        `/user/${
          tradeInventories[1].receiverId == user?.id
            ? tradeInventories[1].senderId
            : tradeInventories[1].receiverId
        }`
      );

      if (error) {
        console.log(error);
      } else {
        setOtherUser(data);
        console.log("Other User:", data);
      }
    }
  }

  useEffect(() => {
    getTradeInventories();
  }, []);

  useEffect(() => {
    getOtherUser();
  }, [tradeInventories]);

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 8, justifyContent: "space-around" }}>
      <ConfirmModal
        title={confirmModalTitle}
        state={showConfirmModal}
        setState={setShowConfirmModal}
        onConfirmFunction={onConfirmFunction}
      />

      <Text>Pending Offer</Text>
      {tradeInventories && tradeInventories[0]?.senderId === user?.id ? (
        <Text variant="titleMedium">Your Offer To {otherUser?.firstName}</Text>
      ) : (
        <Text variant="titleMedium">{otherUser?.firstName}'s Offer To You</Text>
      )}
      <Text style={{ alignSelf: "flex-start", padding: 8 }}>You will receive:</Text>

      <ScrollView style={{ width: "100%", padding: 8, gap: 8, flex: 1 }}>
        {tradeInventories?.[0].senderId === user?.id ? (
          <OfferItem item={tradeInventories?.[1].inventory} />
        ) : (
          <OfferItem item={tradeInventories?.[0].inventory} />
        )}
      </ScrollView>
      <Text style={{ alignSelf: "flex-start", padding: 8 }}>You will send:</Text>
      <ScrollView style={{ width: "100%", padding: 8, gap: 8, flex: 1 }}>
        {tradeInventories?.[0].senderId === user?.id ? (
          <OfferItem item={tradeInventories?.[0].inventory} />
        ) : (
          <OfferItem item={tradeInventories?.[1].inventory} />
        )}
      </ScrollView>
      <View style={{ width: "100%", gap: 8, padding: 8 }}>
        {isNowHistory ? (
          <Button mode="contained" onPress={onDelete}>
            Delete from History
          </Button>
        ) : tradeInventories?.[0].senderId === user?.id ? (
          <Button mode="contained" onPress={() => handleTrade("cancelled")}>
            Cancel Trade Offer
          </Button>
        ) : (
          <>
            <Button mode="contained" onPress={handleCounterOffer}>
              Edit Counter Offer
            </Button>

            <Button mode="contained" onPress={() => handleTrade("active")}>
              Accept
            </Button>

            <Button mode="contained" onPress={() => handleTrade("rejected")}>
              Reject
            </Button>
          </>
        )}
      </View>
    </View>
  );
}
