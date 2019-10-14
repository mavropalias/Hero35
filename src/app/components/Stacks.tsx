import {
  makeStyles,
  Theme,
  createStyles,
  Paper,
  Typography,
  Grid,
  Box,
  Container,
  Card,
  CardActionArea,
  CardContent
} from "@material-ui/core";
import { default as NextLink } from "next/link";
import STACKS from "../constants/stacks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: { height: "100%" },
    cardActionArea: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "flex-start"
    },
    cardContent: {
      height: "100%",
      textAlign: "center",
      padding: theme.spacing(2, 1, 1, 1)
    },
    stackLogo: {
      height: "56px",
      maxWidth: "100%"
    },
    link: {
      display: "block",
      height: "100%",
      textDecoration: "none",
      color: "inherit"
    }
  })
);

const Stacks = () => {
  const classes = useStyles({});

  return (
    <Paper elevation={4} square={true}>
      <Box paddingTop={4} paddingBottom={4}>
        <Container>
          <Grid container spacing={1}>
            {STACKS.map(
              (stack, index) =>
                stack.featured && (
                  <Grid item xs={4} sm={3} md={2} lg={2} key={index}>
                    <Card className={classes.card} elevation={0}>
                      <NextLink
                        href={`/topic/[topicid]`}
                        as={`/topic/${stack.slug}`}
                      >
                        <a
                          className={classes.link}
                          title={`${stack.label} conference talks`}
                        >
                          <CardActionArea className={classes.cardActionArea}>
                            <CardContent className={classes.cardContent}>
                              <Box paddingBottom={1}>
                                <img
                                  src={`/static/stacks/${stack.slug}.svg`}
                                  className={classes.stackLogo}
                                  alt={`${stack.label} logo`}
                                />
                              </Box>
                              <Typography
                                variant="body1"
                                component="p"
                                color="primary"
                              >
                                {stack.label}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </a>
                      </NextLink>
                    </Card>
                  </Grid>
                )
            )}
          </Grid>
        </Container>
      </Box>
    </Paper>
  );
};

export default Stacks;
