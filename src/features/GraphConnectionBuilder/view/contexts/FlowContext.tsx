import React, { createContext, useState, useMemo, useEffect } from "react";
import { EntityID, FlowPathState } from "../../model/types";

interface FlowContextType {
  flowState: FlowPathState;
  setFlowState: React.Dispatch<React.SetStateAction<FlowPathState>>;
  selectedEntitiesSet: Set<EntityID>;
  setSelectedEntitiesSet: React.Dispatch<React.SetStateAction<Set<EntityID>>>;
}

export const FlowContext = createContext<FlowContextType>({
  flowState: [],
  setFlowState: () => {},
  selectedEntitiesSet: new Set(),
  setSelectedEntitiesSet: () => {},
});

interface FlowProviderProps {
  initialState: FlowPathState;
  children: React.ReactNode;
}

export const FlowProvider: React.FC<FlowProviderProps> = ({
  initialState = [],
  children,
}) => {
  const [flowState, setFlowState] = useState<FlowPathState>(initialState);
  const [selectedEntitiesSet, setSelectedEntitiesSet] = useState<Set<EntityID>>(
    new Set([]),
  );

  useEffect(() => {
    if (flowState.length === 0) {
      setFlowState(initialState);
    }
  }, [flowState, initialState]);

  const contextValue = useMemo(
    () => ({
      flowState: flowState || [],
      setFlowState,
      selectedEntitiesSet,
      setSelectedEntitiesSet,
    }),
    [flowState, setFlowState, selectedEntitiesSet, setSelectedEntitiesSet],
  );

  return (
    <FlowContext.Provider value={contextValue}>{children}</FlowContext.Provider>
  );
};
