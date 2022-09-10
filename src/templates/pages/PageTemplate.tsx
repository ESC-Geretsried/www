import React, { useState, useRef } from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { isWithinInterval } from "date-fns";
import { PageQuery } from "../../../graphql-types";
import { Container, ContentWrapper, MenuWrapper } from "../../styles/Container";
import MainMenu from "../../components/menu/Menu";
import { mq } from "../../styles/variables";
import TemplateHome from "../../components/templateHome/TemplateHome";
import TemplateTeam from "../../components/templateTeam/TemplateTeam";
import TemplateStandard from "../../components/templateStandard/TemplateStandard";
import TemplateGamepitch from "../../components/templateGamepitch/TemplateGamepitch";
import TemplateSponsoring from "../../components/templateSponsoring/TemplateSponsoring";
import TemplateLineup from "../../components/templateLineup/TemplateLineup";
import Seo from "../../components/seo/Seo";
import H1 from "../../components/h1/H1";
import Footer from "../../components/footer/Footer";
import BackgroundSVG from "../../components/backgroundSVG/BackgroundSVG";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import AdBanner from "../../components/adBanner/AdBanner";
import BlogPostListContainer from "../../components/blogPostPreview/BlogPostListContainer";
import TemplateTickets from "../../components/templateTickets/TemplateTickets";

export const query = graphql`
  query Page($id: String!, $categoryId: String!) {
    wordpressPage(id: { eq: $id }) {
      ...PageFields
    }

    allWordpressPost(limit: 10000, filter: { categories: { nodes: { elemMatch: { id: { eq: $categoryId } } } } }) {
      nodes {
        ...BlogPostPreviewFields
      }
    }
  }
`;

const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const PageTemplate: React.FC<{
  pageContext: { id: string; uri: string; isBlogPostList: boolean; categoryId: string };
  data: PageQuery;
  location: Location;
}> = ({ pageContext: { id, uri, isBlogPostList, categoryId }, data, location }) => {
  const [collapsed, setCollapsed] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const { wordpressPage, allWordpressPost } = data;

  if (!wordpressPage || !wordpressPage.pageACF) {
    throw new Error(
      `The page with id: ${id} for route ${uri}
  did either not return page content or couldn't resolve the required seo properties`,
    );
  }

  const allPosts = allWordpressPost.nodes.filter(
    (news) =>
      news.postACF?.postCategory !== "flash" ||
      isWithinInterval(new Date(), {
        start: new Date(news.postACF.flashPost?.start ?? ""),
        end: new Date(news.postACF.flashPost?.end ?? ""),
      }),
  );

  const title = isBlogPostList
    ? capitalize(wordpressPage.pageACF.division?.replace("-", " ") ?? "Default Title")
    : wordpressPage.title ?? "Default Title";

  // todo
  const defaultSEOValues = {
    metaDescription: "Meta Description",
    noIndex: false,
    ogDescription: "OG Description",
    twitterDescription: "Twitter Description",
  };

  return (
    <>
      <Seo seo={wordpressPage.pageACF.seo ?? defaultSEOValues} title={title} uri={wordpressPage.uri ?? "/"} />
      <MobileHeader
        title={collapsed ? title : "Menü"}
        onClick={() => {
          setCollapsed(!collapsed);
          if (menuRef.current !== null) {
            collapsed ? disableBodyScroll(menuRef.current) : enableBodyScroll(menuRef.current);
          }
        }}
        isActive={!collapsed}
      />
      <AdBanner />
      <BackgroundSVG>
        <Container>
          <MenuWrapper
            aria-hidden={collapsed}
            ref={menuRef}
            css={css`
              transform: translate3d(${collapsed ? "-100%" : "0"}, 0, 0);
            `}
          >
            <MainMenu
              scrollLock={() => {
                setCollapsed(!collapsed);
                enableBodyScroll(menuRef.current);
              }}
              location={location}
            />
          </MenuWrapper>
          <ContentWrapper>
            <H1
              title={title}
              size="big"
              css={css`
                display: none;
                ${mq[4]} {
                  display: flex;
                }
              `}
            />
            {wordpressPage.pageACF.template === "home" && !isBlogPostList && <TemplateHome key={wordpressPage.id} />}
            {isBlogPostList && Array.isArray(allPosts) && <BlogPostListContainer posts={allPosts} />}

            {wordpressPage.pageACF.template === "hockey" && !isBlogPostList && (
              <TemplateTeam key={wordpressPage.id} data={wordpressPage} posts={allPosts} />
            )}
            {(wordpressPage.pageACF.template === "lineup" || wordpressPage.pageACF.template === "lineup_board") &&
              !isBlogPostList && <TemplateLineup key={wordpressPage.id} data={wordpressPage} />}
            {wordpressPage.pageACF.template === "gamepitch" && !isBlogPostList && (
              <TemplateGamepitch key={wordpressPage.id} data={wordpressPage} />
            )}
            {wordpressPage.pageACF.template === "sponsors" && !isBlogPostList && (
              <TemplateSponsoring key={wordpressPage.id} data={wordpressPage} />
            )}
            {wordpressPage.pageACF.template === "tickets" && !isBlogPostList && (
              <TemplateTickets key={wordpressPage.id} data={wordpressPage} />
            )}
            {(wordpressPage.pageACF.template === "standard" || wordpressPage.pageACF.template === null) &&
              !isBlogPostList && (
                <TemplateStandard key={wordpressPage.id} data={wordpressPage} post={[...allPosts].shift()} />
              )}
            <Footer />
          </ContentWrapper>
        </Container>
      </BackgroundSVG>
    </>
  );
};

export default PageTemplate;
