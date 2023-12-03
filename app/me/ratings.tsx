// URL: /me/ratings

import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import RatingItem from "~/components/cards/rating/rating-item";
import { apiFetch } from "~/lib/utils";

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

  const [rating, setRating] = useState();
  async function fetchUserRating() {
    const { data, error } = await apiFetch(`/rating/user/1`);

    if (error) {
      console.log(error);
    } else {
      console.log("rating", data);
      setRating(data);
    }
  }

  useEffect(() => {
    fetchUserRating();
  }, []);

  return (
    <FlatList
      data={rating}
      renderItem={({ item }) => <RatingItem rating={item} />}
      keyExtractor={(item) => item.id.toString()}
      style={{ height: 1000, paddingVertical: 10 }}
    />
    // <ScrollView style={{ flex: 1 }}>
    //   <RatingItem total={5} />
    //   <RatingItem total={2} />
    //   <RatingItem total={3} />
    //   <RatingItem total={4} />
    //   <RatingItem total={4} />
    // </ScrollView>
  );
}
