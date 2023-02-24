import Link from "next/link";
import Image from "next/image";
import { getMenus } from "../../lib/getMenus";
import { DesktopMenu } from "./DesktopMenu";
import { MenuList } from "./MenuList";
import { MobileMenu } from "./MobileMenu";
import logo from "../../../public/logo_small.svg";

export const Menu = async () => {
  const menus = await getMenus();

  if (!menus?.main) {
    return null;
  }

  return (
    <>
      <MobileMenu>
        <MenuList menu={menus.main} id="mobile-menu" />
      </MobileMenu>
      <DesktopMenu>
        <Link href="/" className="py-2 hover:opacity-100">
          <Image alt="Logo vom ESC Geretsried" src={logo} />
        </Link>
        <MenuList menu={menus.main} id="desktop-menu" />
      </DesktopMenu>
    </>
  );
};
