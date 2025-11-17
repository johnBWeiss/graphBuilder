import { IGraphDataModel } from "../model/types";

export interface IGraphController {
  loadGraphData(): Promise<void>;
  getModel(): IGraphDataModel; // Or IGraphDataModel, if you update this class
}
