import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timer: {
      padding: `${theme.spacing(2)}px 0`,
      width: "180px",
      textAlign: "center",
      color: "white",
    },
    guessMarker: {
      fontSize: "2rem",
      color: "white",

      "&.flash": {
        "&.green": {
          color: "green",
        },
        "&.red": {
          color: "red",
        },
      },
    },
  })
);

export default useStyles;
