import { Route, Routes } from "react-router-dom";
import "./App.css";
import Provider from "./provider/provider";
import routes from "./routes";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./provider/AuthProvider";
import  { useTheme } from "./provider/themeMode";
import ScrollToTop from "./utils/ScrolToTop";
function App() {
  const theme=useTheme();
  return (
    <div id={theme}>
      <ScrollToTop/>
      <Toaster />
        <AuthProvider>
          <Provider>
            <Routes>
              {routes.map((route) => (
                <Route
                  path={route.path}
                  element={route.element}
                  key={route.path}
                />
              ))}
            </Routes>
          </Provider>
        </AuthProvider>
    </div>
  );
}

export default App;
