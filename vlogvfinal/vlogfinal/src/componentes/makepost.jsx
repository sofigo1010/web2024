import React from "react";
function MakePost() {
  const [postContent, setPostContent] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value || "d ");
  };

  const handleSubmit = async () => {
    const post = {
      title: "Un título para el post",
      content: postContent,
      picture: imageUrl,
    };

    try {
      const response = await fetch("http://127.0.0.1:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Post creado exitosamente:", data);

        setPostContent("");
        setImageUrl(null);

        window.location.reload();
      } else {
        throw new Error(data.message || "Ocurrió un error al crear el post");
      }
    } catch (error) {
      console.error("Error al crear el post:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#000",
        padding: "16px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        margin: "10px",
        border: "1px solid white",
      }}
    >
      <textarea
        value={postContent}
        onChange={handlePostContentChange}
        placeholder="What's happening?"
        style={{
          backgroundColor: "inherit",
          color: "#fff",
          border: "none",
          outline: "none",
          resize: "none",
          padding: "8px",
          fontSize: "16px",
          borderRadius: "10px",
          minHeight: "30px",
          marginBottom: "10px",
        }}
        rows="1"
      />
      <div
        style={{
          height: "1px",
          backgroundColor: "white",
          width: "90%",
          alignSelf: "center",
          margin: "10px 0",
        }}
      />
      <input
        type="text"
        value={imageUrl || ""}
        onChange={handleImageUrlChange}
        placeholder="Place your image URL"
        style={{
          backgroundColor: "inherit",
          color: "#fff",
          border: "none",
          outline: "none",
          padding: "8px",
          fontSize: "16px",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#1DA1F2",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          outline: "none",
        }}
      >
        Post
      </button>
    </div>
  );
}

export default MakePost;
