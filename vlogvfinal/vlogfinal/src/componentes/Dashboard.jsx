import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import Loading from "./loading";
import EditPostModal from "./EditPostModal";
import AddPostModal from "./AddPostModal";
import useApi from "./useApi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const { data, error, isLoading, get, post, put, del } = useApi(
    "http://18.225.11.137:3000"
  );

  useEffect(() => {
    get("/posts");
  }, [get]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const editPostHandler = (post) => {
    setCurrentPost(post);
    setShowEditModal(true);
  };

  const deletePostHandler = async (id) => {
    await del("/posts", id);
    get("/posts");
  };

  const addPostHandler = async (content, picture) => {
    await post("/posts", { title: "Un título para el post", content, picture });
    setShowAddModal(false);
    get("/posts");
  };

  const savePostHandler = async (id, content, picture) => {
    await put("/posts", id, {
      title: "Este es el título del post",
      content,
      picture,
    });
    setShowEditModal(false);
    get("/posts");
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="add-post-button"
        >
          +
        </button>
        <button onClick={handleLogout} className="logout-button">
          Cerrar sesión
        </button>
      </div>
      {data && data.length > 0 ? (
        <div className="post-list">
          {data.map((post) => (
            <div key={post.id} className="post-item">
              <span>{post.content}</span>
              <div className="post-actions">
                <button
                  onClick={() => editPostHandler(post)}
                  className="action-button"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletePostHandler(post.id)}
                  className="action-button"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay posts para mostrar.</p>
      )}
      {showEditModal && (
        <EditPostModal
          post={currentPost}
          onClose={() => setShowEditModal(false)}
          onSave={savePostHandler}
        />
      )}
      {showAddModal && (
        <AddPostModal
          onClose={() => setShowAddModal(false)}
          onAdd={addPostHandler}
        />
      )}
    </div>
  );
};

export default Dashboard;
