import { useEffect } from "react";
import ProfileContent from "~/components/profile-content";

export default function MyProfile() {
  // a call to get the data of user:
  // values needed: name, ratings, pfppic, coverpic, inventoryList, wishesList, historyList
  const user = "sample"; // a call to db that returns a user type values needed
  const isLoggeduser = true; // a call to check if user is the loggedinUser

  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch("localhost:3001"); // Replace with your actual API endpoint
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call the fetch function
    fetchUserData();
  });

  return <ProfileContent user={user} isLoggedUser={isLoggeduser} />;
}
