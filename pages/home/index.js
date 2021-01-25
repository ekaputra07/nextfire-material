import Head from "next/head";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { getTitle } from "common/utils";
import { loginRequired } from "common/auth";

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

  emptyRoot: {
    padding: theme.spacing(10),
    border: "2px dashed #ddd",
    position: "relative",
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: theme.palette.background.paper,
  },
  emptyText: { margin: "0 auto", fontWeight: 300, marginBottom: 15 },
}));

function App({ user }) {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>{getTitle("Dashboard")}</title>
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
            Hello {user.displayName}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
            className={classes.text300}
          >
            Welcome to your dashboard
          </Typography>
        </Container>
      </div>
    </>
  );
}

export default loginRequired(App);
