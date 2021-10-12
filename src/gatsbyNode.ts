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
          node: { id: string; pageACF: { template: string } };
        };
      }>;
    };
  };
};

const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql<GetMainMenuQuery>(`
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
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  data?.wpMenu.menuItems.nodes.forEach(async (menuItem) => {
    const pageId = menuItem.connectedNode.node.id;
    const template = menuItem.connectedNode.node.pageACF.template;
    const title = menuItem.connectedNode.node.title;

    const { url } = menuItem;

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
};

const gatsbyNode: GatsbyNode = {
  createPages,
};

export default gatsbyNode;
