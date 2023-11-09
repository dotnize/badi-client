import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Slot, usePathname } from "expo-router";
import { View, useWindowDimensions } from "react-native";
import { Button } from "react-native-paper";

import Tabs from "~/components/bottom-tabs";

// TODO: minor issue, keep route state when switching navigation modes

export default function TabLayout() {
  const { height, width } = useWindowDimensions();
  const pathname = usePathname();

  const isLandscape = width > height * 1.2;

  return isLandscape ? (
    <View style={{ flexDirection: "row", flex: 1, justifyContent: "center", gap: 32 }}>
      <View style={{ justifyContent: "center", gap: 8, width: 180 }}>
        <Link replace asChild href="/">
          <Button
            icon={pathname === "/" ? "home" : "home-outline"}
            mode={pathname === "/" ? "outlined" : "text"}
            contentStyle={{ justifyContent: "flex-start", width: "100%" }}
          >
            Home
          </Button>
        </Link>
        <Link replace asChild href="/messages">
          <Button
            icon={pathname.startsWith("/messages") ? "message" : "message-outline"}
            mode={pathname.startsWith("/messages") ? "outlined" : "text"}
            contentStyle={{ justifyContent: "flex-start", width: "100%" }}
          >
            Messages
          </Button>
        </Link>
        <Link replace asChild href="/new">
          <Button
            icon="plus"
            mode={pathname === "/new" ? "outlined" : "text"}
            contentStyle={{ justifyContent: "flex-start", width: "100%" }}
          >
            New Listing
          </Button>
        </Link>
        <Link replace asChild href="/activity">
          <Button
            icon={pathname.startsWith("/activity") ? "bell" : "bell-outline"}
            mode={pathname.startsWith("/activity") ? "outlined" : "text"}
            contentStyle={{ justifyContent: "flex-start", width: "100%" }}
          >
            Activity
          </Button>
        </Link>
        <Link replace asChild href="/me">
          <Button
            icon={pathname === "/me" ? "account" : "account-outline"}
            mode={pathname === "/me" ? "outlined" : "text"}
            contentStyle={{ justifyContent: "flex-start", width: "100%" }}
          >
            My Profile
          </Button>
        </Link>
      </View>

      <View style={{ maxWidth: 768, flex: 1 }}>
        <Slot />
      </View>
    </View>
  ) : (
    <Tabs theme={{ colors: { secondaryContainer: "transparent" } }} shifting>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "message" : "message-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: "New Listing",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="plus" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "bell" : "bell-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: "My Profile",
          tabBarLabel: "Me",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "account" : "account-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
