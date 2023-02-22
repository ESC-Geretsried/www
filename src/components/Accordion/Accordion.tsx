"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
import * as accordion from "@zag-js/accordion";
import { useMachine, normalizeProps } from "@zag-js/react";

type AccordionProps = {
  id: string;
  collapsible?: boolean;
  children: ReactNode;
  className?: string;
};

type AccordionContextType = {
  api: ReturnType<typeof accordion.connect>;
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

export const useAccordionContext = () => {
  const ctx = useContext(AccordionContext);

  if (!ctx) {
    throw new Error("AccordionContext was used outside its Provider");
  }

  return ctx;
};

export const Accordion: React.FC<AccordionProps> = ({
  id,
  collapsible,
  children,
  ...rest
}) => {
  const [state, send] = useMachine(accordion.machine({ id, collapsible }));

  const api = accordion.connect(state, send, normalizeProps);

  return (
    <AccordionContext.Provider value={{ api }}>
      <ul {...api.rootProps} {...rest}>
        {children}
      </ul>
    </AccordionContext.Provider>
  );
};

type AccordionItemContextType = {
  value: string;
};

const AccordionItemContext = createContext<
  AccordionItemContextType | undefined
>(undefined);

export const useAccordionItemContext = () => {
  const ctx = useContext(AccordionItemContext);

  if (!ctx) {
    throw new Error("AccordionContext was used outside its Provider");
  }

  return ctx;
};

export const AccordionItem: React.FC<{
  value: string;
  children: ReactNode;
}> = ({ value, children, ...rest }) => {
  const { api } = useAccordionContext();

  return (
    <AccordionItemContext.Provider value={{ value }}>
      <li {...api.getItemProps({ value })} {...rest}>
        {children}
      </li>
    </AccordionItemContext.Provider>
  );
};

export const AccordionTrigger: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({
  children,

  ...rest
}) => {
  const { api } = useAccordionContext();
  const { value } = useAccordionItemContext();

  return (
    <button {...api.getTriggerProps({ value })} type="button" {...rest}>
      {children}
    </button>
  );
};

export const AccordionContent: React.FC<
  { children: ReactNode; transitionDuration?: string } & Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "children"
  >
> = ({ children, transitionDuration = "250ms", ...rest }) => {
  const { api } = useAccordionContext();
  const { value } = useAccordionItemContext();

  const { hidden, ...contentProps } = api.getContentProps({
    value,
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      const rect = ref.current.getBoundingClientRect();

      ref.current.style.setProperty("--item-height", `${rect.height}px`);

      ref.current.style.height = "0px";
    }
  }, []);

  return (
    <div
      {...contentProps}
      {...rest}
      aria-hidden={hidden}
      ref={ref}
      style={{
        overflow: "hidden",
        willChange: "height",
        height: hidden ? "0px" : "var(--item-height)",
        visibility: hidden ? "hidden" : "visible",
        opacity: hidden ? 0 : 1,
        transition: `${
          hidden
            ? `visibility 0s linear ${transitionDuration}`
            : "visibility 0s linear 0s"
        }, opacity ${transitionDuration} ease-in-out, height ${transitionDuration} ease-in-out`,
      }}
    >
      {children}
    </div>
  );
};
