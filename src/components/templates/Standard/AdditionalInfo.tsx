import React from "react";
import type { AdditionalInfo as AdditionalInfoType } from "../../../lib/getPage/getStandardPageData";
import { BorderHeading } from "../../Heading/BorderHeading";
import { HTML } from "../../HTML/HTML";
import { Section } from "../../Section";

type AdditionalInfoProps = {
  info: AdditionalInfoType;
};

export const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ info }) => {
  return (
    <Section>
      <BorderHeading className="text-2xl  mt-4">{info.title}</BorderHeading>
      <HTML>{info.content}</HTML>
    </Section>
  );
};
