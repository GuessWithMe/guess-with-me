import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      padding: `${theme.spacing(5)}px 0`,
    },
    player: {
      // border: "1px solid black",
      borderRadius: 5,
      // padding: 5,
      display: "grid",
      gridTemplateColumns: "30px 1fr 50px 50px 50px",
      alignItems: "center",
      marginBottom: theme.spacing(1),
    },
    username: {
      maxWidth: 150,
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    header: {
      display: "grid",
      gridTemplateColumns: "30px 1fr 50px 50px 50px",
      fontSize: 12,
      textAlign: "center",
      marginBottom: theme.spacing(1),
    },
    avatar: {
      height: 20,
      width: 20,
      borderRadius: 5,
    },
    gridItemWrapper: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },
  })
);

export default useStyles;
