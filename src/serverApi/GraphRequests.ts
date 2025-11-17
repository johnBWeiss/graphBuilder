import { GRAPH_EDGES } from "../data/GraphBuilder/GraphEdges";
import { GRAPH_NODES } from "../data/GraphBuilder/GraphNodes";

export const getGraphNodes = (): Promise<typeof GRAPH_NODES> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(GRAPH_NODES);
    }, 1000);
  });
};

export const getGraphEdges = (): Promise<typeof GRAPH_EDGES> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(GRAPH_EDGES);
    }, 1000);
  });
};
