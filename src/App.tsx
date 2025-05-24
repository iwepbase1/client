import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import AppRoutes from "./router";
import { store, persistor } from "./store/store";
import { createTheme } from "@mui/material";
import { ErrorProvider } from "./core/functions/ErrorContext";

function App() {
  return <ThemeProvider theme={THEME}>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
       <ErrorProvider>
        <AppRoutes /> 
        </ErrorProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
</ThemeProvider>
}

const THEME = createTheme({
  typography: {
    fontFamily:
      'Roboto, -apple-system, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export default App;
