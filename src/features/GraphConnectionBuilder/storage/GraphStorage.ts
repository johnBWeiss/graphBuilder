import {
  EntityCategory,
  GraphEdge,
  GraphEntity,
  EntityID,
} from "../model/types";
import { IGraphStorage } from "./types";

export class GraphStorage implements IGraphStorage {
  private readonly _entitiesById = new Map<string, GraphEntity>();
  private readonly _entitiesByCategory = new Map<
    EntityCategory,
    GraphEntity[]
  >();
  private readonly _legalAdjacencyBySource = new Map<EntityID, Set<EntityID>>();

  constructor(
    entities: GraphEntity[],
    edges: GraphEdge[],
    options?: { bidirectional?: boolean },
  ) {
    this.buildEntities(entities);
    this.buildEdges(edges, options?.bidirectional ?? true);
  }

  private buildEntities(entities: GraphEntity[]) {
    this._entitiesById.clear();
    this._entitiesByCategory.clear();

    const uniqueEntities: GraphEntity[] = [];
    for (const entity of entities) {
      if (this._entitiesById.has(entity.id)) {
        console.warn(
          `[GraphStorage] Duplicate entity id '${entity.id}' detected in input. Overriding previous value.`,
        );
      } else {
        uniqueEntities.push(entity);
      }
      this._entitiesById.set(entity.id, entity); // Always keep the latest version
    }

    for (const entity of uniqueEntities) {
      const list = this._entitiesByCategory.get(entity.category) ?? [];

      if (list.length === 0 && !this._entitiesByCategory.has(entity.category)) {
        this._entitiesByCategory.set(entity.category, list);
      }

      list.push(entity);
    }
  }

  private addLegalEdgeBySource(source: EntityID, target: EntityID) {
    const legalAdjacencySet =
      this._legalAdjacencyBySource.get(source) ?? new Set<EntityID>();
    legalAdjacencySet.add(target);
    this._legalAdjacencyBySource.set(source, legalAdjacencySet);
  }

  private buildEdges(edges: GraphEdge[], bidirectional: boolean) {
    for (const { source, target } of edges) {
      this.addLegalEdgeBySource(source, target);
      if (bidirectional) this.addLegalEdgeBySource(target, source);
    }
  }

  public getEntityById(id: string): GraphEntity | undefined {
    return this._entitiesById.get(id);
  }

  public getEntitiesByCategory(category: EntityCategory): GraphEntity[] {
    return this._entitiesByCategory.get(category) ?? [];
  }

  public getLegalEdges(sourceId: EntityID): EntityID[] {
    return Array.from(this._legalAdjacencyBySource.get(sourceId) ?? []);
  }

  public getLegalEdgesGroupedByCategory(
    sourceId: EntityID,
  ): Map<EntityCategory, EntityID[]> {
    const targetIds =
      this._legalAdjacencyBySource.get(sourceId) ?? new Set<EntityID>();
    const categoryToIdsMap = new Map<EntityCategory, EntityID[]>();

    for (const targetId of targetIds) {
      const entity = this.getEntityById(targetId);

      if (entity?.category) {
        const category = entity.category;

        const currentIdList = categoryToIdsMap.get(category) ?? [];

        currentIdList.push(targetId);

        if (!categoryToIdsMap.has(category)) {
          categoryToIdsMap.set(category, currentIdList);
        }
      } else {
        console.warn(
          `Legal edge target ID '${targetId}' for source '${sourceId}' has no entity or category.`,
        );
      }
    }

    return categoryToIdsMap;
  }

  public getAllEntities(): GraphEntity[] {
    return Array.from(this._entitiesById.values());
  }

  public getEntitiesByCategoryMap(): Map<EntityCategory, GraphEntity[]> {
    return this._entitiesByCategory;
  }

  public getAllCategories(): EntityCategory[] {
    return Array.from(this._entitiesByCategory.keys());
  }
}
