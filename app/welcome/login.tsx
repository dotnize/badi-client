import { Link } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import { SIZES } from "~/lib/theme";

export default function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  return (
    <View style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text variant="displayMedium" style={{ textAlign: "center" }}>
          LOGIN
        </Text>
      </View>
      <View style={{ padding: SIZES[20], gap: SIZES[5] }}>
        <TextInput
          value={emailInput}
          onChangeText={(input) => setEmailInput(input)}
          mode="outlined"
          label="Email"
        />
        <TextInput
          value={passwordInput}
          onChangeText={(input) => setPasswordInput(input)}
          mode="outlined"
          label="Password"
        />
      </View>
      <View>
        <Link asChild href="/">
          <Button style={{ width: 128 }} mode="contained">
            Login
          </Button>
        </Link>
      </View>
    </View>
  );
}
