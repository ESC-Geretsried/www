import styled from "@emotion/styled";
import Link from "antd/lib/typography/Link";
import { colors, fonts, mq } from "../../styles/variables";

export const ReadMoreLink = styled(Link)`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  text-indent: 100%;
  white-space: nowrap;

  a&& {
    position: absolute;
    z-index: 0;
  }
`;

export const PostPreviewTitle = styled.h3`
  font-family: ${fonts.rubikBold};
  font-size: 1rem;
`;
export const PostPreviewExcerpt = styled.div`
  p {
    color: ${colors.white};
    margin-bottom: 0;
  }
`;

export const PostPreviewFooter = styled.div`
  color: ${colors.white};
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
  font-weight: bold;
  margin-top: 0.5em;
`;

export const PostPreviewWrapper = styled.div<{ size: "small" | "big" | undefined }>`
  ${({ size }) => size === "small" && "margin-top: -1.5rem;"}
  width: 100%;
  position: relative;
  transition: transform 0.2s ease-in;

  ${mq[4]} {
    &:hover {
      transform: scale3d(1.025, 1.025, 1.025);
      .duotone-original-children {
        opacity: 1;
      }
    }
  }
`;
