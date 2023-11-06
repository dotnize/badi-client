import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import Tabs from "~/components/bottom-tabs";

export default function TabLayout() {
  return (
    <Tabs shifting>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={24} color={color} />,
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
