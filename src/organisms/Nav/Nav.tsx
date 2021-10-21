import { Box } from "@chakra-ui/layout";
import { useStaticQuery, graphql } from "gatsby";
import React, { useContext, useMemo } from "react";
import { calcColumnWidths } from "../../utils/style.utils";
import { DesktopMenu } from "../DesktopMenu/DesktopMenu";
import { prepareMenuData } from "../../molecules/Menu/MenuUtils";
import { MobileHeader } from "../MobileHeader/MobileHeader";
import { navHeight } from "../../theme/misc";

export const Nav: React.FC = () => {
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
    return prepareMenuData(wpMenu);
  }, [wpMenu]);

  return (
    <Box
      as="nav"
      pos="fixed"
      zIndex="sticky"
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
      />
      <DesktopMenu
        display={{ base: "none", xl: "block" }}
        menuItems={menuItems}
      />
    </Box>
  );
};
