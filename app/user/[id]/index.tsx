import { useLocalSearchParams } from "expo-router";
import ProfileContent from "~/components/profile-content";

export default function OtherUserProfile() {
  // a call to get the data of user:
  // values needed: name, ratings, pfppic, coverpic, inventoryList, wishesList, historyList
  //const user = "sample"; // a call to db that returns a user type values needed
  //const isLoggeduser = false; // a call to check if user is the loggedinUser
  const { id } = useLocalSearchParams();

  // eslint-disable-next-line radix
  const idFromUrl = parseInt(id as string);

  return <ProfileContent userId={idFromUrl} />;
  //return <ProfileContent user={user} isLoggedUser={isLoggeduser} />;
}
