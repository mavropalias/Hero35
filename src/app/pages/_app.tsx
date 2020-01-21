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
import NavigationBottom from "../components/NavigationBottom";
import Footer from "../components/Footer";
import { StackContextProvider } from "../components/context-providers/StackContextProvider";

NProgress.configure({ showSpinner: false });
let doneLoading = true;
Router.events.on("routeChangeStart", url => {
  doneLoading = false;
  setTimeout(() => {
    if (!doneLoading) {
      NProgress.start();
    }
  }, 300);
});
Router.events.on("routeChangeError", () => {
  doneLoading = true;
  NProgress.done();
});
Router.events.on("routeChangeComplete", url => {
  if (window.location.hostname !== "localhost") {
    ga.pageview(url);
  }
  doneLoading = true;
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
    const { Component, pageProps, router } = this.props;

    return (
      <>
        <Head>
          <title>HERO35</title>
        </Head>
        <StackContextProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
            <Footer />
            <NavigationBottom />
          </ThemeProvider>
        </StackContextProvider>
      </>
    );
  }
}
