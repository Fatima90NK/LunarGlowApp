import { useState } from "react";
import "./slidebar.css";

function Slidebar() {
    const [showSidebarFilter, setShowSidebarFilter] = useState(false);
  
    const toggleShowSidebarFilter = () =>
      setShowSidebarFilter(!showSidebarFilter);
  
    return (
      <div className="sidebar-filter">
        <div className="show-button" onClick={toggleShowSidebarFilter}>
          Show
        </div>
        <div
          className={
            showSidebarFilter
              ? "sidebar-filter-data active"
              : "sidebar-filter-data"
          }
          style={{
            width: showSidebarFilter
              ? window.innerWidth > 500
                ? 500
                : window.innerWidth
              : 0
          }}
        >
          <div className="filter-data">
            <span className="hide-icon" onClick={toggleShowSidebarFilter}>
              X
            </span>
            <span>Filter 1</span>
            <span>Filter 2</span>
            <span>Filter 3</span>
            <span>Filter 4</span>
            <span>Filter 5</span>
            <span>Filter 6</span>
            <span>Filter 2</span>
            <span>Filter 3</span>
            <span>Filter 4</span>
            <span>Filter 5</span>
            <span>Filter 6</span>
            <span>Filter 6</span>
            <span>Filter 2</span>
            <span>Filter 3</span>
            <span>Filter 4</span>
            <span>Filter 5</span>
            <span>Filter 6</span>
          </div>
        </div>
      </div>
    
    );
  }
  
  export default Slidebar;
  

