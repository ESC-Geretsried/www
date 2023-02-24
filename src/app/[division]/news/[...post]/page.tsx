type PageProps = {
  params: { division: string; page: string };
  searchParams?: { [key: string]: string | Array<string> | undefined };
};

const Post = async ({ params, searchParams }: PageProps) => {
  console.log("post", params);

  return <div>post</div>;
};

export default Post;
