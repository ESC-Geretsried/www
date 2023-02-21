import { PageRenderer } from "../../../components/PageRenderer";
import { getPage } from "../../../lib/getPage";

type PageProps = {
  params: { division: string; page: string };
  searchParams?: { [key: string]: string | Array<string> | undefined };
};

const getPageUriFromParams = (params: PageProps["params"]) => {
  return `${params.division}/${params.page}`;
};

const Page = async ({ params, searchParams }: PageProps) => {
  const page = await getPage(getPageUriFromParams(params));

  return <PageRenderer page={page} />;
};

export default Page;
