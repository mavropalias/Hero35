import Link from "next/link";
import Router from "next/router";
import { format, resolve, parse, UrlObject } from "url";

export const prefetch = async (
  href: UrlObject | string,
  as: UrlObject | string
) => {
  // if  we're running server side do nothing
  if (typeof window === "undefined") return;

  const url: string = typeof href !== "string" ? format(href) : href;
  const urlAs = typeof as !== "string" ? format(as) : as;

  // Re-create query params
  const query = {};
  const queryParams = url
    .split("/")
    .filter(param => param.length > 0)
    .map(param => param.replace(/[\[\]]/g, ""));
  const queryParamsValues = urlAs.split("/").filter(value => value.length > 0);
  queryParams.forEach((param, index) => {
    query[param] = queryParamsValues[index];
  });

  const parsedHref = resolve(window.location.pathname, url);
  const { pathname } = typeof href !== "string" ? href : parse(url, true);
  const Component: any = await Router.prefetch(parsedHref);

  // if Component exists and has getInitialProps
  // fetch the component props (the component should save it in cache)
  if (Component && Component.getInitialProps) {
    const ctx = { pathname, query, isVirtualCall: true };
    await Component.getInitialProps(ctx);
  }
};

// Extend default next/link to customize the prefetch behaviour
export default class LinkPrefetch extends Link {
  // Always prefetch with getInitialProps
  async prefetch() {
    prefetch(this.props.href, this.props.as);
  }
}
