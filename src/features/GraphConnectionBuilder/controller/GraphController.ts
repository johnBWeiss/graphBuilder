import { GraphEntity, GraphEdge } from "../model/types";
import { getGraphEdges, getGraphNodes } from "../../../serverApi/GraphRequests";
import { GraphDataModel } from "../model/GraphDataModel";

export class GraphController {
  private dataModel: GraphDataModel;

  constructor(dataModel: GraphDataModel) {
    this.dataModel = dataModel;
  }

  public async loadGraphData(): Promise<void> {
    const [nodesPromise, edgesPromise] = await Promise.allSettled([
      getGraphNodes(),
      getGraphEdges(),
    ]);

    let rawNodes: GraphEntity[] = [];
    let rawEdges: GraphEdge[] = [];

    if (
      nodesPromise.status === "fulfilled" &&
      edgesPromise.status === "fulfilled"
    ) {
      rawNodes = nodesPromise.value.nodes;
      rawEdges = edgesPromise.value.edges;
    }

    this.dataModel.buildAndSetIndexedEntitiesAndEdges(rawNodes, rawEdges);
  }

  public getModel(): GraphDataModel {
    return this.dataModel;
  }
}

const graphDataModel = new GraphDataModel();

export const graphController = new GraphController(graphDataModel);

export const graphQueries = graphDataModel;
