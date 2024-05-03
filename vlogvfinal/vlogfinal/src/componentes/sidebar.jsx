import "../styles/Sidebar.css";
import React from "react";
import PropTypes from "prop-types";
function SidebarButton({ iconUrl, text, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "10px 20px",
        boxSizing: "border-box",
      }}
    >
      <img
        src={iconUrl}
        alt={text}
        style={{
          marginRight: "10px",
          width: "24px",
          height: "24px",
        }}
      />
      <span>{text}</span>
    </div>
  );
}

SidebarButton.propTypes = {
  iconUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

function Sidebar({ onSearch }) {
  const [searchVisible, setSearchVisible] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleHomeClick = () => {
    console.log("Home clicked");
  };

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="sidebar">
      <div>
        <SidebarButton
          iconUrl="https://cdn-icons-png.freepik.com/256/6583/6583566.png"
          text="Home"
          onClick={handleHomeClick}
        />
        <SidebarButton
          iconUrl="https://static-00.iconduck.com/assets.00/search-icon-512x512-dxj09ddf.png"
          text="Search"
          onClick={handleSearchClick}
        />
        {searchVisible && (
          <input
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={handleSearchTermChange}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              boxSizing: "border-box",
            }}
          />
        )}
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Sidebar;
