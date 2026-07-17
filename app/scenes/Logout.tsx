import posthog from "posthog-js";
import { Redirect } from "react-router-dom";
import env from "~/env";
import useStores from "~/hooks/useStores";
import { logoutPath } from "~/utils/routeHelpers";

const Logout = () => {
  const { auth } = useStores();

  if (env.POSTHOG_API_KEY) {
    posthog.reset();
  }

  void auth.logout({
    userInitiated: true,
    clearCache: true,
  });

  if (env.OIDC_LOGOUT_URI || auth.lastSignedIn === "oidc") {
    return null; // user will be redirected to logout URI after logout
  }
  return <Redirect to={logoutPath()} />;
};

export default Logout;
