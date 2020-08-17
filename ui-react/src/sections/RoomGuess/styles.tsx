import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

export default useStyles;
