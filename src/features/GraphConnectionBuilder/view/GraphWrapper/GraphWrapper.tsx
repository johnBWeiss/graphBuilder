import { FlowProvider } from "../contexts/FlowContext";
import { FlowPathState } from "../../model/types";
import { GraphConnectionBuilder } from "../GraphConnectionBuilder";
import { useEffect, useState } from "react";
import { graphController } from "../../controller/GraphController";
import { ROOT_GRAPH_ID } from "../../model/constants";

export const GraphWrapper: React.FC = () => {
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [initialFlowState, setInitialFlowState] = useState<FlowPathState>([]);

  useEffect(() => {
    setIsDataLoading(true);
    const loadData = async () => {
      try {
        await graphController.loadGraphData();
        setInitialFlowState([
          {
            id: ROOT_GRAPH_ID,
            selectedFieldsByCategory: undefined,
          },
        ]);
      } catch (error) {
        console.error("Failed to load graph data:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <FlowProvider initialState={initialFlowState}>
      <GraphConnectionBuilder isLoading={isDataLoading} />
    </FlowProvider>
  );
};
