import { Box, Typography, useTheme, useMediaQuery } from "@material-ui/core";
import { EventEdition } from "../schema";
import EditionGrid from "./EditionGrid";
import { useContext } from "react";
import { StackContext } from "./context-providers/StackContextProvider";

interface Props {
  editions?: EventEdition[];
}

const HubHeader = ({ editions }: Props) => {
  const { state: stateStack, dispatch } = useContext(StackContext);
  const theme = useTheme();
  const verticalGrid = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box marginBottom={8}>
      <Typography
        variant="overline"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Just added {stateStack.slug && <>in {stateStack.contextTitle}</>}
      </Typography>
      <EditionGrid
        editions={verticalGrid ? editions.slice(0, 3) : editions}
        variant={verticalGrid ? "vertical" : "horizontal"}
        hideDate={true}
      />
    </Box>
  );
};
export default HubHeader;
