import { classNameParserCore } from "../../coreFunctions/classNameParserCore/classNameParserCore";
import "./icon-core.scss";
interface IconCoreProps {
  src: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
  containerStyle?: React.CSSProperties;
}

export const IconCore: React.FC<IconCoreProps> = ({
  src,
  className = "",
  width = 11,
  height = 12,
  onClick,
  containerStyle = {},
}) => {
  return (
    <div
      className={classNameParserCore("icon-core-container", className)}
      style={{ ...containerStyle }}
      onClick={onClick}
    >
      <img src={src} alt="Icon" width={width} height={height} />
    </div>
  );
};
