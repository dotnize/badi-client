import ProfileContent from "~/components/profile-content";

export default function MyProfile() {
  // a call to get the data of user:
  // values needed: name, ratings, pfppic, coverpic, inventoryList, wishesList, historyList
  const user = "sample"; // a call to db that returns a user type values needed
  const isLoggeduser = true; // a call to check if user is the loggedinUser

  return <ProfileContent user={user} isLoggedUser={isLoggeduser} />;
}
