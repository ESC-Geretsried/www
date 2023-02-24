import React, { ReactNode } from "react";
import type { Page } from "../lib/getPage/getPage";
import { Hockey } from "./templates/Hockey";
import { Standard } from "./templates/Standard/Standard";

type PageProps = {
  page: Page;
  children: ReactNode;
};

export const TemplateRenderer = async ({ page, children }: PageProps) => {
  switch (page.template) {
    case "hockey": {
      return <Hockey />;
    }
    case "standard": {
      return <Standard page={page} />;
    }

    case "lineup_board": {
      return <div>{children}</div>;
    }

    case "lineup": {
      return <div> {children}</div>;
    }

    default: {
      console.error("template not yet implemented");

      return <div>{children}</div>;
    }
  }
};
