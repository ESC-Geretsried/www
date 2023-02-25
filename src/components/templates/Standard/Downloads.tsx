import React from "react";
import { Download } from "../../../lib/getPage/getStandardPageData";
import { BorderHeading } from "../../Heading/BorderHeading";
import { Section } from "../../Section";

type DownloadsProps = {
  downloads: Array<Download>;
};

export const Downloads: React.FC<DownloadsProps> = ({ downloads }) => {
  return (
    <Section>
      <BorderHeading className="text-2xl mt-4">Downloads</BorderHeading>
      <ul className="list-disc">
        {downloads.map((item) => (
          <li key={item.href}>
            <a href={item.href} download>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
};
