import React from "react";
import { BlogPostPreviewFieldsFragment } from "../../../graphql-types";
import { List, ListItem } from "../../styles/List";
import BlogPostPreview from "./BlogPostPreview";

const BlogPostList: React.FC<{ posts?: Array<BlogPostPreviewFieldsFragment> | null; loadMore?: React.ReactNode }> = ({
  posts,
}) => {
  if (posts === undefined || posts === null) {
    return null;
  }

  return (
    <List<BlogPostPreviewFieldsFragment>
      bordered
      dataSource={posts}
      pagination={posts.length > 5 ? { defaultCurrent: 1, total: posts.length, defaultPageSize: 5 } : undefined}
      locale={{ emptyText: "Keine Posts gefunden" }}
      renderItem={(item) => (
        <ListItem key={item.id}>
          <BlogPostPreview post={item} />
        </ListItem>
      )}
    />
  );
};

export default BlogPostList;
