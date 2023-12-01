import { Link } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useSession } from "~/hooks/useSession";

import { SIZES } from "~/lib/theme";
import { User } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

export default function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { setUser } = useSession();

  async function login() {
    const { data, error } = await apiFetch<User>(`/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    });

    if (data) {
      setUser(data);
      console.log("login complete");
    } else {
      console.log(error);
    }
  }
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
          secureTextEntry
        />
      </View>
      <View>
        <Link asChild href="/">
          <Button style={{ width: 128 }} mode="contained" onPress={login}>
            Login
          </Button>
        </Link>
      </View>
    </View>
  );
}
