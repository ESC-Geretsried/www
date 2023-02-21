import { DuotoneFilter } from "../components/DuotoneFilter";
import { Layout, Main, Sidebar } from "../components/Layout/Layout";
import { Providers } from "../components/Providers";
import { Dialog } from "../components/Test/Drawer";
import "../theme/fonts";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="de">
      <head />
      <body>
        <DuotoneFilter />
        <Providers>
          <Layout>
            <Sidebar>
              {/* @ts-expect-error Server Component */}
              {/* <Menu /> */}
              <Dialog />
            </Sidebar>
            <Main>{children}</Main>
          </Layout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
