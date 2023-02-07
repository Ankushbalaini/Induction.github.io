import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "../Companies/FilterComponent";
import DropDownBlog from "../Dashboard/DropDownBlog";
import { Link } from "react-router-dom";

const Table = props => {
  const columns = [
    {
      name: "Email",
      selector: "email",
      sortable: true,
      grow: 1,
      className: 'col-3'
    },
    {
      name: "Parent Company",
      selector: "parentCompany",
      sortable: true,
      grow: 1,
      className: 'col-3'
    },
    {
      name: "Department",
      
      sortable: true,
      grow: 1,
      className: 'col-3',
      cell: row => (
        <div>
          { row.deptID }
        </div>
        )
    },
    
    {
      name : "Status",
      selector:"status",
      hide: "sm",
      cell: row => (
        <div>
          <span className={`badge badge-rounded ${ (row.status)?"badge-success":"badge-primary"}`}>
            {(row.status)?'Active':'Inactive'}
          </span>
        </div>
        )
    },
    {
      name: "Actions",
      button: true,
      cell: row =>
          <div>
            <div className="d-flex">
            <button onClick={()=>props.actionHandler(row)}
              href="#"
              className="btn btn-primary shadow btn-xs sharp me-1"
            >
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button onClick={() => props.deleteClick(row.email)}
              href="#"
              className="btn btn-danger shadow btn-xs sharp"
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
          </div>
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