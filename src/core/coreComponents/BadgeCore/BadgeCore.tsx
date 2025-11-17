import { TextCore, TextCoreProps } from "../TextCore/TextCore";
import { classNameParserCore } from "../../coreFunctions/classNameParserCore/classNameParserCore";

export type BadgeCoreProps = TextCoreProps & {
  /** The content to display inside the badge. Uses TextCore's props. */
  text: string;
  /** Background color of the badge container */
  backgroundColor?: string;
  /** Padding inside the badge container (e.g., "4px 8px") */
  padding?: string;
  /** Border radius for the badge (e.g., "10px", "50%") */
  borderRadius?: string;
  /** Optional style object for the badge container (overrides others) */
  badgeStyle?: React.CSSProperties;
  /** Optional class name for the badge container */
  badgeClassName?: string;
};

/**
 * A reusable badge component that uses TextCore for consistent text styling.
 * @param {BadgeCoreProps} props - Props for the badge, including text content and container styles.
 */
export const BadgeCore: React.FC<BadgeCoreProps> = ({
  text,
  backgroundColor = "#f0f0f0", // Default light gray background
  padding = "4px 8px", // Default padding
  borderRadius = "4px", // Default rounded corners
  badgeStyle = {},
  badgeClassName,
  // Spread the rest of the props, which are TextCoreProps
  ...textCoreProps
}) => {
  const badgeContainerStyle: React.CSSProperties = {
    backgroundColor,
    padding,
    borderRadius,
    display: "inline-flex", // Use inline-flex for a compact container
    alignItems: "center", // Vertically center the text
    justifyContent: "center", // Horizontally center the text
    ...badgeStyle, // Allow overriding styles with badgeStyle prop
  };

  // Extract className from textCoreProps to use for TextCore
  const { className: textClassName, ...restOfTextCoreProps } = textCoreProps;

  return (
    <div
      className={classNameParserCore(badgeClassName)}
      style={badgeContainerStyle}
    >
      <TextCore
        text={text}
        className={textClassName}
        {...restOfTextCoreProps}
      />
    </div>
  );
};
