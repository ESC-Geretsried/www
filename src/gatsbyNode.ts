import path from "path";
import { CreateWebpackConfigArgs, GatsbyNode } from "gatsby";
import {
  VEREIN_CATEGORY_ID,
  HOCKEY_DIVISIONS,
  HOME_PAGE_ID,
  ALL_DIVISIONS,
} from "./const";

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

type GetPagesQuery = {
  allWpPage: {
    nodes: Array<{
      id: string;
      uri: string;
      title: string;
      slug: string;
      categories: {
        nodes: Array<{
          id: string;
          slug: string;
        }>;
      };
      pageACF: {
        division: string;
        template: string;
      };
    }>;
  };
};

type GetBlogPostQuery = {
  allWpPost: {
    nodes: Array<{
      id: string;
      uri: string;
      slug: string;
      title: string;
      date: string;
      categories: {
        nodes: Array<{
          id: string;
          name: string;
          slug: string;
        }>;
      };
      postACF: {
        division: string;
        postCategory: string;
      };
    }>;
  };
};

const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  const pagesQuery = graphql<GetPagesQuery>(`
    query GetPages {
      allWpPage {
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
            template
          }
        }
      }
    }
  `);

  const blogPostsQuery = graphql<GetBlogPostQuery>(`
    query GetBlogPosts {
      allWpPost(limit: 10000) {
        nodes {
          id
          uri
          slug
          title
          date(difference: "months")
          categories {
            nodes {
              id
              name
              slug
            }
          }
          postACF {
            division
            postCategory
          }
        }
      }
    }
  `);

  const [pages, blogPosts] = await Promise.all([pagesQuery, blogPostsQuery]);

  pages.data?.allWpPage.nodes.forEach(
    ({ id, uri, title, categories, pageACF }) => {
      const categorySlug =
        categories.nodes.length > 0 ? categories.nodes[0].slug : "verein";

      const { division, template } = pageACF;

      createPage({
        path: getPath(uri),
        matchPath: getMatchPath(uri),
        component: path.resolve(`./src/templates/${template}.tsx`),
        context: {
          id,
          title,
          division,
          categorySlug,
          pathname: getPath(uri),
        },
      });
    }
  );

  const isCategoryADivision = (category: string) =>
    ALL_DIVISIONS.findIndex((division) => division === category) !== -1;

  const postsSortedByDivision = blogPosts.data?.allWpPost.nodes
    .filter(({ postACF: { postCategory } }) => postCategory !== "flash") // no flash posts
    .reduce((prev, curr) => {
      const {
        postACF: { division },
        categories: { nodes: categories },
      } = curr;

      // get all categories that are also divisions, so posts can appear on multiple lists
      const categoriesAsDivision = categories.filter(({ slug }) =>
        isCategoryADivision(slug)
      );
      // iterate over all categories that fit
      categoriesAsDivision.forEach(({ slug: _division }) => {
        if (HOCKEY_DIVISIONS.includes(_division)) {
          if (Array.isArray(prev["eishockey"])) {
            prev["eishockey"].push(curr);
          } else {
            prev["eishockey"] = [curr];
          }
        }
        // when the element is not already present, push into array or create new entry
        if (
          Array.isArray(prev[_division]) &&
          // check if current post is already present
          prev[_division].findIndex(({ id }) => id === curr.id) === -1
        ) {
          prev[_division].push(curr);
        } else {
          prev[_division] = [curr];
        }
      });

      // add normal division to entry
      if (
        Array.isArray(prev[division]) &&
        // check if current post is already present
        prev[division].findIndex(({ id }) => id === curr.id) === -1
      ) {
        prev[division].push(curr);
        return prev;
      } else if (Array.isArray(prev[division])) {
        return prev;
      }

      // cannot be an category as division since it only runs if it's not already an array
      prev[division] = [curr];
      return prev;
    }, {} as { [key: string]: Array<GetBlogPostQuery["allWpPost"]["nodes"][number]> });

  const postsPerPage = 5;
  Object.entries(postsSortedByDivision ?? {}).forEach(([division, posts]) => {
    const pagesTotal = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: pagesTotal }).forEach((_, i) => {
      const newsPath =
        (HOCKEY_DIVISIONS.includes(division)
          ? `/eishockey/${division}/news/`
          : `/${division}/news/`) + (i === 0 ? "" : `${i + 1}/`);

      createPage({
        path: newsPath,
        component: path.resolve(`./src/templates/news.tsx`),
        context: {
          pathname: newsPath,
          title: `${division.replace("-", " ")} News`,
          id: HOME_PAGE_ID,
          limit: postsPerPage,
          skip: i * postsPerPage,
          pagesTotal,
          currentPage: i,
          categorySlug: division,
        },
        defer: i + 1 > 2,
      });
    });
  });

  blogPosts.data?.allWpPost.nodes.forEach(
    ({ title, uri, postACF, id, date }) => {
      let blogPostPath: string;
      if (HOCKEY_DIVISIONS.includes(postACF.division)) {
        // add legacy redirect
        createRedirect({
          redirectInBrowser: true,
          fromPath: `/${postACF.division}/news${uri}`,
          toPath: `/eishockey/${postACF.division}/news${uri}`,
          statusCode: 301,
        });

        blogPostPath = `/eishockey/${postACF.division}/news${uri}`;
      } else {
        blogPostPath = `/${postACF.division}/news${uri}`;
      }

      createPage({
        path: blogPostPath,
        component: path.resolve(
          `./src/templates/${
            postACF.postCategory === "matchReport" ? "matchReport" : "blogPost"
          }.tsx`
        ),
        context: {
          template:
            postACF.postCategory === "matchReport" ? "matchReport" : "blogPost",
          id,
          title,
          pathname: getPath(uri ?? ""),
        },
        defer: parseInt(date) > 1,
      });
    }
  );

  createRedirect({
    redirectInBrowser: true,
    fromPath: `/*`,
    toPath: `/nicht-gefunden`,
    statusCode: 404,
  });
};

const onCreateWebpackConfig = ({
  actions,
  loaders,
  getConfig,
}: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    externals: {
      "node-fetch": "commonjs2 node-fetch",
    },
  });
};

const gatsbyNode: GatsbyNode = {
  createPages,
  onCreateWebpackConfig,
};

export default gatsbyNode;
