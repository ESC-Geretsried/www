import React, { useState, useRef } from "react";
// import { css } from "@emotion/react";
import { graphql } from "gatsby";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { css } from "@emotion/react";
import { navigate } from "@reach/router";
import { Container, ContentWrapper, MenuWrapper } from "../../../styles/Container";
import { BlogPostPageQuery } from "../../../../graphql-types";
// import Seo from "../../../components/seo/Seo";
import MobileHeader from "../../../components/mobileHeader/MobileHeader";
import AdBanner from "../../../components/adBannerOld/AdBanner";
import BackgroundSVG from "../../../components/backgroundSVG/BackgroundSVG";
import MainMenu from "../../../components/menuOld/Menu";
import Footer from "../../../components/footer/Footer";
import TemplateBlogPost from "../../../components/templateBlogPost/TemplateBlogPost";
import TemplateMatchReport from "../../../components/templateMatchReport/TemplateMatchReport";
import Button from "../../../components/button/Button";
import { mq } from "../../../styles/variables";

export const query = graphql`
  query BlogPostPage($id: String!) {
    wordpressPost(id: { eq: $id }) {
      ...BlogPostFields
    }
  }
`;

const BlogPostPageTemplate: React.FC<{
  pageContext: { slug: string };
  data: BlogPostPageQuery;
  location: Location;
}> = ({ data: { wordpressPost: post }, location }) => {
  // return null;
  const [collapsed, setCollapsed] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  if (!post || !post.postACF) {
    return null;
  }

  return (
    <>
      {/* <Seo seo={page.pageACF.seo ?? defaultSEOValues} title={title} uri={uri} /> */}
      <MobileHeader
        title={collapsed ? "News" : "Menü"}
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
            {(post.postACF.postCategory === null ||
              post.postACF.postCategory === "post" ||
              post.postACF.postCategory === "flash") && <TemplateBlogPost post={post} />}
            {post.postACF.postCategory === "matchReport" && <TemplateMatchReport post={post} />}
            <div
              css={css`
                grid-column: 1 / -1;
                display: flex;
                justify-content: center;
                padding: 3em 0;
                ${mq[4]} {
                  grid-column: 3 / span 7;
                }
              `}
            >
              <Button onClick={async () => navigate(-1)}>Zurück</Button>
            </div>
            <Footer />
          </ContentWrapper>
        </Container>
      </BackgroundSVG>
    </>
  );
};

export default BlogPostPageTemplate;
