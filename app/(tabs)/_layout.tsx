import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Slot, usePathname } from "expo-router";
import { Image, View, useWindowDimensions } from "react-native";
import { Button, Text } from "react-native-paper";

import Tabs from "~/components/bottom-tabs";
import { useSession } from "~/hooks/useSession";
import { COLORS, SIZES } from "~/lib/theme";
import { apiFetch } from "~/lib/utils";

// TODO: minor issue, keep route state when switching navigation modes

export default function TabLayout() {
  const { height, width } = useWindowDimensions();
  const pathname = usePathname();

  const { setUser } = useSession();

  const isLandscape = width > height * 1.2;

  function logoutHandler() {
    apiFetch("/auth/logout", { method: "POST" });
    setUser(null);
  }

  return isLandscape ? (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        gap: SIZES[8],
      }}
    >
      <View style={{ justifyContent: "space-evenly", width: 192 }}>
        <View style={{ gap: SIZES[4] }}>
          <View
            style={{
              paddingHorizontal: SIZES[0.5],
            }}
          >
            <Image
              style={{ width: 48, height: 48, resizeMode: "contain" }}
              source={require("~/assets/badi.svg")}
            />
          </View>

          <View style={{ gap: 4 }}>
            <Link replace asChild href="/">
              <Button
                textColor={COLORS.onSurface}
                icon={
                  pathname === "/"
                    ? ({ color }) => <MaterialCommunityIcons name="home" size={24} color={color} />
                    : ({ color }) => (
                        <MaterialCommunityIcons name="home-outline" size={24} color={color} />
                      )
                }
                //mode={pathname === "/" ? "outlined" : "text"}
                mode="text"
                contentStyle={{ justifyContent: "flex-start", width: "100%", height: 52 }}
              >
                <Text
                  style={{ paddingLeft: 4, fontWeight: pathname === "/" ? "bold" : "normal" }}
                  variant="titleMedium"
                >
                  Home
                </Text>
              </Button>
            </Link>
            <Link replace asChild href="/messages">
              <Button
                textColor={COLORS.onSurface}
                icon={
                  pathname.startsWith("/messages")
                    ? ({ color }) => (
                        <MaterialCommunityIcons name="message" size={24} color={color} />
                      )
                    : ({ color }) => (
                        <MaterialCommunityIcons name="message-outline" size={24} color={color} />
                      )
                }
                //mode={pathname.startsWith("/messages") ? "outlined" : "text"}
                mode="text"
                contentStyle={{ justifyContent: "flex-start", width: "100%", height: 52 }}
              >
                <Text
                  style={{
                    paddingLeft: 4,
                    fontWeight: pathname.startsWith("/messages") ? "bold" : "normal",
                  }}
                  variant="titleMedium"
                >
                  Messages
                </Text>
              </Button>
            </Link>
            <Link replace asChild href="/new">
              <Button
                textColor={COLORS.onSurface}
                icon={({ color }) => <MaterialCommunityIcons name="plus" size={24} color={color} />}
                //mode={pathname === "/new" ? "outlined" : "text"}
                mode="text"
                contentStyle={{ justifyContent: "flex-start", width: "100%", height: 52 }}
              >
                <Text
                  style={{ paddingLeft: 4, fontWeight: pathname === "/new" ? "bold" : "normal" }}
                  variant="titleMedium"
                >
                  New Listing
                </Text>
              </Button>
            </Link>
            <Link replace asChild href="/activity">
              <Button
                textColor={COLORS.onSurface}
                icon={
                  pathname.startsWith("/activity")
                    ? ({ color }) => <MaterialCommunityIcons name="bell" size={24} color={color} />
                    : ({ color }) => (
                        <MaterialCommunityIcons name="bell-outline" size={24} color={color} />
                      )
                }
                //mode={pathname.startsWith("/activity") ? "outlined" : "text"}
                mode="text"
                contentStyle={{ justifyContent: "flex-start", width: "100%", height: 52 }}
              >
                <Text
                  style={{
                    paddingLeft: 4,
                    fontWeight: pathname.startsWith("/activity") ? "bold" : "normal",
                  }}
                  variant="titleMedium"
                >
                  Activity
                </Text>
              </Button>
            </Link>
            <Link replace asChild href="/me">
              <Button
                textColor={COLORS.onSurface}
                icon={
                  pathname === "/me"
                    ? ({ color }) => (
                        <MaterialCommunityIcons name="account" size={24} color={color} />
                      )
                    : ({ color }) => (
                        <MaterialCommunityIcons name="account-outline" size={24} color={color} />
                      )
                }
                //mode={pathname === "/me" ? "outlined" : "text"}
                mode="text"
                contentStyle={{ justifyContent: "flex-start", width: "100%", height: 52 }}
              >
                <Text
                  style={{ paddingLeft: 4, fontWeight: pathname === "/me" ? "bold" : "normal" }}
                  variant="titleMedium"
                >
                  My Profile
                </Text>
              </Button>
            </Link>
          </View>
        </View>
        <View style={{ gap: SIZES[2] }}>
          <View style={{ gap: SIZES[1] }}>
            <Link href="/dashboard" asChild>
              <Button
                textColor={COLORS.onSurface}
                icon={({ color }) => (
                  <MaterialCommunityIcons name="view-dashboard" size={24} color={color} />
                )}
                mode="text"
                contentStyle={{ justifyContent: "flex-start", width: "100%", height: 42 }}
              >
                <Text style={{ paddingLeft: 4 }} variant="titleSmall">
                  Dashboard
                </Text>
              </Button>
            </Link>
            <Link href="/about" asChild>
              <Button
                textColor={COLORS.onSurface}
                icon={({ color }) => (
                  <MaterialCommunityIcons name="information" size={24} color={color} />
                )}
                mode="text"
                contentStyle={{ justifyContent: "flex-start", width: "100%", height: 42 }}
              >
                <Text style={{ paddingLeft: 4 }} variant="titleSmall">
                  About Us
                </Text>
              </Button>
            </Link>
            {/* <Link href="/terms">Terms and Conditions</Link> */}
          </View>

          <Button
            onPress={logoutHandler}
            textColor={COLORS.onSurface}
            icon={({ color }) => <MaterialCommunityIcons name="logout" size={24} color={color} />}
            mode="text"
            contentStyle={{ justifyContent: "flex-start", width: "100%", height: 42 }}
          >
            <Text style={{ paddingLeft: 4 }} variant="titleSmall">
              Logout
            </Text>
          </Button>
        </View>
      </View>

      <View
        style={{
          maxWidth: 640,
          flex: 1,
          // card components dont match well with these borders
          // borderColor: COLORS.surfaceVariant,
          // borderLeftWidth: 2,
          // borderRightWidth: 2,
        }}
      >
        <Slot />
      </View>
    </View>
  ) : (
    <Tabs
      activeColor={COLORS.primary}
      theme={{ colors: { secondaryContainer: "transparent" } }}
      shifting
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              size={SIZES[6]}
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
              size={SIZES[6]}
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
              size={SIZES[6]}
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
              size={SIZES[6]}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
