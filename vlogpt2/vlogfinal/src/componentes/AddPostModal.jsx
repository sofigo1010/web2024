import "../styles/ModalsStyles.css";
import PropTypes from "prop-types";
import useForm from "./useForm";

const AddPostModal = ({ onClose, onAdd }) => {
  const { values, handleChange, handleSubmit } = useForm({
    content: "",
    picture: "",
  });

  const handleAdd = () => {
    onAdd(values.content, values.picture);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <label htmlFor="content" className="modal-label">
          Contenido:
        </label>
        <textarea
          id="content"
          name="content"
          value={values.content}
          onChange={handleChange}
          className="modal-textarea"
          placeholder="Escribe el contenido del post aquí..."
        />

        <label htmlFor="picture" className="modal-label">
          URL de la imagen:
        </label>
        <input
          id="picture"
          name="picture"
          type="text"
          value={values.picture}
          onChange={handleChange}
          className="modal-input"
          placeholder="Introduce la URL de la imagen aquí..."
        />

        <button onClick={handleSubmit(handleAdd)} className="modal-button">
          Agregar post
        </button>
        <button onClick={onClose} className="modal-button">
          Cerrar
        </button>
      </div>
    </div>
  );
};

AddPostModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddPostModal;
