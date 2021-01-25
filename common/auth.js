import { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";
import { auth } from "common/firebaseClient";
import Loader from "components/CenteredLoader";
import Layout from "components/Layout";

const AuthContext = createContext({ user: null, userLoading: true });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setLoding] = useState(true);

  // update cookies when idToken changed
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.nookies = nookies;
    }

    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        setLoding(false);
        nookies.destroy(null, "token");
        nookies.set(null, "token", {});
        return;
      }

      const token = await user.getIdToken();
      setUser(user);
      setLoding(false);
      nookies.destroy(null, "token");
      nookies.set(null, "token", token, {});
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      try {
        const user = auth.currentUser();
        if (user) await user.getIdToken(true);
      } catch (err) {
        // ignore
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, userLoading: userLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function loginRequired(Component) {
  return function Wrapper(props) {
    const router = useRouter();
    const { user, userLoading } = useAuth();

    // if not loggedin, redirect to login page
    useEffect(() => {
      if (!userLoading && !user) {
        router.push("/account/login");
      }
    }, [user, userLoading]);

    return (
      <Layout>
        {!user || userLoading ? (
          <div style={{ padding: 50 }}>
            <Loader size={30} />
          </div>
        ) : (
          <Component user={user} {...props} />
        )}
      </Layout>
    );
  };
}

export function logoutRequired(Component) {
  return function Wrapper(props) {
    const router = useRouter();
    const { user, userLoading } = useAuth();

    // if loggedin, redirect to dashboard
    useEffect(() => {
      if (!userLoading && user) {
        router.push("/home");
      }
    }, [user, userLoading]);

    return (
      <Layout>
        {userLoading || user ? (
          <div style={{ padding: 50 }}>
            <Loader size={30} />
          </div>
        ) : (
          <Component user={user} {...props} />
        )}
      </Layout>
    );
  };
}
