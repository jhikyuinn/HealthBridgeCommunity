import React from "react";
import Visualization from "../Visualization/Visualization";
import Calendar from "../Calendar/Calendar";
import "./Daily.css";

function Daily() {
  return (
    <>
      <div className="main-content">
        <div className="posts">
          <div className="blog-list">
            <Calendar></Calendar>
          </div>
        </div>
        <div className="sidemenu">
          <Visualization></Visualization>
        </div>
      </div>
    </>
  );
}

export default Daily;
