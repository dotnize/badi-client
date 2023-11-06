import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { IconButton } from "react-native-paper";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarLabelPosition: "below-icon" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={24} color={color} />,
          headerRight: () => (
            <Link href="/search" asChild>
              <IconButton icon="magnify" size={24} iconColor="black" />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: "New Listing",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => <AntDesign name="plus" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bell" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: "My Profile",
          tabBarLabel: "Me",
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
