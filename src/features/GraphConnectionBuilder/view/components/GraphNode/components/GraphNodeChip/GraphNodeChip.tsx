import React from "react";
import { BadgeCore } from "../../../../../../../core/coreComponents/BadgeCore/BadgeCore";
import { VerticalSeparatorCore } from "../../../../../../../core/coreComponents/VerticalSeparatorCore/VerticalSeparatorCore";
import { COLORS } from "../../../../../../../core/coreStyles/colors";
import { GraphNodeTheme } from "../../types";

interface GraphNodeChipProps {
  categoryLabel: string;
  fieldLabel: string;
  theme?: GraphNodeTheme;
}

export const GraphNodeChip: React.FC<GraphNodeChipProps> = ({
  categoryLabel,
  fieldLabel,
  theme,
}) => {
  const {
    keyBackgroundColor,
    keyTextColor,
    valueBackgroundColor,
    valueTextColor,
  } = theme || {};

  return (
    <div className="selected-graph-node-container">
      <div className={"graph-node-badge-content"}>
        <div className="flex badge-container">
          <BadgeCore
            text={categoryLabel}
            backgroundColor={keyBackgroundColor || "#F1F4FE"}
            fontSize={12}
            color={keyTextColor || COLORS["blue-12"]}
            badgeStyle={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
          />
          <VerticalSeparatorCore />
          <BadgeCore
            text={fieldLabel}
            backgroundColor={valueBackgroundColor || "#E3E8FC"}
            fontSize={12}
            fontWeight={"bold"}
            badgeStyle={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            color={valueTextColor || COLORS["blue-12"]}
          />
        </div>
      </div>
    </div>
  );
};
