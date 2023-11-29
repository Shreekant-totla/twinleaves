import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DataGridItem from "./DataGrid";
const ProductDetail = React.lazy(() => import("./ProductDetail"));

function MainRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DataGridItem />} />
        <Route
          path="/product-detail/:hsCode/:currentPage"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductDetail />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default MainRoutes;
