import { Link } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { useTabIndex } from "react-native-paper-tabs";
import { defaultAvatarUrl } from "~/lib/firebase";
import { TradeGroup } from "~/lib/types";

// interface TradeCardProps {
//   tradeGroupid: number;
//   user1FirstName: string;
//   user2FirstName: string;
//   user1profileUrl: string;
//   user2profileUrl: string;
// }

// export default function PendingTradeCard({
//   tradeGroupid,
//   user1FirstName,
//   user2FirstName,
//   user1profileUrl,
//   user2profileUrl,
// }: TradeCardProps) {

export default function PendingTradeCard({ trade }: { trade: TradeGroup }) {
  const tabIndex = useTabIndex();
  const whatTab = tabIndex === 0 ? `/trades/${trade.id}` : `/offers/${trade.id}`;

  return (
    <Link href={whatTab}>
      <View style={{ flex: 1, width: "100%" }}>
        <Card style={{ height: "auto", margin: 8, paddingBottom: 10 }}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              marginBottom: 10,
              backgroundColor: "grey",
              gap: 4,
            }}
          >
            <Pressable style={{ flex: 1, height: 200 }}>
              <Image
                style={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  resizeMode: "cover",
                }}
                source={{ uri: trade?.user1?.avatarUrl || defaultAvatarUrl }}
              />
            </Pressable>
            <Pressable style={{ flex: 1, height: 200 }}>
              <Image
                style={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  resizeMode: "cover",
                }}
                source={{ uri: trade?.user2?.avatarUrl || defaultAvatarUrl }}
              />
            </Pressable>
          </View>

          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginBottom: 20,
                flex: 1,
              }}
            >
              <View>
                <Text variant="headlineSmall">
                  {trade.user1?.firstName} x {trade.user2?.firstName}
                </Text>
              </View>
              <Text style={{ marginLeft: "auto", paddingTop: 5 }}>11/27/35</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </Link>
  );
}
