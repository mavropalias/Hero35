import Header from "./Header";
import Head from "next/head";

const Layout = ({
  children,
  title,
  description,
  keywords
}: {
  children: any;
  title?: string;
  description?: string;
  keywords?: string;
}) => {
  const headTitle = title ? `${title} - Hero35` : "Hero35";

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`React,ReactJS,${keywords}`} />
        <meta property="og:title" content={headTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@hero35official" />
        <meta name="twitter:title" content={headTitle} />
        <meta name="twitter:description" content={description} />
        <meta
          data-react-helmet="true"
          name="twitter-image"
          content="https://hero35.com/static/favicons/apple-icon-180x180.png"
        />
        <meta name="og:image:type" content="image/jpeg" />
        <meta
          name="og:image"
          content="https://hero35.com/static/favicons/apple-icon-180x180.png"
        />
        <meta
          name="og:image:secure_url"
          content="https://hero35.com/static/favicons/apple-icon-180x180.png"
        />
      </Head>
      <Header />
      {children}
    </>
  );
};

export default Layout;
