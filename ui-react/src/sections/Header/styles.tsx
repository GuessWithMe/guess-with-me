import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    width: 250,
  },
  avatar: {
    borderRadius: "50%",
    width: 30,
    height: 30,
    marginRight: 25,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default useStyles;
