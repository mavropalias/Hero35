import Header from "./Header";
import Footer from "./Footer";
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
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
