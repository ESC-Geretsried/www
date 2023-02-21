import React from "react";

const CustomPage: React.FC<{
  pageContext: { slug: string };
}> = ({ pageContext: { slug } }) => {
  return <div>{slug}</div>;
};

export default CustomPage;
