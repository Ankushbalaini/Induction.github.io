import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

//images
import palette from "./../../../images/svg/color-palette.svg";
import education from "./../../../images/svg/education-website.svg";
import brain from "./../../../images/svg/brain.svg";
import microscope from "./../../../images/svg/microscope.svg";
import course1 from "./../../../images/courses/course1.jpg";
import course2 from "./../../../images/courses/course2.jpg";
import course3 from "./../../../images/courses/course3.jpg";
import course4 from "./../../../images/courses/course4.jpg";
import course5 from "./../../../images/courses/course5.jpg";
import course6 from "./../../../images/courses/course6.jpg";
import { useSelector } from "react-redux";

const widgetData = [
  { image: palette, title: "Graphic" },
  { image: education, title: "Coading" },
  { image: brain, title: "Soft Skill" },
  { image: microscope, title: "Science" },
];

function CoursesMain() {
  const [courses, setCourses] = useState();
  const [loading, setloading] = useState(true);
  const [page, setPage ] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalRecords, setTotalRecords] = useState();
  const [showing, setShowing] = useState();

  // pagination 
  const [prevLink, setPrevLink] = useState(0);
  const [firstLink, setFirstLink] = useState(1);
  const [secondLink, setSecondLink] = useState(2);
  const [nextLink, setNextLink] = useState(3);




  const token = useSelector((state) => state.auth.auth.token);

  // api call
  async function getAllInductions(page) {
    return fetch("http://localhost:8081/api/induction?page="+page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((data) => data.json());
  }



  const handleGetInduction = async (page) => {
    const response = await getAllInductions(page);
    if ("status" in response && response.status == true) {
      setCourses(response.data);
      setloading(false);
      setTotalRecords(response.pagination.totalRecords);
      setLimit(response.pagination.limit);
      
      setPrevLink(<Link to={"#"} onClick={e=>setPage(page-1)} className="">
        <i className="fas fa-chevron-left"></i>
      </Link>);

      setFirstLink(<Link to={"#"} onClick={e=>setPage(1)} className={(page===1)?'active' : ""}>
      <i className="fas fa-chevron-left"></i>
    </Link>);

      pageNate();
    }
  };


  // use effect
  useEffect(() => {
    handleGetInduction(page);
  }, [page,loading, totalRecords]);


  const pageNate = () =>{
    
    if(totalRecords > limit){
      // enable pagination
      const totalPages = totalRecords / limit;


      setShowing(<>
        <h4 className="sm-mb-0 mb-3">
          Showing inside <span>{(page===1)? 1 : ((page-1)*limit) } -  {(page===1)? limit : ((page-1)*limit)+limit } </span>from <span>{totalRecords} </span>
        </h4>
        
      </>);

    }
    else{
      // only show dummy html
      setShowing(
          <h4 className="sm-mb-0 mb-3">
          Showing Else <span>{(page===0)?1:page*limit} - {(page*limit)+limit} </span>from <span>{totalRecords} </span>
        </h4>
          );
    }
  }






  const content = loading ? (
    <h1>Loading</h1>
  ) : (
    <>
      <div className="widget-heading d-flex justify-content-between align-items-center">
        <h3 className="m-0">All Courses ({totalRecords})</h3>
        <Link to={"./courses"} className="btn btn-primary btn-sm">
          View all
        </Link>
      </div>
      <div className="row">
        {courses.map((data, index) => (
          <div className="col-xl-4 col-md-6" key={index}>
            <div className="card all-crs-wid">
              <div className="card-body">
                <div className="courses-bx">
                  <div className="dlab-media">
                    <img src={course1} alt="" />
                  </div>
                  <div className="dlab-info">
                    <div className="dlab-title d-flex justify-content-between">
                      <div>
                        <h4>
                          <Link to={"./course-details-1"}>{data.title}</Link>
                        </h4>
                        <p className="m-0">
                          {data.subTitle}
                          <svg
                            className="ms-1"
                            width="4"
                            height="5"
                            viewBox="0 0 4 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="2" cy="2.5" r="2" fill="#DBDBDB" />
                          </svg>
                          <span>
                            5.0
                            <svg
                              width="16"
                              height="15"
                              viewBox="0 0 16 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 0.5L9.79611 6.02786H15.6085L10.9062 9.44427L12.7023 14.9721L8 11.5557L3.29772 14.9721L5.09383 9.44427L0.391548 6.02786H6.20389L8 0.5Z"
                                fill="#FEC64F"
                              />
                            </svg>
                          </span>
                        </p>
                      </div>
                      <h4 className="text-primary">

                        <span>Author</span>
                      </h4>
                    </div>
                    <div className="d-flex justify-content-between content align-items-center">
                      <span>
                        <svg
                          className="me-2"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.2 18.6C20.5 18.5 19.8 18.4 19 18.4C16.5 18.4 14.1 19.1 12 20.5C9.90004 19.2 7.50005 18.4 5.00005 18.4C4.30005 18.4 3.50005 18.5 2.80005 18.6C2.30005 18.7 1.90005 19.2 2.00005 19.8C2.10005 20.4 2.60005 20.7 3.20005 20.6C3.80005 20.5 4.40005 20.4 5.00005 20.4C7.30005 20.4 9.50004 21.1 11.4 22.5C11.7 22.8 12.2 22.8 12.6 22.5C15 20.8 18 20.1 20.8 20.6C21.3 20.7 21.9 20.3 22 19.8C22.1 19.2 21.7 18.7 21.2 18.6ZM21.2 2.59999C20.5 2.49999 19.8 2.39999 19 2.39999C16.5 2.39999 14.1 3.09999 12 4.49999C9.90004 3.09999 7.50005 2.39999 5.00005 2.39999C4.30005 2.39999 3.50005 2.49999 2.80005 2.59999C2.40005 2.59999 2.00005 3.09999 2.00005 3.49999V15.5C2.00005 16.1 2.40005 16.5 3.00005 16.5C3.10005 16.5 3.10005 16.5 3.20005 16.5C3.80005 16.4 4.40005 16.3 5.00005 16.3C7.30005 16.3 9.50004 17 11.4 18.4C11.7 18.7 12.2 18.7 12.6 18.4C15 16.7 18 16 20.8 16.5C21.3 16.6 21.9 16.2 22 15.7C22 15.6 22 15.6 22 15.5V3.49999C22 3.09999 21.6 2.59999 21.2 2.59999Z"
                            fill="#c7c7c7"
                          />
                        </svg>
                        110+ Content
                      </span>
                      <Link
                        to={`/single-induction-view/${data._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-down">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          {/* <h4 className="sm-mb-0 mb-3">
            Showing <span>{page * limit}- </span>from <span>{totalRecords} </span>data
          </h4> */}
          {showing}
          <ul>
            <li>
              <Link to={"#"} onClick={e=>setPage(page-1)} className={(page<1)?'active' : ""}>
                <i className="fas fa-chevron-left"></i>
              </Link>
            </li>

            <li>
              <Link to={"#"} onClick={e=>setPage(1)}  className={(page==1)?'active' : ""}>
                1
              </Link>
            </li>
            <li>
              <Link to={"#"} onClick={e=>setPage(2)} className={(page==2)?'active' : ""}>2</Link>
            </li>
            <li>
              <Link to={"#"} onClick={e=>setPage(3)} className={(page==3)?'active' : ""}>3</Link>
            </li>

            <li>
              <Link to={"#"} onClick={e=>setPage(page+1)} className={(page>3)?'active' : ""}>
                <i className="fas fa-chevron-right"></i>
              </Link>
            </li>

          </ul> 
        </div>
      </div>
    </>
  );

  return <>{content}</>;
}
export default CoursesMain;
