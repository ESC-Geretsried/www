import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";
import { css } from "@emotion/react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { PageFieldsFragment, FontFieldsFragment } from "../../../graphql-types";
import BaseSection from "../sections/BaseSection";
import { mq, colors, dimensions, widths } from "../../styles/variables";

const IframeWrapper = styled.div<{ height: string }>`
  height: ${({ height }) => height};
  width: 100%;
  position: relative;
  iframe {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border: 0;
  }
`;

const TemplateGamepitch: React.FC<{ data: PageFieldsFragment }> = ({ data }) => {
  const gamepitchData = useStaticQuery(graphql`
    query GetGamepitchData {
      wordpressPage(id: { eq: "cG9zdDoyNQ==" }) {
        title
        riverratsACF {
          divisionId
          teamId
        }
      }
      allFile(filter: { name: { regex: "/rubik-black|ptsans-bold|ptsans-regular/i" } }) {
        nodes {
          ...FontFields
        }
      }
    }
  `);
  const { divisionId, teamId } = gamepitchData.wordpressPage.riverratsACF;
  const fonts = gamepitchData.allFile.nodes;
  const widgetName = data.pageACF?.gamepitchWidget;

  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState("400px");
  const [loading, setLoading] = useState(true);

  const onIframeLoad = () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (iframeRef?.current !== null) {
      const iFrame = (iframeRef.current as unknown) as HTMLIFrameElement;

      setIframeHeight(iFrame.contentWindow?.document.body.scrollHeight + "px");
      iFrame.contentDocument?.documentElement.style.setProperty("--gray", colors.gray.text);
      iFrame.contentDocument?.documentElement.style.setProperty("--borderWidth", dimensions.border.size.normal);
      iFrame.contentDocument?.documentElement.style.setProperty("--maxWidth", widths.xl.toString());
      iFrame.contentDocument?.documentElement.style.setProperty("--letterSpacing", dimensions.letterSpacing.default);

      fonts.forEach((font: FontFieldsFragment) => {
        iFrame.contentDocument?.documentElement.style.setProperty(`--${font.name}`, `${font.name}`);

        // @ts-expect-error
        const fontFace = new (FontFace as unknown)(font.name, `url(${font.publicURL}) format("truetype")`);

        fontFace
          .load()
          .then((loadedFace: unknown) => {
            // @ts-expect-error
            iFrame.contentDocument?.fonts?.add(loadedFace);
          })
          .catch((error: unknown) => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
      });

      setLoading(false);
    }
  };

  if (data.pageACF === undefined) {
    return null;
  }

  return (
    <>
      <BaseSection size="full">
        <IframeWrapper height={iframeHeight}>
          {loading && (
            <div
              css={css`
                width: 100%;
                text-align: center;
              `}
            >
              <Spin indicator={<LoadingOutlined style={{ fontSize: 50, color: colors.gold }} spin />} />
            </div>
          )}
          <iframe
            ref={iframeRef}
            title="gamepitch"
            src={`/gamepitch.html?widgetName=${widgetName}&divisionId=${divisionId}&teamId=${teamId}&mq[4]=${mq[4]}`}
            onLoad={onIframeLoad}
          />
        </IframeWrapper>
      </BaseSection>
    </>
  );
};

export default TemplateGamepitch;
