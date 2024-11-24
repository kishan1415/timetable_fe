import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Layout";
import TimetableSummary from "./components/TimetableSummary";
import TimetableEntry from "./components/TimetableEntry";
import Subjects from "./components/Subject";
import Rooms from "./components/Rooms";
import Teachers from "./components/Teachers";
import Course from "./components/Course";
import Semesters from "./components/Semesters";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <TimetableSummary />,
      },
      {
        path: "/timetable-entry",
        element: <TimetableEntry />,
      },
      {
        path: "/subjects",
        element: <Subjects />,
      },
      {
        path: "/rooms",
        element: <Rooms />,
      },
      {
        path: "/teacher",
        element: <Teachers />,
      },
      {
        path: "/course",
        element: <Course />,
      },
      {
        path: "/semester",
        element: <Semesters />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ConfigProvider>
    <RouterProvider router={router} />;
  </ConfigProvider>
);
