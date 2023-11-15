import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import { SIZES } from "~/lib/theme";

export default function Login() {
  return (
    <View style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text variant="displayMedium" style={{ textAlign: "center" }}>
          LOGIN
        </Text>
      </View>
      <View style={{ padding: SIZES[20], gap: SIZES[5] }}>
        <TextInput mode="outlined" label="Email" />
        <TextInput mode="outlined" label="Password" />
      </View>
      <View>
        <Button style={{ width: 128 }} mode="contained">
          Login
        </Button>
      </View>
    </View>
  );
}
