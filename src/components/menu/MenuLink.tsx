import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import {
  useAccordionContext,
  useAccordionItemContext,
} from "../Accordion/Accordion";
import { useDrawerOptionalContext } from "../Drawer/Drawer";

const useMenuLinkProps = () => {
  const { api: accordionApi } = useAccordionContext();
  const { value } = useAccordionItemContext();
  const menuContext = useDrawerOptionalContext();

  const { onClick: onClose, ...props } = accordionApi.getTriggerProps({
    value,
  });

  delete props["aria-expanded"];
  delete props.type;
  delete props.id;

  return {
    onClick: () => {
      menuContext?.api.close();
      onClose();
    },
    ...props,
  };
};

export const MenuLink: React.FC<
  { children: ReactNode; className?: string } & LinkProps
> = ({ href, children, className, ...rest }) => {
  const props = useMenuLinkProps();

  if (href.toString().includes("wp-content")) {
    return (
      <a
        href={`${process.env.NEXT_PUBLIC_BACKEND_URL}${href}`}
        download
        className={classNames(
          "inline-block w-full no-underline hover:underline",
          className
        )}
        {...props}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={classNames(
        "inline-block w-full no-underline hover:underline",
        className
      )}
      {...props}
      {...rest}
    >
      {children}
    </Link>
  );
};
