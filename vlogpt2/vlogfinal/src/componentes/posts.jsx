import React from "react";
import Loading from "./loading";
import SkeletonPost from "./SkeletonPost";
import useApi from "./useApi";
import PropTypes from "prop-types";
function Post({ title, content, picture }) {
  const handleOptionsClick = () => {
    console.log("Options for post:", title);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        padding: "16px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        margin: "10px",
        border: "1px solid white",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
        }}
        onClick={handleOptionsClick}
      >
        &#x22EE;
      </div>
      <p style={{ color: "#fff", textAlign: "center" }}>{content}</p>
      {picture && (
        <img
          src={picture}
          alt="Post"
          style={{
            maxWidth: "25%",
            borderRadius: "10px",
            margin: "10px 0",
            display: "block",
          }}
        />
      )}
    </div>
  );
}
Post.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
  picture: PropTypes.string,
};

function Posts({ filter }) {
  const {
    data: posts,
    error,
    isLoading,
    get,
  } = useApi("http://18.225.11.137:3000");

  React.useEffect(() => {
    get("/posts");
  }, [get]);

  const filteredPosts = posts
    ? posts
        .filter((post) =>
          post.content.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => b.id - a.id)
    : [];

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {isLoading ? (
        [...Array(5)].map((_, i) => <SkeletonPost key={i} />)
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        filteredPosts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            content={post.content}
            picture={post.picture}
          />
        ))
      )}
    </div>
  );
}
Posts.propTypes = {
  filter: PropTypes.string,
};

export default Posts;
