import useForm from "./useForm";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import "../styles/CommonStyles.css";
import useApi from "./useApi";
import PropTypes from "prop-types";

const LoginForm = ({ onAuthenticated }) => {
  let navigate = useNavigate();
  const { values, handleChange, handleSubmit } = useForm({
    username: "",
    password: "",
  });
  const goBack = () => navigate("/initial");

  const { post } = useApi("http://18.225.11.137:3000");

  const handleLogin = async () => {
    post("/login", { username: values.username, password: values.password })
      .then((data) => {
        localStorage.setItem("token", data.token);
        console.log("Inicio de sesión exitoso");
        onAuthenticated();
        navigate("/admin");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login-form-container">
      <button onClick={goBack} className="back-button" />
      <h2 className="login-form-title">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(handleLogin)} className="login-form">
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          placeholder="Nombre de usuario"
          required
        />
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onAuthenticated: PropTypes.func.isRequired,
};

export default LoginForm;
