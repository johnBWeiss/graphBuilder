import { GraphStorage } from "../storage/GraphStorage";
import {
  GraphEdge,
  GraphEntity,
  EntityCategory,
  FlowPathState,
  PathNodeType,
  EntityID,
  IGraphDataModel,
} from "./types";
import {
  deepCloneObject,
  generateRandomId,
} from "../view/utils/utilityFunctions";

export class GraphDataModel implements IGraphDataModel {
  private entities: GraphEntity[] = [];
  private edges: GraphEdge[] = [];
  private storage: GraphStorage | null = null;

  private getEntitiesInNode(node: PathNodeType | undefined): EntityID[] {
    if (!node || !node.selectedFieldsByCategory) {
      return [];
    }

    return Object.values(node.selectedFieldsByCategory).flat();
  }

  private getUnusedSelectedEntitiesSetExcludingCurrent(
    flowState: FlowPathState,
    nodeIndex: number,
    selectedEntitiesSet: Set<EntityID>,
  ): Set<EntityID> {
    const currentNode = flowState[nodeIndex];
    const entitiesToExclude = this.getEntitiesInNode(currentNode);
    const selectedEntitiesSetExcludingCurrent = new Set(selectedEntitiesSet);

    entitiesToExclude.forEach((id) =>
      selectedEntitiesSetExcludingCurrent.delete(id),
    );

    return selectedEntitiesSetExcludingCurrent;
  }

  public setEntitiesAndEdgesWithIndexes(
    newEntities: GraphEntity[],
    newEdges: GraphEdge[],
  ): void {
    this.entities = newEntities;
    this.edges = newEdges;

    this.storage = new GraphStorage(newEntities, newEdges, {
      bidirectional: true,
    });
  }

  public addNode(
    edgeNodeIndex: number,
    _selectedFieldIds: string[],
    oldFlow: FlowPathState,
  ): FlowPathState {
    const newNodeId = generateRandomId();

    const newNodeData: PathNodeType = {
      id: newNodeId,
      selectedFieldsByCategory: undefined,
    };

    const newFlow: FlowPathState = [
      ...oldFlow.slice(0, edgeNodeIndex + 1),
      newNodeData,
      ...oldFlow.slice(edgeNodeIndex + 1),
    ];

    return newFlow;
  }

  public editNode(
    newNode: PathNodeType,
    oldFlow: FlowPathState,
  ): FlowPathState {
    const targetId = newNode.id;

    const newFlow: FlowPathState = oldFlow.map((node) => {
      if (node.id === targetId) {
        return newNode;
      }
      return node;
    });

    return newFlow;
  }

  public deleteNode(
    nodeIdToDelete: string,
    oldFlow: FlowPathState,
  ): FlowPathState {
    const indexToDelete = oldFlow.findIndex(
      (node) => node.id === nodeIdToDelete,
    );

    if (indexToDelete === -1) {
      return oldFlow;
    }
    if (indexToDelete === 0) {
      return [];
    }

    const newFlow: FlowPathState = oldFlow.slice(0, indexToDelete);

    return newFlow;
  }

  public buildSelectedEntitiesSet(flowState: FlowPathState): Set<EntityID> {
    const selectedEntitiesSet = new Set<EntityID>();
    for (const node of flowState) {
      const entitiesInNode = this.getEntitiesInNode(node);
      entitiesInNode.forEach((entity) => selectedEntitiesSet.add(entity));
    }

    return selectedEntitiesSet;
  }

  public getEntityById(id: EntityID | undefined): GraphEntity | undefined {
    if (!id || !this.storage) return undefined;
    return this.storage.getEntityById(id);
  }

  public getCategoryKeys(): EntityCategory[] {
    return this.storage?.getAllCategories().map((category) => category) || [];
  }

