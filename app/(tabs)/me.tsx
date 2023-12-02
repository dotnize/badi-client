import { useEffect, useState } from "react";
import ProfileContent from "~/components/profile-content";
import { API_URL } from "~/lib/config";

export default function MyProfile() {
  // a call to get the data of user:
  // values needed: name, ratings, pfppic, coverpic, inventoryList, wishesList, historyList
  const user = "sample"; // a call to db that returns a user type values needed
  const isLoggeduser = true; // logic  to check if user is the loggedinUser

  const [wishes, setWishes] = useState<null | object>();
  const [inventory, setInventory] = useState<null | object>();
  const [history, setHistory] = useState<null | object>();

  async function fetchUserList(
    url: string,
    setData: React.Dispatch<React.SetStateAction<object | null | undefined>>
  ) {
    const res = await fetch(`${API_URL}/${url}`);
    if (!res.ok) return setWishes(null);

    const data = await res.json();

    if (!data) {
      console.log("sadge");
      setData(null);
    } else {
      console.log(typeof data);
      setData(data);
    }
  }

  useEffect(() => {
    fetchUserList("wish", setWishes);
    // fetchUserList("inventory", setInventory);
    // fetchUserList("history", setHistory);
  }, []);

  return <ProfileContent user={user} isLoggedUser={isLoggeduser} wishes={wishes} />;
}
