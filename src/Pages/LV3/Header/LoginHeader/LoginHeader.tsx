import Typography from "@mui/material/Typography";
import classes from "../styles/Header.module.scss";

function LoginHeader() {
  return (
    <Typography variant="h5" className={classes.headerTitle}>
      ビデオチャットシステム
    </Typography>
  );
}

export default LoginHeader;
