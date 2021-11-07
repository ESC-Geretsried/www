import { Flex, FlexProps } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import React, { useMemo } from "react";

type TagsProps = {
  tags: Array<GatsbyTypes.Maybe<string>> | undefined;
};

export const Tags: React.FC<TagsProps & FlexProps> = ({ tags, ...rest }) => {
  const _tags = useMemo(() => {
    let result = tags;
    if (tags && tags.length > 3) {
      result = tags.slice(0, 3);
      result.push("...");
    }

    return result;
  }, [tags]);

  if (!_tags) {
    return null;
  }

  return (
    <Flex flexWrap="wrap" ms={-1} mt={-1} {...rest}>
      {_tags.map((tag) => (
        <Tag key={tag} m={1}>
          {tag}
        </Tag>
      ))}
    </Flex>
  );
};
