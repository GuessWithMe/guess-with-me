import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      minHeight: "50vh",
    },
    link: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      background: "black",
      borderRadius: 25,
      color: "white",
      width: "380px",
      textDecoration: "none",
      lineHeight: "50px",
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: 14,
      maxWidth: `calc(100% - ${theme.spacing(3)}px)`,
      margin: `${theme.spacing(1)}px 0`,
      boxShadow: "0 2px 6px 0px rgba(0, 0, 0, 0.4)",
      "& img": {
        position: "absolute",
        left: "45px",
        top: "13px",
      },
    },
  })
);

export default useStyles;
