import { useLocalSearchParams } from "expo-router";

import ProfileContent from "~/components/profile-content";

export default function OtherUserProfile() {
  const { id } = useLocalSearchParams();

  // eslint-disable-next-line radix
  const idFromUrl = parseInt(id as string);

  return <ProfileContent userId={idFromUrl} />;
}
