import { useNavigate } from "react-router-dom";
import "../styles/InitialForm.css";

const InitialForm = () => {
  let navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="initial-form-container">
      <h1 className="initial-form-title">Bienvenido a Mamis Vlog</h1>
      <div className="button-container">
        <button onClick={navigateToLogin} className="button">
          Iniciar Sesión
        </button>
        <button onClick={navigateToRegister} className="button">
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default InitialForm;
