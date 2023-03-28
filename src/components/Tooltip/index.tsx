import { flip, offset, Placement } from "@floating-ui/core";
import { shift, useFloating } from "@floating-ui/react-dom";
import clsx from "clsx";
import React, { useState } from "react";

type TooltipProps = {
  text: string;
  children: React.ReactNode;
  position?: Placement;
};

export const WithTooltip = ({ text, children, position = "top" }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);
  const { x, y, reference, floating, strategy } = useFloating({
    placement: position,
    middleware: [shift(), flip(), offset(10)],
    strategy: "fixed",
  });

  return (
    <>
      {React.cloneElement(children as React.ReactElement, {
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
        ref: reference,
      })}

      <div
        ref={floating}
        className={clsx(
          "rounded-md bg-slate-100 py-0.5 px-2 text-sm text-black dark:bg-gray-700 dark:text-white",
          isOpen && "animate-intro-fade-scale",
          isOpen === false && "animate-outro-fade-scale",
          isOpen === undefined && "opacity-0"
        )}
        style={{
          position: strategy,
          top: y ?? "",
          left: x ?? "",
        }}
      >
        {text}
      </div>
    </>
  );
};
