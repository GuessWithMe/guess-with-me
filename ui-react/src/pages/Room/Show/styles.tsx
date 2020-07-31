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
    wordContainer: {
      fontSize: 30,
      letterSpacing: 3,
      textTransform: "lowercase",
      display: "inline-block",
      marginRight: 12,
      color: "white",

      "&:last-child": {
        marginRight: 0,
      },
    },
    input: {
      marginTop: theme.spacing(4),
      "& input": {
        border: 0,
        background: "white",
        borderRadius: 5,
        boxShadow: "0 3px 4px 0 rgba(0,0,0,0.4)",
        padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
        minWidth: "250px",
      },
      "& div::after": {
        content: "none",
      },
    },
  })
);

export default useStyles;
