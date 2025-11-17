import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GraphPage } from "./features/GraphConnectionBuilder/view/GraphPage/GraphPage";
export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GraphPage />} />
      </Routes>
    </Router>
  );
};
