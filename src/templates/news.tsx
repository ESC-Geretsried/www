import { graphql } from "gatsby";
import React, { useMemo, useState } from "react";
import { Heading } from "../atoms/Heading/Heading";
import {
  Button as ChakraButton,
  ButtonGroup,
  ButtonProps,
  Heading as ChakraHeading,
  List,
  ListItem,
} from "@chakra-ui/react";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext, Mutable } from "../types";
import { WPContent } from "../atoms/WPContent/WPContent";
import { chunk } from "../utils/shared.utils";

const useClientSidePagination = <T extends Array<{}>>(
  data: T,
  pageSize: number
) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const chunks = useMemo(() => chunk(data, pageSize), [data, pageSize]);

  const buttons = [...chunks]
    .map((_chunk, i) => ({
      onClick: () => setCurrentPageIndex(i),
      children: i + 1,
      isActive: currentPageIndex === i,
      key: i + 1,
    }))
    .filter(
      (_chunk, i) =>
        i === chunks.length - 1 || // always show last
        i === 0 || // always show first
        (currentPageIndex - 2 <= i && // show previous 2
          i <= currentPageIndex + 2) || // show next 2
        currentPageIndex === i
      // i < chunks.length -
    );

  // show dotted when 2 previous not follow first or
  // show dotted when 2 next are not before last

  const currentPage = chunks[currentPageIndex];

  const next = () =>
    setCurrentPageIndex(
      currentPageIndex < chunks.length - 1
        ? currentPageIndex + 1
        : chunks.length - 1
    );
  const previous = () =>
    setCurrentPageIndex(currentPageIndex > 0 ? currentPageIndex - 1 : 0);

  return { chunks, currentPageIndex, currentPage, next, previous, buttons };
};

const Button: React.FC<ButtonProps> = (props) => (
  <ChakraButton
    {...props}
    backgroundColor="transparent"
    borderColor="brand.ice"
    border="2px solid"
    borderRadius="0"
    _hover={{
      backgroundColor: "transparent",
      borderColor: "brand.gold",
      color: "brand.gold",
    }}
    _active={{
      backgroundColor: "transparent",
      borderColor: "brand.gold",
      color: "brand.gold",
    }}
    _focus={{
      boxShadow: "none",
    }}
    _focusVisible={{
      boxShadow: "outline",
    }}
  />
);

type Posts = Mutable<GatsbyTypes.GetAllBlogPostsQuery["allPosts"]["nodes"]>;
const PAGESIZE = 10;

const News: React.FC<{
  data: GatsbyTypes.GetAllBlogPostsQuery;
  pageContext: GatsbyPageContext;
}> = ({ pageContext, data }) => {
  const { currentPage, previous, next, buttons } =
    useClientSidePagination<Posts>(data.allPosts.nodes as Posts, PAGESIZE);
  return (
    <Layout
      header={
        <>
          <Heading borders>{pageContext.title}</Heading>
        </>
      }
      content={
        <>
          <List
            display="grid"
            gridTemplateRows={`repeat(${currentPage.length}, 1fr)`}
          >
            {currentPage.map((post) => {
              return (
                <ListItem key={post.id}>
                  <ChakraHeading as="h2" fontSize="1rem">
                    {post.title}
                  </ChakraHeading>
                  <WPContent content={post.excerpt ?? ""} />
                </ListItem>
              );
            })}
          </List>
          <ButtonGroup>
            <Button onClick={previous}>Previous</Button>
            {buttons.map((button, i) => (
              <Button {...button} />
            ))}
            <Button onClick={next}>Next</Button>
          </ButtonGroup>
        </>
      }
      extra={<>extra</>}
    />
  );
};

export const NewsQuery = graphql`
  query GetAllBlogPosts($categoryId: String!) {
    allPosts: allWpPost(
      filter: {
        categories: { nodes: { elemMatch: { id: { eq: $categoryId } } } }
        postACF: { postCategory: { ne: "flash" } }
      }
    ) {
      nodes {
        id
        title
        postACF {
          division
          postCategory
        }
        excerpt
        date
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
            altText
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export default News;
