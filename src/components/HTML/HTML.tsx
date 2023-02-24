import parse, { Element, domToReact } from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { env } from "../../lib/env";

type HTMLProps = {
  children?: string | null;
};
const isElement = (domNode: any): domNode is Element => {
  if (domNode.type === "tag" && domNode.attribs) {
    return true;
  }

  return false;
};

export const HTML: React.FC<HTMLProps> = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <>
      {parse(children, {
        replace: (domNode) => {
          if (isElement(domNode) && domNode.name === "a") {
            if (domNode.attribs.href.startsWith(env.NEXT_PUBLIC_BACKEND_URL)) {
              const isWPContent = domNode.attribs.href.includes("wp-content");

              if (isWPContent) {
                return (
                  <a href={domNode.attribs.href} download>
                    {domToReact(domNode.children)}
                  </a>
                );
              }

              const href = domNode.attribs.href.replace(
                env.NEXT_PUBLIC_BACKEND_URL,
                ""
              );

              return <Link href={href}>{domToReact(domNode.children)}</Link>;
            }
          }
          if (isElement(domNode) && domNode.name === "img") {
            return (
              <Image
                alt={domNode.attribs.alt}
                src={domNode.attribs.src}
                width={parseInt(domNode.attribs.width)}
                height={parseInt(domNode.attribs.height)}
              />
            );
          }

          return domNode;
        },
      })}
    </>
  );
};
