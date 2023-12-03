import { useEffect, useState } from "react";
import ProfileContent from "~/components/profile-content";
import { apiFetch } from "~/lib/utils";

export default function MyProfile() {
  // a call to get the data of user:
  // values needed: name, ratings, pfppic, coverpic, inventoryList, wishesList, historyList
  const user = "sample"; // a call to db that returns a user type values needed
  const isLoggeduser = true; // logic  to check if user is the loggedinUser

  const [currentUser, setCurrentUser] = useState<null | object>(null);
  const [wishes, setWishes] = useState<null | object>(null);
  const [inventory, setInventory] = useState<null | object>(null);
  const [history, setHistory] = useState<null | object>(null);

  async function fetchCurrentUser() {
    const { data, error } = await apiFetch(`/user/1`);
    if (error) {
      console.log(error);
    } else {
      console.log("Profile (Me)", data);
      setCurrentUser(data);
    }
  }

  async function fetchUserList(
    url: string,
    setData: React.Dispatch<React.SetStateAction<object | null>>
  ) {
    const { data, error } = await apiFetch(`/${url}/user/1`);

    if (error) {
      console.log(error);
    } else {
      console.log(url, data);
      setData(data);
    }
  }

  useEffect(() => {
    fetchCurrentUser();
    fetchUserList("wish", setWishes);
    fetchUserList("inventory", setInventory);
    // fetchUserList("history", setHistory);
  }, []);

  return (
    currentUser &&
    wishes &&
    inventory && (
      <ProfileContent
        user={currentUser}
        isLoggedUser={isLoggeduser}
        wishes={wishes}
        inventory={inventory}
      />
    )
  );
}
