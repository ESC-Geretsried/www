"use client";

import * as dialog from "@zag-js/dialog";
import { useMachine, normalizeProps, Portal } from "@zag-js/react";
import { createContext, ReactNode, useContext, useId } from "react";
import { Navbar } from "../Navbar/Navbar";

type DrawerContextType = {
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

export const Drawer: React.FC<{
  children: ReactNode;
  transitionDuration?: string;
}> = ({ children, transitionDuration = "200ms" }) => {
  const [state, send] = useMachine(dialog.machine({ id: useId() }));

  const api = dialog.connect(state, send, normalizeProps);

  return (
    <DrawerContext.Provider value={{ api, transitionDuration }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const DrawerTrigger: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { api } = useDrawerContext();

  return (
    <button
      {...api.triggerProps}
      type="button"
      className={`p-2 pointer-events-auto ${className ? className : ""}`}
    >
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
