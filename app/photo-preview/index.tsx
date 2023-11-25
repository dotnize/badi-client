import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function PhotoPreview() {
  const { photo } = useLocalSearchParams<{ photo: string }>();

  return (
    <View style={{ height: "90%" }}>
      <Image style={styles.photoPreview} source={{ uri: photo }} />
    </View>
  );
}

const styles = StyleSheet.create({
  photoPreview: {
    resizeMode: "contain",
    height: "100%",
  },
});
