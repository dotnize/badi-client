import { useLocalSearchParams } from "expo-router";
<<<<<<< HEAD
import { useEffect, useState } from "react";
=======

>>>>>>> main
import ProfileContent from "~/components/profile-content";
import { API_URL } from "~/lib/config";

<<<<<<< HEAD
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
=======
export default function OtherUserProfile() {
  const { id } = useLocalSearchParams();

  // eslint-disable-next-line radix
  const idFromUrl = parseInt(id as string);

  return <ProfileContent userId={idFromUrl} />;
>>>>>>> main
}
