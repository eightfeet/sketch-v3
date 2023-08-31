import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Loading } from "../Loading";
import './App.scss';

const queryClient = new QueryClient();

const createRouterList = () => {
  const modules = import.meta.glob("~/pages/*/index.ts");
  const routers = Object.keys(modules).map((key) => {
    const element = modules[key];
    let path = key.split("/").slice(-2)[0].toLowerCase();
    const Comp = React.lazy(element as any);
    if (path === "home") {
      path = "/";
    }
    return {
      path,
      element: <Comp />,
    };
  });
  return routers;
};

const routerList = createRouterList();

const App: React.FC = () => {
  const router = useMemo(() => createHashRouter(routerList as any), []);
  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </React.Suspense>
    </QueryClientProvider>
  );
};

export default App;
