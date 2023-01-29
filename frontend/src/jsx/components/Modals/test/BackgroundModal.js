import React from "react";

const BackgroundModal = (props) => {
  return (
    <div className="background-modal">
      {props.children}
    </div>
  );
};

export default BackgroundModal;
