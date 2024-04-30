import useForm from "./useForm";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterForm.css";
import "../styles/CommonStyles.css";
import useApi from "./useApi";

const RegisterForm = () => {
  let navigate = useNavigate();
  const { values, handleChange, handleSubmit } = useForm({
    username: "",
    password: "",
  });

  const goBack = () => navigate("/initial");

  const { post } = useApi("http://18.225.11.137:3000");

  const handleRegister = async () => {
    post("/register", { username: values.username, password: values.password })
      .then((data) => {
        localStorage.setItem("token", data.token);
        console.log("Registro exitoso");
        navigate("/admin");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="register-form-container">
      <button onClick={goBack} className="back-button" />
      <h2 className="register-form-title">Registrarse</h2>
      <form onSubmit={handleSubmit(handleRegister)} className="register-form">
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
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterForm;
