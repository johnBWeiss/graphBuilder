import { EntityCategory, GraphEntity, EntityID } from "../model/types";

export interface IGraphStorage {
  getEntityById(id: string): GraphEntity | undefined;

  getEntitiesByCategory(category: EntityCategory): GraphEntity[];

  getAllEntities(): GraphEntity[];

  getAllCategories(): EntityCategory[];

  getLegalEdges(sourceId: EntityID): EntityID[];

  getLegalEdgesGroupedByCategory(
    sourceId: EntityID,
  ): Map<EntityCategory, EntityID[]>;

  getEntitiesByCategoryMap(): Map<EntityCategory, GraphEntity[]>;
}
