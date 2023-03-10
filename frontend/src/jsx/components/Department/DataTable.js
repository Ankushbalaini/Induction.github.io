import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "../Companies/FilterComponent";
import DropDownBlog from "../Dashboard/DropDownBlog";
import { Link } from "react-router-dom";
import { tableStyles } from "../Instructor/Instructor-1/tableStyles";

const Table = (props) => {
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      grow: 1,
      className: "col-3",
    },

    {
      name : "Status",
      selector:"status",
      sortable:true,
      hide: "sm",
      cell: row => (
        <div
      
        className={`badge light ${(row.status)? 'badge-success': 'badge-danger'}`} >
        { (row.status) ? 'Active' : 'Inactive'}
      
        </div>
      ),
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div>
          <div className="d-flex">
            <button
              onClick={() => props.actionHandler(row)}
              href="#"
              className="btn btn-success shadow btn-xs sharp me-1"
            >
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button
              onClick={() => props.deleteClick(row.name)}
              href="#"
              className="btn btn-danger shadow btn-xs sharp"
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      ),
    },
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
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
  );
};

export default Table;
