import React from "react";
import { HTML } from "./HTML/HTML";
import { Hockey } from "./templates/Hockey";
import { Standard } from "./templates/Standard";
import type { Page } from "../lib/getPage";

type PageProps = {
  page: Page;
};

export const PageRenderer: React.FC<PageProps> = ({ page }) => {
  switch (page.template) {
    case "hockey": {
      return (
        <Hockey>
          <HTML>{page.title}</HTML>
        </Hockey>
      );
    }
    default: {
      return (
        <Standard>
          <HTML>{page.content}</HTML>
        </Standard>
      );
    }
  }
};
