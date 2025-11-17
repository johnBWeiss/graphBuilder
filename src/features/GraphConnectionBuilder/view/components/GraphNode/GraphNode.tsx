// import {
//   FlowPathState,
//   PathNodeType,
//   EntityCategory,
//   EntityID,
// } from "../../../model/types";
// import React, {
//   useContext,
//   useMemo,
//   useState,
//   useCallback,
//   useRef,
//   useEffect,
// } from "react";
// import "./graph-node.scss";
// import PLUS_CIRCLE from "./../../../../../assets/icons/plus_circle_icon.png";
// import GRAP_ARROW_RIGHT from "./../../../../../assets/images/graph_arrow_right.png";
// import { IconCore } from "../../../../../core/coreComponents/IconCore/IconCore";
// import { COLORS } from "../../../../../core/coreStyles/colors";
// import {
//   GraphNodeChip,
//   EmptyGraphNodeChip,
// } from "./components/GraphNodeChip/GraphNodeChip";
// import { TextCore } from "../../../../../core/coreComponents/TextCore/TextCore";
// import { GraphNodeTheme } from "./types";
// import { graphQueries } from "../../../controller/GraphController";
// import { FlowContext } from "../../contexts/FlowContext";
// import Tippy from "@tippyjs/react";
// import { CategoryFieldsDropdownCore } from "../../../../../core/coreComponents/DropdownCore/KeyValueDropdownCore/CategoryFieldsDropdownCore";
// import {
//   getCategoryLabel,
//   getEntityLabel,
// } from "../../utils/idToLabelTranslator";
// import X_ICON from "../../../../../assets/icons/x_icon.png";
// import { VerticalSeparatorCore } from "../../../../../core/coreComponents/VerticalSeparatorCore/VerticalSeparatorCore";
// import { classNameParserCore } from "../../../../../core/coreFunctions/classNameParserCore/classNameParserCore";
//
// const getNodeById = (id: string, flow: FlowPathState) =>
//   flow.find((node) => node.id === id);
//
// interface GraphNodeProps {
//   graphNodeData: PathNodeType;
//   nodeIndex?: number;
//   theme?: GraphNodeTheme;
//   onChange: (state: FlowPathState) => void;
// }
//
// export const GraphNode: React.FC<GraphNodeProps> = ({
//   theme,
//   graphNodeData,
//   onChange,
//   nodeIndex = 0,
// }) => {
//   const flowContext = useContext(FlowContext);
//   const {
//     flowState,
//     setFlowState,
//     setSelectedEntitiesSet,
//     selectedEntitiesSet,
//   } = flowContext || {};
//
//   const [showSelectionMenu, setShowSelectionMenu] = useState<boolean>(false);
//   const containerRef = useRef<HTMLDivElement>(null);
//
//   useEffect(() => {
//     function handleClickOutsideSelectionMenu(event: Event) {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(event.target as Node) &&
//         showSelectionMenu
//       ) {
//         setShowSelectionMenu(false);
//       }
//     }
//
//     if (showSelectionMenu) {
//       document.addEventListener("mousedown", handleClickOutsideSelectionMenu);
//       document.addEventListener("touchstart", handleClickOutsideSelectionMenu);
//     }
//
//     return () => {
//       document.removeEventListener(
//         "mousedown",
//         handleClickOutsideSelectionMenu,
//       );
//       document.removeEventListener(
//         "touchstart",
//         handleClickOutsideSelectionMenu,
//       );
//     };
//   }, [showSelectionMenu]);
//
//   const { selectedFieldsByCategory } = graphNodeData;
//
//   const shouldShowPrecedingArrow = nodeIndex > 0;
//
//   const allCurrentNodeSelectedEntities: {
//     categoryId: EntityCategory;
//     selectedFieldIds: EntityID[];
//   }[] = useMemo(() => {
//     if (!selectedFieldsByCategory) return [];
//     return Object.entries(selectedFieldsByCategory)?.map(
//       ([category, selectedFieldIds]) => ({
//         categoryId: category as EntityCategory,
//         selectedFieldIds: selectedFieldIds || [],
//       }),
//     );
//   }, [selectedFieldsByCategory]);
//
//   const isEmpty =
//     !selectedFieldsByCategory ||
//     allCurrentNodeSelectedEntities.every(
//       (selectedEntity) => !selectedEntity.selectedFieldIds.length,
//     );
//
//   const flatCurrentNodeSelectedOptions = allCurrentNodeSelectedEntities.flatMap(
//     ({ categoryId, selectedFieldIds }) => {
//       // ⬇️ FIX: Explicitly return the result of the map operation.
//       return selectedFieldIds.map((entityId) => ({
//         categoryId: categoryId,
//         entityId: entityId, // Using a clearer name for the flattened field ID
//       }));
//     },
//   );
//
//   const hasMultipleValues = flatCurrentNodeSelectedOptions.length > 1;
//
//   // 2. Data Accessors for Dropdown
//   const precedingNode = flowState?.[nodeIndex - 1];
//   //todo yonatan simplify
//   const precedingEntityId = Object.values(
//     precedingNode?.selectedFieldsByCategory || {},
//   )?.flat()?.[0] as EntityID | undefined;
//
//   const valuesByCategoryGetter = useCallback(
//     (selectedCategoryId: EntityCategory) => {
//       if (
//         (nodeIndex === 0 &&
//           !Object.keys(selectedFieldsByCategory || {}).length) ||
//         !precedingEntityId
//       ) {
//         return graphQueries.getRawEntitiesByCategory(selectedCategoryId);
//       }
//       return graphQueries.getLegalEntityOptionsByCategory(
//         precedingEntityId,
//         selectedCategoryId,
//         flowState,
//         nodeIndex,
//         selectedEntitiesSet,
//       );
//     },
//     [
//       graphQueries,
//       nodeIndex,
//       precedingEntityId,
//       flowState,
//       selectedEntitiesSet,
//     ],
//   );
//
//   const categoryOptions = useMemo(() => {
//     const availableCategoryIds: EntityCategory[] =
//       graphQueries.getLegalUnusedNextCategories(
//         flowState,
//         nodeIndex,
//         selectedEntitiesSet,
//       );
//     return availableCategoryIds.map((categoryId) => ({
//       id: categoryId,
//       label: getCategoryLabel(categoryId),
//       category: categoryId,
//     }));
//   }, [graphQueries, flowState, nodeIndex, selectedEntitiesSet]);
//
//   // 3. Centralized Dropdown Change Handler
//   const onFieldSelected = useCallback(
//     (newSelectedFieldsByCategory: Record<EntityCategory, EntityID[]>) => {
//       const allSelectedIds = Object.values(newSelectedFieldsByCategory).flat();
//       setSelectedEntitiesSet(
//         (prev) =>
//           new Set([
//             ...Array.from(prev.values()),
//             ...Array.from(selectedEntitiesSet.values()),
//             ...allSelectedIds,
//           ]),
//       );
//       //todo yonatan
//       if (allSelectedIds.length === 0) {
//         return;
//       }
//       const oldFlow = flowState || [];
//       const currentNode = getNodeById(graphNodeData.id, oldFlow);
//
//       if (!currentNode) return;
//
//       const newNode: PathNodeType = {
//         ...currentNode,
//         selectedFieldsByCategory: newSelectedFieldsByCategory,
//       };
//       const editedFlow = graphQueries.editNode(newNode, oldFlow);
//
//       const slicedFlow = graphQueries.deleteNode(
//         flowState[nodeIndex + 1]?.id,
//         editedFlow,
//       );
//       onChange(slicedFlow);
//       setShowSelectionMenu(false);
//     },
//     [
//       graphQueries,
//       graphNodeData,
//       flowState,
//       onChange,
//       selectedEntitiesSet,
//       setSelectedEntitiesSet,
//       nodeIndex,
//     ],
//   );
//
//   // --- Next Button Logic ---
//   const shouldShowNextButton = useMemo(() => {
//     if (
//       isEmpty ||
//       hasMultipleValues ||
//       nodeIndex !== (flowState?.length || 0) - 1
//     )
//       return false;
//
//     const sourceFieldId =
//       allCurrentNodeSelectedEntities[0]?.selectedFieldIds?.[0];
//
//     return (
//       sourceFieldId &&
//       graphQueries.hasLegalUnusedNextEdges(
//         sourceFieldId,
//         flowState,
//         nodeIndex,
//         selectedEntitiesSet,
//       )
//     );
//   }, [
//     nodeIndex,
//     flowState,
//     isEmpty,
//     hasMultipleValues,
//     allCurrentNodeSelectedEntities,
//     selectedEntitiesSet,
//   ]);
//
//   const handleDropdownOpen = () => setShowSelectionMenu(true);
//
//   return (
//     <div className="flex gap-8 align-center">
//       {shouldShowPrecedingArrow && (
//         <IconCore
//           src={GRAP_ARROW_RIGHT}
//           width={52}
//           height={28}
//           containerStyle={{ padding: 0 }}
//         />
//       )}
//       <div
//         className="flex gap-8 align-center flex-wrap graph-node-container"
//         ref={containerRef}
//       >
//         {/* RENDER CHIPS OR EMPTY STATE */}
//         {isEmpty ? (
//           <EmptyGraphNodeChip onClick={handleDropdownOpen} theme={theme} />
//         ) : (
//           <div
//             onClick={handleDropdownOpen}
//             className={
//               "graph-node-field-chip-container graph-node-badge-content flex align-center"
//             }
//           >
//             {flatCurrentNodeSelectedOptions.map((option, index) => (
//               <React.Fragment key={`${option.categoryId}-${option.entityId}`}>
//                 {index > 0 && (
//                   <TextCore
//                     text={"OR"}
//                     fontWeight={"bold"}
//                     color={COLORS["gray-9"]}
//                   />
//                 )}
//
//                 <GraphNodeChip
//                   categoryLabel={getCategoryLabel(option.categoryId)}
//                   fieldLabel={getEntityLabel(option.entityId)}
//                   theme={theme}
//                 />
//               </React.Fragment>
//             ))}
//             <IconCore
//               src={X_ICON}
//               className={"hover-blue-11"}
//               containerStyle={{ borderLeft: "1px solid #D9D9D9" }}
//               onClick={() => {
//                 const newFlow = graphQueries.deleteNode(
//                   graphNodeData.id,
//                   flowState,
//                 );
//                 setFlowState?.(newFlow);
//               }}
//             />
//           </div>
//         )}
//
//         {showSelectionMenu && (
//           <CategoryFieldsDropdownCore<EntityCategory, EntityID>
//             className={"node-chip-dropdown"}
//             keyOptions={categoryOptions}
//             categoriesLabelGetter={getCategoryLabel}
//             valueOptionsLabelGetter={getEntityLabel}
//             valueOptionsGetter={valuesByCategoryGetter}
//             selectedOptionsMapping={graphNodeData.selectedFieldsByCategory}
//             onChange={onFieldSelected}
//           />
//         )}
//       </div>
//       {shouldShowNextButton && (
//         <Tippy
//           content={"Add data source"}
//           placement={"right-end"}
//           delay={[500, 0]}
//         >
//           <div
//             className={"hover-blue-11 circle-button-container"}
//             onClick={() => {
//               const currentFlow = flowState || [];
//               const edgeNodeIndex = nodeIndex;
//               const newFlow = graphQueries.addNewNode(
//                 edgeNodeIndex,
//                 [],
//                 currentFlow,
//               );
//               setFlowState?.(newFlow);
//             }}
//           >
//             <IconCore src={PLUS_CIRCLE} width={24} height={24} />
//           </div>
//         </Tippy>
//       )}
//     </div>
//   );
// };

