import { GatsbyNode } from "gatsby";
import { AllPagesQuery } from "../graphql-types";

const getPath = (uri: string) => {
  switch (uri) {
    case "/home/":
      return `/`;
    default:
      return `${uri}`;
  }
};

const getMatchPath = (uri: string) => {
  if (uri === "nicht-gefunden") {
    return `/*`;
  }

  return undefined;
};

const hockeyDivisions = ["damen", "1b", "u17", "u15", "u13", "u11", "u9", "u7"];

const VEREIN_CATEGORY_ID = "dGVybToz";
const HOCKEY_CATEGORY_ID = "dGVybTo1";
const HOME_PAGE_ID = "cG9zdDoxMw==";

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  // const maxPostAge = new Date().getFullYear() - 10;
  const { createPage, createRedirect } = actions;

  const pagesResult = await graphql<AllPagesQuery>(
    `
      query AllPages {
        allWordpressPage {
          nodes {
            id
            title
            uri
            slug
            categories {
              nodes {
                id
                slug
              }
            }

            pageACF {
              division
            }
          }
        }

        allWordpressPost(limit: 10000) {
          nodes {
            id
            slug
            uri
            postACF {
              division
              postCategory
            }
            categories {
              nodes {
                categoryId: databaseId
                id
                slug
              }
            }
          }
        }
      }
    `,
  );

  if (pagesResult.errors) {
    throw pagesResult.errors;
  }

  const pages = pagesResult.data?.allWordpressPage.nodes;
  const posts = pagesResult.data?.allWordpressPost.nodes;

  if (pages === undefined) {
    throw new Error("no Pages found");
  }
  if (posts === undefined) {
    throw new Error("no Posts found");
  }

  for (const page of pages) {
    const { id, slug, uri, pageACF, categories } = page;
    const categoryId = categories?.nodes && categories.nodes[0]?.id;

    if (slug !== "seo") {
      if (pageACF?.division) {
        const newsPath = hockeyDivisions.includes(pageACF.division)
          ? `eishockey/${pageACF.division}/news`
          : `${pageACF.division}/news`;

        createPage({
          path: newsPath,
          context: {
            id,
            uri,
            division: pageACF.division,
            isBlogPostList: true,
            categoryId: categoryId ?? VEREIN_CATEGORY_ID,
          },
          component: require.resolve(`../src/templates/pages/PageTemplate.tsx`),
        });
      }

      createPage({
        component: require.resolve("../src/templates/pages/PageTemplate.tsx"),
        path: getPath(uri ?? "/"),
        matchPath: getMatchPath(uri ?? "/"),
        context: {
          id,
          uri,
          isBlogPostList: false,
          division: "verein",
          categoryId: categoryId ?? VEREIN_CATEGORY_ID,
        },
      });
    }
  }

  createPage({
    path: "eishockey/news",
    context: {
      id: HOME_PAGE_ID,
      uri: "eishockey/news",
      division: "eishockey",
      isBlogPostList: true,
      categoryId: HOCKEY_CATEGORY_ID,
    },
    component: require.resolve(`../src/templates/pages/PageTemplate.tsx`),
  });

  for (const post of posts) {
    const { postACF, slug, id, uri } = post;

    if (postACF?.division) {
      createPage({
        path: `${postACF.division}/news${uri}`,
        context: { id, slug },
        component: require.resolve(`../src/templates/pages/blogPostPage/BlogPostPageTemplate.tsx`),
      });
    }
  }

  createRedirect({ redirectInBrowser: true, fromPath: `/*`, toPath: `/nicht-gefunden`, statusCode: 404 });
};
