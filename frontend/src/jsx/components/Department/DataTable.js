import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "../Companies/FilterComponent";
import DropDownBlog from "../Dashboard/DropDownBlog";
import { Link } from "react-router-dom";

const Table = props => {
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      grow: 1,
      className: 'col-3'
    },
    {
      name : "Status",
      selector:"status",
      sortable:true,
      hide: "sm"
    },
    {
      name: "Actions",
      button: true,
      cell: row =>
          <>
            {/* <button
              onClick={() => props.actionHandler(row)}
              style={{ marginRight: "5px", minWidth: "80px" }}
              className="btn btn-warning btn "
            >
              Edit
            </button>

            <button onClick={() => props.deleteClick(row.name)} className="btn btn-danger btn sweet-confirm" style={{ marginRight: "5px", minWidth: "100px" }}>Delete</button> */}
            // <DropDownBlog onEdit={()=>props.actionHandler(row)} onDelete={()=>props.deleteClick(row.name)}/>
            <div className="d-flex">
            <Link
              href="#"
              className="btn btn-primary shadow btn-xs sharp me-1"
            >
              <i className="fas fa-pencil-alt"></i>
            </Link>
            <Link
              href="#"
              className="btn btn-danger shadow btn-xs sharp"
            >
              <i className="fa fa-trash"></i>
            </Link>
          </div>
          </>
    }
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
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