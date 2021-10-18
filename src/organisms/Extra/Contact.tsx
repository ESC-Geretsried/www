import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { Heading } from "../../atoms/Heading/Heading";
import { useTranslation } from "../../translation/useTranslation";

type ContactProps = {
  contact: GatsbyTypes.ContactFragment["contact"] & {
    coach?: string;
    assistant?: string;
    manager?: string;
  };
};

const ContactElement: React.FC = (props) => (
  <Flex flexDirection="column" marginBlockEnd={2} {...props} />
);

export const Contact: React.FC<ContactProps> = ({
  contact: { name, coach, assistant, manager, email, tel, website },
  ...rest
}) => {
  const contactTitle = useTranslation("contact");

  return (
    <Box {...rest}>
      <Heading as="h3" borders>
        {contactTitle}
      </Heading>
      {name}
      {coach && (
        <ContactElement>
          <Box as="strong">Trainer</Box>
          <Box as="span">{coach}</Box>
        </ContactElement>
      )}
      {assistant && (
        <ContactElement>
          <Box as="strong">Betreuer</Box>
          <Box as="span">{assistant}</Box>
        </ContactElement>
      )}
      {manager && (
        <ContactElement>
          <Box as="strong">Teamleiter</Box>
          <Box as="span">{manager}</Box>
        </ContactElement>
      )}
      {email && (
        <ContactElement>
          <Box as="strong">Email</Box>
          <a href={`mailto:${email}`}>{email}</a>
        </ContactElement>
      )}
      {tel && (
        <ContactElement>
          <Box as="strong">Telefon</Box>
          <a href={`tel:${tel}`}>{tel}</a>
        </ContactElement>
      )}
      {website && (
        <ContactElement>
          <Box as="strong">Website</Box>
          <a href={website}>{website.replace("https://", "")}</a>
        </ContactElement>
      )}
    </Box>
  );
};
