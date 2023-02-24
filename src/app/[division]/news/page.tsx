type PageProps = {
  params: { division: string; page: string };
  searchParams?: { [key: string]: string | Array<string> | undefined };
};

const Page = async ({ params, searchParams }: PageProps) => {
  return <div>test news</div>;
};

export default Page;
