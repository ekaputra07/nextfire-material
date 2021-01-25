import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import Link from "components/Link";
import { useAuth } from "common/auth";
import { auth } from "common/firebaseClient";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  footer: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  topMenus: {
    marginLeft: 50,
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    color: "#999",
    background: "none",
    fontSize: 14,
    "&:hover": {
      color: "white",
    },
  },
  listItemSelected: {
    color: "white",
    background: "none !important",
  },
}));

function Copyright() {
  return (
    <>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Boilerplate codes for NextJS, Firebase and Material UI application
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {"copyright © "}
        <Link
          color="inherit"
          href="https://github.com/ekaputra07/nextfire-material"
        >
          nextfire-material
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    </>
  );
}

function TopMenus() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <List className={classes.topMenus}>
      <Link className={classes.link} href="/about">
        <ListItem
          className={
            router.route === "/about" ? classes.listItemSelected : null
          }
        >
          <ListItemText title="About Page">About</ListItemText>
        </ListItem>
      </Link>
    </List>
  );
}

export default function Layout(props) {
  const classes = useStyles();
  const { user } = useAuth();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function logout() {
    await auth.signOut();
    router.push("/account/login");
  }

  return (
    <React.Fragment>
      <AppBar position="relative" elevation={0} color="primary">
        <Container>
          <Toolbar>
            <Link href="/">
              <img src="/logo.png" height="30" />
            </Link>
            <TopMenus />
            <div className={classes.grow} />
            {user ? (
              <div>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="Akun"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <Link href="/home">
                    <MenuItem>Dashboard</MenuItem>
                  </Link>
                  <Link href="/account/manage">
                    <MenuItem onClick={handleClose}>Account</MenuItem>
                  </Link>
                  <Divider />
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Link href="/account/login">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    disableElevation
                  >
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <main>{props.children}</main>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}
