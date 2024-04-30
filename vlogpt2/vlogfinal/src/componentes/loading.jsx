function Loading() {
  return (
    <div style={{ textAlign: "center", padding: "50px", fontSize: "24px" }}>
      <div
        style={{
          margin: "auto",
          border: "4px solid rgba(0, 0, 0, 0.1)",
          borderTop: "4px solid #fff",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          animation: "spin 2s linear infinite",
        }}
      />
      <style>
        {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
      </style>
    </div>
  );
}

export default Loading;
