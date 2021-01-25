import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

import Link from "components/Link";
import { getTitle } from "common/utils";
import { auth } from "common/firebaseClient";
import { logoutRequired } from "common/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    padding: theme.spacing(1),
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const classes = useStyles();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(null);

  async function login(e) {
    e.preventDefault();

    if (loading) return;

    // simple validation
    if (email.trim() === "" || pass.trim() === "") {
      setErr("Email and Password required");
      return;
    }

    setLoading(true);
    try {
      // create account
      await auth.signInWithEmailAndPassword(email, pass);
      // redirect to dashboard
      router.replace("/home");
    } catch (err) {
      // const errCode = err.code;
      const errMsg = err.message;
      setErr(errMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>{getTitle("Login")}</title>
      </Head>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={login}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          {err ? <Alert severity="warning">{err}</Alert> : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            disableElevation
          >
            {loading ? "Login..." : "Login"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/account/forgot" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/account/register" variant="body2">
                Create an account
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default logoutRequired(Login);
