import { TemplateRenderer } from "../../components/TemplateRenderer";
import { getPage } from "../../lib/getPage/getPage";
import { getPagePaths } from "../../lib/getPaths";

export { generateMetadata } from "../page";

type PageProps = {
  params: { division: string };
  searchParams?: { [key: string]: string | Array<string> | undefined };
};

const Page = async ({ params }: PageProps) => {
  const page = await getPage(params.division);

  return <TemplateRenderer page={page} />;
};

export default Page;

export const generateStaticParams = async () => {
  const paths = await getPagePaths();

  return paths.rootPaths;
};
