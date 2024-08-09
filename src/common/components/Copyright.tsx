import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

type CopyrightProps = {
  text: string;
  url: string;
};
export default function Copyright(props: CopyrightProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ pt: 4 }}
    >
      {"Copyright © "}
      <Link color="inherit" to={props.url} >
        {props.text}
      </Link> {" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
