import type { Contact as ContactType } from "../../../lib/getPage/getStandardPageData";
import { Hx } from "../../Heading/Heading";
import { BorderHeading } from "../../Heading/BorderHeading";
import { Section } from "../../Section";

type ContactProps = {
  contact: ContactType;
};

export const Contact = ({ contact }: ContactProps) => {
  return (
    <Section>
      <BorderHeading className="text-2xl  mt-4">Kontakt</BorderHeading>
      <div className="flex flex-col">
        <strong>Name</strong>
        <span>{contact.name}</span>
      </div>
      <div className="flex flex-col">
        <strong>Email</strong>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </div>
      {contact.tel && (
        <div className="flex flex-col">
          <strong>Telefon</strong>
          <a href={`tel:${contact.tel}`}>{contact.tel}</a>
        </div>
      )}
      {contact.website && (
        <div className="flex flex-col">
          <strong>Website</strong>
          <a href={contact.website}>
            {contact.website.replace("https://", "")}
          </a>
        </div>
      )}
    </Section>
  );
};
