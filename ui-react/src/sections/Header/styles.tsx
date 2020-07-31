import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    background: "white",
    color: "black"
  },
  list: {
    width: 250,
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default useStyles;
