import { Link } from "expo-router";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";

import { COLORS } from "~/lib/theme";

export default function WelcomeIndex() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 16, gap: 64 }}>
      {/* temp logo */}
      <Image source={require("~/assets/adaptive-icon.png")} style={{ width: 256, height: 256 }} />
      <View style={{ justifyContent: "center", gap: 16 }}>
        <Text style={{ fontWeight: "bold", textAlign: "center" }} variant="displaySmall">
          Welcome to Badi
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, wala nako kabalo unsay itype diri, mwehehehehe. Chu chu login
          or register today!
        </Text>
      </View>

      <View style={{ width: "100%", maxWidth: 480, gap: 8 }}>
        <Link asChild href="/welcome/login">
          <Button style={{ width: "100%" }} mode="contained">
            Login
          </Button>
        </Link>

        <Link asChild href="/welcome/register">
          <Button style={{ width: "100%" }} mode="contained" buttonColor={COLORS.secondary}>
            Register
          </Button>
        </Link>
      </View>
    </View>
  );
}
