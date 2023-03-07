import React, { Fragment, useState } from "react";
import Ellipse from "./Ellipse";
import NavHader from "./NavHader";
import Header from "./Header";
import RightSideBar from "./RightSideBar";
import ChatBox from "../ChatBox";
import { withRouter, useLocation } from "react-router-dom";
import SideBar from "./SideBar";

const JobieNav = ({ title, onClick: ClickToAddEvent, onClick2, onClick3  }) => {
  const [toggle, setToggle] = useState("");
  const onClick = (name) => setToggle(toggle === name ? "" : name);

  const location = useLocation();
  const hideSideBar = location.pathname.includes("start-test") || location.pathname.includes("view-induction");

  return (
    <Fragment>
      <Ellipse />
      {!hideSideBar && <NavHader /> }
      <ChatBox onClick={() => onClick("chatbox")} toggle={toggle} />
     {!hideSideBar && <Header
        onNote={() => onClick("chatbox")}
        onNotification={() => onClick("notification")}
        onProfile={() => onClick("profile")}
        toggle={toggle}
        title={title}
        onBox={() => onClick("box")}
        onClick={() => ClickToAddEvent()}
      />} 
      {!hideSideBar && <SideBar /> } 
    </Fragment>
  );
};

export default JobieNav;
