// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file will be automatically regenerated when your Next.js server is running.
/* eslint-disable */

// prettier-ignore
declare module "nextjs-routes" {
  export type Route =
    | { pathname: "/academic-list"; query?: Query | undefined }
    | { pathname: "/academic-list/[aepId]"; query: Query<{ "aepId": string }> }
    | { pathname: "/account-manager"; query?: Query | undefined }
    | { pathname: "/account-manager/[studentId]"; query: Query<{ "studentId": string }> }
    | { pathname: "/activity-database"; query?: Query | undefined }
    | { pathname: "/admin"; query?: Query | undefined }
    | { pathname: "/admin/[adminId]"; query: Query<{ "adminId": string }> }
    | { pathname: "/aep-tracker"; query?: Query | undefined }
    | { pathname: "/home"; query?: Query | undefined }
    | { pathname: "/"; query?: Query | undefined }
    | { pathname: "/login"; query?: Query | undefined }
    | { pathname: "/reset-password-otp"; query?: Query | undefined }
    | { pathname: "/reset-password-req"; query?: Query | undefined }
    | { pathname: "/reset-password-success"; query?: Query | undefined }
    | { pathname: "/reset-password"; query?: Query | undefined }
    | { pathname: "/setting"; query?: Query | undefined }
    | { pathname: "/student-roaster"; query?: Query | undefined }
    | { pathname: "/style"; query?: Query | undefined }
    | { pathname: "/super-admin"; query?: Query | undefined };

  type Query<Params = {}> = Params & { [key: string]: string | string[] | undefined };

  /**
   * A typesafe utility function for generating paths in your application.
   *
   * route({ pathname: '/foos/[foo]', query: { foo: 'bar' }}) will produce '/foos/bar'.
   */
  export declare function route(r: Route): string;
}

// prettier-ignore
declare module "next/link" {
  import type { Route } from "nextjs-routes";
  import type { LinkProps as NextLinkProps } from "next/dist/client/link";
  import type { PropsWithChildren, MouseEventHandler } from "react";
  export * from "next/dist/client/link";

  type RouteOrQuery = Route | { query?: { [key: string]: string | string[] | undefined } };

  export interface LinkProps extends Omit<NextLinkProps, "href"> {
    href: RouteOrQuery;
  }

  declare function Link(
    props: PropsWithChildren<LinkProps>
  ): DetailedReactHTMLElement<
    {
      onMouseEnter?: MouseEventHandler<Element> | undefined;
      onClick: MouseEventHandler;
      href?: string | undefined;
      ref?: any;
    },
    HTMLElement
  >;

  export default Link;
}

// prettier-ignore
declare module "next/router" {
  import type { Route } from "nextjs-routes";
  import type { NextRouter as Router } from "next/dist/client/router";
  export * from "next/dist/client/router";
  export { default } from "next/dist/client/router";

  type TransitionOptions = Parameters<Router["push"]>[2];

  type Pathname = Route["pathname"];

  type QueryForPathname = {
    [K in Route as K["pathname"]]: Exclude<K["query"], undefined>;
  };

  type RouteOrQuery = Route | { query: { [key: string]: string | string[] | undefined } };

  export interface NextRouter<P extends Pathname = Pathname>
    extends Omit<Router, "push" | "replace"> {
    pathname: P;
    route: P;
    query: QueryForPathname[P];
    push(
      url: RouteOrQuery,
      as?: string,
      options?: TransitionOptions
    ): Promise<boolean>;
    replace(
      url: RouteOrQuery,
      as?: string,
      options?: TransitionOptions
    ): Promise<boolean>;
  }

  export function useRouter<P extends Pathname>(): NextRouter<P>;
}
