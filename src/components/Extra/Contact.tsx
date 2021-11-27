import { Box, Flex } from "@chakra-ui/layout";
import { chakra, useStyles } from "@chakra-ui/react";
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
  const styles = useStyles();
  const contactTitle = useTranslation("contact");

  return (
    <chakra.div {...rest}>
      <Heading borders size="lg" sx={styles.heading}>
        {contactTitle}
      </Heading>
      <chakra.div>
        <chakra.span>{name}</chakra.span>
        {coach && (
          <ContactElement>
            <chakra.strong>Trainer</chakra.strong>
            <chakra.span>{coach}</chakra.span>
          </ContactElement>
        )}
        {assistant && (
          <ContactElement>
            <chakra.strong>Betreuer</chakra.strong>
            <chakra.span>{assistant}</chakra.span>
          </ContactElement>
        )}
        {manager && (
          <ContactElement>
            <chakra.strong>Teamleiter</chakra.strong>
            <chakra.span>{manager}</chakra.span>
          </ContactElement>
        )}
        {email && (
          <ContactElement>
            <chakra.strong>Email</chakra.strong>
            <a href={`mailto:${email}`}>{email}</a>
          </ContactElement>
        )}
        {tel && (
          <ContactElement>
            <chakra.strong>Telefon</chakra.strong>
            <a href={`tel:${tel}`}>{tel}</a>
          </ContactElement>
        )}
        {website && (
          <ContactElement>
            <chakra.strong>Website</chakra.strong>
            <a href={website}>{website.replace("https://", "")}</a>
          </ContactElement>
        )}
      </chakra.div>
    </chakra.div>
  );
};
