import React from "react";
import "./shimmer-loader.scss";
type ShimmerLoaderProps = {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  containerStyle?: React.CSSProperties;
};

export const ShimmerLoader: React.FC<ShimmerLoaderProps> = ({
  width = "100%",
  height = "16px",
  borderRadius = "4px",
  containerStyle,
}) => {
  const style: React.CSSProperties = {
    width,
    height,
    borderRadius,
  };

  return (
    <div className="shimmer-loader" style={{ ...style, ...containerStyle }} />
  );
};
