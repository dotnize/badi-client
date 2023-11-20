import "react-native-gesture-handler";

import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import { CardComponent } from "./activity";

export default function index() {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flex: 1, alignItems: "center", padding: 8 }}>
          <Text variant="titleLarge">Home</Text>
        </View>
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
                <CardComponent />
                <CardComponent />
              </View>
            </View>
          </TabScreen>

          <TabScreen label="Services">
            <View style={{ gap: 8, padding: 8, flex: 1 }}>
              <CardComponent />
            </View>
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
}
