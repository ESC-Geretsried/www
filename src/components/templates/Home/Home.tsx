import React, { ReactNode } from "react";
import { BlogPreview } from "./BlogPreview";
import { Calender } from "./Calender";
import { FlashPosts } from "./FlashPosts";
import { SponsorPreview } from "./SponsorPreview";

type HomeProps = {
  children?: ReactNode;
};

export const Home: React.FC<HomeProps> = ({ children, ...rest }) => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <FlashPosts />
      <div>
        {/* @ts-expect-error Server Component */}
        <BlogPreview />
        <Calender />
      </div>
      <SponsorPreview />
    </>
  );
};
