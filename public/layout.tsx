<html lang="de"><head><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff"></head><body>import { DuotoneFilter } from "../components/DuotoneFilter";
import { Menu } from "../components/Menu/Menu";
import { getMenus } from "../lib/getMenus";
import "../theme/global.css";
const RootLayout = async ({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) =&gt; {
  const menus = await getMenus();
  return (
      {/* eslint-disable-next-line react/self-closing-comp */}
        <duotonefilter>
        <div classname="max-w-[900px] mx-auto flex">
          <aside>{menus?.main &amp;&amp; <menu menu="{menus.main}">}</menu></aside>
          <main>{children}</main>
        </div>
  );
};
export default RootLayout;
</duotonefilter></body></html>