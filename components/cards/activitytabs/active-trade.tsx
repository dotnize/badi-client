import { Link } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { Card, Chip, Text } from "react-native-paper";
import { useTabIndex } from "react-native-paper-tabs";

interface TradeCardProps {
  tradeGroupId: number;
  user1FirstName: string;
  user2FirstName: string;
  user1profileUrl: string;
  user2profileUrl: string;
  isHistory?: boolean;
}

export default function ActiveTradeCard({
  tradeGroupId,
  user1FirstName,
  user2FirstName,
  user1profileUrl,
  user2profileUrl,
  isHistory = false,
}: TradeCardProps) {
  const tabIndex = useTabIndex();

  const whatTab = tabIndex === 0 ? `/trades/${tradeGroupId}` : `/offers/${tradeGroupId}`;
  return (
    <Link
      href={{
        pathname: whatTab,
        params: { isHistory: isHistory ? "1" : "0" },
      }}
    >
      <View style={{ flex: 1, width: "100%" }}>
        <Card style={{ height: "auto", margin: 8, paddingBottom: 10 }}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              marginBottom: 10,
              gap: 4,
              backgroundColor: "grey",
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
                source={{ uri: user1profileUrl }}
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
                source={{ uri: user2profileUrl }}
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
                  {user1FirstName} x {user2FirstName}
                </Text>
              </View>
              <Text
                style={{
                  marginLeft: "auto",
                  paddingTop: 5,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "right",
                  gap: 5,
                }}
              >
                {isHistory && <Chip>COMPLETED</Chip>} 11/27/35
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </Link>
  );
}
