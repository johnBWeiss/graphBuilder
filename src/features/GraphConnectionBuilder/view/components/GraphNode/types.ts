import { EntityCategory, EntityID } from "../../../model/types";

export type GraphNodeTheme = {
  keyBackgroundColor: string;
  keyTextColor: string;
  valueBackgroundColor: string;
  valueTextColor: string;
  dividerColor: string;
};

export type NodeInput = {
  id: string;
  label: string;
};

export type FlatCurrentNodeSelectedOptions = {
  categoryId: EntityCategory;
  entityId: EntityID;
}[];

export type CategoryOptions = {
  id: EntityCategory;
  label: string;
  category: EntityCategory;
};
