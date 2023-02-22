import { DuotoneFilter } from "../components/DuotoneFilter";
import { Layout, Main, Sidebar } from "../components/Layout/Layout";
import { Menu } from "../components/Menu/Menu";
import "../theme/fonts";
import "../theme/global.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="de">
      <head />
      <body>
        <DuotoneFilter />
        <Layout>
          <Sidebar>
            {/* @ts-expect-error Server Component */}
            <Menu />
          </Sidebar>
          <Main>{children}</Main>
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
