import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function index() {
  return (
    <View style={{ padding: 64, borderWidth: 8, borderColor: "green", gap: 16 }}>
      <Text>Index page (or default/home page) for Browse page for now</Text>
      <Link asChild href="/search">
        <Button mode="contained">Go to search screen (Stack navigation)</Button>
      </Link>
    </View>
  );
}
