import { createBrowserRouter } from "react-router-dom";
import { AddTask, ViewTasks } from "./pages";

const router = createBrowserRouter([
    {
        // URL: "/"
        path: "/",
        element: (
            <ViewTasks></ViewTasks>
        ),
    },
    {
        // URL: "/add"
        path: "/add",
        element: (
         <AddTask></AddTask>
        ),
    },
    {
        // URL: "/edit"
        path: "/edit/:taskId",
        element: (
         <AddTask></AddTask>
        ),
    },

]);

export default router;