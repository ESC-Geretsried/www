import { getMenus } from "../../lib/getMenus";
import { DesktopMenu } from "./DesktopMenu";
import { MenuList } from "./MenuList";
import { MobileMenu } from "./MobileMenu";

export const Menu = async () => {
  const menus = await getMenus();

  if (!menus?.main) {
    return null;
  }

  return (
    <>
      <MobileMenu>
        <MenuList menu={menus.main} />
      </MobileMenu>
      <DesktopMenu>{/* <MenuList menu={menus.main} /> */}</DesktopMenu>
    </>
  );
};
