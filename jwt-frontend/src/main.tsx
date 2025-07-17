import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./layout";
import UserPage from "./pages/user";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import { App } from "antd";
import AppProvider from "./context/app.provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "users",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App>
        <RouterProvider router={router} />
      </App>
    </AppProvider>
  </StrictMode>
);
