import { SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";

type ConfirmModalType = {
  title: string;
  state: boolean;
  setState: React.Dispatch<SetStateAction<boolean>>;
  onConfirmFunction: () => any;
};

export default function ConfirmModal({
  title,
  state,
  setState,
  onConfirmFunction,
}: ConfirmModalType) {
  const handleOnConfirm = () => {
    onConfirmFunction();
    setState(false);
  };

  return (
    <Portal>
      <Modal
        visible={state}
        onDismiss={() => setState(false)}
        contentContainerStyle={styles.modalContainerStyle}
      >
        <Text variant="headlineSmall" style={{ justifyContent: "center", textAlign: "center" }}>
          {title}
        </Text>

        <View style={{ flexDirection: "row", gap: 15 }}>
          <Button style={{ flex: 1 }} mode="contained" onPress={handleOnConfirm}>
            Confirm
          </Button>
          <Button style={{ flex: 1 }} mode="outlined" onPress={() => setState(false)}>
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
