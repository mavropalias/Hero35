import {
  createStyles,
  makeStyles,
  Theme,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  fade
} from "@material-ui/core";
import { ArrowDropDown as StacksButtonIcon } from "@material-ui/icons/";
import { useState } from "react";
import LinkPrefetch from "./LinkPrefetch";
import STACKS from "../constants/stacks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stacksButton: {
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      color: theme.palette.text.primary,
      textTransform: "none",
      lineHeight: 1,
      padding: theme.spacing(1, 2),
      fontSize: theme.typography.fontSize * 1.45,
      margin: theme.spacing(0, 2)
    },
    stackIcon: {
      width: theme.spacing(3),
      height: theme.spacing(3)
    }
  })
);

const StacksMenu = () => {
  const classes = useStyles({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="default"
        onClick={handleClick}
        className={classes.stacksButton}
        endIcon={<StacksButtonIcon />}
      >
        Stacks
      </Button>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transitionDuration={{ enter: 200, exit: 0 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        {STACKS.filter(stack => stack.featured === true).map(stack => (
          <LinkPrefetch
            href={`/topic/[topicid]`}
            as={`/topic/${stack.slug}`}
            passHref
            key={stack.slug}
          >
            <MenuItem>
              <ListItemIcon>
                <img
                  src={`/stacks/${stack.slug}.svg`}
                  className={classes.stackIcon}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText primary={stack.label} />
            </MenuItem>
          </LinkPrefetch>
        ))}
      </Menu>
    </div>
  );
};

export default StacksMenu;
