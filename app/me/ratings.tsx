// URL: /me/ratings

import { ScrollView } from "react-native-gesture-handler";
import TradeItem from "~/components/trade-item";

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
    <ScrollView style={{ flex: 1 }}>
      <TradeItem />
      <TradeItem />
      <TradeItem />
      <TradeItem />
      <TradeItem />
      <TradeItem />
    </ScrollView>
  );
}
