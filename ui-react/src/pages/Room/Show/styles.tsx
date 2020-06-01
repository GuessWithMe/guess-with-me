import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timer: {
      padding: `${theme.spacing(2)}px 0`,
      width: "180px",
      textAlign: "center",
    },
    guessMarker: {
      fontSize: "2rem",

      "&.flash": {
        "&.green": {
          color: "green",
        },
        "&.red": {
          color: "red",
        },
      },
    },
    wordContainer: {
      fontSize: 30,
      letterSpacing: 3,
      textTransform: "lowercase",
      display: "inline-block",
      marginRight: 12,
      color: "black",

      "&:last-child": {
        marginRight: 0,
      },
    },
    input: {
      marginTop: theme.spacing(6),
    },
  })
);

export default useStyles;
