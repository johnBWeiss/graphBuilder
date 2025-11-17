import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GraphConnectionBuilder } from "./features/GraphConnectionBuilder/view/GraphConnectionBuilder";
import { GraphWrapper } from "./features/GraphConnectionBuilder/view/GraphWrapper/GraphWrapper";
export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GraphWrapper />} />
      </Routes>
    </Router>
  );
};
