import "../styles/SkeletonPost.css";

const SkeletonPost = () => {
  return (
    <div className="skeleton-post">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text short"></div>
    </div>
  );
};

export default SkeletonPost;
