import { CircularProgress } from "@material-ui/core";

export default function CenteredLoader(props) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress {...props} style={{ margin: "0 auto" }} />
    </div>
  );
}
