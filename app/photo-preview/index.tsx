import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function PhotoPreview() {
  const { photo } = useLocalSearchParams<{ photo: string }>();

  let n: any = 0;

  if (photo && /^[0-9]+$/.test(photo)) {
    n = parseInt(photo, 10);
  } else {
    n = photo;
  }

  console.log(n, typeof n, photo, typeof photo, "feffe");

  return (
    <View style={{ height: "90%" }}>
      <Image style={styles.photoPreview} source={n} />
    </View>
  );
}

const styles = StyleSheet.create({
  photoPreview: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
});
