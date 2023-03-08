import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import ActionDropDown from "../Dashboard/ActionDropDown";
import FilterComponent from "./FilterComponent";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { tableStyles } from "./Instructor-1/tableStyles";
import { Button } from "react-bootstrap";


const Table = props => {


  const columns = [
    {
      name: "Name",
      selector: "profile.name",
      sortable: true,
      grow: 1,
      className: 'col-3',
      reorder: true,
},
    {
      name: "Email",
      selector: "email",
      sortable: true,
      hide: "sm",
      reorder: true,
    },
    {
      name: "Join Date",
      selector: "createdAt",
      sortable: true,
      hide: "sm",
      reorder: true,
      cell: row =>
      <div>
      {new Date(row.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric"})}
      </div>
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      hide: "sm",
      reorder: true,
      cell: row =>
      <div>
        <Link
          className={`badge light ${(row.status)? 'badge-success': 'badge-danger'}`}
          to="/instructors"
          onClick={() => props.changeUserStatus(row._id, row.status) }
          
        >
          { (row.status) ? 'Active' : 'Inactive'}
        </Link>
      </div>
    },
    {
      name: "Actions",
      button: true,
      cell: row =>
          <>
            <ActionDropDown trackOnclick={props.trackOnclick} userData={row} trackDeleteClick={props.trackDeleteClick} />
          </>
    }
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(true);

  const token = useSelector((state) => state.auth.auth.token);
  
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
        setFilterText(" ");
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
    <div className="App">
    <DataTable
     customStyles={tableStyles}
      title=""
      columns={columns}
      data={filteredItems}
      defaultSortField="name"
      subHeader
      subHeaderComponent={subHeaderComponent}
      pagination
    />
    </div>
  );
  
};

export default Table;