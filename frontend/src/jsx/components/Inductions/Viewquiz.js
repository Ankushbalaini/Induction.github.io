import React, { useRef, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { useSelector } from "react-redux";
//import ActionDropDown from "./ActionDropDown";
import swal from "sweetalert";
import DropDownBlog from "../Dashboard/DropDownBlog";
import ActionDropDown from "../Dashboard/ActionDropDown";
import { useParams } from "react-router";
import { Dropdown } from "react-bootstrap";

const ViewMcq = () => {

  const navigate = useHistory();

  const {id} = useParams();
  const [question, setQuestion] = useState();
  const [mcqData, setMcqData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editID, setEditID] = useState();

  const handleCallback = (props) => {
    props.trackOnclick(true, props.userData);
    
  }
  const trackDeleteClick = (props) => {
    props.trackDeleteClick();
  }

  const actionHandler = (mcq) => {
    setIsModalOpen(true);
    //setModalData(mcq);
    setQuestion(mcq.question);
    //setEditID(mcq.inductionID);

  }
  
  const handlepageLoad = async (e) => {
    const response = await fetch("http://localhost:8081/api/mcq/"+id, {
      method: "GET"
    }).then((user) => user.json());

    

    if ("status" in response && response.status === true) {
      const rows = response.data.map((row, index) => {
        return <tr key={index}>
                    <td> {index+1} </td>
                    <td> {row.question} </td>
                    <td><Dropdown>
                           <Dropdown.Toggle
                             as="a"
                             className="btn-link i-false btn sharp tp-btn-light btn-dark"
                           >
                             <svg
                               width="24"
                               height="25"
                               viewBox="0 0 24 25"
                               fill="none"
                               xmlns="http://www.w3.org/2000/svg"
                             >
                               <path
                                 d="M12.0012 9.86C11.6544 9.86 11.3109 9.92832 10.9905 10.061C10.67 10.1938 10.3789 10.3883 10.1336 10.6336C9.88835 10.8788 9.6938 11.17 9.56107 11.4905C9.42834 11.8109 9.36002 12.1544 9.36002 12.5012C9.36002 12.848 9.42834 13.1915 9.56107 13.5119C9.6938 13.8324 9.88835 14.1236 10.1336 14.3688C10.3789 14.6141 10.67 14.8086 10.9905 14.9413C11.3109 15.0741 11.6544 15.1424 12.0012 15.1424C12.7017 15.1422 13.3734 14.8638 13.8687 14.3684C14.3639 13.873 14.642 13.2011 14.6418 12.5006C14.6417 11.8001 14.3632 11.1284 13.8678 10.6332C13.3724 10.138 12.7005 9.85984 12 9.86H12.0012ZM3.60122 9.86C3.25437 9.86 2.91092 9.92832 2.59048 10.061C2.27003 10.1938 1.97887 10.3883 1.73361 10.6336C1.48835 10.8788 1.2938 11.17 1.16107 11.4905C1.02834 11.8109 0.960022 12.1544 0.960022 12.5012C0.960022 12.848 1.02834 13.1915 1.16107 13.5119C1.2938 13.8324 1.48835 14.1236 1.73361 14.3688C1.97887 14.6141 2.27003 14.8086 2.59048 14.9413C2.91092 15.0741 3.25437 15.1424 3.60122 15.1424C4.30171 15.1422 4.97345 14.8638 5.46866 14.3684C5.96387 13.873 6.24198 13.2011 6.24182 12.5006C6.24166 11.8001 5.96324 11.1284 5.46781 10.6332C4.97237 10.138 4.30051 9.85984 3.60002 9.86H3.60122ZM20.4012 9.86C20.0544 9.86 19.7109 9.92832 19.3905 10.061C19.07 10.1938 18.7789 10.3883 18.5336 10.6336C18.2884 10.8788 18.0938 11.17 17.9611 11.4905C17.8283 11.8109 17.76 12.1544 17.76 12.5012C17.76 12.848 17.8283 13.1915 17.9611 13.5119C18.0938 13.8324 18.2884 14.1236 18.5336 14.3688C18.7789 14.6141 19.07 14.8086 19.3905 14.9413C19.7109 15.0741 20.0544 15.1424 20.4012 15.1424C21.1017 15.1422 21.7734 14.8638 22.2687 14.3684C22.7639 13.873 23.042 13.2011 23.0418 12.5006C23.0417 11.8001 22.7632 11.1284 22.2678 10.6332C21.7724 10.138 21.1005 9.85984 20.4 9.86H20.4012Z"
                                 fill="#A098AE"
                               />
                             </svg>
                           </Dropdown.Toggle>
                           <Dropdown.Menu
                             className="dropdown-menu dropdown-menu-end"
                             align="right"
                            >
                              <Dropdown.Item onClick={trackDeleteClick}>Delete</Dropdown.Item>
                              <Dropdown.Item >View</Dropdown.Item>
                              <Dropdown.Item onClick={handleCallback}>Edit</Dropdown.Item>
                            </Dropdown.Menu> 
                        </Dropdown></td>
                </tr>
      });
      
      setMcqData(rows);
      setLoading(false);

    } else {
      return swal("Failed", response.message, "error");
    }
  };

  useEffect(() => {
    if(loading) {
      handlepageLoad();
    }
    
  }, [mcqData]);



  return (
    <>
    <ol className="breadcrumb">
        <li className="breadcrumb-item active">
          <Link className="d-flex align-self-center" to={"../courses"}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.99981 12C8.99905 11.8684 9.02428 11.7379 9.07404 11.6161C9.12381 11.4942 9.19713 11.3834 9.28981 11.29L13.2898 7.28999C13.4781 7.10168 13.7335 6.9959 13.9998 6.9959C14.2661 6.9959 14.5215 7.10168 14.7098 7.28999C14.8981 7.47829 15.0039 7.73369 15.0039 7.99999C15.0039 8.26629 14.8981 8.52168 14.7098 8.70999L11.4098 12L14.6998 15.29C14.8636 15.4813 14.9492 15.7274 14.9395 15.979C14.9298 16.2307 14.8255 16.4695 14.6474 16.6475C14.4693 16.8256 14.2305 16.93 13.9789 16.9397C13.7272 16.9494 13.4811 16.8638 13.2898 16.7L9.28981 12.7C9.10507 12.5137 9.00092 12.2623 8.99981 12Z"
                fill="#374557"
              />
            </svg>
            Back
          </Link>
        </li>
      </ol>
    { (loading) ? <h1>Loading</h1> : 
    
      <div className="row">
        <div className="col-xl-12">
          <div className="card students-list">
            <div className="card-header border-0 flex-wrap pb-0">
              <h4>Mcq List</h4>
            </div>
            <div className="card-body py-0">
              <div className="table-responsive">
                <div className="dataTables_wrapper no-footer">
                  <table
                    className="table display mb-4 dataTablesCard order-table card-table text-black application "
                    id="application-tbl1_next"
                  >
                    <thead>
                      <tr>
                        <th>Sr. No</th>
                        <th>Questions</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mcqData}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div> 
                    }
                    </>
    
  );
};

export default ViewMcq;
