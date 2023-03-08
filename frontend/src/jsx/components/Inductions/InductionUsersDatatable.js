import React, { Fragment, useMemo, useState } from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "../Instructor/FilterComponent";
import { useSelector } from "react-redux";
import { tableStyles } from "../Instructor/Instructor-1/tableStyles";
import { Button } from "react-bootstrap";

const Table = (props) => {
  
  const token = useSelector((state) => state.auth.auth.token);

  const onClickHandler  = (row) =>{
    //console.log(row);
    props.trackOnclick(true, row);
  }

  const columns = [
    {
      name: "Name",
      //selector: "profile.first_name",
      sortable: true,
      grow: 1,
      className: "col-3",
      cell: (row) => (
        <>
          <div className="d-flex align-items-center">
            <div>
              {row.profile?.first_name} {row.profile?.last_name}
            </div>
          </div>
        </>
      ),
    },
    {
      name: "Induction",
      selector: "inductions.title",
      sortable: true,
      grow: 1,
      className: "col-3",
      cell: (row) => (
        <>
          <div className="d-flex align-items-center">
            <div>
              { row.inductions.title }
            </div>
          </div>
        </>
      ),

    },
    {
      name: "Total Attempted Inductions",
      selector: "total",
      sortable: true,
      grow: 1,
      className: "col-3",
    },

    {
      name: "Actions",
      button: true,
      sortable: false,
      cell: (row) => (
        <>
          <Button type="button" onClick={() => onClickHandler(row) }>
            {" "}
            View All
          </Button>
        </>
      ),
    },
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = props.data.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
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
        onFilter={(e) => setFilterText(e.target.value)}
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
