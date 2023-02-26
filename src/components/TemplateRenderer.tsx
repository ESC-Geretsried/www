import React, { ReactNode } from "react";
import type { Page } from "../lib/getPage/getPage";
import { Hockey } from "./templates/Hockey";
import { Standard } from "./templates/Standard/Standard";
import { Downloads } from "./templates/Downloads";

type PageProps = {
  page: Page;
};

export const TemplateRenderer = ({ page }: PageProps) => {
  switch (page.template) {
    case "hockey": {
      return <Hockey />;
    }
    case "standard": {
      // @ts-expect-error Server Component
      return <Standard page={page} />;
    }

    case "lineup_board": {
      return <div>lineup board</div>;
    }

    case "lineup": {
      return <div>lineup</div>;
    }
    case "downloads": {
      return <div>Downloads</div>;
    }

    default: {
      console.error("template not yet implemented");

      return <div>default</div>;
    }
  }
};
