// URL: /me/ratings

import { FlatList, View } from "react-native";
import { Card, Text } from "react-native-paper";

/**
 * Since ang My Profile Ratings og Other User Ratings kay similar ra, naa koy suggestion:
 *
 * Pwede mo magcreate og reusable component (himo mog new file sa "components" folder)
 * nga moaccept og "id" prop
 * - if other user ratings, gamiton ang useLocalSearchParams() hook.
 * - else if my profile ratings, gamiton ang logged-in user id (via a custom hook or context)
 *
 * then kana nga reusable component kay gamiton both sa /user/me/ratings og /me/ratings nga routes.
 * @jameel @leonel
 * Sabotan nya ni nato sa discord. Chat sad mo sa server anytime if naa mo questions.
 */

export default function MyRatings() {
  // para makuha ang logged-in user id, maghimo ra nya kog custom hook if nana tay backend -nize

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={INVENTORY}
        renderItem={({ item }) => <CardComponent content={item.content} />}
        keyExtractor={(item) => item.id.toString()}
        style={{ height: 1000 }}
      />
    </View>
  );
}

type CardProps = { content: string };
function CardComponent(props: CardProps) {
  return (
    <Card style={{ height: 200, backgroundColor: "rgb(243, 246, 235)", margin: 8 }}>
      <Card.Content>
        <Text style={{ color: "black" }}>{props.content}</Text>
      </Card.Content>
    </Card>
  );
}

// CARD CONTENT SAMPLE DATA
const INVENTORY = [
  {
    id: 1,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 6,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
