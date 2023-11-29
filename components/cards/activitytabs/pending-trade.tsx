import { Link } from "expo-router";
import { Card, Text } from "react-native-paper";
import { useTabIndex } from "react-native-paper-tabs";

export default function PendingTradeCard() {
  const tabIndex = useTabIndex();
  const tempId = 1 + Math.floor(Math.random() * 100); // TODO: replace with legit id
  const whatTab = tabIndex === 0 ? `/trades/${tempId}` : `/offers/${tempId}`;

  return (
    <Link href={whatTab}>
      <Card style={{ height: 200, margin: 8 }}>
        <Card.Content>
          <Text>
            THIS IS A PENDING TRADE CARD Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Card.Content>
      </Card>
    </Link>
  );
}
