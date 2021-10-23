import { Box } from "@chakra-ui/layout";
import { graphql, useStaticQuery } from "gatsby";
import React, { useMemo } from "react";
import { prepareMenuData } from "../../molecules/Menu/MenuUtils";
import { navHeight } from "../../theme/misc";
import { calcColumnWidths } from "../../utils/style.utils";
import { DesktopMenu } from "../DesktopMenu/DesktopMenu";
import { MobileHeader } from "../MobileHeader/MobileHeader";

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
      pe={{ base: 6, xl: 0 }}
      ps={{ base: 0, xl: 6 }}
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
