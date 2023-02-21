import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PageFieldsFragment, BlogPostPreviewFieldsFragment } from "../../../graphql-types";
import BaseSection from "../sections/BaseSection";
// import WPContentContainer from "../wpContentContainer/WPContentContainer";
import H1 from "../h1/H1";
import { mq } from "../../styles/variables";
import BlogPostPreview from "../blogPostPreview/BlogPostPreview";
import Link from "../link/Link";
import ContactSection from "../sections/ContactSection";
import H2 from "../h2/H2";
import FeatureImg from "../featureImg/FeatureImg";
import WPContentContainer from "../wpContentContainer/WPContentContainer";

const BonusSectionContent = styled.section`
  display: grid;
`;

const TemplateStandard: React.FC<{ data: PageFieldsFragment; post?: BlogPostPreviewFieldsFragment }> = ({
  data,
  post,
}) => {
  // let query = VereinPosts;

  // const postData: PostQuery = useStaticQuery(query);
  // const post = postData.wp?.posts?.nodes.shift();

  const standardContent = data.pageACF?.standardContent;

  if (standardContent === undefined || standardContent === null) {
    return null;
  }
  const featureImg = standardContent.featurePic;

  return (
    <>
      <FeatureImg
        img={featureImg?.localFile?.childImageSharp ?? undefined}
        alt={featureImg?.altText ?? "Default Alt"}
        title={featureImg?.title ?? "Default Title"}
      />
      <BaseSection size="small">
        <div
          css={css`
            display: grid;
            gap: 6rem;
            margin-bottom: 6rem;
            ${mq[4]} {
              gap: 3rem;
            }
          `}
        >
          {post && (
            <BonusSectionContent>
              <H2 title="News" />
              <BlogPostPreview post={post} size="small" />

              <Link to={`/${data.pageACF?.division}/news`}>Alle News</Link>
            </BonusSectionContent>
          )}

          {standardContent.contact?.name && (
            <BonusSectionContent>
              <ContactSection
                name={standardContent.contact.name}
                email={standardContent.contact.email}
                telephone={standardContent.contact.tel}
                website={standardContent.contact.website}
              />
            </BonusSectionContent>
          )}
          {standardContent.additionalInfo?.content && (
            <BonusSectionContent>
              <H2 title={standardContent.additionalInfo.title ?? ""} key="bonus-header-2" />
              <WPContentContainer wpContent={standardContent.additionalInfo.content} />
            </BonusSectionContent>
          )}
          {Array.isArray(standardContent.downloads) && standardContent.downloads.length !== 0 && (
            <BonusSectionContent>
              <H2 title="Downloads" key="bonus-header-3" />
              <ul
                css={css`
                  padding-left: 1.25rem;
                `}
              >
                {standardContent.downloads.map((download) => {
                  if (!download?.file?.mediaItemUrl) {
                    return null;
                  }
                  const { file } = download;

                  return (
                    <li key={file.mediaItemUrl ?? ""}>
                      <a href={file.mediaItemUrl ?? ""} download>
                        {file.title ?? ""}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </BonusSectionContent>
          )}
        </div>
      </BaseSection>
      <BaseSection size="big">
        <H1 title={standardContent.pageContentTitle ?? ""} size="section" key="content-header" />
        <WPContentContainer wpContent={data.content ?? "Es wurde kein Inhalt gefunden!"} />
        {/* <WPContentContainer wpContent={data.content ?? "Es wurde kein Inhalt gefunden!"} /> */}
      </BaseSection>
    </>
  );
};

export default TemplateStandard;
