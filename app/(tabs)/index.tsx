import { useState } from "react";
import { View } from "react-native";
import { Card, IconButton, Searchbar, Text } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import TradeItem from "~/components/cards/home/inventory-item-card";
import { useSession } from "~/hooks/useSession";

function CardComponent() {
  return (
    <Card style={{ height: 200 }}>
      <Card.Content>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Text>
      </Card.Content>
    </Card>
  );
}

export default function Index() {
  const { user } = useSession();
  const [searchValue, setSearchValue] = useState("");
  console.log(user);
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
          <TabScreen label="Items">
            <View style={{ flex: 1 }}>
              <View style={{ gap: 8, padding: 8, flex: 1 }}>
                <TradeItem />
                <CardComponent />
              </View>
            </View>
          </TabScreen>

          <TabScreen label="Services">
            <View style={{ gap: 8, padding: 8, flex: 1 }}>
              <CardComponent />
            </View>
          </TabScreen>
          <TabScreen label="Wishes">
            <View style={{ gap: 8, padding: 8, flex: 1 }}>
              <CardComponent />
              <CardComponent />
            </View>
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
}
