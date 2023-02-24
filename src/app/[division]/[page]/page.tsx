import { TemplateRenderer } from "../../../components/TemplateRenderer";
import { getPage, getPageUriFromParams } from "../../../lib/getPage/getPage";
import { getPagePaths } from "../../../lib/getPaths";

type PageProps = {
  params: { division: string; page: string };
  searchParams?: { [key: string]: string | Array<string> | undefined };
};

const Page = async ({ params, searchParams }: PageProps) => {
  const page = await getPage(getPageUriFromParams(params));

  return <TemplateRenderer page={page} />;
};

export default Page;

export const generateStaticParams = async () => {
  const paths = await getPagePaths();

  return paths.nestedPaths;
};
