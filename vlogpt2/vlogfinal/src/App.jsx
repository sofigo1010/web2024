import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import InitialForm from "./componentes/InitialForm";
import LoginForm from "./componentes/LoginForm";
import RegisterForm from "./componentes/RegisterForm";
import Dashboard from "./componentes/Dashboard";
import MainPage from "./componentes/MainPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  console.log(isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/initial" element={<InitialForm />} />
        InitialForm
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate replace to="/admin" />
            ) : (
              <LoginForm onAuthenticated={() => setIsAuthenticated(true)} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate replace to="/admin" />
            ) : (
              <RegisterForm onAuthenticated={() => setIsAuthenticated(true)} />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={() => setIsAuthenticated(false)} />
            ) : (
              <Navigate replace to="/initial" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
