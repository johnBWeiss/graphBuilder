import React from "react";
import { classNameParserCore } from "../../coreFunctions/classNameParserCore/classNameParserCore";
import "./vertical-separator-core.scss";
// Define the props for the Separator component
interface SeparatorCoreProps {
  /**
   * Optional custom classes to apply to the separator.
   * Useful for changing height, color, or margins.
   */
  className?: string;
}

/**
 * A simple vertical divider component.
 * Uses a thin line (w-px) with a subtle gray color.
 */
export const VerticalSeparatorCore: React.FC<SeparatorCoreProps> = ({
  className = "",
}) => {
  return (
    <div
      className={classNameParserCore(
        "vertical-separator-core-container",
        className,
      )}
    />
  );
};
