import React from "react";
import { css } from "@emotion/react";
import { Carousel } from "antd";
import { BlogPostFieldsFragment } from "../../../graphql-types";
import TypedImg from "../img/Img";
import BaseSection from "../sections/BaseSection";
import { mq, dimensions, colors } from "../../styles/variables";
import H1 from "../h1/H1";
import WPContentContainer from "../wpContentContainer/WPContentContainer";
// import WPContentContainer from "../wpContentContainer/WPContentContainer";

const TemplateBlogPost: React.FC<{ post: BlogPostFieldsFragment }> = ({ post }) => {
  return (
    <>
      <H1
        title={post.postACF?.division?.replace("-", " ") ?? "Titel"}
        size="big"
        css={css`
          display: none;
          ${mq[4]} {
            display: block;
          }
        `}
      />
      <div
        css={css`
          grid-column: 1 / -1;
          ${mq[2]} {
            grid-column: 3 / span 7;
          }
        `}
      >
        {post.featuredImage !== null && post.postACF?.normalPost?.imageGallery?.length === 0 && (
          <TypedImg fluid={post.featuredImage?.node?.localFile?.childImageSharp?.fluid} />
        )}
        {post.postACF?.normalPost?.imageGallery && (
          <Carousel autoplay>
            {post.postACF.normalPost.imageGallery.map((image) => {
              return (
                <div
                  css={css`
                    min-height: 300px;
                  `}
                  key={image?.id}
                >
                  <div
                    css={css`
                      position: relative;
                      .gatsby-image-wrapper {
                        margin: 0 auto;
                      }
                    `}
                  >
                    {/* <span>{image?.title}</span> */}
                    <TypedImg
                      fluid={image?.localFile?.childImageSharp?.fluid}
                      alt={image?.altText ?? ""}
                      title={image?.title ?? ""}
                    />
                  </div>
                </div>
              );
            })}
          </Carousel>
        )}
      </div>
      <BaseSection
        size="big"
        css={css`
          ${mq[2]} {
            /* grid-column-start: 2 !important; */
            grid-column: 2 / span 8;
          }
          ${mq[4]} {
            /* grid-column-start: 2 !important; */
            grid-column: 3 / span 7;
          }
        `}
      >
        <H1 title={post.title ?? ""} size="section" />
        <WPContentContainer wpContent={post.content ?? "Es wurde kein Inhalt gefunden!"} />
        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-top: 0.5em;
            border-top: ${dimensions.border.size.small} solid ${colors.gray.line};
          `}
        >
          {/* <div>
            <span>Autor: </span>
            <span>{post?.author?.name}</span>
          </div> */}
          <div>
            <span>veröffentlicht am: {new Date(post.date ?? "").toLocaleDateString(["de-DE"])}</span>
          </div>
        </div>
      </BaseSection>
    </>
  );
};

export default TemplateBlogPost;
