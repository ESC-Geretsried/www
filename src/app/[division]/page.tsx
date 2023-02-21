import { PageRenderer } from "../../components/PageRenderer";
import { getPage } from "../../lib/getPage";

type PageProps = {
  params: { division: string };
  searchParams?: { [key: string]: string | Array<string> | undefined };
};

const Page = async ({ params }: PageProps) => {
  const page = await getPage(params.division);

  return <PageRenderer page={page} />;
};

export default Page;
