import ProfileContent from "~/components/profile-content";
import { useSession } from "~/hooks/useSession";

export default function MyProfile() {
  const { user } = useSession();

  return <ProfileContent userId={user?.id} />;
}
