import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
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

export default function FormUmum() {
  const { user } = useAuth();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [ok, setOk] = useState(null);
  const [reauth, setReauth] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName);
      setEmail(user.email);
    }
  }, []);

  async function submit(e) {
    if (e) e.preventDefault();
    if (loading) return;

    if (name.trim() === "" || email.trim() === "") {
      setErr("Name and Email required");
      return;
    }

    setLoading(true);
    setErr(null);
    setOk(false);

    try {
      await user.updateProfile({
        displayName: name,
      });

      await user.updateEmail(email);

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
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
      />
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
      />
      {err ? <Alert severity="warning">{err}</Alert> : null}
      {ok ? <Alert severity="success">Profile saved</Alert> : null}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        disableElevation
      >
        {loading ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}
