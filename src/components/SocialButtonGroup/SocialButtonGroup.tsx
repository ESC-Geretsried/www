import { IconButton, ButtonGroup } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { FacebookIcon, InstagramIcon, TickarooIcon } from "../../atoms/Icons";

const getIcon = (platform: string) => {
  if (platform === "facebookLink") {
    return <FacebookIcon />;
  }
  if (platform === "instagramLink") {
    return <InstagramIcon />;
  }

  return <TickarooIcon />;
};

export const SocialButtonGroup: React.FC = ({ ...rest }) => {
  const { socialLinks } =
    useStaticQuery<GatsbyTypes.GetSocialLinksQuery>(graphql`
      query GetSocialLinks {
        socialLinks: wpPage(slug: { regex: "/home/" }) {
          homeACF {
            facebookLink
            instagramLink
            tickarooLink
          }
        }
      }
    `);

  return (
    <ButtonGroup paddingBlock={4} maxW="100%" size="lg" w="100%" {...rest}>
      {Object.entries(socialLinks?.homeACF ?? {}).map(([platform, link]) => (
        <IconButton
          key={link}
          as="a"
          href={link}
          aria-label={platform}
          icon={getIcon(platform)}
          backgroundColor="transparent"
          backgroundImage="none"
          border="none"
          _hover={{
            backgroundImage: "none",
            backgroundColor: "transparent",
            color: "brand.gold",
          }}
        />
      ))}
    </ButtonGroup>
  );
};
