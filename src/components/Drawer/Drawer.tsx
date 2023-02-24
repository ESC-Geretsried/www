"use client";

import * as dialog from "@zag-js/dialog";
import { useMachine, normalizeProps, Portal } from "@zag-js/react";
import React from "react";
import { createContext, ReactNode, useContext, useId } from "react";
import { Navbar } from "../Navbar/Navbar";

export type DrawerContextType = {
  api: ReturnType<typeof dialog.connect>;
  transitionDuration: string;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawerContext = () => {
  const ctx = useContext(DrawerContext);

  if (!ctx) {
    throw new Error("Drawer Context was used outside its Provider");
  }

  return ctx;
};

// NOTE: the menu is mobile in a drawer but not on desktop. thats why we need the context sometimes but not always
export const useDrawerOptionalContext = () => {
  const ctx = useContext(DrawerContext);

  return ctx;
};

export const Drawer: React.FC<{
  children: ReactNode;
  transitionDuration?: string;
  className?: string;
}> = ({ children, className, transitionDuration = "200ms" }) => {
  const [state, send] = useMachine(dialog.machine({ id: useId() }));

  const api = dialog.connect(state, send, normalizeProps);

  return (
    <DrawerContext.Provider value={{ api, transitionDuration }}>
      <div className={className}>{children}</div>
    </DrawerContext.Provider>
  );
};

export const DrawerTrigger: React.FC<{
  children: ReactNode;
  className?: string;
  as?: ReactNode;
}> = ({ children, as, className, ...rest }) => {
  const { api } = useDrawerContext();

  if (React.isValidElement(as)) {
    return React.cloneElement(
      as,
      // @ts-expect-error weird...
      { className, ...rest, ...api.triggerProps },
      children
    );
  }

  return (
    <button className={className} type="button" {...rest}>
      {children}
    </button>
  );
};

export const DrawerContainer: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { api } = useDrawerContext();
  const { hidden: containerHidden, ...containerProps } = api.containerProps;

  return (
    <div
      {...containerProps}
      className={`fixed top-0 w-full h-screen ${className ? className : ""}`}
    >
      {children}
    </div>
  );
};

export const DrawerContent: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { api, transitionDuration } = useDrawerContext();
  const { hidden, ...contentProps } = api.contentProps;

  return (
    <div
      {...contentProps}
      className={className}
      style={{
        height: "100vh",
        visibility: hidden ? "hidden" : "visible",
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateX(-100%)" : "translateX(0)",
        transition: `${
          hidden
            ? `visibility 0s linear ${transitionDuration}`
            : "visibility 0s linear 0s"
        }, opacity ${transitionDuration} ease-in-out, transform ${transitionDuration} ease-in-out`,
      }}
    >
      {children}
    </div>
  );
};
