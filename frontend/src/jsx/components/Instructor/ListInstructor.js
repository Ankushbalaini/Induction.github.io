import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import DropDownBlog from "../Dashboard/DropDownBlog";
import ActionDropDown from "../Dashboard/ActionDropDown";
import UpdateProfile from "./UpdateProfile";
import CompanyDropdown from '../Companies/CompanyDropdown';
import Table from './DataTable';
import PageTitle from "../../layouts/PageTitle";

const images = require.context("../../../../../images/profile/", true);

const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};

// api call
async function getInstructorApi(role, companyID) {
    var getInstructorsApi = "http://localhost:8081/api/instructor/list";
    if (USER_ROLES.COMPANY === role) {
      var getInstructorsApi =
        "http://localhost:8081/api/instructor/listByCompany?role=company&parentCompany=" +
        companyID;
    }
    return fetch(getInstructorsApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
}

/**
 * Instructor API call to filter byb company.
 * 
 * @param {*} companyID 
 * @returns 
 */
async function filterInstructorApi(companyID) {
  let filterInstructorsApi = "http://localhost:8081/api/instructor/filterByCompany?filterByCompany="+companyID;
  if (companyID == 'all') {
    filterInstructorsApi = "http://localhost:8081/api/instructor/list";
  }
  return fetch(filterInstructorsApi, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}


const Instructors = () => {
  const role = useSelector((state) => state.auth.auth.role);
  const token = useSelector((state) => state.auth.auth.token);
  const parentCompany = useSelector((state) => state.auth.auth.id);

  const [data, setData] = useState(
    document.querySelectorAll("#student_wrapper tbody tr")
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sort = 5;
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const [isUserStatusChanged, setIsUserStatusChanged] = useState(false);
  const [instructorData, setInstructorData] = useState({
  profile: {name:'',
  email:'',
  aboutMe:'',
  address:'',
  logo:'',
  _id:''}, 
  });
  const [instructorsList, setInstructosList] = useState([]);


  // change status
  const changeUserStatus = (userID, status) =>{

    // user id
    swal({
      title: "Are you sure?",
      text:
        `Once status Changed, User will get or loss access to account`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willChange) => {
      if (willChange) {

        const response = await fetch("http://localhost:8081/api/users/changeUserStatus", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token" : token,
          },
          body: JSON.stringify({ "userID" : userID, "status": status})
        }).then((data) => data.json());


        if ("status" in response && response.status == true) {
          swal("Poof! Your record has been updated!", {
            icon: "success",
          }).then(()=>{
            setIsUserStatusChanged(!isUserStatusChanged);
          });
          
        } else {
          return swal("Failed", response.message, "error");
        }


      } else {
        swal("Your status is not changed!");
      }
    })
  }
  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };


  // callback function to opdate state
  const trackOnclick = (payload, userData) => {
    setIsModalOpen(payload);  
    if(payload){
      setInstructorData(userData);
    }
  }
    // callback function to opdate state
    const trackDeleteClick = () => {
      swal({
        title: "Are you sure?",
        text:
          "Once deleted, you will not be able to recover this record!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your record has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your record is safe!");
        }
      })
    }


  const filterByCompany = (companyID) => {
    const handlepageLoad = async (event) => {
      const response = await filterInstructorApi(companyID);

      if ("status" in response && response.status == true) {
        setInstructosList(response.data);
        
      } else {
        return swal("Failed", "Something went wrong, please try again later.", "error");
      }
    };
    handlepageLoad();
  }
  // use effect
  useEffect(() => {
    const handlepageLoad = async (event) => {
      const response = await getInstructorApi(role, parentCompany);
      if ("status" in response && response.status == true) {
        /* Prepare data for instructor data-table list, start */
        setInstructosList(response.data);
        
      } else {
        return swal("Failed", "Error message", "error");
      }
    };
    handlepageLoad();
  }, [isModalOpen, isUserStatusChanged]);

  // // Active pagginarion
  // activePag.current === 0 && chageData(0, sort);
  // // paggination
  // let paggination = Array(Math.ceil(data.length / sort))
  //   .fill()
  //   .map((_, i) => i + 1);

  // // Active paggination & chage data
  // const onClick = (i) => {
  //   activePag.current = i;
  //   chageData(activePag.current * sort, (activePag.current + 1) * sort);
  //   settest(i);
  // };

  return (
    <>
      <PageTitle activeMenu="Instructor List" motherMenu="Instructors" />
      <div className="row">
        <div className="col-xl-12">
          <div className="card students-list">
            <div className="card-header border-0 flex-wrap pb-0">
              <h2>Instructor List</h2>
              <div className="col-sm-3">
                <select name="parentCompany" className="form-control" onChange={ (e) => filterByCompany(e.target.value) }>
                  <option value="all">All</option>
                  <CompanyDropdown />
                </select> 
              </div>
            </div>
            <div className="card-body ">
              <div className="table-responsive">
                <div
                  id="student_wrapper"
                  className="dataTables_wrapper "
                >
                  {/* <Table data={data} click={clickhandler} /> */}
                </div>
                <Table data={instructorsList} trackOnclick={trackOnclick} trackDeleteClick={trackDeleteClick} changeUserStatus={changeUserStatus}/>
               

              </div>
              
            </div>
            
          </div>
        </div>
      </div>

      <UpdateProfile isModalOpen={isModalOpen} trackOnclick={trackOnclick} instructorData={instructorData}></UpdateProfile>

    </>
  );
};
export default Instructors;
