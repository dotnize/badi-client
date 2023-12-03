// URL: /me/ratings

import { useEffect, useState } from "react";
import { FlatList } from "react-native";

import RatingCard from "~/components/cards/profile/rating-card";
import { useSession } from "~/hooks/useSession";
import { Rating } from "~/lib/types";
import { apiFetch } from "~/lib/utils";

export default function MyRatings() {
  const { user } = useSession();

  const [ratings, setRatings] = useState<Rating[]>([]);

  async function fetchRatings() {
    if (!user) return;

    const { data, error } = await apiFetch<Rating[]>(`/rating/user/${user.id}`);
    if (error || !data) {
      console.log(error || "No ratings found");
    } else if (data) {
      setRatings(data);
    }
  }

  useEffect(() => {
    fetchRatings();
  }, [user]);

  return (
    <FlatList
      contentContainerStyle={{ gap: 10, padding: 8, flex: 1 }}
      data={ratings}
      renderItem={({ item }) => <RatingCard item={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
