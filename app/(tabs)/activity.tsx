import { ScrollView, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import ActiveTradeCard from "~/components/cards/activitytabs/active-trade";
import PendingTradeCard from "~/components/cards/activitytabs/pending-trade";

export default function Activity() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center", padding: 16 }}>
        <Text variant="titleMedium">Trade Activities</Text>
        <IconButton style={{ position: "absolute", right: 0 }} icon="bell" />
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
                <ActiveTradeCard />
                <ActiveTradeCard />
                <ActiveTradeCard />
                <ActiveTradeCard />
                <ActiveTradeCard />
              </ScrollView>
            </View>
          </TabScreen>

          <TabScreen label="Pending">
            <View style={{ flex: 1 }}>
              <ScrollView style={{ flex: 1, padding: 8 }}>
                <PendingTradeCard />
                <PendingTradeCard />
                <PendingTradeCard />
                <PendingTradeCard />
                <PendingTradeCard />
              </ScrollView>
            </View>
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
}
