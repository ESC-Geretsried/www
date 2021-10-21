import path from "path";
import { GatsbyNode } from "gatsby";
import {
  VEREIN_CATEGORY_ID,
  HOCKEY_CATEGORY_ID,
  HOCKEY_DIVISIONS,
  HOME_PAGE_ID,
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

  pages.data?.allWpPage.nodes
    //find unique divisions
    .filter((page, index, self) => {
      return (
        self
          .map((page) => page.pageACF.division)
          .indexOf(page.pageACF.division) === index
      );
    })
    .forEach(({ pageACF, categories }) => {
      const categoryId =
        categories.nodes.length > 0
          ? categories.nodes[0].id
          : HOCKEY_CATEGORY_ID;

      const { division } = pageACF;

      const newsPath = HOCKEY_DIVISIONS.includes(pageACF.division)
        ? `/eishockey/${pageACF.division}/news/`
        : `/${pageACF.division}/news/`;

      createPage({
        path: newsPath,
        component: path.resolve(`./src/templates/news.tsx`),
        context: {
          id: HOME_PAGE_ID,
          title: `News`,
          division,
          categoryId,
          pathname: newsPath,
        },
      });
    });

  createPage({
    path: "/eishockey/news/",
    context: {
      id: HOME_PAGE_ID,
      pathname: "/eishockey/news/",
      division: "eishockey",
      categoryId: HOCKEY_CATEGORY_ID,
      title: "Eishockey News",
    },
    component: path.resolve(`./src/templates/news.tsx`),
  });

  blogPosts.data?.allWpPost.nodes.forEach(({ title, uri, postACF, id }) => {
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

    if (postACF.division.includes("riverrats")) {
      createRedirect({
        redirectInBrowser: true,
        fromPath: blogPostPath.replace("riverrats", "river-rats"),
        toPath: blogPostPath,
        statusCode: 301,
      });
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
  });

  createRedirect({
    redirectInBrowser: true,
    fromPath: `/*`,
    toPath: `/nicht-gefunden`,
    statusCode: 404,
  });
};

const gatsbyNode: GatsbyNode = {
  createPages,
};

export default gatsbyNode;
