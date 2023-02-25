import React, { ReactNode } from "react";
import { HeadingLevelBoundary, Hx } from "../../Heading/Heading";
import { BlogPreview } from "./BlogPreview";
import { Calendar } from "./Calendar";
import { FlashPosts } from "./FlashPosts";
import { SponsorPreview } from "./SponsorPreview";

type HomeProps = {
  children?: ReactNode;
};

export const Home: React.FC<HomeProps> = ({ children, ...rest }) => {
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <FlashPosts />
      <div className="flex justify-center py-16">
        <Hx className="block border-y-4 py-4 text-5xl uppercase text-center">
          ESC River Rats Geretsried
        </Hx>
      </div>
      <HeadingLevelBoundary>
        <div className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-2">
          {/* @ts-expect-error Server Component */}
          <BlogPreview />
          {/* @ts-expect-error Server Component */}
          <Calendar />
        </div>
        <SponsorPreview />
      </HeadingLevelBoundary>
    </div>
  );
};
