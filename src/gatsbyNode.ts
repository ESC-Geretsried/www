import path from "path";
import { GatsbyNode } from "gatsby";

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

type GetMainMenuQuery = {
  wpMenu: {
    menuItems: {
      nodes: Array<{
        id: string;
        url: string;
        connectedNode: {
          node: {
            id: string;
            title: string;
            pageACF: { template: string; division: string };
          };
        };
      }>;
    };
  };
};

type GetIndexPageQuery = {
  wpPage: {
    title: string;
    id: string;
    pageACF: {
      template: string;
    };
  };
};

type GetBlogPostQuery = {
  allWpPost: {
    nodes: Array<{
      id: string;
      uri: string;
      postACF: {
        division: string;
        postCategory: string;
      };
    }>;
  };
};

const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const mainMenuQuery = graphql<GetMainMenuQuery>(`
    query GetMainMenu {
      wpMenu(name: { regex: "/main/" }) {
        name
        menuItems {
          nodes {
            id
            label
            url
            connectedNode {
              node {
                ... on WpPage {
                  id
                  title
                  pageACF {
                    template
                    division
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const indexPageQuery = graphql<GetIndexPageQuery>(`
    query GetIndexPage {
      wpPage(slug: { regex: "/home/" }) {
        title
        id
        pageACF {
          template
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
          postACF {
            division
            postCategory
          }
        }
      }
    }
  `);

  const [indexPage, mainMenu, blogPosts] = await Promise.all([
    indexPageQuery,
    mainMenuQuery,
    blogPostsQuery,
  ]);

  const indexPageId = indexPage.data?.wpPage.id;
  const indexPageTemplate = indexPage.data?.wpPage.pageACF.template;
  const indexPageTitle = indexPage.data?.wpPage.title;

  createPage({
    path: "/",
    matchPath: "/",
    component: path.resolve(`./src/templates/${indexPageTemplate}.tsx`),
    context: {
      id: indexPageId,
      pathname: "/",
      title: indexPageTitle,
    },
  });

  mainMenu.data?.wpMenu.menuItems.nodes.forEach((menuItem) => {
    const pageId = menuItem.connectedNode.node.id;
    const template = menuItem.connectedNode.node.pageACF.template;
    const title = menuItem.connectedNode.node.title;

    const { url } = menuItem;

    console.log(url);
    createPage({
      path: getPath(url ?? ""),
      matchPath: getMatchPath(url ?? ""),
      component: path.resolve(`./src/templates/${template}.tsx`),
      context: {
        id: pageId,
        pathname: getPath(url ?? ""),
        title,
      },
    });
  });

  blogPosts.data?.allWpPost.nodes.forEach(({ uri, postACF, id }) => {
    createPage({
      path: `/${postACF.division}/news${uri}`,
      component: path.resolve(
        `./src/templates/${
          postACF.postCategory === "post" ? "blogPost" : "matchReport"
        }.tsx`
      ),
      context: {
        id,
        pathname: getPath(uri ?? ""),
      },
    });
  });
};

const gatsbyNode: GatsbyNode = {
  createPages,
};

export default gatsbyNode;
