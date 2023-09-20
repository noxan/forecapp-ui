import React, {
  CSSProperties,
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { CNavGroup } from "@coreui/react";

export interface ClickableNavGroupProps {
  children?: ReactNode;
  /**
   * A string of all className you want applied to the component.
   */
  className?: string;
  /**
   * Make nav group more compact by cutting all `padding` in half.
   */
  compact?: boolean;
  /**
   * Set group toggler label.
   */
  toggler?: string | ReactNode;
  /**
   * Show nav group items.
   */
  visible?: boolean;
  /**
   * @ignore
   */
  idx?: string;

  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const ClickableSidebarNavGroup = ({
  children,
  className,
  compact,
  idx,
  toggler,
  visible,
  onClick,
}: ClickableNavGroupProps) => {
  const liRef = useRef(null);
  return (
    <CNavGroup
      onClick={(event) => {
        if (
          event.target instanceof Element &&
          event.target.className.split(" ")[1] === "nav-group-toggle"
        ) {
          onClick(event);
        }
      }}
      className={className}
      compact={compact}
      toggler={toggler}
      visible={visible}
      idx={idx}
      ref={liRef}
    >
      {children}
    </CNavGroup>
  );
};
