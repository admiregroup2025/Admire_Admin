import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import ItineriesListPage from "./routes/Itinerarys/page";
import CreateItineriesPage from "./routes/create/page";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "create_itinerary",
                    element: <CreateItineriesPage/>,
                },
                {
                    path: "itinerary_list",
                    element: <ItineriesListPage/>,
                },

            ]
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
