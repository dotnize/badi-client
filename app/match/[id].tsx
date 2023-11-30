import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import { COLORS } from "~/lib/theme";

export default function MatchFound() {
  const { id } = useLocalSearchParams();

  return (
    <TabsProvider>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Suggested Matches</Text>
        </View>
        <Tabs>
          <TabScreen label="Tab 1">
            <Text>Content for Tab 1</Text>
            {/* Add components for suggested matches in Tab 1 */}
          </TabScreen>
          <TabScreen label="Tab 2">
            <Text>Content for Tab 2</Text>
            {/* Add components for suggested matches in Tab 2 */}
          </TabScreen>
        </Tabs>
      </View>
    </TabsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc", // Add a border at the bottom for separation
  },
  title: {
    fontSize: 20,
  },
});
