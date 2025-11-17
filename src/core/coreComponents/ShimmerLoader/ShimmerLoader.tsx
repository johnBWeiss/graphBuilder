import React from "react";
import "./shimmer-loader.scss";
type ShimmerLoaderProps = {
  width?: string;
  height?: string;
  borderRadius?: string;
  containerStyle?: React.CSSProperties;
};

export const ShimmerLoader: React.FC<ShimmerLoaderProps> = ({
  width = "240px",
  height = "28px",
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
