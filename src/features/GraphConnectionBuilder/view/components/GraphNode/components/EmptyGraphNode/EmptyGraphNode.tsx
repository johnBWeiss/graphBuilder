// --- Empty State Component ---

import { GraphNodeTheme } from "../../types";
import { TextCore } from "../../../../../../../core/coreComponents/TextCore/TextCore";

interface EmptyGraphNodeProps {
  onClick: () => void;
  theme?: GraphNodeTheme;
}

export const EmptyGraphNode: React.FC<EmptyGraphNodeProps> = ({ onClick }) => (
  <div className="selected-graph-node-container p-top-bottom-3">
    <div className={"graph-node-badge-content is-empty"} onClick={onClick}>
      <div className="flex gap-8 align-center">
        <TextCore text={"Data source"} />
      </div>
    </div>
  </div>
);
