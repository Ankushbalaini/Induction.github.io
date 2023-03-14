import React, { useEffect, useState, useMemo, useLayoutEffect } from "react";

const InductionTitle = (props) => {
  const [inductionTitle, setInductionTitle] = useState(props.title);

  useEffect(() => {
    setInductionTitle(props.title);
  }, []);
  //  console.log(props, "props title...")
  //  console.log(inductionTitle,"...inductionTitle...")
  return (
    <div className="course-content d-flex justify-content-between flex-wrap">
      <div>
        <h3>{inductionTitle}</h3>
        <ul className="d-flex align-items-center raiting my-0 flex-wrap">
          <li>
            <span className="font-w500">5.0</span>
            <i className="fas fa-star text-orange ms-2"></i>
          </li>
          <li>Review (1k1)</li>
          <li>10k Students</li>
        </ul>
      </div>
    </div>
  );
};

export default InductionTitle;
