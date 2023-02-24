import React from "react";
import type { AdditionalInfo as AdditionalInfoType } from "../../../lib/getPage/getStandardPageData";
import { HTML } from "../../HTML/HTML";

type AdditionalInfoProps = {
  info: AdditionalInfoType;
};

export const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ info }) => {
  return (
    <section>
      <h2>{info.title}</h2>
      <HTML>{info.content}</HTML>
    </section>
  );
};
