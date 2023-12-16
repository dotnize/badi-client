import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import ActiveTradeCard from "~/components/cards/activitytabs/active-trade";
import PendingTradeCard from "~/components/cards/activitytabs/pending-trade";
import { useSession } from "~/hooks/useSession";
import { defaultAvatarUrl } from "~/lib/firebase";
import { TradeGroup } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

export default function Activity() {
  const { user } = useSession();

  const [trades, setTrades] = useState<TradeGroup[]>([]);

  async function getTradeGroup() {
    const { data, error } = await apiFetch<TradeGroup[]>(`/tradegroup/user/${user?.id}`);

    if (error) {
      console.log(error);
    } else {
      setTrades(data || []);
    }
  }

  useEffect(() => {
    if (user?.id) {
      getTradeGroup();
    }
  }, [user?.id]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center", padding: 16 }}>
        <Text variant="titleMedium">Trade Activities</Text>
        <Link asChild href="/notifications">
          <IconButton style={{ position: "absolute", right: 0 }} icon="bell" />
        </Link>
      </View>
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
          <TabScreen label="Active">
            <View style={{ flex: 1 }}>
              <ScrollView style={{ flex: 1, padding: 8 }}>
                {trades
                  .filter((trade) => trade.status === "active")
                  .map((trade, index) => (
                    <ActiveTradeCard
                      key={index}
                      tradeGroupId={trade.id}
                      user1FirstName={trade.user1?.firstName || ""}
                      user2FirstName={trade.user2?.firstName || ""}
                      user1profileUrl={trade.user1?.avatarUrl || defaultAvatarUrl}
                      user2profileUrl={trade.user1?.avatarUrl || defaultAvatarUrl}
                    />
                  ))}
              </ScrollView>
            </View>
          </TabScreen>

          <TabScreen label="Pending">
            <View style={{ flex: 1 }}>
              <ScrollView style={{ flex: 1, padding: 8 }}>
                {trades
                  .filter((trade) => trade.status === "pending")
                  .map((trade, index) => (
                    <PendingTradeCard key={index} trade={trade} />
                  ))}
              </ScrollView>
            </View>
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
}
