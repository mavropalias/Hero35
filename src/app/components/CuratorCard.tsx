import { Grid, Avatar, Typography, Button, Box, Card } from "@material-ui/core";
import {
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  OpenInNew as LinkIcon
} from "@material-ui/icons";

const CuratorCard = () => (
  <Card style={{ height: "100%", display: "flex", alignItems: "center" }}>
    <Box m={4}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Avatar src="/kostas.png" />
        </Grid>
        <Grid item xs>
          <Typography variant="body1" gutterBottom align="center">
            I curate tech-talks from conferences around the world.
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            I'm looking for fascinating content and/or high educational value,
            captivating delivery, and clear audio quality.
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            paragraph
          >
            Kostas, Hero35 Founder
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">Follow my reviews:</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                color="primary"
                variant="outlined"
                size="large"
                target="_blank"
                href="https://twitter.com/mavropalias"
              >
                <TwitterIcon />
                <Box marginLeft={1} marginRight={1}>
                  Twitter
                </Box>
                <LinkIcon fontSize="small" />
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="outlined"
                size="large"
                target="_blank"
                href="https://www.facebook.com/kostas.mavropalias.9"
              >
                <FacebookIcon />
                <Box marginLeft={1} marginRight={1}>
                  Facebook
                </Box>
                <LinkIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

export default CuratorCard;
