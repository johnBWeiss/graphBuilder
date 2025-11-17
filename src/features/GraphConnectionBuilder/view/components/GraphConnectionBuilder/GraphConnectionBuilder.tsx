import React, { useCallback, useContext } from "react";

import "./graph-connection-builder.scss";
import { GraphNode } from "../GraphNode/GraphNode";
import { FlowContext } from "../../contexts/FlowContext";
import { ShimmerLoader } from "../../../../../core/coreComponents/ShimmerLoader/ShimmerLoader";
import { FlowPathState } from "../../../model/types";

interface GraphConnectionBuilderProps {
  isLoading: boolean;
}

export const GraphConnectionBuilder: React.FC<GraphConnectionBuilderProps> = ({
  isLoading,
}) => {
  const flowContext = useContext(FlowContext);
  const { flowState, setFlowState, setSelectedEntitiesSet } = flowContext || {};

  const handleNodeChange = useCallback(
    (newFlow: FlowPathState) => {
      setFlowState?.(newFlow);
    },
    [setFlowState],
  );
  return (
    <div className="flex justify-center align-center height-100vh">
      <div className="graph-connection-container">
        {isLoading ? (
          <ShimmerLoader />
        ) : (
          flowState?.map((graphNodeData, index) => (
            <GraphNode
              key={graphNodeData.id}
              onChange={handleNodeChange}
              nodeIndex={index}
              graphNodeData={graphNodeData}
            />
          ))
        )}
      </div>
    </div>
  );
};
