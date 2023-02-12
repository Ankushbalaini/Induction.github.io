import React, { useMemo, useState } from "react";

import DataTable from "react-data-table-component";
import DropDownBlog from "../Dashboard/DropDownBlog";
import ActionDropDown from "../Dashboard/ActionDropDown";
import FilterComponent from "./FilterComponent";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";

const images = require.context("../../../../../images/profile/", true);

const loadImage = (imageName) => {
  return images(`./${imageName}`);
}	

const profileImageCss = {
  height: "3.5rem",
  width: "3.5rem",
  borderRadius: "0.625rem",
  margin: "5px 5px 5px 0"
};



const Table = props => {
  
  
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      grow: 1,
      className: 'col-3',
      cell: row =>
      <>
        <div className="d-flex align-items-center">
          <img style={profileImageCss} src={loadImage(row.profile.profilePhoto)} alt="" />
          <h4 className="mb-0 fs-16 font-w500">
            {row.profile?.name}
          </h4>
        </div>
      </>
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      hide: "sm"
    },
    {
      name: "join Date",
      selector: "join_date",
      sortable: true,
      hide: "sm",
      cell: row =>
      <>
      {new Date(row.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric"})}
      </>
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      hide: "sm",
      cell: row =>
      <>
        <Link
          className={`badge light ${(row.status)? 'badge-success': 'badge-danger'}`}
          to="/instructors"
          onClick={() => changeUserStatus(row._id, row.status) }
          
        >
          { (row.status) ? 'Active' : 'Inactive'}
        </Link>
      </>
    },
    {
      name: "Actions",
      button: true,
      cell: row =>
          <>
            <ActionDropDown trackOnclick={props.trackOnclick} userData={row} trackDeleteClick={props.trackDeleteClick}/>
          </>
    }
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  const token = useSelector((state) => state.auth.auth.token);
  const [isUserStatusChanged, setIsUserStatusChanged] = useState(false);
  
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
          setIsUserStatusChanged(true);
        });
        
      } else {
        return swal("Failed", response.message, "error");
      }

    } else {
      swal("Your status is not changed!");
    }
  })
}

  const filteredItems = props.data.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      title=""
      columns={columns}
      data={filteredItems}
      defaultSortField="name"
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
    />
  );
};

export default Table;