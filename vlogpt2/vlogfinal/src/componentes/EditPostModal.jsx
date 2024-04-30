import "../styles/ModalsStyles.css";
import useForm from "./useForm";
import PropTypes from "prop-types";

const EditPostModal = ({ post, onClose, onSave }) => {
  const { values, handleChange, handleSubmit } = useForm({
    content: post.content,
    picture: post.picture,
  });

  const handleSave = () => {
    onSave(post.id, values.content, values.picture);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <label htmlFor="edit-content" className="modal-label">
          Contenido:
        </label>
        <textarea
          id="edit-content"
          name="content"
          value={values.content}
          onChange={handleChange}
          className="modal-textarea"
        />

        <label htmlFor="edit-picture" className="modal-label">
          URL de la imagen:
        </label>
        <input
          id="edit-picture"
          name="picture"
          type="text"
          value={values.picture}
          onChange={handleChange}
          className="modal-input"
        />

        <button onClick={handleSubmit(handleSave)} className="modal-button">
          Guardar cambios
        </button>
        <button className="modal-button close-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

EditPostModal.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    content: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditPostModal;
