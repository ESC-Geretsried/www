import { BoxProps, chakra } from "@chakra-ui/react";
import { graphql, useStaticQuery } from "gatsby";
import React, { useMemo } from "react";
import { prepareMenuData } from "../Menu/MenuUtils";
import { adBannerHeight, navHeight } from "../../theme/misc";
import { DesktopMenu } from "../Menu/DesktopMenu";
import { MobileHeader } from "./MobileHeader";

const CNav = chakra("nav", {
  baseStyle: {
    top: { base: 0, xl: adBannerHeight },
    pos: { base: "fixed", xl: "sticky" },
    zIndex: "sticky",
    alignSelf: "start",
    gridColumn: { base: "1/-1", lg: "1/4" },
  },
});

export const Nav: React.FC<BoxProps> = (props) => {
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
    <CNav>
      <MobileHeader
        display={{ base: "flex", xl: "none" }}
        menuItems={menuItems}
      />
      <DesktopMenu
        display={{ base: "none", xl: "block" }}
        menuItems={menuItems}
      />
    </CNav>
  );
};
