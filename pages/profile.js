import UserProfile from '../components/profile/user-profile';
import { useSession} from "next-auth/react"

function ProfilePage() {

  const { status } = useSession()
  if (status=== "unauthenticated") {
    window.location.href="/auth"
  }
  if(status === "authenticated") return <UserProfile />;

  return <p>loading</p>
}

export default ProfilePage;