  public getLegalUnusedCategoriesForNewNode(
    flowState: FlowPathState,
    nodeIndex: number,
    selectedEntitiesSet: Set<EntityID>,
  ): EntityCategory[] {
    if (nodeIndex === 0) {
      return this.getCategoryKeys() || [];
    }

    const precedingNode = flowState[nodeIndex - 1];
    if (!precedingNode) {
      return [];
    }

    const precedingSelectedFieldId = Object.values(
      precedingNode?.selectedFieldsByCategory || {},
    )?.[0]?.[0];

    if (!precedingSelectedFieldId) {
      return [];
    }

    const selectedEntitiesExcludingCurrent =
      this.getUnusedSelectedEntitiesSetExcludingCurrent(
        flowState,
        nodeIndex,
        selectedEntitiesSet,
      );

    // Get legally connected entities grouped by category from storage
    const legalNextCategoryMap = this.storage?.getLegalEdgesGroupedByCategory(
      precedingSelectedFieldId,
    );
    if (!legalNextCategoryMap) {
      return [];
    }

    const legalCategories: EntityCategory[] = [];

    for (const [category, legalEntityIds] of legalNextCategoryMap.entries()) {
      const hasUnusedOption = legalEntityIds.some(
        (entityId) => !selectedEntitiesExcludingCurrent.has(entityId),
      );

      if (hasUnusedOption) {
        legalCategories.push(category);
      }
    }

    return legalCategories;
  }

  public getLegalEntityOptionsByCategory(
    precedingFieldId: EntityID,
    selectedCategory: EntityCategory,
    flowState: FlowPathState | null | undefined,
    nodeIndex: number,
    selectedEntitiesSet: Set<EntityID>,
    getEntityLabelCallback: (id: EntityID | undefined) => string,
  ): GraphEntity[] {
    if (!this.storage || !flowState) {
      console.error("Storage or flowState not initialized.");
      return [];
    }

    const legalNextCategoryMap: Map<EntityCategory, EntityID[]> =
      this.storage.getLegalEdgesGroupedByCategory(precedingFieldId);
    const legalEntityIds: EntityID[] =
      legalNextCategoryMap.get(selectedCategory) ?? [];

    if (legalEntityIds.length === 0) {
      return [];
    }

    const selectedEntitiesExcludingCurrent: Set<EntityID> =
      this.getUnusedSelectedEntitiesSetExcludingCurrent(
        flowState,
        nodeIndex,
        selectedEntitiesSet,
      );

    const filteredEntities: GraphEntity[] = [];

    for (const id of legalEntityIds) {
      const entity = this.getEntityById(id);

      if (entity && !selectedEntitiesExcludingCurrent?.has(entity.id)) {
        filteredEntities.push({
          id: entity.id,
          label: getEntityLabelCallback(entity.id),
          category: entity.category,
        });
      }
    }

    return filteredEntities;
  }

  public getRawEntitiesByCategory(
    category: EntityCategory | undefined,
  ): GraphEntity[] {
    if (!category) return [];
    return this.storage?.getEntitiesByCategory(category) || [];
  }

  public hasLegalUnusedNextEdges(
    sourceId: EntityID,
    flowState: FlowPathState | null | undefined,
    nodeIndex: number,
    selectedEntitiesSet: Set<EntityID>,
  ): boolean {
    if (!this.storage || !flowState) {
      return false;
    }

    const legalTargetIds: EntityID[] = this.storage.getLegalEdges(sourceId); // Get all connectable IDs

    if (legalTargetIds.length === 0) {
      return false;
    }

    const selectedEntitiesExcludingCurrent: Set<EntityID> =
      this.getUnusedSelectedEntitiesSetExcludingCurrent(
        flowState,
        nodeIndex,
        selectedEntitiesSet,
      );

    return legalTargetIds.some((targetId: EntityID) => {
      const entity = this.getEntityById(targetId);
      return !!entity && !selectedEntitiesExcludingCurrent?.has(targetId);
    });
  }
}
