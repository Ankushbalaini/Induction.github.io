import React, { Fragment, useMemo, useState } from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "../Instructor/FilterComponent";
import DropDownBlog from "../Dashboard/DropDownBlog";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import ActionDropDown from "./ActionDropDownInductions";
import { Modal } from "react-bootstrap";
import { tableStyles } from "../Instructor/Instructor/tableStyles";
import { Button } from "react-bootstrap";

const Table = props => {
  const navigate = useHistory();
  const images = require.context("../../../../../images/profile/", true);

  const token = useSelector((state) => state.auth.auth.token);
  const [isUserStatusChanged, setIsUserStatusChanged] = useState(false);
  const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  const loadImage = (imageName) => {
    return images(`./${imageName}`);
  };

  const profileImageCss = {
    height: "3.5rem",
    width: "3.5rem",
    borderRadius: "0.625rem",
    margin: "5px 5px 5px 0"
  };

  const columns = [
    {
      name: "Name",
      selector: "profile.first_name",
      sortable: true,
      grow: 1,
      className: 'col-3',
      cell: row =>
      <>
       <div className="d-flex align-items-center">
          <div >
            {row.profile?.first_name}{" "}
            {row.profile?.last_name}
          </div>
        </div>
      </>
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      grow: 1,
      className: 'col-3'
    },
    {
      name: "Join Date",
      selector: "createdAt",
      sortable: true,
      grow: 1,
      className: 'col-3',
      cell: row => (
        <div>
         {new Date(row.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric"})}
        </div>
        )
    },
    

    {
      name: "Actions",
      button: true,
      cell: row =>
      <>
      <Button to="/students" onClick={handleShow}> View</Button>
    </>
    }
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

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
    <>
    <DataTable
      title=""
      columns={columns}
      data={filteredItems}
      defaultSortField="name"
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
      customStyles={tableStyles}
    />
      </>
  );

};

export default Table;