import React, { useMemo } from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import styled from "@emotion/styled";
// import MenuItem from "antd/lib/menu/MenuItem";
import { FooterQuery, Wordpress_MenuItem } from "../../../graphql-types";
import { fonts, mq } from "../../styles/variables";
import { FooterWrapper } from "../../styles/Container";

const FooterUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  a {
    text-decoration: none;
    ${mq[2]} {
      line-height: 1.5em;
    }
  }
  grid-column: span 2;
`;

const ParentLi = styled.li`
  font-family: ${fonts.rubikBoldItalic};
  font-weight: bold;
`;

const Footer: React.FC = () => {
  const data = useStaticQuery<FooterQuery>(graphql`
    query Footer {
      wordpressMenu(id: { eq: "dGVybToyMA==" }) {
        menuItems {
          nodes {
            label
            id
            parentId
            childItems {
              nodes {
                id
                label
                url
              }
            }
            url
          }
        }
      }
    }
  `);

  const { verein, riverrats, eishockey, rest, legal } = useMemo(() => {
    const childItems = data.wordpressMenu?.menuItems?.nodes?.reduce((prev, curr) => {
      curr?.childItems?.nodes?.forEach((item) => item && prev.push(item));

      return prev;
    }, [] as Array<Pick<Wordpress_MenuItem, "label" | "id" | "url">>);

    const menu = data.wordpressMenu?.menuItems?.nodes?.map((menuItem) => ({
      ...menuItem,
      childItems: menuItem?.childItems?.nodes,
    })) as Array<Wordpress_MenuItem & { childItems: Array<Pick<Wordpress_MenuItem, "label" | "id" | "url">> }>;

    const verein = menu.find((el) => el.label === "Verein")?.childItems;
    const riverrats = menu.find((el) => el.label === "River Rats")?.childItems;
    const eishockey = menu.find((el) => el.label === "Eishockey")?.childItems;
    const rest = menu.filter(
      (el) =>
        el.childItems.length === 0 &&
        !el.label?.match(/impressum|datenschutz/gi) &&
        childItems?.find((child) => child.id === el.id) === undefined,
    );

    const legal = menu.filter((el) => el.childItems.length === 0 && el.label?.match(/impressum|datenschutz/gi));

    return { verein, riverrats, eishockey, rest, legal };
  }, [data]);

  return (
    <FooterWrapper>
      <FooterUl>
        <ParentLi>Verein</ParentLi>
        {verein?.map((item) => (
          <li key={item.id}>
            <Link to={item.url ?? ""}>{item.label}</Link>
          </li>
        ))}
      </FooterUl>
      <FooterUl>
        <ParentLi>River Rats</ParentLi>
        {riverrats?.map((item) => (
          <li key={item.id}>
            <Link to={item.url ?? ""}>{item.label}</Link>
          </li>
        ))}
      </FooterUl>
      <FooterUl>
        <ParentLi>Eishockey</ParentLi>
        {eishockey?.map((item) => (
          <li key={item.id}>
            <Link to={item.url ?? ""}>{item.label}</Link>
          </li>
        ))}
      </FooterUl>
      <FooterUl>
        {rest.map((item) => (
          <li key={item.id}>
            <Link to={item.url ?? ""}>{item.label}</Link>
          </li>
        ))}
      </FooterUl>
      <FooterUl>
        {legal.map((item) => (
          <li key={item.id}>
            <Link to={item.url ?? ""}>{item.label}</Link>
          </li>
        ))}
        {/* <li>
          <Link to="/">
            <Logo />
          </Link>
        </li> */}
      </FooterUl>
    </FooterWrapper>
  );
};

export default Footer;
