import { Box, Flex } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/react";
import React from "react";
import { Heading } from "../../atoms/Heading/Heading";
import { Strong } from "../../atoms/Strong";
import { useTranslation } from "../../translation/useTranslation";

type ContactProps = {
  contact: GatsbyTypes.ContactFragment["contact"] & {
    coach?: string;
    assistant?: string;
    manager?: string;
  };
};

const ContactElement: React.FC = (props) => (
  <Flex
    flexDirection="column"
    alignItems="flex-start"
    marginBlockEnd={2}
    {...props}
  />
);

export const Contact: React.FC<ContactProps> = ({
  contact: { name, coach, assistant, manager, email, tel, website },
  ...rest
}) => {
  const contactTitle = useTranslation("contact");

  return (
    <Box {...rest}>
      <Heading borders size="lg">
        {contactTitle}
      </Heading>
      <chakra.span paddingBlockStart={2} display="inline-block">
        {name}
      </chakra.span>
      {coach && (
        <ContactElement>
          <Strong>Trainer</Strong>
          <chakra.span>{coach}</chakra.span>
        </ContactElement>
      )}
      {assistant && (
        <ContactElement>
          <Strong>Betreuer</Strong>
          <chakra.span>{assistant}</chakra.span>
        </ContactElement>
      )}
      {manager && (
        <ContactElement>
          <Strong>Teamleiter</Strong>
          <chakra.span>{manager}</chakra.span>
        </ContactElement>
      )}
      {email && (
        <ContactElement>
          <Strong>Email</Strong>
          <a href={`mailto:${email}`}>{email}</a>
        </ContactElement>
      )}
      {tel && (
        <ContactElement>
          <Strong>Telefon</Strong>
          <a href={`tel:${tel}`}>{tel}</a>
        </ContactElement>
      )}
      {website && (
        <ContactElement>
          <Strong>Website</Strong>
          <a href={website}>{website.replace("https://", "")}</a>
        </ContactElement>
      )}
    </Box>
  );
};
