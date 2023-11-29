// Index page of a dynamic route!
// e.g. /trades/1, /trades/8, etc.

// Use the useLocalSearchParams hook from expo-router to get the id from the URL.

import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Avatar, Button, Card, ProgressBar, Text } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

function ActiveComponent() {
  const [remaning, setRemaining] = useState(0);
  return (
    <Card elevation={2} style={{ flex: 1, margin: 8 }}>
      <Card.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Avatar.Image size={72} source={require("~/assets/adaptive-icon.png")} />
          <View style={{ gap: 5 }}>
            <Text variant="titleSmall">Kanding</Text>
            <Text variant="labelSmall">from nize</Text>
            <Text variant="labelSmall">to You</Text>
          </View>
        </View>
        <View>
          <Text variant="titleSmall">Remaining:</Text>
          <Text variant="labelMedium">{remaning}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

export default function ActiveTrade() {
  const { id } = useLocalSearchParams();
  const [percent, setPercent] = useState(0);
  // If naa natay backend, pwede nato gamiton ang id ig fetch.

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <Text>ActiveTrade, id: {id}</Text>
      <View style={{ alignItems: "center", width: "100%", padding: 12, gap: 8 }}>
        <Text variant="titleMedium">Trading with !username!</Text>
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
                  <ActiveComponent />
                  <ActiveComponent />
                  <ActiveComponent />
                  <ActiveComponent />
                  <ActiveComponent />
                  <ActiveComponent />
                </ScrollView>
              </View>
            </TabScreen>

            <TabScreen label="Completed">
              <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, padding: 8 }}>
                  <ActiveComponent></ActiveComponent>
                  <ActiveComponent></ActiveComponent>
                  <ActiveComponent></ActiveComponent>
                  <ActiveComponent></ActiveComponent>
                  <ActiveComponent></ActiveComponent>
                </ScrollView>
              </View>
            </TabScreen>
          </Tabs>
        </TabsProvider>
      </View>
    </View>
  );
}
