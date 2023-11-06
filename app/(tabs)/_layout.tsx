import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Slot, usePathname } from "expo-router";
import { View, useWindowDimensions } from "react-native";
import { Button } from "react-native-paper";

import Tabs from "~/components/bottom-tabs";

export default function TabLayout() {
  const { height, width } = useWindowDimensions();
  const pathname = usePathname();

  return width > height * 1.2 ? (
    <View style={{ flexDirection: "row", flex: 1, justifyContent: "center", gap: 32 }}>
      <View style={{ justifyContent: "center", gap: 8, width: 180 }}>
        <Link asChild href="/">
          <Button
            icon={pathname === "/" ? "home" : "home-outline"}
            mode={pathname === "/" ? "outlined" : "text"}
            contentStyle={{ justifyContent: "flex-start", width: "100%" }}
          >
            Home
          </Button>
        </Link>
        <Link asChild href="/messages">
          <Button
            icon={pathname.startsWith("/messages") ? "message" : "message-outline"}
            mode={pathname.startsWith("/messages") ? "outlined" : "text"}
            contentStyle={{ justifyContent: "flex-start", width: "100%" }}
          >
            Messages
          </Button>
        </Link>
        <Link asChild href="/new">
          <Button
            icon="plus"
            mode={pathname === "/new" ? "outlined" : "text"}
            contentStyle={{ justifyContent: "flex-start", width: "100%" }}
          >
            New Listing
          </Button>
        </Link>
        <Link asChild href="/activity">
          <Button
            icon={pathname.startsWith("/activity") ? "bell" : "bell-outline"}
            mode={pathname.startsWith("/activity") ? "outlined" : "text"}
            contentStyle={{ justifyContent: "flex-start", width: "100%" }}
          >
            Activity
          </Button>
        </Link>
        <Link asChild href="/me">
          <Button
            icon={pathname === "/me" ? "account" : "account-outline"}
            mode={pathname === "/me" ? "outlined" : "text"}
            contentStyle={{ justifyContent: "flex-start", width: "100%" }}
          >
            My Profile
          </Button>
        </Link>
      </View>

      <View style={{ width: 768 }}>
        <Slot />
      </View>
    </View>
  ) : (
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
