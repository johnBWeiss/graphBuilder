import { GraphEntity, GraphEdge, IGraphDataModel } from "../model/types";
import { getGraphEdges, getGraphNodes } from "../../../serverApi/GraphRequests";
import { GraphDataModel } from "../model/GraphDataModel";
import { IGraphController } from "./types";

export class GraphController implements IGraphController {
  private dataModel: IGraphDataModel;

  constructor(dataModel: IGraphDataModel) {
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
    } else {
      console.error("Failed to load graph data.");
    }

    this.dataModel.setEntitiesAndEdgesWithIndexes(rawNodes, rawEdges);
  }

  public getModel(): IGraphDataModel {
    return this.dataModel;
  }
}

const graphDataModel: IGraphDataModel = new GraphDataModel();

export const graphController: IGraphController = new GraphController(
  graphDataModel,
);

export const graphQueries: IGraphDataModel = graphDataModel;
