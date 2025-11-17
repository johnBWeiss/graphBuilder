// FlowContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { EntityID, FlowPathState } from "../../model/types";

// --- 1. Types and Context Definition ---

interface FlowContextType {
  flowState: FlowPathState;
  setFlowState: React.Dispatch<React.SetStateAction<FlowPathState>>;
  selectedEntitiesSet: Set<EntityID>;
  setSelectedEntitiesSet: React.Dispatch<React.SetStateAction<Set<EntityID>>>;
}

// 🌟 EXPORT THE RAW CONTEXT OBJECT
export const FlowContext = createContext<FlowContextType>({
  flowState: [],
  setFlowState: () => {},
  selectedEntitiesSet: new Set(),
  setSelectedEntitiesSet: () => {},
});

// --- 2. The Flow Provider Component (No Custom Hook Needed) ---

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

  // useEffect(() => {
  //   onChange(flowState);
  // }, [flowState, onChange]);

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
