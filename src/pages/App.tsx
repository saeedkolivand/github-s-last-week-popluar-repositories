import React from "react";
import { Provider } from "react-redux";
import store from "app/redux/store";
import Home from "pages/home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "app/errorBoundary/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </Provider>
  </ErrorBoundary>
);

export default App;
