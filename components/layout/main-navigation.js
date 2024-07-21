import Link from 'next/link';
import { useSession } from "next-auth/react"
import classes from './main-navigation.module.css';
import { signOut } from "next-auth/react"

function MainNavigation() {
  const { status } = useSession()
  function logOutHandler(){
    signOut()
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {status !== "authenticated"  && status !== "loading" &&  <li>
            <Link href="/auth">Login</Link>
          </li>}
          {status === "authenticated" &&  <li>
            <Link href="/profile">Profile</Link>
          </li>}

          {status === "authenticated" &&
            <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>}

        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
