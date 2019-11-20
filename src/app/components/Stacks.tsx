import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Grid,
  Box,
  Card,
  CardActionArea,
  CardContent
} from "@material-ui/core";
import { default as NextLink } from "next/link";
import STACKS from "../constants/stacks";
import { useContext } from "react";
import { StackContext } from "./context-providers/StackContextProvider";
import CATEGORIES from "../constants/categories";
import { Stack } from "../schema";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: { height: "100%", background: "transparent" },
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
      padding: theme.spacing(0.5, 1)
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

const Stacks = ({ bSmall }: { bSmall?: boolean }) => {
  const classes = useStyles({});
  const { state: stateStack } = useContext(StackContext);

  const stackHref = (stack: Stack) =>
    stack.isCategory
      ? `/stack/[stackid]`
      : `/topic/[topicid]${stateStack.slug ? `?stack=${stateStack.slug}` : ""}`;

  const stackAs = (stack: Stack) =>
    stack.isCategory
      ? `/stack/${stack.slug}`
      : `/topic/${stack.slug}${
          stateStack.slug ? `?stack=${stateStack.slug}` : ""
        }`;

  return (
    <>
      <Grid container spacing={1}>
        {STACKS.map(
          stack =>
            stack.featured &&
            stack.categories.includes(stateStack.id) && (
              <Grid item xs={4} sm={3} md={bSmall ? 3 : 2} key={stack.slug}>
                <Card
                  className={classes.card}
                  raised={stack.isCategory ? true : false}
                  elevation={stack.isCategory ? 4 : 0}
                  style={
                    stack.isCategory
                      ? {
                          backgroundColor: CATEGORIES.find(
                            cat => cat.slug === stack.slug
                          ).colorBackground,
                          color: CATEGORIES.find(cat => cat.slug === stack.slug)
                            .colorText
                        }
                      : {}
                  }
                >
                  <NextLink href={stackHref(stack)} as={stackAs(stack)}>
                    <a
                      className={classes.link}
                      title={
                        stack.isCategory
                          ? `${stack.label} hub`
                          : `${stack.label} conference talks`
                      }
                    >
                      <CardActionArea className={classes.cardActionArea}>
                        <CardContent className={classes.cardContent}>
                          <Box paddingBottom={bSmall ? 0 : 1}>
                            <img
                              src={`/stacks/${stack.slug}${
                                stack.isCategory ? "-inverse" : ""
                              }.svg`}
                              className={classes.stackLogo}
                              alt={`${stack.label}`}
                            />
                          </Box>
                          {!bSmall && (
                            <Typography variant="body2">
                              {stack.label}
                              {stack.isCategory && " hub"}
                            </Typography>
                          )}
                        </CardContent>
                      </CardActionArea>
                    </a>
                  </NextLink>
                </Card>
              </Grid>
            )
        )}
      </Grid>
    </>
  );
};

export default Stacks;
