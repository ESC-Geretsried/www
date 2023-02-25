import { DuotoneFilter } from "../components/DuotoneFilter";
import { Footer, Layout, Main, Sidebar } from "../components/Layout/Layout";
import { Menu } from "../components/Menu/Menu";
import "../theme/fonts";
import "../theme/global.css";
import "@total-typescript/ts-reset";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="de">
      <head />
      <body>
        <a
          className="absolute left-) top-0 w-full text-center h-navbar p-2 -translate-y-full focus:translate-y-0 z-20 bg-blue"
          href="#main"
        >
          Navigation überspringen
        </a>
        <DuotoneFilter />
        <Layout>
          <Sidebar>
            {/* @ts-expect-error Server Component */}
            <Menu />
          </Sidebar>
          <Main>{children}</Main>
          {/* @ts-expect-error Server Component */}
          <Footer />
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata = {
  title: {
    default: "ESC Geretsried",
    template: "%s | ESC Geretsried",
  },
};
