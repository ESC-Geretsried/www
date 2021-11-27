import {
  chakra,
  ChakraProps,
  Heading,
  List,
  ListItem,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { useStaticQuery, graphql } from "gatsby";
import React, { useMemo } from "react";
import { Link } from "../../atoms/Link";
import { HeadingLevelBoundary, Hx } from "../headings";
import { prepareFooterMenuData, prepareMenuData } from "../Menu/MenuUtils";

export const Footer: React.FC<ChakraProps> = ({ ...rest }) => {
  const styles = useMultiStyleConfig("Footer", {});
  console.log();

  const { wpMenu } = useStaticQuery<GatsbyTypes.GetFooterMenuQuery>(graphql`
    query GetFooterMenu {
      wpMenu(name: { regex: "/footer/" }) {
        name
        menuItems {
          nodes {
            ...MenuItem
          }
        }
      }
    }
  `);

  const menuItems = useMemo(() => {
    return prepareFooterMenuData(wpMenu);
  }, [wpMenu]);

  return (
    <HeadingLevelBoundary>
      <chakra.footer __css={styles.footer} {...rest}>
        {Object.entries(menuItems).map(([label, items]) => {
          const hasHeading = !["misc", "legal"].includes(label);

          return (
            <chakra.div key={label} __css={styles.column}>
              {hasHeading && (
                <Hx size="sm" lineHeight="2">
                  {label}
                </Hx>
              )}
              <List pt={!hasHeading ? "calc(1rem * 1.2)" : undefined}>
                {items.map((item) => (
                  <ListItem key={item.url}>
                    <Link to={item.url ?? "/"} variant="footer">
                      {item.label}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </chakra.div>
          );
        })}
      </chakra.footer>
    </HeadingLevelBoundary>
  );
};
