import { router } from "expo-router";
import { useState } from "react";
import { Image, View } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";

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
      <View style={{ position: "absolute", top: 16, left: 0 }}>
        <IconButton
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/welcome"))}
          icon="arrow-left"
        />
      </View>
      <View style={{ gap: 16 }}>
        <Image
          source={require("~/assets/badi.svg")}
          style={{ resizeMode: "contain", width: 128, height: 128 }}
        />
        <Text variant="headlineMedium" style={{ textAlign: "center" }}>
          Login
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
        <Button style={{ width: 128 }} mode="contained" onPress={login}>
          Login
        </Button>
      </View>
    </View>
  );
}
