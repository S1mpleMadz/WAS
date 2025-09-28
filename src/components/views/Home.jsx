import { useAuth } from "../auth/useAuth.jsx";
import LoggedInUser from "../entity/home/homePage.jsx";

function Home() {
  const { loggedInUser } = useAuth();
  // Initialisation ----------------------------------------------
  return (
    <>
      <h1>Homepage</h1>
      <LoggedInUser user={loggedInUser} />
    </>
  );
}

export default Home;
