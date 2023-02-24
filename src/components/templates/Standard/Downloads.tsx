import React from "react";
import { Download } from "../../../lib/getPage/getStandardPageData";

type DownloadsProps = {
  downloads: Array<Download>;
};

export const Downloads: React.FC<DownloadsProps> = ({ downloads }) => {
  return (
    <section>
      <h2>Downloads</h2>
      <ul className="list-disc">
        {downloads.map((item) => (
          <li key={item.href}>
            <a href={item.href} download>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
