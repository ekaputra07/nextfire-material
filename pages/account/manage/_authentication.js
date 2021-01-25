import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Reauthenticate from "components/Reauthenticate";
import { useAuth } from "common/auth";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    padding: theme.spacing(1),
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function FormAuthentication() {
  const classes = useStyles();
  const { user } = useAuth();
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [ok, setOk] = useState(null);
  const [reauth, setReauth] = useState(false);

  async function submit(e) {
    if (e) e.preventDefault();
    if (loading) return;

    if (pass1.trim() === "" || pass1.trim() === "") {
      setErr("Both Password and Password Confirmation required");
      return;
    }

    if (pass1 !== pass2) {
      setErr("Password and Password Confirmation does not match");
      return;
    }

    setLoading(true);
    setErr(null);
    setOk(false);

    try {
      await user.updatePassword(pass1);
      setOk(true);
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        setReauth(true);
      } else {
        setErr(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={classes.form} noValidate onSubmit={submit}>
      <Reauthenticate
        open={reauth}
        onClose={() => setReauth(false)}
        onSuccess={submit}
      />
      <TextField
        value={pass1}
        onChange={(e) => setPass1(e.target.value)}
        type="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="pass1"
        label="New Password"
        name="pass1"
        autoComplete="pass1"
      />
      <TextField
        value={pass2}
        onChange={(e) => setPass2(e.target.value)}
        type="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="pass2"
        label="Confirm New Password"
        name="pass2"
        autoComplete="pass2"
      />
      {err ? <Alert severity="warning">{err}</Alert> : null}
      {ok ? <Alert severity="success">Password updated</Alert> : null}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        disableElevation
      >
        {loading ? "Saving..." : "Change Password"}
      </Button>
    </form>
  );
}