import {
  FlowPathState,
  PathNodeType,
  EntityCategory,
  EntityID,
} from "../../../model/types";
import React, {
  useContext,
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import "./graph-node.scss";
import PLUS_CIRCLE from "./../../../../../assets/icons/plus_circle_icon.png";
import GRAP_ARROW_RIGHT from "./../../../../../assets/images/graph_arrow_right.png";
import { IconCore } from "../../../../../core/coreComponents/IconCore/IconCore";
import { COLORS } from "../../../../../core/coreStyles/colors";
import {
  GraphNodeChip,
  // EmptyGraphNodeChip,
} from "./components/GraphNodeChip/GraphNodeChip";
import { TextCore } from "../../../../../core/coreComponents/TextCore/TextCore";
import {
  CategoryOptions,
  FlatCurrentNodeSelectedOptions,
  GraphNodeTheme,
} from "./types";
import { graphQueries } from "../../../controller/GraphController";
import { FlowContext } from "../../contexts/FlowContext";
import Tippy from "@tippyjs/react";
import { CategoryFieldsDropdownCore } from "../../../../../core/coreComponents/DropdownCore/KeyValueDropdownCore/CategoryFieldsDropdownCore";
import {
  getCategoryLabel,
  getEntityLabel,
} from "../../utils/idToLabelTranslator";
import X_ICON from "../../../../../assets/icons/x_icon.png";
import { EmptyGraphNode } from "./components/EmptyGraphNode/EmptyGraphNode";

const getNodeById = (id: string, flow: FlowPathState) =>
  flow.find((node) => node.id === id);

interface GraphNodeProps {
  graphNodeData: PathNodeType;
  nodeIndex?: number;
  theme?: GraphNodeTheme;
  onChange: (state: FlowPathState) => void;
}

export const GraphNode: React.FC<GraphNodeProps> = ({
  theme,
  graphNodeData,
  onChange,
  nodeIndex = 0,
}) => {
  const flowContext = useContext(FlowContext);
  const {
    flowState,
    setFlowState,
    setSelectedEntitiesSet,
    selectedEntitiesSet,
  } = flowContext || {};

  const [showSelectionMenu, setShowSelectionMenu] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatedSelectedEntitySet =
      graphQueries.buildSelectedEntitiesSet(flowState);
    setSelectedEntitiesSet(updatedSelectedEntitySet);
  }, [flowState]);

  useEffect(() => {
    function handleClickOutsideSelectionMenu(event: Event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        showSelectionMenu
      ) {
        setShowSelectionMenu(false);
      }
    }

    if (showSelectionMenu) {
      document.addEventListener("mousedown", handleClickOutsideSelectionMenu);
      document.addEventListener("touchstart", handleClickOutsideSelectionMenu);
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutsideSelectionMenu,
      );
      //todo yonatan
      document.removeEventListener(
        "touchstart",
        handleClickOutsideSelectionMenu,
      );
    };
  }, [showSelectionMenu]);

  const { selectedFieldsByCategory } = graphNodeData;

  const shouldShowPrecedingArrow = nodeIndex > 0;

  //todo yonatan simplify
  const allCurrentNodeSelectedEntities: {
    categoryId: EntityCategory;
    selectedFieldIds: EntityID[];
  }[] = useMemo(() => {
    if (!selectedFieldsByCategory) return [];
    return Object.entries(selectedFieldsByCategory)?.map(
      ([category, selectedFieldIds]) => ({
        categoryId: category as EntityCategory,
        selectedFieldIds: selectedFieldIds || [],
      }),
    );
  }, [selectedFieldsByCategory]);

  const isEmpty =
    !selectedFieldsByCategory ||
    allCurrentNodeSelectedEntities.every(
      (selectedEntity) => !selectedEntity.selectedFieldIds.length,
    );

  const flatCurrentNodeSelectedOptions: FlatCurrentNodeSelectedOptions =
    allCurrentNodeSelectedEntities.flatMap(
      ({ categoryId, selectedFieldIds }) => {
        return selectedFieldIds.map((entityId) => ({
          categoryId: categoryId,
          entityId: entityId,
        }));
      },
    );

  const hasMultipleValues = flatCurrentNodeSelectedOptions.length > 1;

  const precedingNode: PathNodeType = flowState?.[nodeIndex - 1];
  //todo yonatan simplify
  const precedingEntityId = Object.values(
    precedingNode?.selectedFieldsByCategory || {},
  )?.flat()?.[0] as EntityID | undefined;

  const valuesByCategoryGetter = useCallback(
    (selectedCategoryId: EntityCategory) => {
      if (
        (nodeIndex === 0 &&
          //todo yonatan simplify
          !Object.keys(selectedFieldsByCategory || {}).length) ||
        !precedingEntityId
      ) {
        return graphQueries.getRawEntitiesByCategory(selectedCategoryId);
      }
      return graphQueries.getLegalEntityOptionsByCategory(
        precedingEntityId,
        selectedCategoryId,
        flowState,
        nodeIndex,
        selectedEntitiesSet,
        getEntityLabel,
      );
    },
    [
      graphQueries,
      nodeIndex,
      precedingEntityId,
      flowState,
      selectedEntitiesSet,
    ],
  );

  const categoryOptions: CategoryOptions[] = useMemo(() => {
    const availableCategoryIds: EntityCategory[] =
      graphQueries.getLegalUnusedCategoriesForNewNode(
        flowState,
        nodeIndex,
        selectedEntitiesSet,
      );
    return availableCategoryIds.map((categoryId) => ({
      id: categoryId,
      label: getCategoryLabel(categoryId),
      category: categoryId,
    }));
  }, [graphQueries, flowState, nodeIndex, selectedEntitiesSet]);

  const onFieldSelected = useCallback(
    (newSelectedFieldsByCategory: Record<EntityCategory, EntityID[]>) => {
      //todo yonatan
      const allSelectedIds = Object.values(newSelectedFieldsByCategory).flat();

      // --- REMOVED THE FLAWED SET MERGING LOGIC ---
      /*
      setSelectedEntitiesSet(
        (prev) =>
          new Set([
            ...Array.from(prev.values()),
            ...Array.from(selectedEntitiesSet.values()),
            ...allSelectedIds,
          ]),
      );
      */

      if (allSelectedIds.length === 0) {
        return;
      }
      const oldFlow: FlowPathState = flowState || [];
      const currentNode = getNodeById(graphNodeData.id, oldFlow);

      if (!currentNode) return;

      const newNode: PathNodeType = {
        ...currentNode,
        selectedFieldsByCategory: newSelectedFieldsByCategory,
      };
      const editedFlow = graphQueries.editNode(newNode, oldFlow);

      const slicedFlow = graphQueries.deleteNode(
        flowState[nodeIndex + 1]?.id,
        editedFlow,
      );

      onChange(slicedFlow);
      setShowSelectionMenu(false);
    },
    [graphQueries, graphNodeData, flowState, onChange, nodeIndex],
  );

  const shouldShowNextButton = useMemo(() => {
    if (
      isEmpty ||
      hasMultipleValues ||
      nodeIndex !== (flowState?.length || 0) - 1
    )
      return false;

    // todo yonatan add extraction method
    const sourceFieldId =
      allCurrentNodeSelectedEntities[0]?.selectedFieldIds?.[0];

    return (
      sourceFieldId &&
      graphQueries.hasLegalUnusedNextEdges(
        sourceFieldId,
        flowState,
        nodeIndex,
        selectedEntitiesSet,
      )
    );
  }, [
    nodeIndex,
    flowState,
    isEmpty,
    hasMultipleValues,
    allCurrentNodeSelectedEntities,
    selectedEntitiesSet,
  ]);

  const handleDropdownOpen = () => setShowSelectionMenu(true);

  return (
    <div className="flex gap-8 align-center">
      {shouldShowPrecedingArrow && (
        <IconCore
          src={GRAP_ARROW_RIGHT}
          width={52}
          height={28}
          containerStyle={{ padding: 0 }}
        />
      )}
      <div
        className="flex gap-8 align-center flex-wrap graph-node-container"
        ref={containerRef}
      >
        {isEmpty ? (
          <EmptyGraphNode onClick={handleDropdownOpen} theme={theme} />
        ) : (
          <div
            onClick={handleDropdownOpen}
            className={
              "graph-node-field-chip-container graph-node-badge-content flex align-center"
            }
          >
            {flatCurrentNodeSelectedOptions.map((option, index) => (
              <React.Fragment key={`${option.categoryId}-${option.entityId}`}>
                {index > 0 && (
                  <TextCore
                    text={"OR"}
                    fontWeight={"bold"}
                    color={COLORS["gray-9"]}
                  />
                )}

                <GraphNodeChip
                  categoryLabel={getCategoryLabel(option.categoryId)}
                  fieldLabel={getEntityLabel(option.entityId)}
                  theme={theme}
                />
              </React.Fragment>
            ))}
            <IconCore
              src={X_ICON}
              className={"hover-blue-11"}
              containerStyle={{ borderLeft: "1px solid #D9D9D9" }}
              onClick={() => {
                const newFlow = graphQueries.deleteNode(
                  graphNodeData.id,
                  flowState,
                );
                setFlowState?.(newFlow);
              }}
            />
          </div>
        )}

        {showSelectionMenu && (
          <CategoryFieldsDropdownCore<EntityCategory, EntityID>
            className={"node-chip-dropdown fade-in"}
            keyOptions={categoryOptions}
            categoriesLabelGetter={getCategoryLabel}
            valueOptionsLabelGetter={getEntityLabel}
            valueOptionsGetter={valuesByCategoryGetter}
            selectedOptionsMapping={graphNodeData.selectedFieldsByCategory}
            onChange={onFieldSelected}
          />
        )}
      </div>
      {shouldShowNextButton && (
        <Tippy
          content={"Add data source"}
          placement={"right-end"}
          delay={[500, 0]}
        >
          <div
            className={"hover-blue-11 circle-button-container"}
            onClick={() => {
              const currentFlow = flowState || [];
              const edgeNodeIndex = nodeIndex;
              const newFlow = graphQueries.addNewNode(
                edgeNodeIndex,
                [],
                currentFlow,
              );
              setFlowState?.(newFlow);
            }}
          >
            <IconCore src={PLUS_CIRCLE} width={24} height={24} />
          </div>
        </Tippy>
      )}
    </div>
  );
};
