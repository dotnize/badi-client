import { SetStateAction } from "react";
import { Image, StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { COLORS } from "~/lib/theme";

type PhotoPreviewType = {
  photo: string;
  state: boolean;
  setState: React.Dispatch<SetStateAction<boolean>>;
};
export default function PhotoPreviewModal({ photo, state, setState }: PhotoPreviewType) {
  const requirePhoto = parseInt(photo, 10); //if photo is not string like the return value of require()

  return (
    <Portal>
      <Modal
        visible={state}
        onDismiss={() => setState(false)}
        contentContainerStyle={styles.modalContainerStyle}
      >
        <Image style={styles.photoPreview} source={{ uri: photo }} />
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  photoPreview: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  modalContainerStyle: {
    height: "50%",
    width: "100%",
    backgroundColor: COLORS.backdrop,
  },
});
