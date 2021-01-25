import { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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

export default function FormDelete() {
  const classes = useStyles();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [ok, setOk] = useState(null);
  const [reauth, setReauth] = useState(false);
  const [checked, setChecked] = useState(false);

  async function submit(e) {
    if (e) e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErr(null);
    setOk(false);

    try {
      await user.delete();
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
      <Alert severity="error">
        WARNING: Deleted account can not be recovered
      </Alert>

      <FormControlLabel
        style={{ marginTop: 20 }}
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            name="checkedA"
          />
        }
        label="Yes! I want to delete my account"
      />

      {err ? <Alert severity="warning">{err}</Alert> : null}
      {ok ? <Alert severity="success">Account deleted</Alert> : null}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        disabled={!checked}
        disableElevation
      >
        {loading ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
}
