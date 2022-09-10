import { css } from "@emotion/react";
import { Carousel } from "antd";
import { isWithinInterval } from "date-fns";
import { graphql, useStaticQuery } from "gatsby";
import React, { useMemo } from "react";
import { FlashNewsQuery } from "../../../graphql-types";
import { colors, dimensions } from "../../styles/variables";
import Link from "../link/Link";

const FlashNews = () => {
  const flashNewsData = useStaticQuery<FlashNewsQuery>(graphql`
    query FlashNews {
      allWordpressPost(filter: { categories: { nodes: { elemMatch: { id: { eq: "dGVybToyMg==" } } } } }) {
        nodes {
          title
          uri
          postACF {
            division
            flashPost {
              start
              end
            }
          }
        }
      }
    }
  `);

  const flashNews = useMemo(() => {
    return flashNewsData.allWordpressPost.nodes.filter((news) =>
      isWithinInterval(new Date(), {
        start: new Date(news.postACF?.flashPost?.start ?? new Date()),
        end: new Date(news.postACF?.flashPost?.end ?? new Date()),
      }),
    );
  }, [flashNewsData]);

  return flashNews.length === 0 ? null : (
    <div
      css={css`
        grid-column: 1 / -1;
        margin: 2.5rem 0;
        border-top: ${dimensions.border.size.normal} solid ${colors.gray.line};
        border-bottom: ${dimensions.border.size.normal} solid ${colors.gray.line};
        max-width: 100%;
      `}
    >
      <Carousel
        css={css`
          color: ${colors.gray.text};
        `}
        autoplay
        dots={false}
        slidesToShow={1}
      >
        {flashNews.map((news) => {
          if (news.postACF?.division === undefined || news.title === undefined) {
            return null;
          }

          return (
            <div key={news.title ?? ""}>
              <Link
                lang="de"
                to={`/${news.postACF.division}/news${news.uri}`}
                css={css`
                  text-decoration: none;
                  text-align: center;

                  &:hover {
                    text-decoration: none;
                  }
                `}
              >
                <h2
                  css={css`
                    display: flex;
                    justify-content: center;
                    margin: 1em 0;
                  `}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: news.title ?? "" }}
                />
              </Link>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default FlashNews;
