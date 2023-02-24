import React from "react";
import type { StandardTemplateData } from "../../../lib/getPage/getStandardPageData";
import { HTML } from "../../HTML/HTML";
import { AdditionalInfo } from "./AdditionalInfo";
import { Contact } from "./Contact";
import { Downloads } from "./Downloads";
import { PostPreview } from "../../PostPreview/PostPreview";
import { getSinglePostForCategory } from "../../../lib/getPost/getSinglePostForCategory";

type StandardProps = {
  page: StandardTemplateData;
};

export const Standard = async ({ page }: StandardProps) => {
  const post = await getSinglePostForCategory(page.categoryDatabaseId);

  return (
    <div id="standard" className="grid md:gap-8 grid-cols-1 md:grid-cols-9">
      <aside className="col-span-1 md:col-span-3 stack">
        {/* @ts-expect-error server-component */}
        {post && <PostPreview post={post} />}
        {page.contact && <Contact contact={page.contact} />}
        {page.additionalInfo && <AdditionalInfo info={page.additionalInfo} />}
        {page.downloads && <Downloads downloads={page.downloads} />}
      </aside>
      <div className="col-span-1 md:col-span-6">
        <HTML>{page.content}</HTML>
      </div>
    </div>
  );
};
