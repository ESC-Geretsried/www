declare module "gatsby-wpgraphql-inline-images" {
  import React from "react";

  export default function contentParser(
    content: { content: string },
    options: { wordPressUrl: string; uploadsUrl: string },
  ): React.ReactNode;
}
