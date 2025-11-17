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
import { GraphNodeChip } from "./components/GraphNodeChip/GraphNodeChip";
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
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutsideSelectionMenu,
      );
    };
  }, [showSelectionMenu]);

  const { selectedFieldsByCategory } = graphNodeData;

  const shouldShowPrecedingArrow = nodeIndex > 0;

  const flatOptionsAndStatus = useMemo(() => {
    if (!selectedFieldsByCategory) {
      return {
        flatOptions: [],
        isEmpty: true,
        sourceFieldId: undefined,
      };
    }

    let isNodeEmpty = true;
    let firstSourceId: EntityID | undefined = undefined;
    const flatOptions: FlatCurrentNodeSelectedOptions = [];

    for (const [category, selectedFieldIds] of Object.entries(
      selectedFieldsByCategory,
    )) {
      const categoryId = category as EntityCategory;
      const ids = selectedFieldIds || [];

      for (const entityId of ids) {
        if (firstSourceId === undefined) {
          firstSourceId = entityId;
        }

        isNodeEmpty = false;

        flatOptions.push({
          categoryId: categoryId,
          entityId: entityId,
        });
      }
    }

    return {
      flatOptions: flatOptions,
      isEmpty: isNodeEmpty,
      sourceFieldId: firstSourceId,
    };
  }, [graphNodeData]);

  const {
    flatOptions: flatCurrentNodeSelectedOptions,
    isEmpty,
    sourceFieldId,
  } = flatOptionsAndStatus;

  const hasMultipleValues = flatCurrentNodeSelectedOptions.length > 1;

  const precedingNode: PathNodeType = flowState?.[nodeIndex - 1];

  const precedingEntityId =
    graphQueries.getPrecedingSourceFieldId(precedingNode);

  const valuesByCategoryGetter = useCallback(
    (selectedCategoryId: EntityCategory) => {
      const isEmptyRootNode =
        nodeIndex === 0 && !Object.keys(selectedFieldsByCategory || {}).length;

      if (isEmptyRootNode || !precedingEntityId) {
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
      selectedFieldsByCategory,
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
      const allSelectedIds = Object.values(newSelectedFieldsByCategory).flat();

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
    ) {
      return false;
    }

    if (!sourceFieldId) {
      return false;
    }

    return graphQueries.hasLegalUnusedNextEdges(
      sourceFieldId,
      flowState,
      nodeIndex,
      selectedEntitiesSet,
    );
  }, [
    nodeIndex,
    flowState,
    isEmpty,
    hasMultipleValues,
    sourceFieldId,
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
              const newFlow = graphQueries.addNode(
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
