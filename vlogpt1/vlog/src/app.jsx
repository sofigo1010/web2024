const App = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        backgroundColor: "#000",
        color: "#fff",
      }}>
        <Header />
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          height: 'calc(100% - 120px)', 
        }}>
          <Sidebar />
          <div style={{
            flexGrow: 1, 
            display: 'flex',
            flexDirection: 'column',
            width: 'auto', 
            overflowY: 'auto'
          }}>
            <MakePost />
            <Posts />
          </div>
        </div>
      </div>
    );
  };
  
  ReactDOM.render(<App />, document.getElementById("root"));