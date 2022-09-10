import { css } from "@emotion/react";
import React from "react";
import { PlayerFieldsFragment } from "../../../graphql-types";
import { dimensions, colors, grid } from "../../styles/variables";
import { DataEntry } from "../dataEntry/DataEntry";
import TypedImg from "../img/Img";
import { getPosition, getStickSide } from "./lineup.helpers";
import { CardWrapper } from "./lineup.styles";
import Avatar from "../../assets/avatar_female.svg";

const PlayerCard: React.FC<{ human: PlayerFieldsFragment; notPlayer?: boolean }> = ({
  human,
  notPlayer = false,
  ...rest
}) => {
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
              /* width: calc(50% + 1.5 * ${grid.gap}); */
              svg {
                fill: ${colors.gray.line};
              }
            `}
          >
            <Avatar />
          </div>
        )}
      </div>
      <h3>{human.name}</h3>
      <div>
        {notPlayer && <DataEntry datakey="Position" data={getPosition(human.position ?? "")} rightAlign />}
        <DataEntry datakey="Rückennummer" data={human.number?.toString()} rightAlign />
        <DataEntry datakey="Nationalität" data={human.nationality} rightAlign />
        {!notPlayer && <DataEntry datakey="Schlägerseite" data={getStickSide(human.stickSide ?? "")} rightAlign />}
        {!notPlayer && (
          <div>
            <a href={human.rodiLink ?? ""} target="_blank" rel="noreferrer">
              Zur RODI Datenbank
            </a>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default PlayerCard;
