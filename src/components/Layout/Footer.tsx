import { chakra, ChakraProps, Heading, List, ListItem } from "@chakra-ui/react";
import { useStaticQuery, graphql } from "gatsby";
import React, { useMemo } from "react";
import { Link } from "../../atoms/Link";
import { HeadingLevelBoundary, Hx } from "../headings";
import { prepareMenuData } from "../Menu/MenuUtils";

export const Footer: React.FC<ChakraProps> = ({ ...rest }) => {
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
    return prepareMenuData(wpMenu).reduce<{
      [key: string]: Array<
        GatsbyTypes.MenuItemFragment | GatsbyTypes.MenuChildItemFragment
      >;
    }>(
      (acc, item) => {
        if (["Verein"].includes(item.label ?? "")) {
          acc.Verein.push(...item.childItems);
          return acc;
        }

        if (item.label === "Werde Mitglied") {
          acc.Verein.push(item);
          return acc;
        }

        if (["River Rats"].includes(item.label ?? "")) {
          acc["River Rats"].push(...item.childItems);

          return acc;
        }

        if (["Eishockey"].includes(item.label ?? "")) {
          acc.Eishockey.push(...item.childItems);

          return acc;
        }

        if (["Datenschutzerklärung", "Impressum"].includes(item.label ?? "")) {
          acc.legal.push(item);

          return acc;
        }

        acc["misc"].push(item);

        return acc;
      },
      { Verein: [], "River Rats": [], Eishockey: [], misc: [], legal: [] }
    );
  }, [wpMenu]);

  return (
    <HeadingLevelBoundary>
      <chakra.footer
        borderTop="2px solid"
        borderColor="base.ice"
        gridColumn="1 /-1"
        display="grid"
        gridTemplateColumns={{ base: "1fr 1fr", md: "repeat(10, 1fr)" }}
        gridGap={{ base: 4, md: 10 }}
        py={10}
      >
        {Object.entries(menuItems).map(([label, items]) => {
          const hasHeading = !["misc", "legal"].includes(label);

          return (
            <chakra.div gridColumn={{ base: "span 1", md: "span 2" }}>
              {hasHeading && (
                <Hx size="sm" lineHeight="2">
                  {label}
                </Hx>
              )}
              <List pt={!hasHeading ? "calc(1rem * 1.2)" : undefined}>
                {items.map((item) => (
                  <ListItem key={item.url}>
                    <Link
                      to={item.url ?? "/"}
                      backgroundImage="none"
                      display="block"
                      w="100%"
                      lineHeight="2"
                    >
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
