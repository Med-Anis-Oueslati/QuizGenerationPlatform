import React from "react";
import './Layout.css'
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import { SideBarMenu } from "../../Data/Data";
const Layout = ({ children }) => {
  const { teacher } = useSelector((state) => state.teacher);

  const location = useLocation();

  return (
    <>
      <div className="maiin">
        <div className="layouut">
          <div className="siidebaar">
            <div className="log">
              <h6>Teacher</h6>
              <hr />
            </div>
            <div className="menuu">
              {SideBarMenu.map((menu, index) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={index}
                    className={`mennuuu-iteem ${isActive && "actiive"}`}
                    onClick={menu.onClick} // check if onClick is defined and add it as a click handler
                  >
                    <i className={menu.icon}> </i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="connntent">
            <div className="heaadrr">
              <div className="heaadrr-connntent">
                <Badge count={teacher?.notification.length}>
                  <i className="fa-solid fa-ball"></i>
                </Badge>
                <i className="fa-solid fa-bell"></i>
                <Link to="/teacherapp">{teacher?.email}</Link>
              </div>
            </div>
            <div className="boodyy">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
