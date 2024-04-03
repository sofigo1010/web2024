function Header() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "start", 
          alignItems: "center",
          height: "120px", 
          backgroundColor: "#000", 
          color: "#fff", 
          borderBottom: "1px solid white"
        }}
      >
        <img src={"https://pbs.twimg.com/media/DuJqVVEXQAAUvyl?format=jpg&name=900x900"} alt="Logo" style={{ width: "120px", height: "120px", marginRight: "15px", borderRadius: "50%" }} />
        <h2 style={{ 
            margin: 0, 
            fontFamily: "'Roboto', sans-serif",
            fontSize: "24px",
          }}>
          Mamis Vlog
        </h2>
      </div>
    );
}
