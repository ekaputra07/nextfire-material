import NextLink from "next/link";
import MuiLink from "@material-ui/core/Link";

export default function Link(props) {
  return (
    <NextLink href={props.href} passHref>
      <MuiLink {...props} underline="none" />
    </NextLink>
  );
}
