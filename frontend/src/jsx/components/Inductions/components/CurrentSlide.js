import React, { useEffect, useState } from "react";

const CurrentSlideView = (props) => {
  const [SlideContent, setSlideContent] = useState(
    props.currentSlideContent.slideContent
  );

  useEffect(() => {
    console.log("start inside current slide view");
    console.log(props.currentSlideContent);
    console.log("end inside current slide view");
  }, []);

  const createMarkup = (theExactHtmlWithTag) => {
    return { __html: theExactHtmlWithTag };
  };

  return (
    <>
      <div
        dangerouslySetInnerHTML={createMarkup(
          props.currentSlideContent.slideContent
        )}
        id="slideDataDiv"
      />

      {/* <div className="video-img style-1">
            <div className="view-demo">
            </div>	
        </div> */}
    </>
  );
};
export default CurrentSlideView;
