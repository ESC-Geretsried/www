import { Actions } from "gatsby";

type Redirect = Parameters<Actions["createRedirect"]>[0];

export const redirects: Array<Redirect> = [
  {
    fromPath: "/foo",
    redirectInBrowser: true,
    toPath: "/bar",
    statusCode: 302,
  },
];
