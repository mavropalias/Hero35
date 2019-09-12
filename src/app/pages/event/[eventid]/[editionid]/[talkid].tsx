import { default as NextLink } from "next/link";
import Layout from "../../../../components/Layout";
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Link,
  Chip,
  Container,
  Grid
} from "@material-ui/core";
import { OpenInNew as LinkIcon } from "@material-ui/icons";
import { Talk, EventEdition } from "../../../../schema";
import Database from "../../../../services/Database";
import { NextPage, NextPageContext } from "next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2)
    },
    logo: {
      maxWidth: "50%"
    },
    chip: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    externalLinkIcon: {
      fontSize: theme.typography.fontSize
    }
  })
);

interface Props {
  talk: Talk;
}

const TalkDetails: NextPage<Props> = ({ talk }) => {
  const classes = useStyles({});

  const shortDate = (date: string) => {
    const shortDate = new Date(date);
    var options = {
      month: "short",
      day: "numeric",
      year: "numeric"
    };
    return shortDate.toLocaleDateString(undefined, options);
  };

  return (
    <Layout>
      <Container className={classes.container}>
        {/* <TalkVideo videoid={talk.id} /> */}
        <Typography variant="h5" component="h1">
          {talk.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {talk.speaker}
        </Typography>
        <NextLink passHref href={`/event/${talk.eventId}/${talk.editionId}`}>
          <Link variant="subtitle2">
            {talk.eventTitle} {talk.editionTitle}
          </Link>
        </NextLink>
        <Typography variant="subtitle2" color="textSecondary" paragraph>
          {shortDate(talk.date)}
        </Typography>
        <Box>
          {talk.tags.map(tag => (
            <Chip
              color="default"
              variant="outlined"
              key={tag}
              label={`#${tag}`}
              className={classes.chip}
            />
          ))}
        </Box>
        <Typography variant="body1" paragraph>
          {talk.description}
        </Typography>
      </Container>
    </Layout>
  );
};

const TalkVideo = ({ videoid }: { videoid: string }) => {
  const iframe = `<iframe
                    width="100%"
                    height="600"
                    src="https://www.youtube-nocookie.com/embed/${videoid}"
                    frameborder="0"
                    allow="encrypted-media"
                  />`;

  return <div dangerouslySetInnerHTML={{ __html: iframe }} />;
};

interface QueryProps {
  eventid: string;
  editionid: string;
  talkid: string;
}
TalkDetails.getInitialProps = async (ctx: NextPageContext) => {
  const { eventid, editionid, talkid } = (ctx.query as unknown) as QueryProps;
  const talk = await Database.getTalk(eventid, editionid, talkid);
  return { talk };
};

export default TalkDetails;
