import React, { useEffect, useContext } from "react";

import { graphQueries } from "../controller/GraphController";
import "./graph-connection-builder.scss";
import { GraphNode } from "./components/GraphNode/GraphNode";
import { FlowContext } from "./contexts/FlowContext";
import { ShimmerLoader } from "../../../core/coreComponents/ShimmerLoader/ShimmerLoader";

interface GraphConnectionBuilderProps {
  isLoading: boolean;
}

export const GraphConnectionBuilder: React.FC<GraphConnectionBuilderProps> = ({
  isLoading,
}) => {
  const flowContext = useContext(FlowContext);
  const { flowState, setFlowState, setSelectedEntitiesSet } = flowContext || {};

  // todo yonatan check if still need this
  // useEffect(() => {
  //   const updatedSelectedEntitySet =
  //     graphQueries.buildSelectedEntitiesSet(flowState);
  //   setSelectedEntitiesSet(updatedSelectedEntitySet);
  // }, [flowState]);

  return (
    <div className="flex justify-center align-center height-100vh">
      <div className="graph-connection-container">
        {isLoading ? (
          <ShimmerLoader />
        ) : (
          flowState?.map((graphNodeData, index) => (
            <GraphNode
              key={graphNodeData.id}
              onChange={(newFlow) => setFlowState?.(newFlow)}
              nodeIndex={index}
              graphNodeData={graphNodeData}
            />
          ))
        )}
      </div>
    </div>
  );
};
