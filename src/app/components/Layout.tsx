import Header from "./Header";
import Head from "next/head";
import AppDrawer from "./AppDrawer";
import { Box, makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      flex: "1"
    }
  })
);

type LayoutType = {
  children: any;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  showDrawer?: boolean;
};

const Layout = ({
  children,
  title,
  description,
  keywords,
  image,
  showDrawer
}: LayoutType) => {
  const classes = useStyles({});
  const headTitle = title ? title : "Hero35";

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`React,ReactJS,${keywords}`} />
        <meta property="og:title" content={headTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:card"
          content={image ? "summary_large_image" : "summary"}
        />
        <meta name="twitter:site" content="@hero35official" />
        <meta name="twitter:title" content={headTitle} />
        <meta name="twitter:description" content={description} />
        <meta
          data-react-helmet="true"
          name="twitter-image"
          content={image ? image : "https://hero35.com/social-media-square.png"}
        />
        <meta name="og:image:type" content="image/jpeg" />
        <meta
          name="og:image"
          content={image ? image : "https://hero35.com/social-media-square.png"}
        />
        <meta
          name="og:image:secure_url"
          content={image ? image : "https://hero35.com/social-media-square.png"}
        />
      </Head>
      <Header />
      <Box display="flex">
        {showDrawer && <AppDrawer />}
        <main className={classes.main}>{children}</main>
      </Box>
    </>
  );
};

export default Layout;
