import React, { useState, Suspense } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import Loading from "./loading";
import "../styles/MainPage.css";
const Posts = React.lazy(() => import("./posts"));

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="main-container">
      <Header />
      <div className="main-content">
        <Sidebar onSearch={setSearchTerm} className="sidebar" />
        <div className="posts-area">
          <Suspense fallback={<Loading />}>
            <Posts filter={searchTerm} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
