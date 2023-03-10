import React, { useEffect, useState } from "react";

const InductionSubTiltle = (props) => {
  const [inductionSubTiltle, setInductionSubTiltle] = useState("");
  useEffect(() => {
    setInductionSubTiltle(props.title);
  }, [props.title]);
  console.log(props, "propps");
  console.log(props.title,"...props.title...")  
  console.log(inductionSubTiltle, "....inductionSlideTiltle...");
  return (
    <div className="course-content d-flex justify-content-between flex-wrap">
      <div>
        <h3>Sub-Title</h3><h4>{inductionSubTiltle}</h4>
      </div>
    </div>
  );
};

export default InductionSubTiltle;
