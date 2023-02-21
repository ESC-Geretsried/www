import React from "react";
import styled from "@emotion/styled";
import { fonts } from "../../styles/variables";
import H2 from "../h2/H2";

const ContactElement = styled.div`
  margin-bottom: 0.5em;
  display: flex;
  flex-direction: column;
  strong {
    font-family: ${fonts.PTSansBold};
    font-weight: 900;
  }
`;
const ContactSection: React.FC<{
  name?: string | null;
  coach?: string | null;
  assistant?: string | null;
  manager?: string | null;
  email?: string | null;
  telephone?: string | null;
  website?: string | null;
}> = ({ name, coach, assistant, manager, email, telephone, website }) => {
  if (!name && !coach && !manager && !assistant && !email && !telephone && !website) {
    return null;
  }

  return (
    <>
      <H2 title="Kontakt" />
      {name && <span>{name}</span>}
      {coach && (
        <ContactElement>
          <strong>Trainer</strong>
          <span>{coach}</span>
        </ContactElement>
      )}
      {assistant && (
        <ContactElement>
          <strong>Betreuer</strong>
          <span>{assistant}</span>
        </ContactElement>
      )}
      {manager && (
        <ContactElement>
          <strong>Teamleiter</strong>
          <span>{manager}</span>
        </ContactElement>
      )}
      {email && (
        <ContactElement>
          <strong>Email</strong>
          <a href={`mailto:${email}`}>{email}</a>
        </ContactElement>
      )}
      {telephone && (
        <ContactElement>
          <strong>Telefon</strong>
          <a href={`tel:${telephone}`}>{telephone}</a>
        </ContactElement>
      )}
      {website && (
        <ContactElement>
          <strong>Website</strong>
          <a href={website}>{website.replace("https://", "")}</a>
        </ContactElement>
      )}
    </>
  );
};

export default ContactSection;
