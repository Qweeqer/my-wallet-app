import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import { Loader } from "../components/Loader/Loader";


const Wallet = lazy(() => import("../pages/HomePage/HomePage"));
const PageNotFound = lazy(() => import("../pages/PageNotFound/PageNotFound"));

const PagesRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Wallet />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default PagesRoutes;
