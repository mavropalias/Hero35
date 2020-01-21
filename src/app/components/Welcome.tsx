import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Box,
  Button
} from "@material-ui/core";
import { useStores } from "../stores/useStores";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonSignup: {
      padding: theme.spacing(3, 8),
      fontSize: theme.typography.fontSize * 2.5,
      fontWeight: 700,
      lineHeight: 1,
      margin: theme.spacing(3, 0, 2)
    }
  })
);

const Welcome = () => {
  const { userStore } = useStores();
  const classes = useStyles({});

  return (
    <>
      <Box textAlign="center" paddingTop={16} paddingBottom={24}>
        <Typography variant="h4">
          Watch the best developer talks,
          <br />
          follow the latest trends,
          <br />
          elevate your skills
        </Typography>
        <Button
          size="large"
          color="secondary"
          variant="contained"
          className={classes.buttonSignup}
          onClick={_ => userStore.setShouldSignIn(true)}
        >
          Sign Up
        </Button>
        <Typography variant="subtitle1" color="secondary">
          Free lifetime benefits for Alpha & Beta members
        </Typography>
      </Box>
    </>
  );
};

export default Welcome;
