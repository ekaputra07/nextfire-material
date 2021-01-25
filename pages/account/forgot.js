import { useState } from "react";
import Head from "next/head";
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
import { DEPLOY_URL } from "config";

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

function ForgotPassword() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(null);
  const [sent, setSent] = useState(false);

  async function reset(e) {
    e.preventDefault();

    if (loading) return;

    // simple validation
    if (email.trim() === "") {
      setErr("Email is required");
      return;
    }

    setLoading(true);
    try {
      // create account
      await auth.sendPasswordResetEmail(email, {
        url: `${DEPLOY_URL}/account/login`,
      });
      setSent(true);
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
        <title>{getTitle("Reset Password")}</title>
      </Head>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {sent ? (
          <Alert severity="success" style={{ marginTop: 50 }}>
            Reset password link has been sent to {email}
          </Alert>
        ) : (
          <form className={classes.form} noValidate onSubmit={reset}>
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
            {err ? <Alert severity="warning">{err}</Alert> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              disableElevation
            >
              {loading ? "Sending..." : "Send  Reset Link"}
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/account/login" variant="body2">
                  Remember your password?
                </Link>
              </Grid>
            </Grid>
          </form>
        )}
      </div>
    </Container>
  );
}

export default logoutRequired(ForgotPassword);
