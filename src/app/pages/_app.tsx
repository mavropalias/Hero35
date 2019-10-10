import React from "react";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../appTheme";
import * as ga from "../services/GA";
import "../style.css";
import NProgress from "nprogress";
import { UserContextProvider } from "../components/UserContextProvider";

Router.events.on("routeChangeStart", url => {
  NProgress.start();
});
Router.events.on("routeChangeError", () => NProgress.done());
Router.events.on("routeChangeComplete", url => {
  ga.pageview(url);
  NProgress.done();
});

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>HERO35</title>
        </Head>
        <UserContextProvider>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UserContextProvider>
      </>
    );
  }
}
