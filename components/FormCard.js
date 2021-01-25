import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: 20,
  },
  details: {
    flexDirection: "column",
    paddingLeft: theme.spacing(1),
    width: "100%",
  },
  content: {
    flex: "1 0 auto",
  },
}));

export default function FormCard({ title, children }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {title}
          </Typography>
          {children}
        </CardContent>
      </div>
    </Card>
  );
}
