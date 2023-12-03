import { SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";

type ConfirmModalType = {
  title: string;
  state: boolean;
  setState: React.Dispatch<SetStateAction<boolean>>;
  handleOnConfirmDelete: () => void;
  onRequestClose?: () => void;
};

export default function ConfirmModal({
  title,
  state,
  setState,
  handleOnConfirmDelete,
  onRequestClose,
}: ConfirmModalType) {
  const handleOnConfirm = () => {
    handleOnConfirmDelete();
    setState(false);
  };

  return (
    <Portal>
      <Modal
        visible={state}
        onDismiss={onRequestClose}
        contentContainerStyle={styles.modalContainerStyle}
      >
        <Text variant="headlineSmall" style={{ justifyContent: "center", textAlign: "center" }}>
          {title}
        </Text>

        <View style={{ flexDirection: "row", gap: 15 }}>
          <Button style={{ flex: 1 }} mode="contained" onPress={handleOnConfirm}>
            Confirm
          </Button>
          <Button style={{ flex: 1 }} mode="outlined" onPress={onRequestClose}>
            Cancel
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainerStyle: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 30,
    borderRadius: 10,
    margin: 10,
  },
});
