import { css } from "@emotion/react";
import React from "react";
import { dimensions, colors, grid } from "../../styles/variables";
import { DataEntry } from "../dataEntry/DataEntry";
import TypedImg from "../img/Img";
import { CardWrapper } from "./lineup.styles";
import Avatar from "../../assets/avatar_female.svg";
import { BoardMemberFieldsFragment } from "../../../graphql-types";

const BoardMemberCard: React.FC<{ human: BoardMemberFieldsFragment }> = ({ human, ...rest }) => {
  return (
    <CardWrapper {...rest}>
      <div>
        {human.portrait?.localFile?.childImageSharp?.fluid ? (
          <TypedImg fluid={human.portrait.localFile.childImageSharp.fluid} />
        ) : (
          <div
            className="gatsby-image-wrapper"
            css={css`
              border: ${dimensions.border.size.normal} solid ${colors.gray.line};
              padding: 1rem;
              width: calc(50% + 1.5 * ${grid.gap});
              svg {
                fill: ${colors.gray.line};
              }
            `}
          >
            <Avatar />
          </div>
        )}
      </div>
      <h3
        lang="de"
        css={css`
          overflow-wrap: break-word;
          word-wrap: break-word;
          -ms-word-break: break-all;
          /* This is the dangerous one in WebKit, as it breaks things wherever */
          word-break: break-all;
          /* Instead use this non-standard one: */
          word-break: break-word;
          hyphens: auto;
        `}
      >
        {human.position}
      </h3>
      <div>
        <strong>{human.name}</strong>
        <DataEntry datakey="Email" data={human.email} />
        <DataEntry datakey="Telefon" data={human.telephone} />
      </div>
    </CardWrapper>
  );
};

export default BoardMemberCard;
