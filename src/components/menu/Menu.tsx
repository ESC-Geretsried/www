import { FacebookOutlined, InstagramOutlined, NotificationOutlined, VideoCameraOutlined, SoundOutlined  } from "@ant-design/icons";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Menu } from "antd";
import { graphql, useStaticQuery } from "gatsby";
import React, { useState } from "react";
import { MenuQuery } from "../../../graphql-types";
import { StyledAntMenu, StyledAntMenuItem, StyledAntSubMenuItem } from "../../styles/Menu";
import { colors, mq } from "../../styles/variables";
import Link from "../link/Link";
import Logo from "../logo/Logo";
import { SpradeTVOutlined, TheFanOutlined }from "../sprade/Sprade";

const { SubMenu } = Menu;

const StyledLink = styled(Link)`
  &&& {
    color: ${colors.gray.text};
    text-transform: uppercase;
    width: 100%;
    height: 100%;
    display: block;

    &:hover {
      text-decoration: none;
      color: ${colors.gold};
    }
  }
`;

const MainMenu: React.FC<{ scrollLock: () => void; location: Location }> = ({ scrollLock, location }) => {
  const data = useStaticQuery<MenuQuery>(graphql`
    query Menu {
      wordpressMenu(id: { eq: "dGVybToy" }) {
        menuItems {
          nodes {
            label
            id
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
      wordpressPage(slug: { regex: "/home/" }) {
        homeACF {
          facebookLink
          instagramLink
          tickarooLink
          spradeLink
          thefanLink
        }
      }
    }
  `);

  const links = data.wordpressPage?.homeACF;

  const menu = data.wordpressMenu?.menuItems?.nodes
    ?.filter((item) => item?.parentId === null)
    .map((menuItem) => {
      if (menuItem?.childItems?.nodes !== null && menuItem?.childItems?.nodes !== undefined) {
        return {
          id: menuItem.id,
          url: menuItem.url,
          label: menuItem.label,
          childItems: menuItem.childItems.nodes, // as Array<Pick<Wordpress_MenuItem, "label" | "id" | "url">>,
        };
      }

      return {
        ...menuItem,
      };
    });

  const initiallyOpen = menu
    ?.filter((menuItem) => menuItem !== undefined || menuItem !== null)
    .find((menuItem) => {
      if (menuItem.url === undefined || menuItem.url === null) {
        return false;
      }

      return location.pathname.includes(menuItem.url);
    })?.url;

  const [openKey, setOpenKey] = useState<Array<string> | undefined>([initiallyOpen ?? ""]);

  return (
    <>
      <Link
        to="/"
        css={css`
          display: none;
          border: none;
          ${mq[4]} {
            display: inherit;
          }
        `}
      >
        <Logo />
      </Link>
      <nav>
        <StyledAntMenu
          mode="inline"
          openKeys={openKey}
          onOpenChange={(openKeys) => {
            const latestOpenKey = (openKeys as Array<string>).find((key) => !openKey?.includes(key));

            setOpenKey(latestOpenKey ? [latestOpenKey] : []);
          }}
        >
          <StyledAntMenuItem>
            <StyledLink to="/" onClick={() => scrollLock()}>
              Home
            </StyledLink>
          </StyledAntMenuItem>
          {menu?.map((menuItem) => {
            if (Array.isArray(menuItem.childItems) && menuItem.childItems.length > 0) {
              return (
                <SubMenu
                  key={menuItem.url ?? ""}
                  title={menuItem.label}

                  // onTitleClick={() => {
                  //   // navigate(`${getPath(menuItem.url ?? "")}news`);
                  //   scrollLock();
                  // }}
                >
                  <StyledAntSubMenuItem>
                    <StyledLink to={`${menuItem.url}news`} onClick={() => scrollLock()}>
                      News
                    </StyledLink>
                  </StyledAntSubMenuItem>
                  {menuItem.childItems.map((childItem) => {
                    if (childItem === null || childItem === undefined) {
                      return null;
                    }

                    return (
                      <StyledAntSubMenuItem key={childItem.id}>
                        <StyledLink to={childItem.url ?? ""} onClick={() => scrollLock()}>
                          {childItem.label}
                        </StyledLink>
                      </StyledAntSubMenuItem>
                    );
                  })}
                </SubMenu>
              );
            }

            return (
              <StyledAntMenuItem key={menuItem.url ?? ""}>
                <StyledLink to={menuItem.url ?? ""} onClick={() => scrollLock()}>
                  {menuItem.label}
                </StyledLink>
              </StyledAntMenuItem>
            );
          })}
        </StyledAntMenu>
        <div
          css={css`
            display: flex;
            span {
              font-size: 2em;
              padding-right: 0.5em;
            }
          `}
        >
          <a href={links?.facebookLink ?? "/"} target="_blank" rel="noreferrer" title="Facebook Feed">
            <FacebookOutlined />
          </a>
          <a href={links?.instagramLink ?? "/"} target="_blank" rel="noreferrer" title="Instagram Feed">
            <InstagramOutlined />
          </a>
          <a href={links?.spradeLink ?? "https://www.sprade.tv/team/105/"} target="_blank" rel="noreferrer" title="Sprade TV">
            <SpradeTVOutlined />
          </a>
             <a href={links?.thefanLink ?? "https://www.thefan.fm/riverrats_geretsried/"} target="_blank" rel="noreferrer" title="thefan.fm">
            <TheFanOutlined />
          </a>
        </div>
      </nav>
    </>
  );
};

export default MainMenu;
