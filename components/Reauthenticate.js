import { useState } from "react";
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";

import firebase from "common/firebaseClient";
import { useAuth } from "common/auth";

export default function Reauthenticate({ open, onClose, onSuccess }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(null);

  async function reauthenticate(e) {
    e.preventDefault();

    if (loading || pass.trim() === "") return;
    const email = user.email;

    setLoading(true);

    try {
      const creds = firebase.auth.EmailAuthProvider.credential(email, pass);
      await user.reauthenticateWithCredential(creds);
      onClose();
      onSuccess();
    } catch (err) {
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="xs"
      >
        <form noValidate onSubmit={reauthenticate}>
          <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please confirm this action by entering your current password
            </DialogContentText>
            <TextField
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              autoFocus
              id="pass"
              label="Password"
              fullWidth
              variant="outlined"
              margin="normal"
              required
            />
            {err ? <Alert severity="warning">{err}</Alert> : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button color="primary">
              {loading ? "Continuing..." : "Continue"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
