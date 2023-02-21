import { useEffect, useRef } from "react";

type Config = { addPropToRoot: boolean; propName?: string };

export const useContainerHeight = <Ref extends HTMLDivElement>({
  addPropToRoot,
  propName = "--content-height",
}: Config) => {
  const ref = useRef<Ref>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";

      const rect = ref.current.getBoundingClientRect();
      const value = `${rect.height}px`;

      if (addPropToRoot) {
        document.documentElement.style.setProperty(propName, value);
      } else {
        ref.current.style.setProperty(propName, value);
      }
      ref.current.style.height = "";
    }
  });

  return ref;
};
