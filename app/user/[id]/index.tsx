import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import ProfileContent from "~/components/profile-content";
import { API_URL } from "~/lib/config";

export default function MyProfile() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState<null | object>(null);

  async function fetchUser() {
    const res = await fetch(`${API_URL}/user/${id}`);
    if (!res.ok) return setUser(null);

    const data = await res.json();

    if (!data) {
      console.log("sadge");
      setUser(null);
    } else {
      console.log("User", typeof data, data);
      setUser(data);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return user && <ProfileContent user={user} />;
}
