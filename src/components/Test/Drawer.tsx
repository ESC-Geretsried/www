"use client";

import { chakra } from "@chakra-ui/react";
import * as dialog from "@zag-js/dialog";
import { useMachine, normalizeProps, Portal } from "@zag-js/react";
import { Navbar } from "../Navbar/Navbar";

export const Dialog = () => {
  const [state, send] = useMachine(dialog.machine({ id: "1" }));

  const api = dialog.connect(state, send, normalizeProps);

  const { hidden, ...conatinerProps } = api.containerProps;
  const { hidden: _, ...contentProps } = api.contentProps;

  return (
    <>
      <Navbar>
        <button {...api.triggerProps}>Open Dialog</button>
      </Navbar>
      <Portal>
        <div {...api.backdropProps} />
        <chakra.div
          {...conatinerProps}
          sx={{
            position: "absolute",
            top: "var(--navbar-height)",
            width: "100%",
            backgroundColor: "blue",
            transition: "transform 300ms",
            transform: api.isOpen ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <div {...contentProps}>
            <h2 {...api.titleProps}>Edit profile</h2>
            <p {...api.descriptionProps}>
              Make changes to your profile here. Click save when you are done.
            </p>
            <div>
              <input placeholder="Enter name..." />
              <button>Save</button>
            </div>
            <button {...api.closeTriggerProps}>Close</button>
          </div>
        </chakra.div>
      </Portal>
    </>
  );
};
