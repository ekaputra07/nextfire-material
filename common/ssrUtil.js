import nookies from "nookies";
import firebaseAdmin from "common/firebaseAdmin";

/**
 * Serverside check, if already login redirect to specified path
 */
export async function logoutRequired(context, redirectTo) {
  try {
    const cookies = nookies.get(context);
    await firebaseAdmin.auth().verifyIdToken(cookies.token);
    // already logged-in, redirect
    return {
      redirect: {
        permanent: false,
        destination: redirectTo,
      },
      props: {},
    };
  } catch (err) {
    // token didn't exist or token verification failed (not loggedin, allow access)
    return {
      props: {},
    };
  }
}

/**
 * Serverside check to make sure user loggedin when visit a page
 */
export async function loginRequired(context) {
  try {
    const cookies = nookies.get(context);
    await firebaseAdmin.auth().verifyIdToken(cookies.token);
    // already logged-in (allow access)
    return {
      props: {},
    };
  } catch (err) {
    console.log(err);
    // token didn't exist or token verification failed, redirect to login
    return {
      redirect: {
        permanent: false,
        destination: "/account/login",
      },
      props: {},
    };
  }
}
