import path from "path";
import { GatsbyNode } from "gatsby";
import util from "util";
import child_process from "child_process";
import {
  VEREIN_CATEGORY_ID,
  HOCKEY_DIVISIONS,
  HOME_PAGE_ID,
  ALL_DIVISIONS,
} from "./const";

const exec = util.promisify(child_process.exec);
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
    ({ id, uri, slug, title, categories, pageACF }) => {
      const categoryId =
        categories.nodes.length > 0
          ? categories.nodes[0].id
          : VEREIN_CATEGORY_ID;

      const { division, template } = pageACF;

      createPage({
        path: getPath(uri),
        matchPath: getMatchPath(uri),
        component: path.resolve(`./src/templates/${template}.tsx`),
        context: {
          id,
          title,
          division,
          categoryId,
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

  const postsPerPage = 6;
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
        },
      });
    });
  });

  blogPosts.data?.allWpPost.nodes.forEach(
    ({ title, uri, postACF, id }, index) => {
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
            postACF.postCategory === "post" ? "blogPost" : "matchReport"
          }.tsx`
        ),
        context: {
          id,
          title,
          pathname: getPath(uri ?? ""),
        },
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

const onPostBuild: GatsbyNode["onPostBuild"] = async (gatsbyNodeHelpers) => {
  const { reporter } = gatsbyNodeHelpers;

  const reportOut = (report: any) => {
    const { stderr, stdout } = report;

    if (stderr) {
      reporter.error(stderr as unknown as Error);
    }
    if (stdout) {
      reporter.info(stdout as unknown as string);
    }
  };
  // NOTE: the gatsby build process automatically copies /static/functions to /public/functions
  // If you use yarn, replace "npm install" with "yarn install"
  reportOut(await exec("cd ./public/functions && npm i"));
};

const gatsbyNode: GatsbyNode = {
  createPages,
  onPostBuild,
};

export default gatsbyNode;
