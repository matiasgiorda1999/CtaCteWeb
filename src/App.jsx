import { useAuth0 } from "@auth0/auth0-react";
import InitialPage from "./Components/InitialPage";
import Routes from "./Routes";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? <Routes user={user} /> : <InitialPage />;
}

export default App;
