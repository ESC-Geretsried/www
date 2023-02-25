import { Home } from "../components/templates/Home/Home";
import { getMetaData } from "../lib/getMetaData";

const Page = async () => {
  return <Home />;
};

export const generateMetadata = async ({ params }: any) => {
  return getMetaData(params);
};

export default Page;
