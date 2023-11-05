import { Entypo } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { IconButton } from "react-native-paper";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
          headerRight: () => (
            <Link href="/search" asChild>
              <IconButton icon="magnify" size={24} iconColor="black" />
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
