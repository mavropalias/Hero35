import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
  Box,
  Link
} from "@material-ui/core";
import { PlayArrowSharp as PlayIcon } from "@material-ui/icons";
import { EventEdition } from "../../schema";
import LinkPrefetch from "./../LinkPrefetch";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      padding: theme.spacing(2, 4),
      marginRight: theme.spacing(2),
      fontSize: theme.typography.fontSize * 1.7,
      lineHeight: 1
    },
    buttonIcon: {
      "& > :first-child": {
        fontSize: theme.typography.fontSize * 3
      }
    },
    description: {
      fontWeight: 600,
      marginBottom: theme.spacing(4)
    },
    hubLogo: {
      maxWidth: theme.spacing(8),
      maxHeight: theme.spacing(8),
      marginRight: theme.spacing(1)
    },
    hubTitle: { textTransform: "capitalize", fontWeight: 500 },
    logo: {
      display: "block",
      height: theme.spacing(24)
    },
    text: {
      position: "relative",
      margin: theme.spacing(0, 2),
      maxWidth: "48rem",
      zIndex: 1,
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(0, 3)
      },
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(0, 4)
      }
    },
    title: {
      display: "block",
      margin: theme.spacing(2, 0, 1),
      fontWeight: 800,
      lineHeight: 1
    }
  })
);

interface Props {
  edition: EventEdition;
  shouldLinkTitle?: boolean;
}

const EditionCoverText = observer(
  ({ edition, shouldLinkTitle = true }: Props) => {
    const classes = useStyles({});

    return (
      <div className={classes.text}>
        {shouldLinkTitle ? (
          <LinkPrefetch
            href={`/[eventid]/[editionid]`}
            as={`/${edition.eventId}/${edition.id}`}
            passHref
          >
            <Link variant="h2">
              <img
                className={classes.logo}
                src={`${process.env.STORAGE_PATH}${encodeURIComponent(
                  edition.logo
                )}?alt=media`}
                alt="Event logo"
              />
              <Typography variant="h2" className={classes.title}>
                {edition.eventTitle}
              </Typography>
              <Typography variant="subtitle1" component="p">
                {edition.title}
              </Typography>
            </Link>
          </LinkPrefetch>
        ) : (
          <Typography variant="h2" className={classes.title}>
            {edition.eventTitle} {edition.title}
          </Typography>
        )}
      </div>
    );
  }
);

export default EditionCoverText;
