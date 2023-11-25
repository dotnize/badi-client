import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

type SearchParams = {
  photo: string; // Replace 'string' with the actual type of photo
  // Add other properties if needed
};

export default function PhotoPreview() {
  const params = useLocalSearchParams() as SearchParams;
  const { photo } = params;

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
