import { Platform, View } from "react-native";
import { Button } from "react-native-paper";

import { VictoryChart, VictoryLine } from "victory";

const sampleData = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 3, y: 3 },
  { x: 4, y: 2 },
];

export default function Dashboard() {
  return (
    <View>
      <VictoryChart>
        <VictoryLine
          data={sampleData}
          labels={(datum: { x: string | number | string[] | number[] | null }) => datum.x}
        />
      </VictoryChart>
      {Platform.OS === "web" && (
        <Button mode="contained" onPress={() => window?.print()}>
          Export/Print to PDF
        </Button>
      )}
    </View>
  );
}
