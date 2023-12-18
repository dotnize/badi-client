// Index page of a dynamic route!
// e.g. /trades/1, /trades/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, ProgressBar, Text } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import ActiveUserItem from "~/components/cards/activetrade/active-inventory";
import { useSession } from "~/hooks/useSession";
import { TradeGroup, TradeInventory } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

export default function ActiveTrade() {
  const { user } = useSession();
  const { id } = useLocalSearchParams();
  const [percent, setPercent] = useState(0);

  const [tradeInventory, setTradeInventory] = useState<TradeInventory[]>([]);
  const [tradeGroup, setTradeGroup] = useState<TradeGroup | undefined>(undefined);

  //id used from localsearch params see /components/cards/active-trade
  async function getTradeGroup() {
    const { data, error } = await apiFetch<TradeGroup>(`/tradegroup/${id}`);

    if (error) {
      console.log(error);
    } else {
      setTradeGroup(data || undefined);
    }
  }
  // If naa natay backend, pwede nato gamiton ang id ig fetch.
  //id used from localsearch params see /components/cards/active-trade

  async function getTradeInventory() {
    const { data, error } = await apiFetch<TradeInventory[]>(`/tradeinventory/group/${id}`);

    if (error) {
      console.log(error);
    } else {
      setTradeInventory(data || []);
    }
  }

  async function handleCompleteTrade() {
    // TODO: it's better to implement this directly in the backend
    const { data, error } = await apiFetch<TradeGroup>(`/tradegroup/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: "completed" }),
    });
    if (error) {
      console.log("Something went wrong while setting tradegroup to complete", error);
    } else {
      console.log("Update tradegroup to complete successful", data);
    }
  }

  useEffect(() => {
    if (user?.id) {
      getTradeInventory();
      getTradeGroup();
    }
  }, [user?.id]);

  //for the progress bar completed count / total count (ex. if 2 items only and 1 is completed 1 is not, 50% completed)
  useEffect(() => {
    if (!tradeInventory.length) return;
    const completedCount = tradeInventory.filter((trade) => trade.isCompleted).length;
    const totalCount = tradeInventory.length;
    const percentCompleted = totalCount > 0 ? Math.floor((completedCount / totalCount) * 100) : 0;
    setPercent(percentCompleted);
    if (completedCount >= totalCount && tradeGroup?.status !== "completed") {
      handleCompleteTrade();
    }
  }, [tradeInventory]);

  return (
    <View style={{ flex: 1, padding: 8 }}>
      {/* <Text>ActiveTrade, id: {id}</Text> */}
      <View style={{ alignItems: "center", width: "100%", padding: 12, gap: 8 }}>
        <Text variant="titleMedium">Trading with {tradeGroup?.user1?.firstName}</Text>
        <Text>{percent}% Completed</Text>
        <ProgressBar progress={percent / 100} />
      </View>
      <View style={{ padding: 8 }}>
        <Link asChild href={`/trades/${id}/update`}>
          <Button mode="contained">Update Progress</Button>
        </Link>
      </View>

      <View style={{ flex: 1 }}>
        <TabsProvider defaultIndex={0}>
          <Tabs
          // uppercase={false} // true/false | default=true (on material v2) | labels are uppercase
          // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
          // iconPosition // leading, top | default=leading
          // style={{ backgroundColor:'#fff' }} // works the same as AppBar in react-native-paper
          // dark={false} // works the same as AppBar in react-native-paper
          // theme={} // works the same as AppBar in react-native-paper
          // mode="scrollable" // fixed, scrollable | default=fixed
          // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
          // disableSwipe={false} // (default=false) disable swipe to left/right gestures
          >
            <TabScreen label="Ongoing">
              <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, padding: 8 }} showsVerticalScrollIndicator={false}>
                  {tradeInventory
                    .filter((trade) => !trade.isCompleted)
                    .map((trade, index) => (
                      // Replace `ActiveUserItem` with the component you want to render for each ongoing trade
                      <ActiveUserItem
                        key={index}
                        imageUrls={trade.inventory?.imageUrls[0] || ""}
                        itemName={trade.inventory?.name || ""}
                        remaining={(trade.totalQuantity - trade.completedQuantity).toString()}
                        receiver={
                          trade.senderId === tradeGroup?.user1Id
                            ? `to ${tradeGroup?.user2?.firstName}` || ""
                            : `from ${tradeGroup?.user1?.firstName}` || ""
                        }
                      />
                    ))}
                </ScrollView>
              </View>
            </TabScreen>

            <TabScreen label="Completed">
              <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, padding: 8 }}>
                  {tradeInventory
                    .filter((trade) => trade.isCompleted)
                    .map((trade, index) => (
                      // Replace `ActiveUserItem` with the component you want to render for each ongoing trade
                      <ActiveUserItem
                        key={index}
                        imageUrls={trade.inventory?.imageUrls[0] || ""}
                        itemName={trade.inventory?.name || ""}
                        remaining={trade.isCompleted === true ? "Completed" : ""}
                        receiver={
                          trade.senderId === tradeGroup?.user1Id
                            ? `to ${tradeGroup?.user2?.firstName}` || ""
                            : `from ${tradeGroup?.user1?.firstName}` || ""
                        }
                      />
                    ))}
                </ScrollView>
              </View>
            </TabScreen>
          </Tabs>
        </TabsProvider>
      </View>
    </View>
  );
}
