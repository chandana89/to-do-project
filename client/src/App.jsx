import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster
            position="bottom-left"
            toastOptions={{
              style: {
                padding: "16px",
              },
            }}
          />
          <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
