import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { Heading } from "../../atoms/Heading/Heading";
import { Span } from "../../atoms/Span";
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
      <Span paddingBlockStart={2} display="inline-block">
        {name}
      </Span>
      {coach && (
        <ContactElement>
          <Strong>Trainer</Strong>
          <Span>{coach}</Span>
        </ContactElement>
      )}
      {assistant && (
        <ContactElement>
          <Strong>Betreuer</Strong>
          <Span>{assistant}</Span>
        </ContactElement>
      )}
      {manager && (
        <ContactElement>
          <Strong>Teamleiter</Strong>
          <Span>{manager}</Span>
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
