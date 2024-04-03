function SidebarButton({ iconUrl, text, onClick }) {
    return (
      <div
        onClick={onClick}
        style={{
          cursor: 'pointer', 
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: '10px 20px',
          boxSizing: 'border-box',
        }}
      >
        <img
          src={iconUrl}
          alt={text}
          style={{
            marginRight: '10px',
            width: '24px',
            height: '24px',
          }}
        />
        <span>{text}</span>
      </div>
    );
  }
  
  function Sidebar() {
    const handleHomeClick = () => {
      console.log('Home clicked');
    };
  
    const handleSearchClick = () => {
      console.log('Search clicked');
    };
  
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          width: '20%',
          height: '100%',
          backgroundColor: '#000',
          color: '#fff',
          boxSizing: 'border-box',
          borderRight: '1px solid white',
        }}
      >
        <SidebarButton iconUrl="https://cdn-icons-png.freepik.com/256/6583/6583566.png" text="Home" onClick={handleHomeClick} />
        <SidebarButton iconUrl="https://static-00.iconduck.com/assets.00/search-icon-512x512-dxj09ddf.png" text="Search" onClick={handleSearchClick} />
      </div>
    );
  }
  