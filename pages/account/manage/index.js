import Head from "next/head";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { getTitle } from "common/utils";
import { loginRequired } from "common/auth";
import FormCard from "components/FormCard";

import FormProfile from "./_profile";
import FormAuthentication from "./_authentication";
import FormDelete from "./_delete";

const useStyles = makeStyles((theme) => ({
  heroContent1: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5, 0, 5),
  },
  heroContent2: {
    padding: theme.spacing(5, 0, 5),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  text300: {
    fontWeight: 300,
    fontSize: 20,
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

function Profile({ user }) {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>{getTitle("Account")}</title>
      </Head>
      <div className={classes.heroContent1}>
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Account
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
            className={classes.text300}
          >
            Account settings goes here
          </Typography>
        </Container>
      </div>

      <div className={classes.heroContent2}>
        <Container maxWidth="sm">
          <FormCard title="Profile">
            <FormProfile />
          </FormCard>
          <FormCard title="Change Password">
            <FormAuthentication />
          </FormCard>
          <FormCard title="Delete Account">
            <FormDelete />
          </FormCard>
        </Container>
      </div>
    </>
  );
}

export default loginRequired(Profile);
