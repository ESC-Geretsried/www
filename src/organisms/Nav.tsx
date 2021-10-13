import { Box } from "@chakra-ui/layout";
import { useStaticQuery, graphql } from "gatsby";
import React, { useContext, useMemo } from "react";
import { calcColumnWidths } from "../utils";
import { DesktopMenu } from "../organisms/DesktopMenu/DesktopMenu";
import { prepareMenuData } from "../molecules/Menu/MenuUtils";
import { MobileHeader } from "./MobileHeader/MobileHeader";
import { PageContext } from "../pageContext";
import { navHeight } from "../theme";

export const Nav: React.FC = () => {
  const pageContext = useContext(PageContext);

  const { wpMenu } = useStaticQuery<GatsbyTypes.GetMainMenuQuery>(graphql`
    query GetMainMenu {
      wpMenu(name: { regex: "/main/" }) {
        name
        menuItems {
          nodes {
            id
            label
            url
            parentId
            childItems {
              nodes {
                id
                label
                url
              }
            }
          }
        }
      }
    }
  `);

  const menuItems = useMemo(() => {
    return prepareMenuData(wpMenu, pageContext.pathname);
  }, [wpMenu]);

  return (
    <Box
      as="nav"
      pos="fixed"
      pr={{ base: 6, xl: 0 }}
      width={{
        base: "100%",
        ...calcColumnWidths(2, { excludeBPs: ["base", "sm", "md", "lg"] }),
      }}
      height={navHeight}
    >
      <MobileHeader
        display={{ base: "flex", xl: "none" }}
        menuItems={menuItems}
        title={pageContext.title}
      />
      <DesktopMenu
        display={{ base: "none", xl: "block" }}
        menuItems={menuItems}
      />
    </Box>
  );
};
