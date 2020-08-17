import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
